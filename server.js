const express = require('express');
const path = require('path');
const initSqlJs = require('sql.js');

const app = express();
const PORT = 3000;

// 中间件
app.use(express.json());
app.use(express.static(path.join(__dirname))); // 提供前端文件

// ========== 数据库初始化 ==========
let db;

async function initDB() {
  const SQL = await initSqlJs();
  db = new SQL.Database();

  // 创建用户表
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now','localtime'))
    )
  `);

  // 创建任务表（通过 user_id 关联用户 —— 这就是多租户数据隔离）
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      text TEXT NOT NULL,
      priority TEXT DEFAULT 'medium',
      done INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now','localtime')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  console.log('✅ 数据库初始化完成');
}

// ========== 简单的会话管理（用内存存储登录状态） ==========
const sessions = {}; // token -> userId

function generateToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// 验证登录中间件
function auth(req, res, next) {
  const token = req.headers['authorization'];
  const userId = sessions[token];
  if (!userId) {
    return res.status(401).json({ error: '请先登录' });
  }
  req.userId = userId;
  next();
}

// ========== API 路由 ==========

// --- 注册 ---
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: '用户名和密码不能为空' });
  }
  if (username.length < 2) {
    return res.status(400).json({ error: '用户名至少2个字符' });
  }
  if (password.length < 3) {
    return res.status(400).json({ error: '密码至少3个字符' });
  }

  try {
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
    const user = db.exec('SELECT last_insert_rowid() as id')[0].values[0][0];
    const token = generateToken();
    sessions[token] = user;
    res.json({ message: '注册成功', token, username });
  } catch (e) {
    if (e.message.includes('UNIQUE')) {
      return res.status(400).json({ error: '用户名已存在' });
    }
    res.status(500).json({ error: '注册失败' });
  }
});

// --- 登录 ---
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: '用户名和密码不能为空' });
  }

  const result = db.exec(
    'SELECT id FROM users WHERE username = ? AND password = ?',
    [username, password]
  );

  if (result.length === 0 || result[0].values.length === 0) {
    return res.status(401).json({ error: '用户名或密码错误' });
  }

  const userId = result[0].values[0][0];
  const token = generateToken();
  sessions[token] = userId;
  res.json({ message: '登录成功', token, username });
});

// --- 获取任务列表 ---
app.get('/api/tasks', auth, (req, res) => {
  const result = db.exec(
    'SELECT id, text, priority, done, created_at FROM tasks WHERE user_id = ? ORDER BY id DESC',
    [req.userId]
  );

  const tasks = result.length > 0
    ? result[0].values.map(row => ({
        id: row[0],
        text: row[1],
        priority: row[2],
        done: row[3] === 1,
        createdAt: row[4],
      }))
    : [];

  res.json(tasks);
});

// --- 添加任务 ---
app.post('/api/tasks', auth, (req, res) => {
  const { text, priority } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: '任务内容不能为空' });
  }

  db.run(
    'INSERT INTO tasks (user_id, text, priority) VALUES (?, ?, ?)',
    [req.userId, text.trim(), priority || 'medium']
  );

  const result = db.exec('SELECT last_insert_rowid() as id');
  const newId = result[0].values[0][0];

  const task = db.exec(
    'SELECT id, text, priority, done, created_at FROM tasks WHERE id = ?',
    [newId]
  );

  const row = task[0].values[0];
  res.json({
    id: row[0],
    text: row[1],
    priority: row[2],
    done: row[3] === 1,
    createdAt: row[4],
  });
});

// --- 切换任务完成状态 ---
app.put('/api/tasks/:id', auth, (req, res) => {
  const { id } = req.params;

  // 只能操作自己的任务
  const check = db.exec(
    'SELECT id, done FROM tasks WHERE id = ? AND user_id = ?',
    [id, req.userId]
  );

  if (check.length === 0 || check[0].values.length === 0) {
    return res.status(404).json({ error: '任务不存在' });
  }

  const currentDone = check[0].values[0][1];
  db.run('UPDATE tasks SET done = ? WHERE id = ?', [currentDone ? 0 : 1, id]);

  res.json({ message: '更新成功', done: !currentDone });
});

// --- 删除任务 ---
app.delete('/api/tasks/:id', auth, (req, res) => {
  const { id } = req.params;

  const check = db.exec(
    'SELECT id FROM tasks WHERE id = ? AND user_id = ?',
    [id, req.userId]
  );

  if (check.length === 0 || check[0].values.length === 0) {
    return res.status(404).json({ error: '任务不存在' });
  }

  db.run('DELETE FROM tasks WHERE id = ?', [id]);
  res.json({ message: '删除成功' });
});

// --- 前端路由兜底 ---
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ========== 启动服务 ==========
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🚀 MySaaS 服务已启动`);
    console.log(`📍 访问地址: http://localhost:${PORT}`);
    console.log(`\n按 Ctrl+C 停止服务\n`);
  });
});
