<template>
  <div class="user-wrapper">
    <div class="user-header">
      <el-card style="height: 75px">
        <div class="user-card">
          <div>
            <el-form style="width: 300px">
              <el-form-item label="用户名：">
                <el-input
                  placeholder="请输入用户名"
                  v-model="username"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="btn">
            <el-button type="primary" @click="searchPageDate">搜索</el-button>
            <el-button type="primary" plain @click="resetSearch">
              重置
            </el-button>
          </div>
        </div>
      </el-card>
    </div>
    <div class="user-table">
      <el-card>
        <div class="table-btn">
          <el-button type="primary" icon="Plus" @click="addUser">
            添加用户
          </el-button>
          <el-button
            :disabled="!ids.length"
            icon="Delete"
            type="danger"
            @click="deleteAllUser"
          >
            批量删除
          </el-button>
          <!-- <el-button type="danger" icon="Delete">批量删除</el-button> -->
        </div>
        <el-table
          border
          style="width: 100%"
          :data="userList"
          @select="selectUser"
          @select-all="selectUser"
        >
          <el-table-column type="selection" align="center" />
          <el-table-column
            label="序号"
            align="center"
            type="index"
            width="70"
          />
          <el-table-column label="ID" align="center" prop="id" />
          <el-table-column
            label="用户姓名"
            align="center"
            prop="username"
            show-overflow-tooltip
          />
          <el-table-column
            label="用户昵称"
            align="center"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            label="用户角色"
            align="center"
            prop="roleName"
            show-overflow-tooltip
          />
          <el-table-column
            label="创建时间"
            align="center"
            prop="createTime"
            show-overflow-tooltip
          />
          <el-table-column
            label="更新时间"
            align="center"
            prop="updateTime"
            show-overflow-tooltip
          />
          <el-table-column label="操作" width="300px" align="center">
            <template #default="scope">
              <el-button
                icon="User"
                type="primary"
                size="small"
                plain
                @click="openAllot(scope.row)"
              >
                分配角色
              </el-button>
              <el-button
                icon="Edit"
                type="primary"
                size="small"
                @click="editUser(scope.row)"
              >
                编辑
              </el-button>
              <el-popconfirm
                title="你确定删除该用户吗?"
                @confirm="deleteUser(scope.row.id)"
              >
                <template #reference>
                  <el-button icon="Delete" size="small" type="danger">
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-footer">
          <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 15, 20]"
            layout="prev, pager, next, jumper, ->, total, sizes"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
    </div>
    <WriteUserForm
      ref="writrUserRef"
      :id="userId"
      @refresh-page="loadUserPage"
    />
    <AllotForm ref="allotRoleRef" :id="userId" @refresh-page="loadUserPage" />
  </div>
</template>

<script setup lang="ts" name="UserIndex">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import WriteUserForm from './cpns/WriteUserForm.vue'
import AllotForm from './cpns/AllotForm.vue'
// import type { FormInstance } from 'element-plus'

import {
  getUserPageApi,
  deleteUserApi,
  deleteAllUserApi,
} from '@/api/auth/user'
import type { IUserPageReqParams, IUser } from '@/api/auth/types/userType'

const pageNo = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>(0)
const userList = ref<IUser[]>([])
const username = ref<string>('')
const userId = ref<number>(0)
const ids = ref<number[]>([])

const writrUserRef = ref<InstanceType<typeof WriteUserForm>>()
const allotRoleRef = ref<InstanceType<typeof AllotForm>>()

onMounted(() => {
  loadUserPage()
})
// 获取分页数据
const loadUserPage = async () => {
  const params: IUserPageReqParams = {
    limit: pageSize.value,
    page: pageNo.value,
    username: username.value,
  }
  const res = await getUserPageApi(params)
  if (res.code === 200) {
    total.value = res.data.total
    userList.value = res.data.records
  } else {
    ElMessage({
      message: '获取用户数据失败',
      type: 'error',
    })
  }
}
const openAllot = (payload: IUser) => {
  userId.value = payload.id
  allotRoleRef.value?.openDrawer()
}

const addUser = () => {
  userId.value = 0
  writrUserRef.value?.openDrawer()
}
const editUser = (payload: IUser) => {
  userId.value = payload.id
  writrUserRef.value?.openDrawer()
}
// 删除用户
const deleteUser = async (id: number) => {
  const res = await deleteUserApi(id)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    loadUserPage()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
// 选择用户
const selectUser = (userList: IUser[]) => {
  ids.value = userList.map((item) => item.id)
}
const deleteAllUser = async () => {
  const res = await deleteAllUserApi(ids.value)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    loadUserPage()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

// 搜索
const searchPageDate = () => {
  loadUserPage()
}
// 重置表单
const resetSearch = () => {
  username.value = ''
  loadUserPage()
}
const handleSizeChange = (val: number) => {
  pageNo.value = 1
  pageSize.value = val
  username.value = ''
  loadUserPage()
}
const handleCurrentChange = (val: number) => {
  pageNo.value = val
  username.value = ''
  loadUserPage()
}
</script>

<style lang="scss" scoped>
.user-header {
  /* display: flex; */
  .user-card {
    display: flex;
    justify-content: space-between;
  }
}
.user-table {
  margin-top: 20px;
  .table-btn {
    margin-bottom: 10px;
  }
  .table-footer {
    margin-top: 20px;
  }
}
</style>
