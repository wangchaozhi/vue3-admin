<template>
  <div class="sidebar">
    <!-- 侧边栏的内容放置在这里 -->
    <n-menu :options="menuOptions" :theme="theme"  v-model:value="selectedKey" @update:value="handleMenuSelect" />
  </div>
</template>

<script setup>
import { ref, watch, h } from 'vue'; // 导入 h 函数
import { useRouter, useRoute } from 'vue-router';
import { NMenu } from 'naive-ui';
import { HomeOutline, InformationCircleOutline, ListOutline, DocumentOutline, CloudOutline, SearchOutline } from '@vicons/ionicons5'; // 导入图标

const router = useRouter();
const route = useRoute();
const selectedKey = ref(null);

// 菜单项定义
const menuOptions = [
  { label: '主页', key: 'home', to: '/main/home', icon: () => h(HomeOutline) },
  { label: '关于', key: 'about', to: '/main/about', icon: () => h(InformationCircleOutline) },
  {
    label: '列表',
    key: 'list',
    icon: () => h(ListOutline),
    children: [ // 添加子菜单项
      { label: '子菜单 1', key: 'sub-list-1', to: '/main/list/sub1' },
      { label: '子菜单 2', key: 'sub-list-2', to: '/main/list/sub2' }
    ]
  },
  { label: '表单', key: 'list2', to: '/main/list2', icon: () => h(DocumentOutline) },
  { label: 'websocket', key: 'websocket', to: '/main/websocket', icon: () => h(CloudOutline) },
  { label: 'excel', key: 'excel', to: '/main/excel', icon: () => h(DocumentOutline) },
  { label: '搜索', key: 'ExamSearchPage', to: '/main/examSearchPage', icon: () => h(SearchOutline) },
  // { label: '访问 aria2', key: 'aria2', to: '/aria2.html', icon: () => h(DocumentOutline), external: true },
  { label: 'A 页面', key: 'a-html', to: '/main/a-html', icon: () => h(DocumentOutline) },  // A 页
  { label: 'FileBrowser', key: 'fileBrowser', to: '/main/fileBrowser', icon: () => h(DocumentOutline) },
  { label: 'x-ui', key: 'x-ui', to: '/main/x-ui', icon: () => h(DocumentOutline) },
];

// 根据路由路径设置选中的菜单项
function setSelectedMenuKey(path) {
  const menuItem = menuOptions.find((item) => item.to === path);
  if (menuItem) {
    selectedKey.value = menuItem.key;
  }
}

// 监听路由变化，更新选中的菜单项
watch(
    () => route.path,
    (newPath) => {
      setSelectedMenuKey(newPath);
    },
    { immediate: true } // 在初次加载时也要执行
);

// 处理菜单选择
// function handleMenuSelect(key, item) {
//   if (item.to) {
//     router.push(item.to);
//   }
//   selectedKey.value = key;
// }

function handleMenuSelect(key, item) {
  if (item.external) {
    // 如果是外部链接，使用 window.location.href 进行跳转
    window.location.href = item.to;
  } else {
    // 如果是内部 Vue 路由，使用 router.push
    router.push(item.to);
  }
  selectedKey.value = key;
}


// 页面加载时初始化菜单状态
setSelectedMenuKey(route.path);
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 0.8rem;
}

:deep(.n-menu-item-content) {
  display: flex;
  align-items: center;
  padding-left: 2rem!important;
}
:deep( .n-submenu-children ) {
  padding-left: 2rem!important; /* 增加子菜单的左侧内边距 */
}

:deep(svg) {
  width: 1.5rem; /* 图标的宽度 */
  height: 1.5rem; /* 图标的高度 */

}

:deep(.n-menu-item-content-header) {
  font-size: 1.2rem;
}

:deep(.n-menu-item) {
  height: 4rem;
}

:deep(.n-menu-item-content__icon) {
  margin-right: 0.3rem !important; /* 使用 !important 来覆盖内联样式 */
}

</style>
