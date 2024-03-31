<template>
  <div>
    <el-drawer v-model="isShowDrawer" @close="closeDrawer" @open="handleDrawer">
      <template #header>分配角色</template>
      <template #default>
        <el-form>
          <el-form-item label="用户姓名：">
            <el-input v-model="username" disabled></el-input>
          </el-form-item>
          <el-form-item label="职位列表：">
            <div>
              <el-checkbox
                v-model="isAllSelect"
                @change="changeSelect"
                size="large"
              >
                全选
              </el-checkbox>
              <el-checkbox-group
                v-model="assignRoles"
                @change="handleCheckboxGroup"
              >
                <el-checkbox
                  v-for="item in allRolesList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.roleName"
                />
              </el-checkbox-group>
            </div>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="closeDrawer">取消</el-button>
          <el-button type="primary" @click="confirmForm">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts" name="AllotForm">
import { ref, watch } from 'vue'
import {
  getUserRoleApi,
  assginUserRoleApi,
  getUserInfoResApi,
} from '@/api/auth/user'
import type { IRoleInfo, IReqUserRole } from '@/api/auth/types/userType'
import { ElMessage } from 'element-plus'

interface IProp {
  id: number
}

const prop = defineProps<IProp>()

const isShowDrawer = ref<boolean>(false)
const isAllSelect = ref<boolean>(false)
const allRolesList = ref<IRoleInfo[]>([])
const assignRoles = ref<number[]>([])
const username = ref<string>('')
watch(
  () => prop.id,
  () => {
    getUserInfo()
  },
)
// 获取用户信息
const getUserInfo = async () => {
  const res = await getUserInfoResApi(prop.id)
  if (res.code === 200 && res.data) {
    username.value = res.data.username
  }
}
const getUserRole = async () => {
  allRolesList.value = []
  assignRoles.value = []
  const res = await getUserRoleApi(prop.id)
  if (res.code === 200 && res.data) {
    allRolesList.value = res.data.allRolesList
    assignRoles.value = res.data.assignRoles.map((item) => item.id)
    isAllSelect.value = assignRoles.value.length === allRolesList.value.length
  }
}
const changeSelect = () => {
  if (isAllSelect.value) {
    assignRoles.value = allRolesList.value.map((item) => item.id)
  } else {
    assignRoles.value = []
  }
}
const handleCheckboxGroup = () => {
  isAllSelect.value = assignRoles.value.length === allRolesList.value.length
}
const confirmForm = async () => {
  const params: IReqUserRole = {
    roleIdList: assignRoles.value,
    userId: prop.id,
  }
  const res = await assginUserRoleApi(params)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '分配成功',
    })
  } else {
    ElMessage({
      type: 'error',
      message: '分配失败',
    })
  }
  emits('refreshPage')
  closeDrawer()
}
const openDrawer = () => {
  isShowDrawer.value = true
}
const handleDrawer = () => {
  getUserRole()
}
const closeDrawer = () => {
  isShowDrawer.value = false
  isAllSelect.value = false
}
defineExpose({
  openDrawer,
})
const emits = defineEmits(['refreshPage'])
</script>

<style lang="scss" scoped></style>
