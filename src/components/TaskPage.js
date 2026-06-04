// ========== TaskPage 组件 — 任务版页面 ==========

import StatsBar from './StatsBar.js';
import AddTaskForm from './AddTaskForm.js';
import FilterBar from './FilterBar.js';
import TaskBoard from './TaskBoard.js';

export default {
  name: 'TaskPage',
  components: {
    StatsBar,
    AddTaskForm,
    FilterBar,
    TaskBoard,
  },
  props: {
    user: Object,
    tasks: Array,
    stats: Object,
    filter: String,
    vol: String,
  },
  emits: ['show-auth', 'add', 'toggle', 'delete', 'filter'],
  computed: {
    filteredTasks() {
      if (this.filter === 'pending') return this.tasks.filter(t => !t.done);
      if (this.filter === 'done') return this.tasks.filter(t => t.done);
      return this.tasks;
    },
  },
  template: `
    <main class="main-content">

      <!-- 未登录状态 -->
      <section v-if="!user" class="auth-guard newsprint-texture">
        <div class="guard-content">
          <h2 class="font-serif">请先登录</h2>
          <p class="font-body">登录后即可管理你的专属任务列表</p>
          <button class="btn btn-primary font-sans" @click="$emit('show-auth')">登录 / 注册</button>
        </div>
      </section>

      <!-- 已登录：任务管理 -->
      <template v-else>
        <stats-bar :stats="stats" />
        <add-task-form @add="$emit('add', $event)" />
        <filter-bar :current="filter" @change="$emit('filter', $event)" />
        <task-board
          :tasks="filteredTasks"
          :filter="filter"
          :username="user.username"
          :vol="vol"
          @toggle="$emit('toggle', $event)"
          @delete="$emit('delete', $event)" />
      </template>

    </main>
  `,
};
