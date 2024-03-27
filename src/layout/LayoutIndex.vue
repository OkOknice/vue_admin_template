<template>
  <div class="layout-wrapper">
    <!--左侧布局-->
    <div class="layout-left" :class="layoutStore.isExpand ? '' : 'scroll-left'">
      <LogoTitle />
      <!--菜单区域-->
      <div class="layout-menu">
        <el-menu
          background-color="#001529"
          text-color="#fff"
          :default-active="path"
          @select="goToRoute"
          :collapse="!layoutStore.isExpand"
        >
          <MenuList :menu-list="useUserStore.menuList" />
        </el-menu>
      </div>
    </div>
    <!--右侧布局-->
    <div
      class="layout-right"
      :class="layoutStore.isExpand ? '' : 'scroll-right'"
    >
      <!--顶部区域-->
      <div class="layout-right-header">
        <Header />
      </div>
      <!--内容区域-->
      <div class="layout-right-container">
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component v-if="layoutStore.isRefresh" :is="Component"></component>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LogoTitle from './logo/LogoTitle.vue'
import MenuList from './menu/MenuList.vue'
import Header from './header/Header.vue'

import userStore from '@/store/modules/userStore'
import useLayoutStore from '@/store/modules/layoutStore'

// import { getUserInfoApi } from '@/api/user/user'

const useUserStore = userStore()
const layoutStore = useLayoutStore()
const route = useRoute()
const $router = useRouter()

onMounted(() => {
  useUserStore.loadUserInfo()
  // const res = await getUserInfoApi()
  // console.log(res)
})
// console.log($router.path)
const path = ref<string>(route.path)

const goToRoute = (route: string) => {
  $router.push(route)
  path.value = route
}
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
.fade-enter-from {
  transform: scale(0);
}
.fade-enter-active {
  transition: all 0.5s;
}
.fade-enter-to {
  transform: scale(1);
}
.layout-wrapper {
  width: 100%;
  height: 100vh;
  /* background-color: pink; */
  display: flex;
  .layout-left {
    width: $layout-left-width;
    background-color: $layout-left-bg;
    transition: all 0.5s;
    &.scroll-left {
      width: $layout-left-min-width;
      overflow: hidden;
    }
  }
  .layout-right {
    width: calc(100% - $layout-left-width);
    transition: all 0.5s;
    &.scroll-right {
      width: calc(100% - $layout-left-min-width);
    }
    /* background-color: red; */
    .layout-right-header {
      height: $layout-right-header-height;
      /* background-color: skyblue; */
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
