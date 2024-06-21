<template>
    <div>
      <h2>User Management</h2>
      <el-table :data="users">
        <el-table-column prop="username" label="Username" />
        <el-table-column prop="email" label="Email" />
        <el-table-column prop="role" label="Role" />
        <el-table-column label="Actions">
          <template v-slot="scope">
            <el-button size="mini" @click="deleteUser(scope.row.id)">删除用户</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UserManagement',
    data() {
      return {
        users: []
      };
    },
    methods: {
      async fetchUsers() {
        const response = await axios.get('/users');
        this.users = response.data.users;
      },
      async deleteUser(userId) {
        await axios.delete(`/users/${userId}`);
        this.fetchUsers();
      }
    },
    created() {
      this.fetchUsers();
    }
  }
  </script>
  