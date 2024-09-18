<template>
  <n-config-provider :theme="theme">
    <n-global-style />
    <n-message-provider>
      <router-view/> <!-- 渲染路由页面 -->
    </n-message-provider>
  </n-config-provider>

</template>

<script setup>
// 这里通常不需要复杂逻辑，App.vue 是根组件
import {lightTheme, darkTheme} from 'naive-ui';
import {computed} from 'vue';
import {useStore} from 'vuex';

const store = useStore();

// 计算当前使用的主题
const theme = computed(() => (store.state.isDarkTheme ? darkTheme : lightTheme));

</script>

<style>


</style>
