<template>
  <div class="login-page">
    <div class="login-container">
      <h2 class="login-title">vue3管理系统</h2>
      <n-form>
        <n-form-item label="用户名" path="user.name">
          <n-input
              v-model:value="credentials.username"
              type="text"
              placeholder=""
              @focus="clearErrorMessage"
              :input-props="{ autocomplete: 'username' }"
          />
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input
              v-model:value="credentials.password"
              type="password"
              placeholder=""
              @focus="clearErrorMessage"
              :input-props="{ autocomplete: 'current-password' }"
          />
        </n-form-item>
        <div class="button-container">
        <n-button @click="handleLogin" class="loginButton">登录</n-button>
        </div>
      </n-form>
<!--      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>-->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import store from "@/store/index.js"; // 确保路径正确
import { useMessage } from 'naive-ui'; // 引入 Naive UI 的消息提示功能

const credentials = ref({ username: '', password: '' });
const errorMessage = ref('');
const router = useRouter();
const message = useMessage(); // 使用 Naive UI 的消息提示

async function handleLogin() {
  try {
    if (credentials.value.username === 'admin' && credentials.value.password === 'admin') {
      store.dispatch('login');
      router.push('/main/home');
    } else {
      message.warning('用户名或密码错误');
      errorMessage.value = '登录失败，请检查用户名和密码。';
    }
  } catch (error) {
    errorMessage.value = 'Login failed: ' + error.message; // 显示错误信息
  }
}

function clearErrorMessage() {
  errorMessage.value = ''; // 清除错误消息
}
</script>

<style scoped>
/* 整个页面使用 flexbox 居中布局 */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 占据整个视窗高度 */
  background-color: rosybrown; /* 背景色 */
  background-image: url("/images/dragonlearn.webp");
  background-size: cover; /* 覆盖整个容器 */
  background-position: center; /* 图片居中显示 */
  background-repeat: no-repeat; /* 不重复背景图 */
  background-attachment: fixed; /* 背景图片固定，不随滚动条滚动 */
}

.login-container {
  background-color: rgba(255, 255, 255, 0.8); /* 半透明背景 */
  margin-bottom: 12rem;
  width: 300px;
  padding: 2rem;

  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.button-container {
  text-align: center; /* 按钮居中 */
}
.login-title{
  text-align: center; /* 按钮居中 */
}




.error {
  color: red;
}
</style>
