import { createStore } from 'vuex';
import { getSidebarVisible, setSidebarVisible } from '@/utils/localStorageHelper'; // localStorage 操作可封装

export default createStore({
    state: {
        sidebarVisible: getSidebarVisible(),
        user: null,
        isAuthenticated: !!localStorage.getItem('authToken'), // 判断是否已登录
        isDarkTheme: JSON.parse(localStorage.getItem('isDarkTheme')) || false,

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
        setUser(state, user) {
            state.user = user;
            state.isAuthenticated = true;
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('authToken'); // 删除 token
        },
        toggleTheme(state) {
            state.isDarkTheme = !state.isDarkTheme;
            localStorage.setItem('isDarkTheme', JSON.stringify(state.isDarkTheme));
        },
    },
    actions: {
        toggleSidebar({ commit }) {
            commit('toggleSidebar');
        },
        initializeSidebar({ commit }) {
            const savedState = getSidebarVisible();
            commit('setSidebarVisible', savedState);
        },
        login({ commit }, { user }) {
            commit('setUser', user);
        },
        logout({ commit }) {
            commit('logout');
        },
        toggleTheme({ commit }) {
            commit('toggleTheme');
        },
    }
});
