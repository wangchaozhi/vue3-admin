<template>
  <n-config-provider :theme="null">

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
        <n-checkbox v-model:checked="rememberMe">记住密码</n-checkbox>
        <div class="button-container">
          <n-button @click="handleLogin" class="loginButton">登录</n-button>
        </div>
      </n-form>
      <!--      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>-->
    </div>
  </div>
  </n-config-provider>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import store from "@/store/index.js";
import {post} from "@/api/index.js"; // 确保路径正确
// import { useMessage } from 'naive-ui'; // 引入 Naive UI 的消息提示功能

const credentials = ref({username: '', password: ''});
const rememberMe = ref(false); // 记住密码选项
const errorMessage = ref('');
const router = useRouter();
const message = useMessage(); // 使用 Naive UI 的消息提示


// 页面加载时检查 localStorage 是否有记住的用户名和密码
onMounted(() => {
  const savedCredentials = JSON.parse(localStorage.getItem('savedCredentials'));
  if (savedCredentials) {
    credentials.value.username = savedCredentials.username;
    credentials.value.password = savedCredentials.password;
    rememberMe.value = true; // 如果找到保存的密码，勾选“记住密码”
  }
});

// async function handleLogin() {
//   try {
//     if (credentials.value.username === 'admin' && credentials.value.password === 'admin') {
//       store.dispatch('login');
//       router.push('/main/home');
//     } else {
//       message.warning('用户名或密码错误');
//       errorMessage.value = '登录失败，请检查用户名和密码。';
//     }
//   } catch (error) {
//     errorMessage.value = 'Login failed: ' + error.message; // 显示错误信息
//   }
// }

async function handleLogin() {
  try {
    // 构建请求数据
    const loginData = {
      email: credentials.value.username,
      password: credentials.value.password,
    };

    // 调用封装的 API 进行登录请求
    const response = await post('/login', loginData);

    // 判断登录是否成功，根据后端返回的数据
    if (response.code === 200) {
      const token = response.data.token;
      const user = response.data.user;

      // 将 token 保存到 localStorage
      localStorage.setItem('authToken', token);

      // 将用户信息保存到 Vuex store
      await store.dispatch('login', {user});

      // 如果选择了“记住密码”，将用户名和密码保存到 localStorage
      if (rememberMe.value) {
        localStorage.setItem('savedCredentials', JSON.stringify(credentials.value));
      } else {
        localStorage.removeItem('savedCredentials'); // 如果没选中，则清除保存的信息
      }

      // 跳转到主页
      await router.push('/main/home');
      message.success('登录成功');
    } else {
      console.log(response)
      message.warning(response.msg || '用户名或密码错误');
      errorMessage.value = response.msg || '登录失败，请检查用户名和密码。';
    }
  } catch (error) {
    console.log(error)
    // 显示错误信息
    message.error('登录请求失败，请稍后重试');
    errorMessage.value = '登录请求失败：' + error.message;
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

.login-title {
  text-align: center; /* 按钮居中 */
}


.error {
  color: red;
}
</style>
