// ========== AppHeader 组件 — 顶部导航栏 ==========

export default {
  name: 'AppHeader',
  props: {
    user: Object,
    currentPage: String,
    vol: String,
    today: String,
  },
  emits: ['navigate', 'show-auth', 'logout'],
  template: `
    <header class="site-header">
      <!-- 顶部元信息 -->
      <div class="header-top">
        <div class="header-meta font-mono">
          <span>EST. 2026</span>
          <span class="meta-sep">|</span>
          <span>Vol. {{ vol }}</span>
          <span class="meta-sep">|</span>
          <span>{{ today }}</span>
        </div>
      </div>

      <!-- 报纸标题 -->
      <div class="header-title-block">
        <h1 class="site-title font-serif">THE DAILY TASK</h1>
        <p class="site-subtitle font-mono">任务管理报 · YOUR PERSONAL PRODUCTIVITY GAZETTE</p>
      </div>

      <!-- 导航栏 -->
      <nav class="header-nav">
        <div class="nav-left">
          <a href="#"
            class="nav-link font-sans"
            :class="{ active: currentPage === 'dashboard' }"
            @click.prevent="$emit('navigate', 'dashboard')">
            首页
          </a>
          <a href="#"
            class="nav-link font-sans"
            :class="{ active: currentPage === 'tasks' }"
            @click.prevent="$emit('navigate', 'tasks')">
            任务版
          </a>
        </div>
        <div class="nav-right">
          <template v-if="user">
            <span class="nav-user font-mono">{{ user.username }}</span>
            <button class="btn btn-ghost font-sans" @click="$emit('logout')">退出</button>
          </template>
          <template v-else>
            <button class="btn btn-secondary font-sans" @click="$emit('show-auth')">登录 / 注册</button>
          </template>
        </div>
      </nav>
    </header>
  `,
};
