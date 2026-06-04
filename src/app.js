// ========== THE DAILY TASK — Vue 3 主应用 ==========

import AppHeader from './components/AppHeader.js';
import AuthModal from './components/AuthModal.js';
import DashboardPage from './components/DashboardPage.js';
import TaskPage from './components/TaskPage.js';

const { createApp, ref, computed, onMounted, nextTick } = Vue;

const app = createApp({
  components: {
    AppHeader,
    AuthModal,
    DashboardPage,
    TaskPage,
  },

  setup() {
    // ==================== 状态 ====================
    const user = ref(null);
    const token = ref(null);
    const tasks = ref([]);
    const filter = ref('all');
    const currentPage = ref('dashboard');
    const showAuth = ref(false);
    const authError = ref('');
    const authLoading = ref(false);

    // ==================== 计算属性 ====================
    const stats = computed(() => {
      const total = tasks.value.length;
      const done = tasks.value.filter(t => t.done).length;
      const pending = total - done;
      const progress = total > 0 ? Math.round((done / total) * 100) : 0;
      return { total, done, pending, progress };
    });

    const today = computed(() => {
      const d = new Date();
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ];
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    });

    const vol = computed(() => {
      const d = new Date();
      return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}`;
    });

    // ==================== API 请求 ====================
    async function api(path, options = {}) {
      const headers = { 'Content-Type': 'application/json' };
      if (token.value) headers['Authorization'] = token.value;

      const res = await fetch(`/api${path}`, {
        ...options,
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '请求失败');
      return data;
    }

    // ==================== 认证 ====================
    function handleAuth(payload) {
      if (payload.clearError) {
        authError.value = '';
        return;
      }
      doAuth(payload.mode, payload.username, payload.password);
    }

    async function doAuth(mode, username, password) {
      authError.value = '';
      authLoading.value = true;

      if (!username || !password) {
        authError.value = '请输入用户名和密码';
        authLoading.value = false;
        return;
      }

      try {
        const endpoint = mode === 'login' ? '/login' : '/register';
        const data = await api(endpoint, { method: 'POST', body: { username, password } });

        token.value = data.token;
        user.value = { username: data.username };
        localStorage.setItem('mysaas_token', data.token);
        localStorage.setItem('mysaas_username', data.username);

        showAuth.value = false;
        await loadTasks();
        refreshIcons();
      } catch (e) {
        authError.value = e.message;
      } finally {
        authLoading.value = false;
      }
    }

    function logout() {
      token.value = null;
      user.value = null;
      tasks.value = [];
      localStorage.removeItem('mysaas_token');
      localStorage.removeItem('mysaas_username');
      currentPage.value = 'dashboard';
      nextTick(() => refreshIcons());
    }

    // ==================== 任务操作 ====================
    async function loadTasks() {
      try {
        tasks.value = await api('/tasks');
      } catch (e) {
        console.error('加载任务失败:', e);
      }
    }

    async function addTask(payload) {
      try {
        const task = await api('/tasks', {
          method: 'POST',
          body: { text: payload.text, priority: payload.priority },
        });
        tasks.value.unshift(task);
        nextTick(() => refreshIcons());
      } catch (e) {
        alert(e.message);
      }
    }

    async function toggleTask(task) {
      try {
        const data = await api(`/tasks/${task.id}`, { method: 'PUT' });
        task.done = data.done;
      } catch (e) {
        alert(e.message);
      }
    }

    async function deleteTask(id) {
      try {
        await api(`/tasks/${id}`, { method: 'DELETE' });
        tasks.value = tasks.value.filter(t => t.id !== id);
      } catch (e) {
        alert(e.message);
      }
    }

    // ==================== 工具函数 ====================
    function refreshIcons() {
      nextTick(() => {
        if (window.lucide) lucide.createIcons();
      });
    }

    // ==================== 生命周期 ====================
    onMounted(async () => {
      const savedToken = localStorage.getItem('mysaas_token');
      const savedUser = localStorage.getItem('mysaas_username');

      if (savedToken && savedUser) {
        token.value = savedToken;
        user.value = { username: savedUser };
        try {
          await loadTasks();
        } catch {
          logout();
        }
      }

      refreshIcons();
    });

    return {
      // 状态
      user, tasks, filter, currentPage,
      showAuth, authError, authLoading,
      // 计算
      stats, today, vol,
      // 方法
      handleAuth, logout, addTask, toggleTask, deleteTask,
    };
  },

  template: `
    <app-header
      :user="user"
      :current-page="currentPage"
      :vol="vol"
      :today="today"
      @navigate="currentPage = $event; $nextTick(() => { if (window.lucide) lucide.createIcons() })"
      @show-auth="showAuth = true"
      @logout="logout" />

    <auth-modal
      :show="showAuth"
      :loading="authLoading"
      :error="authError"
      @close="showAuth = false"
      @submit="handleAuth" />

    <dashboard-page
      v-if="currentPage === 'dashboard'"
      :user="user"
      :stats="stats"
      :vol="vol"
      @show-auth="showAuth = true"
      @navigate="currentPage = $event; $nextTick(() => { if (window.lucide) lucide.createIcons() })" />

    <task-page
      v-if="currentPage === 'tasks'"
      :user="user"
      :tasks="tasks"
      :stats="stats"
      :filter="filter"
      :vol="vol"
      @show-auth="showAuth = true"
      @add="addTask"
      @toggle="toggleTask"
      @delete="deleteTask"
      @filter="filter = $event" />
  `,
});

app.mount('#app');
