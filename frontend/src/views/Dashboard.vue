<template>
    <div>
      <h1>Dashboard</h1>
      <el-menu :default-active="activeMenu" router>
        <el-menu-item index="/recycling-info">Recycling Info</el-menu-item>
        <el-menu-item index="/orders">Orders</el-menu-item>
        <el-menu-item index="/categories">Categories</el-menu-item>
      </el-menu>
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Dashboard',
    computed: {
      activeMenu() {
        return this.$route.path;
      },
    },
  };
  </script>
  