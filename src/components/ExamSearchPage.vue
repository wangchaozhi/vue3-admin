<template>
  <div class="page-container">
    <!-- 输入框和按钮 -->
    <div class="input-section">
      <n-input
          v-model:value="searchQuery"
          placeholder="请输入查询内容"
          class="input"
      />
      <n-button @click="handleSearch" class="button">查询</n-button>
    </div>

    <!-- 表格部分 -->
    <n-data-table
        :columns="columns"
        :data="tableData"
        :pagination="pagination"
        :bordered="false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import { createMessage } from '@/utils/message'; // 导入封装好的消息方法
import {fetchUsers, searchTest} from '@/api'; // 假设你在 api/index.js 中封装了接口请求
// 使用 Naive UI 的消息系统
const message = createMessage(useMessage()); // 创建全局消息实例

// 查询输入框的内容
const searchQuery = ref(''); // 使用 ref 确保响应式绑定
// 表格列配置
const columns = [
  { title: 'ID', key: 'id' },
  { title: '问题内容', key: 'questionContent' },
  { title: '答案内容', key: 'answerContent' },
  { title: '答案代码', key: 'answerCode' },
];

// 表格数据
const tableData = ref([]); // 初始化为空数组

// 分页配置
const pagination = ref({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 50],
  onUpdatePage: handlePageChange,
});

// 处理分页变化
function handlePageChange(page) {
  pagination.value.page = page;
  handleSearch(); // 在分页变化时重新执行搜索
}

// 查询处理函数 (POST 请求)
async function handleSearch() {
  try {
    // 验证输入框内容是否为空
    if (!searchQuery.value.trim()) {
      message.error('查询内容不能为空'); // 显示错误提示
      return; // 阻止查询
    }
    const data = { query: searchQuery.value, page: pagination.value.page, pageSize: pagination.value.pageSize };

    const response = await fetchUsers(); // 发送 POST 请求

    if (response.code === 200) {
      tableData.value = response.data; // 解析数据到表格
    } else {
      message.error('请求失败: ' + response.msg); // 处理请求失败情况
    }
  } catch (error) {
    console.error('搜索请求失败:', error);
    message.error('搜索请求失败'); // 显示错误提示
  }
}
</script>

<style scoped>
/* 页面容器 */
.page-container {
  padding: 2rem;
}

/* 输入框和按钮的布局 */
.input-section {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  justify-content: flex-start;
}

/* 输入框样式 */
.input {
  flex: 1; /* 输入框占据剩余空间 */
}

/* 按钮样式 */
.button {
  white-space: nowrap; /* 防止按钮内容换行 */
}

/* 表格样式 */
.table {
  margin-top: 1rem;
}
</style>
