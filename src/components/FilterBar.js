// ========== FilterBar 组件 — 筛选栏 ==========

export default {
  name: 'FilterBar',
  props: {
    current: String,
  },
  emits: ['change'],
  template: `
    <section class="filter-section">
      <span class="filter-label font-mono">FILTER:</span>
      <button
        class="filter-btn font-sans"
        :class="{ active: current === 'all' }"
        @click="$emit('change', 'all')">
        全部
      </button>
      <button
        class="filter-btn font-sans"
        :class="{ active: current === 'pending' }"
        @click="$emit('change', 'pending')">
        待完成
      </button>
      <button
        class="filter-btn font-sans"
        :class="{ active: current === 'done' }"
        @click="$emit('change', 'done')">
        已完成
      </button>
    </section>
  `,
};
