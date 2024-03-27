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
      <img
        class="img"
        src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
      />
      <el-dropdown>
        <span class="el-dropdown-link">
          admin
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
import useLayoutStore from '@/store/modules/layoutStore'

// const isExpand = ref<boolean>(true)
const layoutStore = useLayoutStore()
const changeExpand = () => {
  // isExpand.value = !isExpand.value
  layoutStore.changeIsExpand()
}
const refreshPage = () => {
  layoutStore.changeIsRefresh()
}
const openFullScreen = () => {}
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
