// ========== TaskRow 组件 — 单个任务行 ==========

export default {
  name: 'TaskRow',
  props: {
    task: Object,
  },
  emits: ['toggle', 'delete'],
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return '';
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const hours = String(d.getHours()).padStart(2, '0');
      const mins = String(d.getMinutes()).padStart(2, '0');
      return month + '/' + day + ' ' + hours + ':' + mins;
    },
  },
  template: `
    <div class="task-row" :class="{ done: task.done }">
      <!-- 状态勾选 -->
      <div class="task-status" @click="$emit('toggle', task)">
        <div class="checkbox" :class="{ checked: task.done }">
          <span v-if="task.done">✓</span>
        </div>
      </div>

      <!-- 任务内容 -->
      <div class="task-text font-body">{{ task.text }}</div>

      <!-- 优先级标签 -->
      <div class="task-priority">
        <span class="priority-badge font-mono" :class="'priority-' + task.priority">
          {{ task.priority.toUpperCase() }}
        </span>
      </div>

      <!-- 创建时间 -->
      <div class="task-date font-mono">{{ formatDate(task.createdAt) }}</div>

      <!-- 删除按钮 -->
      <div class="task-action">
        <button class="btn-delete" @click="$emit('delete', task.id)" aria-label="删除任务">
          <i data-lucide="x" class="icon-sm"></i>
        </button>
      </div>
    </div>
  `,
};
