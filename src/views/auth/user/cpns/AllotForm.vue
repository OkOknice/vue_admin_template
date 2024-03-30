<template>
  <div>
    <el-drawer v-model="isShowDrawer" @close="closeDrawer">
      <template #header>分配角色</template>
      <template #default>
        <el-form>
          <el-form-item label="用户姓名：">
            <el-input disabled></el-input>
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
              <el-checkbox-group v-model="assignRoles">
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
import { getUserRoleApi } from '@/api/auth/user'
import type { IRoleInfo } from '@/api/auth/types/userType'

interface IProp {
  id: number
}

const prop = defineProps<IProp>()

const isShowDrawer = ref<boolean>(false)
const isAllSelect = ref<boolean>(false)
const allRolesList = ref<IRoleInfo[]>([])
const assignRoles = ref<number[]>([])
watch(
  () => prop.id,
  () => {
    assignRoles.value = []
    allRolesList.value = []
    isShowDrawer.value && getUserRole()
  },
)
const getUserRole = async () => {
  const res = await getUserRoleApi(prop.id)
  if (res.code === 200 && res.data) {
    allRolesList.value = res.data.allRolesList
    assignRoles.value = res.data.assignRoles.map((item) => item.id)
  }
}
const changeSelect = () => {
  if (isAllSelect.value) {
    assignRoles.value = allRolesList.value.map((item) => item.id)
  } else {
    assignRoles.value = []
  }
}
const confirmForm = () => {
  console.log(assignRoles.value)
}
const openDrawer = () => {
  isShowDrawer.value = true
}
const closeDrawer = () => {
  isShowDrawer.value = false
}
defineExpose({
  openDrawer,
})
</script>

<style lang="scss" scoped></style>
