<template>
  <div>
    <h1>欢迎!</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
.el-menu-vertical-demo {
  width: 200px;
  min-height: 400px;
}
</style>
