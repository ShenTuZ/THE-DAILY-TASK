// ========== StatsBar 组件 — 统计数据栏 ==========

export default {
  name: 'StatsBar',
  props: {
    stats: Object,
  },
  template: `
    <section class="stats-bar">
      <div class="stat-block">
        <span class="stat-number font-mono">{{ stats.total }}</span>
        <span class="stat-desc font-mono">TOTAL</span>
      </div>
      <div class="stat-block">
        <span class="stat-number font-mono accent">{{ stats.pending }}</span>
        <span class="stat-desc font-mono">PENDING</span>
      </div>
      <div class="stat-block">
        <span class="stat-number font-mono">{{ stats.done }}</span>
        <span class="stat-desc font-mono">DONE</span>
      </div>
      <div class="stat-block">
        <span class="stat-number font-mono">{{ stats.progress }}%</span>
        <span class="stat-desc font-mono">PROGRESS</span>
      </div>
    </section>
  `,
};
