<template>
    <div>
      <h1>Login</h1>
      <el-form :model="loginForm" @submit.native.prevent="handleLogin">
        <el-form-item label="Email">
          <el-input v-model="loginForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">Login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    name: 'Login',
    data() {
      return {
        loginForm: {
          email: '',
          password: '',
        },
      };
    },
    methods: {
      ...mapActions(['login']),
      async handleLogin() {
        try {
          await this.login(this.loginForm);
          this.$router.push('/dashboard');
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  