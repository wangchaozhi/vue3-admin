<template>
  <div class="user-page">
    <h2>用户管理</h2>

    <!-- 新增用户按钮 -->
    <n-button @click="showAddUserModal" type="primary" style="margin-bottom: 20px;">新增用户</n-button>

    <!-- 表格展示用户数据 -->
    <n-data-table :columns="columns" :data="users"/>

<!--    &lt;!&ndash; 分页 &ndash;&gt;-->
<!--    <n-pagination-->
<!--        v-model:page="pageNo"-->
<!--        :page-size="pageSize"-->
<!--        :page-count="Math.ceil(total / pageSize)"-->
<!--        show-size-picker-->
<!--        :page-sizes="[5, 10, 20, 40]"-->
<!--        @update:page="fetchUsers"-->
<!--        @update:page-size="updatePageSize"-->
<!--    />-->

    <!-- 分页 -->
    <div class="pagination-container">
      <n-pagination
          v-model:page="pageNo"
          :page-size="pageSize"
          :page-count="Math.ceil(total / pageSize)"
          show-size-picker
          :page-sizes="[5, 10, 20, 40]"
          @update:page="fetchUsers"
          @update:page-size="updatePageSize"
      />
    </div>


    <!-- 新增/编辑用户的弹窗 -->
    <n-modal v-model:show="showUserModal" title="用户信息">
      <n-card class="user-card">
        <n-form :model="currentUser" label-width="80px " class="user-form">
          <n-form-item label="姓名">
            <n-input v-model:value="currentUser.Name" placeholder=""/>
          </n-form-item>
          <n-form-item label="角色">
            <n-input v-model:value="currentUser.Role" placeholder=""/>
          </n-form-item>
          <n-form-item label="邮箱">
            <n-input v-model:value="currentUser.Email" placeholder=""/>
          </n-form-item>
          <n-form-item label="地址">
            <n-input v-model:value="currentUser.Addr" placeholder=""/>
          </n-form-item>
        </n-form>
        <!-- 设置按钮间距 -->
        <template #footer>
          <div class="modal-footer">
            <n-button @click="showUserModal = false">取消</n-button>
            <n-button @click="handleSaveUser" v-throttle="1500" type="primary">保存</n-button>
          </div>
        </template>

      </n-card>
    </n-modal>

  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {get, post, put, del} from '@/api'; // 假设你已经有封装好的API方法
import {NButton} from 'naive-ui';
import {throttle} from 'lodash';
import {debounce} from "lodash-es"; // 使用 lodash 的 throttle
// 获取 Naive UI 的 message 实例
const dialog = useDialog();

// 定义用户表格列
function createColumns({editUser, confirmDeleteUser}) {
  // 包装 editUser 和 confirmDeleteUser 函数，节流，确保每次点击之间有一定间隔
  const throttledEditUser = throttle(editUser, 1000); // 每1秒最多触发一次
  const throttledConfirmDeleteUser = throttle(confirmDeleteUser, 1000); // 每1秒最多触发一次
  return [
    {title: 'ID', key: 'ID'},
    {title: '姓名', key: 'Name'},
    {title: '角色', key: 'Role'},
    {title: '邮箱', key: 'Email'},
    {title: '地址', key: 'Addr'},
    {
      title: '操作',
      key: 'actions',
      render(row) {
        return h('div', {style: 'display: flex; gap: 15px; margin-left: 10px;'}, [
          h(
              NButton,
              {
                size: 'small',
                type: 'warning',
                onClick: () => throttledEditUser(row)
              },
              {default: () => '编辑'}
          ),
          h(
              NButton,
              {
                size: 'small',
                type: 'error',
                onClick: () => throttledConfirmDeleteUser(row)
              },
              {default: () => '删除'}
          )
        ]);
      }
    }
  ];
}

// 定义分页和数据状态
const users = ref([]);
const pageNo = ref(1);
const pageSize = ref(5);
const total = ref(20);

// // 定义分页对象
// const pagination = reactive({
//   page: pageNo.value,
//   pageSize: pageSize.value,
//   showSizePicker: true,
//   pageSizes: [5, 10, 20],
//   itemCount: total.value,  // 初始总条数
//   onUpdatePage(page) {
//     pageNo.value = page;
//     fetchUsers();
//   },
//   onUpdatePageSize(size) {
//     pageSize.value = size;
//     pageNo.value = 1;  // 修改 pageSize 时，重置到第一页
//     fetchUsers();
//   }
// });

// // 添加 watchEffect 来同步更新 pagination.itemCount
// watchEffect(() => {
//   pagination.itemCount = total.value;
// });


// 模态框状态和当前用户对象
const showUserModal = ref(false);
const currentUser = ref({ID: null, Name: '', Role: '', Email: '', Addr: ''});

// 获取用户列表
const fetchUsers = async () => {
  try {
    const response = await get('/users', {pageNo: pageNo.value, pageSize: pageSize.value});
    const data = response.data;

    if (data && data.users) {
      users.value = data.users;
      total.value = data.total;
    }
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
};

// 页面加载时获取用户数据
onMounted(() => {
  fetchUsers();
});

// 显示新增用户的模态框
const showAddUserModal = () => {
  currentUser.value = {ID: null, Name: '', Role: '', Email: '', Addr: ''};
  showUserModal.value = true;
};

// 编辑用户
const editUser = (user) => {
  currentUser.value = {...user}; // 将用户信息复制到当前编辑对象
  showUserModal.value = true;
};

// 保存用户（新增或编辑）
const handleSaveUser = async () => {
  if (currentUser.value.ID) {
    // 编辑用户
    await put(`/users/${currentUser.value.ID}`, currentUser.value);
  } else {
    // 新增用户
    await post('/users', currentUser.value);
  }
  fetchUsers(); // 刷新用户列表
  showUserModal.value = false;
};

// 删除用户
const deleteUser = async (userId) => {
  try {
    await del(`/users/${userId}`);
    // 检查删除后是否需要切换到上一页
    if (users.value.length === 1 && pageNo.value > 1) {
      pageNo.value -= 1; // 切换到上一页
    }

    // 刷新用户列表（刷新当前或上一页）
    await fetchUsers();
  } catch (error) {
    console.error('Failed to delete user:', error);
  }
};
// 修改页面大小时的处理函数
const updatePageSize = (newPageSize) => {
  pageSize.value = newPageSize;
  pageNo.value = 1; // 当修改页面大小时，重置到第一页
  fetchUsers();
};

// 删除用户确认弹窗
const confirmDeleteUser = (user) => {
  dialog.warning({
    title: '删除确认',
    content: `确定删除用户 ${user.Name} 吗？`,
    positiveText: '确认',
    negativeText: '取消',
    onPositiveClick: debounce(async () => {
      await deleteUser(user.ID);
    }, 1000), // 防抖时间设为 1 秒
  });
};

// 创建表格列
const columns = createColumns({editUser, confirmDeleteUser});
</script>

<style scoped>
.user-page {
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
}

.user-card {
  width: 40rem;
}

.user-form {
  width: 35rem;
}

/* 设置分页组件容器的样式 */
.pagination-container {
  display: flex;
  justify-content: flex-end; /* 使分页组件靠右对齐 */
  margin-top: 20px; /* 与表格保持一定的间距 */
}

/* 按钮间距设置 */
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
