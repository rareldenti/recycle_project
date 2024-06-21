<template>
    <div>
      <h2>面版</h2>
      <el-button @click="logout">登出</el-button>
      <div v-if="isAuthenticated">
        <p>欢迎, {{ user.username }} ({{ user.role }})</p>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    name: 'Dashboard',
    computed: {
      ...mapGetters(['isAuthenticated', 'user'])
    },
    methods: {
      ...mapActions(['fetchUser', 'logout'])
    },
    created() {
      this.fetchUser();
    }
  }
  </script>
  