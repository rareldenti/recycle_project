import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as Icons from '@element-plus/icons-vue';

const app = createApp(App);

for (const [key, component] of Object.entries(Icons)) {
  app.component(key, component);
}

app.use(ElementPlus);
app.mount('#app');
