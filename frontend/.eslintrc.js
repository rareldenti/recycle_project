module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      'plugin:vue/vue3-essential',
      'eslint:recommended',
    ],
    parserOptions: {
      parser: 'babel-eslint',
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'no-unused-vars': 'warn', // 将未使用变量的错误改为警告
    },
  };
  