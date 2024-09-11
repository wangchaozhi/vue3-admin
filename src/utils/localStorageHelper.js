// localStorageHelper.js

const SIDEBAR_KEY = 'sidebarVisible';

// 获取侧边栏状态
export function getSidebarVisible() {
    const savedState = localStorage.getItem(SIDEBAR_KEY);
    return savedState !== null ? JSON.parse(savedState) : false;
}

// 保存侧边栏状态
export function setSidebarVisible(isVisible) {
    localStorage.setItem(SIDEBAR_KEY, JSON.stringify(isVisible));
}
