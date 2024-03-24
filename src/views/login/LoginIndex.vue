<template>
  <div class="login-wrapper">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <div class="login-contanier">
          <div class="login-title">OKOK 管理后台模板</div>
          <el-form>
            <el-form-item>
              <el-input
                placeholder="请输入账号"
                v-model="loginFrom.username"
                :prefix-icon="User"
              />
            </el-form-item>
            <el-form-item>
              <el-input
                type="password"
                placeholder="请输入密码"
                v-model="loginFrom.password"
                :prefix-icon="Lock"
              />
            </el-form-item>
            <el-button class="login-btn" type="primary" @click="login">
              登录
            </el-button>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'

interface ILoginForm {
  username: string
  password: string
}

const loginFrom = ref<ILoginForm>({
  username: '',
  password: '',
})

const login = () => {
  console.log('login')
  console.log(loginFrom.value)
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
