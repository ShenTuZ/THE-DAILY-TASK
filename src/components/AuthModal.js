// ========== AuthModal 组件 — 登录/注册弹窗 ==========

export default {
  name: 'AuthModal',
  props: {
    show: Boolean,
    loading: Boolean,
    error: String,
  },
  emits: ['close', 'submit'],
  data() {
    return {
      mode: 'login',       // 'login' 或 'register'
      form: {
        username: '',
        password: '',
      },
    };
  },
  computed: {
    title() {
      return this.mode === 'login' ? '用户登录' : '新用户注册';
    },
    submitText() {
      if (this.loading) return '处理中...';
      return this.mode === 'login' ? '登 录' : '注 册';
    },
  },
  methods: {
    switchTab(mode) {
      this.mode = mode;
      this.$emit('submit', { clearError: true });
    },
    handleSubmit() {
      this.$emit('submit', {
        mode: this.mode,
        username: this.form.username,
        password: this.form.password,
      });
    },
    close() {
      this.form = { username: '', password: '' };
      this.$emit('close');
    },
  },
  template: `
    <div v-if="show" class="modal-overlay" @click.self="close">
      <div class="modal">
        <!-- 弹窗头部 -->
        <div class="modal-header">
          <h2 class="font-serif">{{ title }}</h2>
          <button class="modal-close" @click="close" aria-label="关闭">&times;</button>
        </div>

        <!-- 登录/注册切换标签 -->
        <div class="auth-tabs">
          <button
            class="auth-tab font-sans"
            :class="{ active: mode === 'login' }"
            @click="switchTab('login')">
            登录
          </button>
          <button
            class="auth-tab font-sans"
            :class="{ active: mode === 'register' }"
            @click="switchTab('register')">
            注册
          </button>
        </div>

        <!-- 表单 -->
        <form @submit.prevent="handleSubmit" class="auth-form">
          <div class="form-group">
            <label class="form-label font-mono">USERNAME</label>
            <input
              v-model="form.username"
              type="text"
              class="form-input font-mono"
              placeholder="输入用户名"
              autocomplete="username" />
          </div>
          <div class="form-group">
            <label class="form-label font-mono">PASSWORD</label>
            <input
              v-model="form.password"
              type="password"
              class="form-input font-mono"
              placeholder="输入密码"
              autocomplete="current-password" />
          </div>
          <p v-if="error" class="auth-error font-sans">{{ error }}</p>
          <button type="submit" class="btn btn-primary btn-block font-sans" :disabled="loading">
            {{ submitText }}
          </button>
        </form>
      </div>
    </div>
  `,
};
