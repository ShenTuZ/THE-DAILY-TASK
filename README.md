# THE DAILY TASK

> 📋 **任务管理报** — 以报纸编辑的严谨态度，管理你的每一件任务。

一个采用 **Newsprint（新闻纸）** 设计风格的 SaaS 任务管理应用。前端使用 Vue 3 组件化开发，后端基于 Express + SQLite，支持多用户注册登录与数据隔离。

![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?style=flat-square&logo=vue.js)
![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=flat-square&logo=sqlite)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

---

## ✨ 功能特性

- 📰 **Newsprint 设计风格** — 锐利直角、报纸网格、衬线字体、高对比度
- 👤 **用户系统** — 注册 / 登录 / 退出 / 会话保持
- 🔒 **数据隔离** — 每个用户拥有独立的任务空间
- ✅ **任务管理** — 创建、完成、删除，完整的任务生命周期
- 🏷️ **优先级标记** — 高 / 中 / 低 三级优先级，彩色标签区分
- 🔍 **智能筛选** — 按全部 / 待完成 / 已完成快速筛选
- 📊 **实时统计** — 总数、待完成、已完成、完成率一目了然
- 📱 **响应式布局** — 适配手机、平板、桌面端

---

## 🖼️ 截图预览

```
┌─────────────────────────────────────────────────┐
│  EST. 2026 | Vol.2026.06 | Wednesday, June 4    │
├─────────────────────────────────────────────────┤
│         T H E   D A I L Y   T A S K             │
│      任务管理报 · PERSONAL PRODUCTIVITY GAZETTE   │
├──────────────┬──────────────────────────────────┤
│    首页       │           任务版                  │
└──────────────┴──────────────────────────────────┘
```

---

## 🛠️ 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| **前端** | Vue 3 | 组合式 API + 组件化 |
| **图标** | Lucide | 轻量 SVG 图标库 |
| **后端** | Express 5 | RESTful API |
| **数据库** | SQLite (sql.js) | 嵌入式数据库，零配置 |
| **设计** | Newsprint | 自定义报纸风格设计系统 |

---

## 📁 项目结构

```
SAAS/
├── index.html                  ← 入口文件
├── style.css                   ← Newsprint 设计系统样式
├── server.js                   ← Express 后端服务
├── package.json                ← 项目配置
├── .gitignore
│
├── src/
│   ├── app.js                  ← Vue 根组件
│   └── components/
│       ├── AppHeader.js        ← 顶部导航栏
│       ├── AuthModal.js        ← 登录/注册弹窗
│       ├── DashboardPage.js    ← 首页
│       ├── TaskPage.js         ← 任务版页面
│       ├── StatsBar.js         ← 统计数据栏
│       ├── AddTaskForm.js      ← 添加任务表单
│       ├── FilterBar.js        ← 筛选栏
│       ├── TaskBoard.js        ← 任务列表面板
│       └── TaskRow.js          ← 单个任务行
```

---

## 🚀 快速开始

### 环境要求

- [Node.js](https://nodejs.org/) >= 18

### 安装与运行

```bash
# 克隆仓库
git clone https://github.com/ShenTuZ/THE-DAILY-TASK.git
cd THE-DAILY-TASK

# 安装依赖
npm install

# 启动服务
npm start
```

服务启动后访问 **http://localhost:3000**

---

## 📡 API 接口

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| `POST` | `/api/register` | 用户注册 | ❌ |
| `POST` | `/api/login` | 用户登录 | ❌ |
| `GET` | `/api/tasks` | 获取任务列表 | ✅ |
| `POST` | `/api/tasks` | 添加任务 | ✅ |
| `PUT` | `/api/tasks/:id` | 切换任务状态 | ✅ |
| `DELETE` | `/api/tasks/:id` | 删除任务 | ✅ |

### 请求示例

```bash
# 注册
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"demo","password":"123456"}'

# 登录
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"demo","password":"123456"}'

# 添加任务（需要 token）
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: YOUR_TOKEN" \
  -d '{"text":"学习 Vue 3","priority":"high"}'
```

---

## 🎨 设计系统

本项目采用 **Newsprint** 设计风格，核心设计原则：

- **锐利直角** — 所有元素 `border-radius: 0`
- **报纸网格** — 粗黑边框分隔，模拟报纸排版
- **衬线字体** — Playfair Display（标题）+ Lora（正文）
- **高对比度** — 黑白主色 + 红色 `#CC0000` 点缀
- **点阵纹理** — 背景点阵图案模拟新闻纸质感
- **硬阴影** — 悬浮时出现 `4px 4px` 偏移阴影
- **首字下沉** — 关键段落首字母放大 + 红色强调

---

## 📄 许可证

本项目基于 [MIT 许可证](LICENSE) 开源。

---

## 致谢

- [Vue.js](https://vuejs.org/) — 渐进式 JavaScript 框架
- [Express](https://expressjs.com/) — 快速、极简的 Web 框架
- [Lucide](https://lucide.dev/) — 美观的开源图标库
- [Google Fonts](https://fonts.google.com/) — Playfair Display / Lora / Inter / JetBrains Mono
