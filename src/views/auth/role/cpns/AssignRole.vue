<template>
  <div>
    <el-drawer v-model="isShowDrawer" @close="closeDrawer" @open="handleDrawer">
      <template #header>分配菜单与按钮的权限</template>
      <template #default>
        <el-tree
          :data="menuArr"
          show-checkbox
          node-key="id"
          :default-checked-keys="selectArr"
          default-expand-all
          :props="defaultProps"
          @check="checkChangeTree"
        />
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

<script setup lang="ts" name="AssignRole">
import { ref } from 'vue'

import { getMenuRoleApi, assignRoleApi } from '@/api/auth/role'
import type { IMenuInfo, IAssignRoleReq } from '@/api/auth/types/roleType'
import { ElMessage } from 'element-plus'

interface IAssignRoleProp {
  id: number
}

const prop = defineProps<IAssignRoleProp>()

const defaultProps = {
  children: 'children',
  label: 'name',
}

const isShowDrawer = ref<boolean>(false)
const menuArr = ref<IMenuInfo[]>([])
const selectArr = ref<number[]>([])

const handleDrawer = async () => {
  selectArr.value = []
  const res = await getMenuRoleApi(prop.id)
  if (res.code === 200) {
    menuArr.value = res.data
    filterArr(res.data)
  }
}

const checkChangeTree = (data: any, selectNode: any) => {
  console.log(data)
  selectArr.value = selectNode.checkedKeys
}

const filterArr = (allList: IMenuInfo[]) => {
  allList.forEach((item) => {
    if (item.select && item.level === 4) {
      selectArr.value.push(item.id)
    }
    if (item.children.length) {
      filterArr(item.children)
    }
  })
}

const closeDrawer = () => {
  isShowDrawer.value = false
}
const confirmForm = async () => {
  const params: IAssignRoleReq = {
    roleId: prop.id,
    permissionId: selectArr.value,
  }
  const res = await assignRoleApi(params)
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
  closeDrawer()
  emits('refres-page')
  console.log(selectArr.value)
}

const openDrawer = () => {
  isShowDrawer.value = true
}

const emits = defineEmits(['refres-page'])
defineExpose({
  openDrawer,
})
</script>

<style lang="scss" scoped></style>
