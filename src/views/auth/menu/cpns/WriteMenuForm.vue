<template>
  <div>
    <el-dialog
      v-model="isShowDialog"
      :title="prop.id ? '编辑' : '添加'"
      width="50%"
      @close="closeDialog"
      @open="watcherDialogOpen"
    >
      <el-form>
        <el-form-item label="名称" required>
          <el-input v-model="formData.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="权限" required>
          <el-input v-model="formData.code" placeholder="请输入权限" />
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

<script setup lang="ts" name="WriteMenuForm">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

import { addMenuApi, updateMenuApi } from '@/api/auth/menu'
import type { IMenuParams } from '@/api/auth/types/menuType'

interface IMenuProp {
  id: number
  pid: number
  level: number
  name?: string
  code?: string
}

const prop = defineProps<IMenuProp>()

const isShowDialog = ref<boolean>(false)
const formData = ref<IMenuParams>({
  name: '',
  code: '',
  id: 0,
  pid: 0,
  level: 0,
})

const watcherDialogOpen = () => {
  formData.value.id = prop.id
  formData.value.code = prop.code as string
  formData.value.pid = prop.pid
  formData.value.name = prop.name as string
  formData.value.level = prop.level
}
const closeDialog = () => {
  isShowDialog.value = false
}

const confirmForm = async () => {
  const res = prop.id
    ? await updateMenuApi(formData.value)
    : await addMenuApi(formData.value)
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
  closeDialog()
  emits('refresh-page')
}

const openDialog = () => {
  isShowDialog.value = true
}

const emits = defineEmits(['refresh-page'])
defineExpose({
  openDialog,
})
</script>

<style lang="scss" scoped></style>
