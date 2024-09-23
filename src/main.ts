import { createApp } from 'vue'
import App from './App.vue'
// import naive from 'naive-ui';
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'
import router from "./router";
import store from './store'; // 引入 Vuex Store
import './style.css'
import VueECharts from "vue-echarts";

import throttle from  '@/utils/throttle'


const app = createApp(App)
// app.use(naive)
// 全局注册
app.use(store);
app.use(router);
app.component('vue-echarts', VueECharts);
// 全局注册节流指令
app.directive('throttle',throttle.bind)

app.mount('#app')



