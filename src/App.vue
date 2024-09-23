<template>
  <n-loading-bar-provider  :loading-bar-style="{  }">
    <n-dialog-provider>
    <n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
      <n-global-style/>
      <n-message-provider>
        <router-view/> <!-- 渲染路由页面 -->
      </n-message-provider>
    </n-config-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>

<script setup>
// 这里通常不需要复杂逻辑，App.vue 是根组件
import {lightTheme, darkTheme} from 'naive-ui';
import {computed, onMounted} from 'vue';
import {useStore} from 'vuex';
import { zhCN, dateZhCN } from 'naive-ui'

const store = useStore();

// 计算当前使用的主题
const theme = computed(() => (store.state.isDarkTheme ? darkTheme : lightTheme));



// // 融合 DOM 操作，确保子组件和父组件都加载完后获取 DOM 元素
// onMounted(async () => {
//   await nextTick(); // 等待整个 DOM 结构完全渲染
//   const elementById = document.getElementById('main-6');
//   console.log('Element by ID after nextTick:', elementById);
//   console.log('Ref to watermarkContainer:', watermarkContainer.value);  // 获取 ref 绑定的 DOM 元素
// });

</script>

<style>


</style>
