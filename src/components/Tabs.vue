<template>
  <div class="tabs-container">
    <n-tabs type="card" v-model:value="activeTab" closable @close="handleClose"  @update:value="handleTabChange">
      <n-tab-pane v-for="tab in tabs" :key="tab.key" :name="tab.key" :tab="tab.label"/>
    </n-tabs>
  </div>
</template>


<script setup>
import { useTabs } from '@/composables/useTabs';
import { useRouter } from 'vue-router';

const router = useRouter();
const { activeTab, tabs, closeTab } = useTabs();

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
