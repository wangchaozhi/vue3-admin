<template>
  <div class="tabs-container">
    <n-tabs v-show="tabs.length > 0" type="card" v-model:value="activeTab" closable @close="handleClose"  @update:value="handleTabChange">
      <n-tab-pane v-for="tab in tabs" :key="tab.key" :name="tab.key" :tab="tab.label"/>
    </n-tabs>
    <!-- 右键菜单 -->
    <n-dropdown
        :show="contextMenuVisible"
        :options="contextMenuOptions"
        trigger="click"
        :x="contextMenuPosition.x"
        :y="contextMenuPosition.y"
        @select="handleContextMenuSelect"
        @mouseleave="hideContextMenu"
    />
  </div>
</template>


<script setup>
import { useTabs } from '@/composables/useTabs';
import { useRouter } from 'vue-router';

const router = useRouter();
const { activeTab, tabs, closeTab } = useTabs();

const contextMenuVisible = ref(false);
const contextMenuPosition = ref({ x: 0, y: 0 });
const currentTab = ref(null);

// 右键菜单选项
const contextMenuOptions = [
  { label: '刷新页面', key: 'refresh' },
  { label: '关闭全部', key: 'closeAll' },
  { label: '关闭左侧', key: 'closeLeft' },
  { label: '关闭右侧', key: 'closeRight' }
];

// 处理关闭标签页的逻辑
function handleClose(key) {
  closeTab(key);
}

// 处理标签页切换的逻辑
function handleTabChange(key) {
  const tab = tabs.value.find(tab => tab.key === key);
  if (tab) {
    router.push(tab.to); // 切换路由
  }
}
// 处理右键点击事件，显示自定义菜单
function handleContextMenu(event, tab) {
  console.log(event,tab)
  event.preventDefault();
  contextMenuPosition.value = { x: event.clientX, y: event.clientY };
  currentTab.value = tab;
  contextMenuVisible.value = true;
}

// 隐藏右键菜单
function hideContextMenu() {
  contextMenuVisible.value = false;
}

// 处理右键菜单选项选择
function handleContextMenuSelect(key) {
  contextMenuVisible.value = false;
  const tabIndex = tabs.value.findIndex(tab => tab.key === currentTab.value.key);

  switch (key) {
    case 'refresh':
      // 刷新页面时同步更新 activeTab
      activeTab.value = currentTab.value.key;
      router.push(currentTab.value.to); // 刷新页面
      break;
    case 'closeAll':
      tabs.value = []; // 关闭全部
      break;
    case 'closeLeft':
      tabs.value = tabs.value.slice(tabIndex); // 关闭左侧
      break;
    case 'closeRight':
      tabs.value = tabs.value.slice(0, tabIndex + 1); // 关闭右侧
      break;
  }
}



// 使用 MutationObserver 来监听 DOM 变化
let observer;
onMounted(() => {

  const tabContainer = document.querySelector('.n-tabs-wrapper');

  // 先为已经存在的 tab 绑定事件
  const tabWrappers = document.querySelectorAll('.n-tabs-tab-wrapper');
  tabWrappers.forEach((tabWrapper) => {
    const tab = tabs.value.find(t => t.key === tabWrapper.querySelector('.n-tabs-tab').dataset.name);
    tabWrapper.addEventListener('contextmenu', (event) => handleContextMenu(event, tab));
  });
  // const tabContainer = document.querySelector('.n-tabs-wrapper');
  if (tabContainer) {
    observer = new MutationObserver(() => {
      const tabWrappers = document.querySelectorAll('.n-tabs-tab-wrapper');
      tabWrappers.forEach((tabWrapper) => {
        const tab = tabs.value.find(t => t.key === tabWrapper.querySelector('.n-tabs-tab').dataset.name);
        console.log(tab)
        tabWrapper.addEventListener('contextmenu', (event) => handleContextMenu(event, tab));
      });
    });

    observer.observe(tabContainer, { childList: true, subtree: true });
  }
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect(); // 停止观察 DOM 变化
  }
});

</script>

<style scoped>
.tabs-container {
  width: 100%;
}
.n-tab-pane {
  display: none;
}


:deep(.n-tabs-tab) {
  padding: 0.5rem 1rem; /* 调整标签的内边距 */
}
:deep(.n-tabs-tab__close) {
  font-size: 1.5rem; /* 关闭按钮的字体大小 */
}
:deep(.n-tabs-tab__label) {
  font-size: 1.2rem; /* 调整标签文本的字体大小 */
}

</style>
