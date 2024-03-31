<template>
  <div>
    <el-drawer v-model="isShowDrawer" @close="closeDrawer" @open="handleDrawer">
      <template #header>
        <h4>{{ prop.id ? '编辑用户' : '新增用户' }}</h4>
      </template>
      <template #default>
        <div>
          <el-form ref="drawerFormRef" :rules="ruleForm" :model="formParams">
            <el-form-item label="用户姓名：" prop="username" required>
              <el-input
                v-model="formParams.username"
                placeholder="请输入用户姓名"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户昵称：" prop="name" required>
              <el-input
                v-model="formParams.name"
                placeholder="请输入用户昵称"
              ></el-input>
            </el-form-item>
            <el-form-item
              v-if="!prop.id"
              label="用户密码："
              prop="password"
              required
            >
              <el-input
                show-password
                v-model="formParams.password"
                placeholder="请输入用户密码"
                type="password"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="closeDrawer">取消</el-button>
          <el-button type="primary" @click="confrimForm">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts" name="WriteUserForm">
import { ref, reactive } from 'vue'

import {
  addUserApi,
  getUserInfoResApi,
  updateUserInfoApi,
} from '@/api/auth/user'

import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import type { IUser } from '@/api/auth/types/userType'
const prop = defineProps({
  id: {
    type: Number,
    default: 0,
  },
})
const isShowDrawer = ref<boolean>(false)
const drawerFormRef = ref<FormInstance>()
const formParams = ref<IUser>({
  id: 0,
  username: '',
  name: '',
  password: '',
})
const ruleForm = reactive<FormRules<IUser>>({
  username: [
    { required: true, message: '请输入用户姓名', trigger: 'blur' },
    { min: 5, max: 8, message: '长度在5-8之间', trigger: 'blur' },
  ],
  name: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    { min: 5, max: 8, message: '长度在5-8之间', trigger: 'blur' },
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

// watch(
//   () => prop.id,
//   (newV) => {
//     formParams.value.id = newV
//     // isShowDrawer.value && getUserInfo()
//   },
// )

// 获取用户信息
const getUserInfo = async () => {
  const res = await getUserInfoResApi(prop.id)
  if (res.code === 200 && res.data) {
    formParams.value.name = res.data.name
    formParams.value.username = res.data.username
  }
}

const openDrawer = () => {
  isShowDrawer.value = true
}
const closeDrawer = () => {
  isShowDrawer.value = false
  formParams.value.id = 0
  drawerFormRef.value?.resetFields()
}
const handleDrawer = () => {
  console.log(prop.id)
  prop.id && getUserInfo()
}
// 提交用户信息
const confrimForm = () => {
  drawerFormRef.value?.validate().then(async (valid) => {
    if (valid) {
      formParams.value.id = prop.id
      console.log(formParams.value)
      const res = formParams.value.id
        ? await updateUserInfoApi(formParams.value)
        : await addUserApi(formParams.value)
      if (res.code === 200) {
        ElMessage({
          type: 'success',
          message: formParams.value.id ? '编辑成功' : '添加成功',
        })
      } else {
        ElMessage({
          type: 'error',
          message: formParams.value.id ? '编辑失败' : '添加失败',
        })
      }
      closeDrawer()
      emits('refreshPage')
    }
  })
}

defineExpose({
  openDrawer,
})
const emits = defineEmits(['refreshPage'])
</script>

<style lang="scss" scoped></style>
