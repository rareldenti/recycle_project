<template>
    <div>
      <h1>Register</h1>
      <el-form :model="registerForm" @submit.prevent="handleRegister">
        <el-form-item label="Username">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input type="password" v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="Role">
          <el-select v-model="registerForm.role">
            <el-option label="User" value="user"></el-option>
            <el-option label="Admin" value="admin"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleRegister">Register</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    name: 'Register',
    data() {
      return {
        registerForm: {
          username: '',
          email: '',
          password: '',
          role: 'user',
        },
      };
    },
    methods: {
      ...mapActions(['register']),
      async handleRegister() {
        try {
          await this.register(this.registerForm);
          this.$router.push('/login');
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  