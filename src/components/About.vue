<template>
  <n-data-table :columns="columns" :data="data" :pagination="pagination" />
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { get } from "@/api/index.js";

// 表格的列定义
const columns = [
  {title: 'ID', key: 'ID'},
  {title: '姓名', key: 'Name'},
  {title: '角色', key: 'Role'},
  {title: '邮箱', key: 'Email'},
  {title: '地址', key: 'Addr'},
];

// 创建响应式的分页对象
const pagination = reactive({
  page: 1,
  pageSize: 5,
  showSizePicker: true,
  pageSizes: [5, 10, 20],
  onChange: (page) => {
    pagination.page = page;
    fetchData();
  },
  onUpdatePageSize: (pageSize) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
    fetchData();
  }
});

// 当前页面的数据，使用 ref 来追踪
const data = ref([]);

// 向后端请求数据的函数
async function fetchData() {
  const { page, pageSize } = pagination;

  try {
    const response = await get('/users/all');
    const result = response.data;

    if (result && result.users) {
      data.value = result.users;  // 更新表格数据
      // pagination.total = result.total;  // 更新总条数
    }
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
}

// 组件加载时请求第一页数据
onMounted(() => {
  fetchData();
});
</script>
