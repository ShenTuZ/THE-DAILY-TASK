// ========== TaskBoard 组件 — 任务列表面板 ==========

import TaskRow from './TaskRow.js';

export default {
  name: 'TaskBoard',
  components: {
    TaskRow,
  },
  props: {
    tasks: Array,
    filter: String,
    username: String,
    vol: String,
  },
  emits: ['toggle', 'delete'],
  computed: {
    displayCount() {
      return this.tasks.length;
    },
    filterLabel() {
      const labels = { all: 'ALL', pending: 'PENDING', done: 'DONE' };
      return labels[this.filter] || 'ALL';
    },
  },
  template: `
    <section class="task-board">
      <!-- 表头 -->
      <div class="board-header">
        <span class="board-col font-mono">STATUS</span>
        <span class="board-col font-mono">TASK</span>
        <span class="board-col font-mono">PRIORITY</span>
        <span class="board-col font-mono">DATE</span>
        <span class="board-col font-mono">ACTION</span>
      </div>

      <!-- 空状态 -->
      <div v-if="tasks.length === 0" class="empty-state">
        <p class="font-serif">
          {{ filter === 'all' ? '暂无任务，添加一个吧！' : '该筛选条件下没有任务' }}
        </p>
      </div>

      <!-- 任务行 -->
      <task-row
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle="$emit('toggle', $event)"
        @delete="$emit('delete', $event)" />

      <!-- 底部信息 -->
      <section class="task-footer">
        <div class="footer-ornament font-serif">✦ ✦ ✦</div>
        <p class="font-mono task-footer-text">
          EDITION: Vol {{ vol }} | {{ displayCount }} TASKS DISPLAYED | FILTER: {{ filterLabel }} | USER: {{ username.toUpperCase() }}
        </p>
      </section>
    </section>
  `,
};
