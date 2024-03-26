<template>
  <div class="layout-wrapper">
    <!--左侧布局-->
    <div class="layout-left">
      <LogoTitle />
      <!--菜单区域-->
      <div class="layout-menu">
        <MenuList :menu-list="useUserStore.menuList" />
      </div>
    </div>
    <!--右侧布局-->
    <div class="layout-right">
      <!--顶部区域-->
      <div class="layout-right-header">顶部区域</div>
      <!--内容区域-->
      <div class="layout-right-container">内容区域</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LogoTitle from './logo/LogoTitle.vue'
import MenuList from './menu/MenuList.vue'
import userStore from '@/store/modules/userStore'

const useUserStore = userStore()
</script>

<style lang="scss" scoped>
.layout-wrapper {
  width: 100%;
  height: 100vh;
  /* background-color: pink; */
  display: flex;
  .layout-left {
    width: $layout-left-width;
    background-color: $layout-left-bg;
  }
  .layout-right {
    width: calc(100% - $layout-left-width);
    /* background-color: red; */
    .layout-right-header {
      height: $layout-right-header-height;
      background-color: skyblue;
    }
    .layout-right-container {
      height: calc(100vh - $layout-right-header-height);
      background-color: pink;
      padding: 20px;
      overflow: hidden;
      overflow-y: scroll;
    }
  }
}
</style>
