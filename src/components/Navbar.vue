<template>
  <div class="navbar">
    <!-- 菜单按钮，点击时触发父组件的事件 -->
    <!--    <div class="menu-button">-->
    <!--      <n-button @click="$emit('toggle-sidebar')">菜单</n-button>-->
    <!--    </div>-->
    <!--    <div class="theme-switch">-->
    <!--      &lt;!&ndash; 添加主题切换开关 &ndash;&gt;-->
    <!--      <n-switch  :value="isDarkTheme" @update:value="toggleTheme" size="small">-->
    <!--        <template #checked>🌙</template>-->
    <!--        <template #unchecked>☀️</template>-->
    <!--      </n-switch>-->
    <!--    </div>-->

    <!-- 菜单按钮和主题切换开关 -->
    <div class="menu-container">
      <div class="menu-button">
        <n-button @click="$emit('toggle-sidebar')">菜单</n-button>
      </div>
      <div class="theme-switch">
        <!-- 添加主题切换开关 -->
        <n-switch :value="isDarkTheme" @update:value="toggleTheme" size="small">
          <template #checked>🌙</template>
          <template #unchecked>☀️</template>
        </n-switch>
      </div>
    </div>

    <!-- 其他内容，如通知图标和个人头像 -->
    <div class="content">
      <n-space align="center">
        <!-- 替换通知图标 -->
        <div class="notification-icon">
          <n-badge :value="15" :max="15" class="badge" @click="showNotificationDrawer">
            <n-icon class="bell-icon">
              <NotificationsOutline/> <!-- 使用 Ionicons 的通知图标 -->
            </n-icon>
          </n-badge>
        </div>

        <div class="profile-icon">
          <!-- 头像下拉菜单 -->
          <n-dropdown :options="dropdownOptions" @select="handleDropdownSelect">
            <n-avatar
                size="large"
                src="/images/avatar.jpg"
                class="avatar"
            />
          </n-dropdown>
        </div>
      </n-space>
      <!-- 通知抽屉 -->
      <n-drawer v-model:show="isNotificationDrawerVisible" placement="right" title="通知">
        <n-list>
          <n-list-item>通知 1: 您有新的消息。</n-list-item>
          <n-list-item>通知 2: 系统将在明天更新。</n-list-item>
          <n-list-item>通知 3: 请查看您的账户信息。</n-list-item>
        </n-list>
      </n-drawer>


    </div>
  </div>
</template>

<script setup>
// 引入图标库
import {NotificationsOutline} from '@vicons/ionicons5'; // 引入 Ionicons 5 的通知图标
import {NIcon} from 'naive-ui'; // 引入 n-icon
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
import {ref} from 'vue';

const router = useRouter();
const store = useStore();

const message = useMessage(); // 使用 Naive UI 的消息提示


// 控制通知抽屉显示的状态
const isNotificationDrawerVisible = ref(false);

// 显示通知抽屉
function showNotificationDrawer() {
  isNotificationDrawerVisible.value = true; // 显示通知抽屉
}

// 下拉菜单选项
const dropdownOptions = ref([
  {label: '个人中心', key: 'profile'},
  {label: '修改密码', key: 'change-password'},
  {label: '注销', key: 'logout'}
]);

// 处理下拉菜单选择
function handleDropdownSelect(key) {
  if (key === 'profile') {
    // 跳转到个人中心页面
    router.push('/main/profile');
  } else if (key === 'change-password') {
    // 跳转到修改密码页面
    router.push('/main/change-password');
  } else if (key === 'logout') {
    // 执行注销操作
    logout();
  }
}

function logout() {
  // 调用 Vuex 中的注销逻辑，清除用户状态和 token
  store.dispatch('logout');
  // 清除 localStorage 中的 token
  localStorage.removeItem('authToken');
  // 显示注销成功的消息
  message.success('您已成功注销');
  router.push('/');  // 退出后重定向到登录页面
}

// // 从 Vuex 获取当前主题状态
const isDarkTheme = computed(() => store.state.isDarkTheme);


// 切换主题方法
function toggleTheme() {
  store.dispatch('toggleTheme'); // 调用 Vuex 中的切换主题 action
}


// 你可以根据需要在这里添加逻辑
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  height: 5rem;
  width: 100%;
  background-color: #333;
  color: white;
  align-items: center;
  justify-content: space-between;
}

.menu-container {
  display: flex;
  align-items: center;
}

.menu-button {
  margin-left: 1.5rem;
}

.theme-switch {
  margin-left: 1.5rem; /* 调整开关与菜单按钮的间距 */
}

.n-button {
  font-size: 1rem;
  padding: 0.4rem 0.8rem;
  width: 5rem;
  color: white;
}

.content {
  display: flex;
}

.notification-icon, .profile-icon {
  margin-left: 2.3rem;
  font-size: 1.4rem;
}

.profile-icon {
  margin-right: 2.3rem;
}

.avatar {
  cursor: pointer;
}

.badge {
  cursor: pointer;
}

/* 添加铃铛摇晃效果的动画 */
@keyframes shake {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(10deg);
  }
  75% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

/* 鼠标悬停时触发摇晃动画 */
.badge:hover {
  animation: shake 0.5s ease-in-out;
  transform-origin: center;
}

.notification-icon {
  padding-bottom: 1.2rem;
}


:deep(.n-badge .n-badge-sup) {
  --n-font-size: 1rem;
  padding: 0 3px;
  transform: translateX(-20%);
}

:deep(svg) {
  width: 2rem; /* 图标的宽度 */
  height: 2rem; /* 图标的高度 */

}
</style>
