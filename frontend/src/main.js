import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import axios from 'axios';
import * as Icons from '@element-plus/icons-vue';

axios.defaults.baseURL = 'http://rareldenti.top:5000/api'; // 确保 baseURL 配置正确
axios.interceptors.request.use(config => {
  const token = store.state.token;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // 确保带上 Bearer 前缀
  }
  return config;
}, error => {
  return Promise.reject(error);
});

const app = createApp(App);

for (const [key, component] of Object.entries(Icons)) {
  app.component(key, component);
}

app.use(router);
app.use(store);
app.use(ElementPlus);
app.mount('#app');
