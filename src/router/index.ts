// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import store from "@/store";
import {RouteRecordRaw} from 'vue-router';

import About from "../components/About.vue";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import MainLayout from '@/components/MainLayout.vue';
import ExamSearchPage from "@/components/ExamSearchPage.vue";
import TableList from "@/components/TableList.vue";
import TableListT from "@/components/TableListT.vue";
import WebSocket from "@/components/WebSocket.vue";
import Excel from "@/components/Excel.vue";

const routes: RouteRecordRaw[] = [
    { path: '/', component: Login },  // 登录页面作为首页
    {
        path: '/main',
        component: MainLayout, // 使用 MainLayout 作为布局
        children: [
            { path: 'home', component: Home },  // 子路径 'home'
            { path: 'about', component: About },
            { path: 'list', component: TableList },
            { path: 'list2', component: TableListT },
            { path: 'websocket', component: WebSocket },
            { path: 'excel', component: Excel },
            { path: 'examSearchPage', component: ExamSearchPage },
        ],
        meta: { requiresAuth: true }  // 需要登录的页面
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// 全局导航守卫
router.beforeEach((to, _, next) => {
    const isAuthenticated = store.state.isAuthenticated;  // 检查登录状态

    // 检查路由是否需要认证
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            // 未登录，重定向到登录页面
            next({ path: '/' });
        } else {
            next(); // 已登录，继续导航
        }
    } else {
        next(); // 路由不需要认证，直接访问
    }
});

export default router;

