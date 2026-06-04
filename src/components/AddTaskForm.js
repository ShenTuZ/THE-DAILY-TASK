// ========== AddTaskForm 组件 — 添加任务表单 ==========

export default {
  name: 'AddTaskForm',
  emits: ['add'],
  data() {
    return {
      text: '',
      priority: 'medium',
    };
  },
  methods: {
    handleSubmit() {
      const trimmed = this.text.trim();
      if (!trimmed) return;
      this.$emit('add', { text: trimmed, priority: this.priority });
      this.text = '';
    },
  },
  template: `
    <section class="add-task-section">
      <div class="section-header">
        <span class="section-label font-mono">NEW TASK</span>
        <h2 class="section-title font-serif">添加新任务</h2>
        <div class="section-rule"></div>
      </div>

      <form @submit.prevent="handleSubmit" class="add-task-form">
        <div class="form-row">
          <input
            v-model="text"
            type="text"
            class="form-input font-body"
            placeholder="输入任务内容..." />
          <select v-model="priority" class="form-select font-mono">
            <option value="high">HIGH 高</option>
            <option value="medium">MEDIUM 中</option>
            <option value="low">LOW 低</option>
          </select>
          <button type="submit" class="btn btn-primary font-sans">添加</button>
        </div>
      </form>
    </section>
  `,
};
