import { createStore } from 'vuex';
import { getSidebarVisible, setSidebarVisible } from '@/utils/localStorageHelper'; // localStorage 操作可封装

export default createStore({
    state: {
        sidebarVisible: getSidebarVisible(),
        isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false, // 从 localStorage 恢复登录状态
    },
    mutations: {
        toggleSidebar(state) {
            state.sidebarVisible = !state.sidebarVisible;
            setSidebarVisible(state.sidebarVisible);
        },
        setSidebarVisible(state, isVisible) {
            state.sidebarVisible = isVisible;
            setSidebarVisible(state.sidebarVisible);
        },
        setAuthentication(state, status) {
            state.isAuthenticated = status; // 设置登录状态
            localStorage.setItem('isAuthenticated', JSON.stringify(status)); // 持久化登录状态
        }
    },
    actions: {
        toggleSidebar({ commit }) {
            commit('toggleSidebar');
        },
        initializeSidebar({ commit }) {
            const savedState = getSidebarVisible();
            commit('setSidebarVisible', savedState);
        },
        login({ commit }) {
            commit('setAuthentication', true); // 登录时设置为已认证
        },
        logout({ commit }) {
            commit('setAuthentication', false); // 注销时设置为未认证
            localStorage.removeItem('isAuthenticated'); // 注销时移除登录状态
        }
    }
});
