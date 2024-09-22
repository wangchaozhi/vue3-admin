import { createApp } from 'vue'
import App from './App.vue'
// import naive from 'naive-ui';
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'
import router from "./router";
import store from './store'; // 引入 Vuex Store
import './style.css' // 导入全局样式文件


const app = createApp(App)
// app.use(naive)
app.use(store);
app.use(router);
app.mount('#app')



