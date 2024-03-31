<template>
  <div>
    <el-dialog
      v-model="isShowDialog"
      :title="prop.id ? '编辑职位' : '添加职位'"
      width="50%"
      @close="closeDialog"
      @open="watcherDialogOpen"
    >
      <el-form>
        <el-form-item label="职位名称" required>
          <el-input v-model="formData.roleName" placeholder="请输入职位名称" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="confirmForm">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="WriteRoleForm">
import { ref } from 'vue'

import { addRoleApi, updateRoleApi } from '@/api/auth/role'
import { ElMessage } from 'element-plus'
import { IConfirmRole } from '@/api/auth/types/roleType'

interface IRoleProp {
  id: number
  roleName: string
}

const prop = defineProps<IRoleProp>()

const isShowDialog = ref<boolean>(false)
const formData = ref<IConfirmRole>({
  id: 0,
  roleName: '',
})

const watcherDialogOpen = () => {
  console.log(prop.id)
  formData.value.roleName = prop.roleName
}
const openDialog = () => {
  isShowDialog.value = true
}

const closeDialog = () => {
  isShowDialog.value = false
}
const confirmForm = async () => {
  const params: IConfirmRole = {
    id: prop.id,
    roleName: formData.value.roleName,
  }
  const res = prop.id ? await updateRoleApi(params) : await addRoleApi(params)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: prop.id ? '编辑成功' : '添加成功',
    })
  } else {
    ElMessage({
      type: 'error',
      message: prop.id ? '编辑失败' : '添加失败',
    })
  }
  emits('refres-page')
  closeDialog()
}

const emits = defineEmits(['refres-page'])
defineExpose({
  openDialog,
})
</script>

<style lang="scss" scoped></style>
