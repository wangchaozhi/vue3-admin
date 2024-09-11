<template>
  <div class="login-container">
    <h2>Login</h2>
    <n-form>
      <div>
        <label for="username">Username:</label>
        <n-input id="username" v-model="credentials.username" type="text"></n-input>
      </div>
      <div>
        <label for="username">Username:</label>
        <n-input id="password" v-model="credentials.password" type="password"></n-input>
      </div>
      <!-- 第一个登录按钮 -->
      <n-button @click="handleLogin">Login</n-button>
    </n-form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <form @submit.prevent="handleLogin">
      <div>

        <label for="username">Username:</label>
        <input id="username" v-model="credentials.username" type="text"/>
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" v-model="credentials.password" type="password"/>
      </div>

      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {login} from '@/services/httpService'; // 确保路径正确

const credentials = ref({username: '', password: ''});
const errorMessage = ref('');
const router = useRouter();

async function handleLogin() {
  try {
    let response = await login(credentials.value.username, credentials.value.password);
    let responseData = await response.json(); // 解析 JSON 数据
    console.log(responseData.data)
    if (responseData.code !== 200) {
      console.log("失败")
      errorMessage.value = responseData.msg
    } else {
      // 在这里处理响应数据
      console.log("成功");
      router.push('/'); // 登录成功后导航到仪表板或其他页面
    }
  } catch (error) {
    errorMessage.value = 'Login failed: ' + error.message; // 显示错误信息
  }
}
</script>

<style scoped>
.login-container {
  max-width: 300px;
  margin: auto;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.error {
  color: red;
}
</style>
