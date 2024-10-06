<template>
  <div>
    <!-- 使用 n-button 替换原生 button -->
    <n-button type="primary" @click="parseData">Parse Questions</n-button>

    <!-- 使用 n-card 来显示解析后的问题 -->
    <n-card v-if="parsedQuestions.length" title="Parsed Questions">
      <div v-for="(question, index) in parsedQuestions" :key="index">
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
              <!-- 使用 :checked 动态绑定 -->
              <n-checkbox :checked="isChecked(option.code, question.correctAnswer)" disabled>
                {{ option.code }}: {{ option.content }}
              </n-checkbox>
            </n-list-item>
          </n-list>
        </n-card>
      </div>
    </n-card>
  </div>
</template>

<script>
import { questionParser } from '@/utils/questionParser'; // 引入工具类
import { defineComponent } from 'vue'; // Vue 3 使用 defineComponent

export default defineComponent({
  data() {
    return {
      parsedQuestions: [] // 用来存储解析后的问题数据
    };
  },
  methods: {
    async parseData() {
      try {
        // 使用 fetch 来获取 public/a.html 文件内容
        const response = await fetch('/a.html'); // public 下的静态文件可以直接通过相对路径访问
        const htmlText = await response.text(); // 获取到文件内容作为文本

        // 使用工具类解析 HTML 文件内容
        const parsedData = questionParser.parseQuestions(htmlText);
        console.log(parsedData)

        // 给每个问题增加一个 expanded 属性，初始为 false
        this.parsedQuestions = parsedData.map(question => ({
          ...question,
          expanded: false
        }));

      } catch (error) {
        console.error('Error fetching or parsing the file:', error); // 捕获并处理错误
      }
    },
    isChecked(optionCode, correctAnswers) {
      // 判断当前选项是否在正确答案列表中
      return correctAnswers.includes(optionCode);
    },
    toggleExpand(index) {
      // 切换 expanded 状态，控制选项展开或收起
      this.parsedQuestions[index].expanded = !this.parsedQuestions[index].expanded;
    }
  }
});
</script>
