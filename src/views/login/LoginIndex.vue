<template>
  <div class="login-wrapper">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <div class="login-contanier">
          <div class="login-title">OKOK 管理后台模板</div>
          <el-form ref="formRef" :rules="ruleForm" :model="loginFrom">
            <el-form-item prop="username">
              <el-input
                placeholder="请输入账号"
                v-model="loginFrom.username"
                :prefix-icon="User"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                placeholder="请输入密码"
                v-model="loginFrom.password"
                :prefix-icon="Lock"
                show-password
              />
            </el-form-item>
            <el-button class="login-btn" type="primary" @click="login">
              登 录
            </el-button>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import userStore from '@/store/modules/userStore'
import { useRouter, useRoute } from 'vue-router'

import { User, Lock } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import type { FormRules, FormInstance } from 'element-plus'

import type { ILoginForm } from '@/api/user/type'

const useUserStore = userStore()
const $router = useRouter()
const route = useRoute()

const ruleForm = reactive<FormRules<ILoginForm>>({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 5, max: 8, message: '长度在5-8之间', trigger: 'blur' },
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

const loginFrom = ref<ILoginForm>({
  username: '',
  password: '',
})
const formRef = ref<FormInstance>()

const login = () => {
  if (!formRef.value) {
    return
  }
  formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        await useUserStore.loginAction(loginFrom.value)
        ElNotification({
          type: 'success',
          message: '登录成功',
        })
        const redirect = route.query.redirect
        $router.push((redirect as string) || '/')
      } catch (error) {
        ElNotification({
          type: 'error',
          message: (error as Error).message,
        })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  width: 100%;
  height: 100vh;
  /* background-color: red; */
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login-contanier {
    width: 80%;
    position: relative;
    top: 25vh;
    padding: 40px;
    background-color: skyblue;
    border-radius: 20px;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    .login-title {
      font-size: 32px;
      font-weight: bold;
      color: #fff;
      margin-bottom: 30px;
      text-align: center;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
