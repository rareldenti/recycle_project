<template>
  <el-form @submit.prevent="register">
    <el-form-item label="用户名">
      <el-input v-model="username" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="password" />
    </el-form-item>
    <el-form-item label="类型">
      <el-select v-model="role" placeholder="Select role">
        <el-option label="用户" value="user" />
        <el-option label="管理员" value="admin" />
      </el-select>
    </el-form-item>
    <el-button type="primary" native-type="submit">注册</el-button>
  </el-form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: '',
      role: 'user'
    };
  },
  methods: {
    async register() {
      try {
        await axios.post('/users/register', {
          username: this.username,
          password: this.password,
          role: this.role
        });
        this.$router.push('/login');
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>
