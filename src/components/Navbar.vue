<template>
  <div class="navbar">
    <!-- 菜单按钮，点击时触发父组件的事件 -->
    <div class="menu-button">
      <n-button @click="$emit('toggle-sidebar')">菜单</n-button>
    </div>
    <!-- 其他内容，如通知图标和个人头像 -->
    <div class="content">
    <n-space align="center">
        <!-- 替换通知图标 -->
        <div class="notification-icon">
          <n-badge :value="15" :max="15" class="badge" @click="showNotificationDrawer">
            <n-icon   class="bell-icon">
              <NotificationsOutline /> <!-- 使用 Ionicons 的通知图标 -->
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
import { NotificationsOutline } from '@vicons/ionicons5'; // 引入 Ionicons 5 的通知图标
import { NIcon } from 'naive-ui'; // 引入 n-icon
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
import { ref } from 'vue';

const router = useRouter();
const store = useStore();



// 控制通知抽屉显示的状态
const isNotificationDrawerVisible = ref(false);

// 显示通知抽屉
function showNotificationDrawer() {
  isNotificationDrawerVisible.value = true; // 显示通知抽屉
}

// 下拉菜单选项
const dropdownOptions = ref([
  { label: '个人中心', key: 'profile' },
  { label: '修改密码', key: 'change-password' },
  { label: '注销', key: 'logout' }
]);

// 处理下拉菜单选择
function handleDropdownSelect(key) {
  if (key === 'profile') {
    // 跳转到个人中心页面
    router.push('/profile');
  } else if (key === 'change-password') {
    // 跳转到修改密码页面
    router.push('/change-password');
  } else if (key === 'logout') {
    // 执行注销操作
    logout();
  }
}

function logout() {
  store.dispatch('logout');
  router.push('/');  // 退出后重定向到登录页面
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


.menu-button {
  margin-left: 1.5rem;


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
  0% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg); }
  75% { transform: rotate(-10deg); }
  100% { transform: rotate(0deg); }
}

/* 鼠标悬停时触发摇晃动画 */
.bell-icon:hover {
  animation: shake 0.5s ease-in-out;
  transform-origin: center;
}
</style>
