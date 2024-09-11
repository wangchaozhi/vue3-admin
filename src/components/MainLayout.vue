<template>
  <div class="app">
    <!-- 顶部导航栏 -->
    <Navbar @toggle-sidebar="toggleSidebar" />

    <!-- 主体内容 -->
    <div class="main">
      <!-- 侧边栏，通过 Vuex 状态控制显示 -->
      <Sidebar v-if="sidebarVisible" />

      <!-- 右侧内容区域 -->
      <Content />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';
import Content from '@/components/Content.vue';

const store = useStore();

// 计算属性 sidebarVisible 依赖于 Vuex 状态
const sidebarVisible = computed(() => store.state.sidebarVisible);


// 切换侧边栏显示状态
function toggleSidebar() {
  store.dispatch('toggleSidebar');
}

// 页面加载时，初始化侧边栏状态
onMounted(() => {
  store.dispatch('initializeSidebar');
});
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 视口高度 */
}

.main {
  display: flex;
  flex: 1; /* 占据剩余的高度 */
}
</style>
