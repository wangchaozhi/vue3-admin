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
    <!-- 解析后的问题展示 -->
      <div v-if="parsedQuestions.length" v-for="(question, index) in parsedQuestions" :key="index">
        <n-card>
          <!-- 问题标题 -->
          <template #header>
            <span>{{ question.question }}</span>
          </template>

          <!-- 正确答案提示 -->
          <p>正确答案: {{ question.correctAnswer.join(', ') }}</p>

          <!-- 展开/折叠按钮 -->
          <n-button @click="toggleExpand(index)">
            {{ question.expanded ? '收起选项' : '展开选项' }}
          </n-button>

          <!-- 选项列表，初始时不展开，点击后展开 -->
          <n-list v-if="question.expanded">
            <n-list-item v-for="option in question.options" :key="option.code">
              <n-checkbox :checked="isChecked(option.code, question.correctAnswer)" disabled>
                {{ option.code }}: {{ option.content }}
              </n-checkbox>
            </n-list-item>
          </n-list>
        </n-card>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import { createMessage } from '@/utils/message'; // 导入封装好的消息方法
import { post } from '@/api'; // 假设你在 api/index.js 中封装了接口请求

// 使用 Naive UI 的消息系统
const message = createMessage(useMessage()); // 创建全局消息实例

// 查询输入框的内容
const searchQuery = ref(''); // 使用 ref 确保响应式绑定

// 解析问题数据
const parsedQuestions = ref([]);

// 查询处理函数 (POST 请求)
async function handleSearch() {
  try {
    // 验证输入框内容是否为空
    if (!searchQuery.value.trim()) {
      message.error('查询内容不能为空'); // 显示错误提示
      return; // 阻止查询
    }
    const data = { query: searchQuery.value };
    const response = await post('/answerSearch', data); // 假设这是 API 请求
    if (response.code === 200 && response.data.questions) {
      // 解析每个问题字符串为对象，并移除转义字符
      parsedQuestions.value = response.data.questions.map((q) => {
        // 首先去掉额外的转义字符，再解析为对象
        const cleanedString = q.replace(/\\"/g, '"'); // 替换转义的引号
        console.log(cleanedString)
        const parsedQuestion = JSON.parse(cleanedString); // 解析为对象
        return {
          ...parsedQuestion,
          expanded: false
        };
      });
    } else {
      message.error('没有找到相关问题'); // 处理请求失败情况
    }
  } catch (error) {
    console.error('搜索请求失败:', error);
    message.error('搜索请求失败'); // 显示错误提示
  }
}

function isChecked(optionCode, correctAnswers) {
  // 判断当前选项是否在正确答案列表中
  return correctAnswers.includes(optionCode);
}

function toggleExpand(index) {
  // 切换 expanded 状态，控制选项展开或收起
  parsedQuestions.value[index].expanded = !parsedQuestions.value[index].expanded;
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
</style>
