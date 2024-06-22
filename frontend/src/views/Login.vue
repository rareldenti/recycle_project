<template>
  <el-form @submit.prevent="handleLogin">
    <el-form-item label="用户名">
      <el-input v-model="username" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="password" />
    </el-form-item>
    <el-button type="primary" native-type="submit">登入</el-button>
  </el-form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      try {
        await this.login({ username: this.username, password: this.password });
        this.$router.push('/');
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  }
}
</script>
