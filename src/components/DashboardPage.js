// ========== DashboardPage 组件 — 首页 ==========

export default {
  name: 'DashboardPage',
  props: {
    user: Object,
    stats: Object,
    vol: String,
  },
  emits: ['show-auth', 'navigate'],
  template: `
    <main class="main-content">

      <!-- ===== Hero 区域 ===== -->
      <section class="hero-section newsprint-texture">
        <div class="hero-grid">
          <div class="hero-main">
            <div class="hero-dropcap font-serif">管</div>
            <h2 class="hero-headline font-serif">理你的每一件任务，<br>如同出版一份日报</h2>
            <p class="hero-body font-body">
              THE DAILY TASK 是一款简洁高效的任务管理工具。以报纸编辑的严谨态度，
              帮你梳理待办事项，追踪完成进度，让每一天都井井有条。
            </p>
            <div class="hero-actions">
              <template v-if="!user">
                <button class="btn btn-primary font-sans" @click="$emit('show-auth')">立即开始</button>
              </template>
              <template v-else>
                <button class="btn btn-primary font-sans" @click="$emit('navigate', 'tasks')">进入任务版</button>
              </template>
            </div>
          </div>
          <div class="hero-sidebar">
            <div class="sidebar-card">
              <h3 class="font-mono">LIVE STATS</h3>
              <div class="sidebar-stats">
                <div class="stat-row">
                  <span class="stat-label font-mono">TOTAL</span>
                  <span class="stat-value font-mono">{{ stats.total }}</span>
                </div>
                <div class="stat-row">
                  <span class="stat-label font-mono">PENDING</span>
                  <span class="stat-value font-mono accent">{{ stats.pending }}</span>
                </div>
                <div class="stat-row">
                  <span class="stat-label font-mono">DONE</span>
                  <span class="stat-value font-mono">{{ stats.done }}</span>
                </div>
              </div>
            </div>
            <div class="sidebar-card">
              <h3 class="font-mono">EDITION NOTES</h3>
              <p class="font-body sidebar-note">
                欢迎使用 THE DAILY TASK。登录后即可管理你的专属任务列表。所有数据安全存储于服务器端。
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== 功能介绍 ===== -->
      <section class="features-section">
        <div class="section-header">
          <span class="section-label font-mono">FEATURES</span>
          <h2 class="section-title font-serif">核心功能</h2>
          <div class="section-rule"></div>
        </div>

        <div class="features-grid">
          <div class="feature-card hard-shadow-hover">
            <div class="feature-icon">
              <i data-lucide="clipboard-list" class="icon"></i>
            </div>
            <h3 class="font-serif">任务管理</h3>
            <p class="font-body">创建、编辑、完成、删除——完整的任务生命周期管理。</p>
          </div>
          <div class="feature-card hard-shadow-hover">
            <div class="feature-icon">
              <i data-lucide="shield" class="icon"></i>
            </div>
            <h3 class="font-serif">用户隔离</h3>
            <p class="font-body">每位用户拥有独立的数据空间，互不干扰，安全可靠。</p>
          </div>
          <div class="feature-card hard-shadow-hover">
            <div class="feature-icon">
              <i data-lucide="gauge" class="icon"></i>
            </div>
            <h3 class="font-serif">优先级标记</h3>
            <p class="font-body">高、中、低三级优先级，让你聚焦最重要的事情。</p>
          </div>
          <div class="feature-card hard-shadow-hover">
            <div class="feature-icon">
              <i data-lucide="filter" class="icon"></i>
            </div>
            <h3 class="font-serif">智能筛选</h3>
            <p class="font-body">按全部、待完成、已完成快速筛选，一目了然。</p>
          </div>
        </div>
      </section>

      <!-- ===== 滚动字幕 ===== -->
      <div class="ticker-bar">
        <div class="ticker-content font-mono">
          <span class="ticker-item">📋 THE DAILY TASK</span>
          <span class="ticker-sep">★</span>
          <span class="ticker-item">高效管理每一天</span>
          <span class="ticker-sep">★</span>
          <span class="ticker-item">VUE 3 + EXPRESS + SQLITE</span>
          <span class="ticker-sep">★</span>
          <span class="ticker-item">新闻纸风格设计</span>
          <span class="ticker-sep">★</span>
          <span class="ticker-item">SAAS 架构</span>
          <span class="ticker-sep">★</span>
          <span class="ticker-item">📋 THE DAILY TASK</span>
          <span class="ticker-sep">★</span>
          <span class="ticker-item">高效管理每一天</span>
          <span class="ticker-sep">★</span>
          <span class="ticker-item">VUE 3 + EXPRESS + SQLITE</span>
          <span class="ticker-sep">★</span>
          <span class="ticker-item">新闻纸风格设计</span>
          <span class="ticker-sep">★</span>
          <span class="ticker-item">SAAS 架构</span>
        </div>
      </div>

      <!-- ===== 页脚 ===== -->
      <footer class="site-footer">
        <div class="footer-grid">
          <div class="footer-brand">
            <h3 class="font-serif">THE DAILY TASK</h3>
            <p class="font-body">任务管理报</p>
            <p class="font-mono footer-edition">Edition: Vol {{ vol }} | Printed 2026</p>
          </div>
          <div class="footer-links">
            <h4 class="font-mono">NAVIGATE</h4>
            <a href="#" class="font-sans" @click.prevent="$emit('navigate', 'dashboard')">首页</a>
            <a href="#" class="font-sans" @click.prevent="$emit('navigate', 'tasks')">任务版</a>
          </div>
          <div class="footer-links">
            <h4 class="font-mono">TECH STACK</h4>
            <span class="font-sans">Vue 3</span>
            <span class="font-sans">Express</span>
            <span class="font-sans">SQLite</span>
          </div>
        </div>
        <div class="footer-bottom font-mono">
          <span>&copy; 2026 THE DAILY TASK. All Rights Reserved.</span>
        </div>
      </footer>

    </main>
  `,
};
