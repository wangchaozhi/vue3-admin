import { ref } from 'vue';

const activeTab = ref('home');
const tabs = ref([
    // { label: '主页', key: 'home', to: '/main/home' },
]);

export function useTabs() {
    const addTab = (tabInfo) => {
        const existingTab = tabs.value.find(tab => tab.key === tabInfo.key);
        if (!existingTab) {
            tabs.value.push(tabInfo);
        }
        activeTab.value = tabInfo.key;
    };

    const removeTab = (key) => {
        console.log(key)
        tabs.value = tabs.value.filter(tab => tab.key !== key);
    };

    const closeTab = (key) => {
        removeTab(key);
        if (activeTab.value === key && tabs.value.length > 0) {
            activeTab.value = tabs.value[tabs.value.length - 1].key;
        }
    };

    return {
        activeTab,
        tabs,
        addTab,
        removeTab,
        closeTab,
    };
}
