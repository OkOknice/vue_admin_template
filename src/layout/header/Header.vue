<template>
  <div class="header-wrapper">
    <div class="header-left">
      <div class="change" @click="changeExpand">
        <el-icon>
          <component :is="layoutStore.isExpand ? 'Expand' : 'Fold'"></component>
          <!-- <Expand /> -->
        </el-icon>
      </div>
      <div class="breadcrumb">
        <el-breadcrumb separator-icon="ArrowRight">
          <el-breadcrumb-item>权限管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="header-right">
      <el-button icon="Refresh" circle @click="refreshPage" />
      <el-button icon="FullScreen" circle @click="openFullScreen" />
      <el-button icon="Setting" circle />
      <img class="img" :src="userStore.userInfo.avatar" />
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.userInfo.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useLayoutStore from '@/store/modules/layoutStore'
import useUserStore from '@/store/modules/userStore'

// const isExpand = ref<boolean>(true)
const $router = useRouter()
const layoutStore = useLayoutStore()
const userStore = useUserStore()
// 伸缩
const changeExpand = () => {
  layoutStore.changeIsExpand()
}
// 刷新
const refreshPage = () => {
  layoutStore.changeIsRefresh()
}
// 全屏
const openFullScreen = () => {
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
// 退出登录
const loginout = () => {
  userStore.clearUserInfo().then(() => {
    $router.push('/login')
  })
}
</script>

<style lang="scss" scoped>
.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .header-left {
    margin-left: 20px;
    display: flex;
    align-items: center;
    .change {
      margin-right: 20px;
      cursor: pointer;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    margin-right: 20px;
    .img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-left: 10px;
      margin-right: 10px;
    }
  }
}
</style>
