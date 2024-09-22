<template>
  <div class="app">
      <n-spin :show="loading" size="medium" class="centered-spin">
    <!-- 顶部导航栏 -->
    <Navbar @toggle-sidebar="toggleSidebar" />

    <!-- 主体内容 -->
    <div id="main-6" class="main" ref="watermarkContainer">
      <!-- 侧边栏，通过 Vuex 状态控制显示 -->
      <Sidebar v-if="sidebarVisible" />

        <!-- 右侧内容区域 -->
        <Content />
    </div>
      </n-spin>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import { useWatermark } from '@/utils/useWatermark'; // 假设水印逻辑在 useWatermark.js 中
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';
import Content from '@/components/Content.vue';
import Tabs from "@/components/Tabs.vue";

import { useRouter } from 'vue-router';

const router = useRouter();

// 读取环境变量
const enableWatermark = import.meta.env.VITE_ENABLE_WATERMARK === 'true'; // 确保布尔值

const store = useStore();
const watermarkContainer = ref(null); // 引用水印容器
const loading = ref(false);

// 计算属性 sidebarVisible 依赖于 Vuex 状态
const sidebarVisible = computed(() => store.state.sidebarVisible);

// 切换侧边栏显示状态
function toggleSidebar() {
  store.dispatch('toggleSidebar');
}

// 使用水印功能
const { setWatermark, clearWatermark } = useWatermark(watermarkContainer);

// 页面加载时，初始化侧边栏状态并设置水印（如果环境变量允许）
onMounted(() => {
  store.dispatch('initializeSidebar');

  if (enableWatermark) {
    setWatermark('Vue3-Admin', { color: '#ccc', size: 20, angle: -30 });
  }
});

// 组件销毁时清除水印（如果有设置水印）
onBeforeUnmount(() => {
  if (enableWatermark) {
    clearWatermark();
  }
});


const loadingBar = useLoadingBar();


  router.beforeEach((to, from, next) => {
    loading.value = true;
    loadingBar.start(); // 开始加载条
    next(); // 继续导航
  });

  router.afterEach(() => {
    loading.value = false;
    loadingBar.finish(); // 结束加载条
  });

onMounted(() => {
let elementById = document.getElementById('main-6');
console.log(elementById);

});
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 98vh; /* 视口高度 */
}

.main {
  display: flex;
  flex: 1; /* 占据剩余的高度 */
  position: relative; /* 保证水印的定位相对该容器 */
}

.centered-spin {
  justify-content: center;
  align-items: center;
}

</style>
