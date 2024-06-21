<template>
  <div id="app">
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1"><router-link to="/">主页</router-link></el-menu-item>
        <el-menu-item index="2" v-if="!isAuthenticated"><router-link to="/login">登入</router-link></el-menu-item>
        <el-menu-item index="3" v-if="!isAuthenticated"><router-link to="/register">注册</router-link></el-menu-item>
        <el-menu-item index="4" v-if="isAuthenticated"><router-link to="/dashboard">面板</router-link></el-menu-item>
        <el-menu-item index="5" v-if="isAuthenticated"><router-link to="/orders">订单</router-link></el-menu-item>
        <el-menu-item index="6" v-if="isAuthenticated" @click="logout">登出</el-menu-item>
        <el-menu-item index="7" v-if="isAuthenticated" disabled>欢迎, {{ user.username }}</el-menu-item>
      </el-menu>
    </el-header>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      activeIndex: '1'
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'user'])
  },
  methods: {
    ...mapActions(['logout']),
    handleSelect(key, keyPath) {
      this.activeIndex = key;
    }
  }
}
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-menu {
  border-bottom: none;
}
.el-menu-item {
  margin-right: 10px;
}
</style>
