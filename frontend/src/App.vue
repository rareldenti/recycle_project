<template>
  <div id="app">
    <el-menu :default-active="$route.path" router>
      <el-menu-item index="/">Home</el-menu-item>
      <el-menu-item index="/login">Login</el-menu-item>
      <el-menu-item index="/register">Register</el-menu-item>
      <el-menu-item index="/dashboard">Dashboard</el-menu-item>
    </el-menu>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
