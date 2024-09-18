// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import store from "@/store";
import {RouteRecordRaw} from 'vue-router';

import About from "../components/About.vue";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import MainLayout from '@/components/MainLayout.vue';
import ExamSearchPage from "@/components/ExamSearchPage.vue";
import EmptyRouterView from'@/components/EmptyRouterView.vue'
import Profile from'@/components/navbar/Profile.vue'
import ChangePassWord from'@/components/navbar/ChangePassWord.vue'
import TableList from "@/components/TableList.vue";
import TableListT from "@/components/TableListT.vue";
import WebSocket from "@/components/WebSocket.vue";
import Excel from "@/components/Excel.vue";
import AHtmlIframe from "@/components/iframePages/AHtmlIframe.vue";
import Port6971Page from "@/components/iframePages/Filebrowser.vue";
import XUIPage from "@/components/iframePages/XUIPage.vue";

const routes: RouteRecordRaw[] = [
    { path: '/', component: Login },  // 登录页面作为首页
    {
        path: '/main',
        component: MainLayout, // 使用 MainLayout 作为布局
        children: [
            { path: 'home', component: Home },  // 子路径 'home'
            { path: 'about', component: About },
            { path: 'profile', component: Profile },
            { path: 'change-password', component: ChangePassWord },
            {
                path: 'list',
                component:EmptyRouterView, // 或者使用重定向
                children: [
                    { path: 'sub1', component: TableList }, // 子菜单项 'sub-list-1'
                    { path: 'sub2', component: Login } // 子菜单项 'sub-list-2'
                ]
            },
            { path: 'list2', component: TableListT },
            { path: 'websocket', component: WebSocket },
            { path: 'excel', component: Excel },
            { path: 'examSearchPage', component: ExamSearchPage },
            { path: 'a-html', component: AHtmlIframe, meta: { requiresAuth: true } },  // 通过 iframe 嵌入 a.html
            { path: 'port-6971', component: Port6971Page, meta: { requiresAuth: true } }, // 端口 6971 页面
            { path: 'x-ui', component: XUIPage, meta: { requiresAuth: true } },
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

