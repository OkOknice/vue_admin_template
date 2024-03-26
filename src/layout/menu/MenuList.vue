<template>
  <div>
    <el-menu background-color="#001529" text-color="#fff">
      <template v-for="item in menuList" :key="item.path">
        <el-menu-item
          v-if="!item.children && !item.meta?.isHidden"
          :index="item.path"
        >
          {{ item.meta?.routeName }}
        </el-menu-item>
        <el-menu-item
          v-if="
            item.children && item.children.length === 1 && !item.meta?.isHidden
          "
          :index="item.path"
        >
          {{ item.children[0]?.meta?.routeName }}
        </el-menu-item>
        <template
          v-if="
            item.children && item.children.length > 1 && !item.meta?.isHidden
          "
        >
          <el-sub-menu :index="item.path">
            <template #title>{{ item.meta?.routeName }}</template>
            <!--组件递归-->
            <MenuList :menu-list="item.children" />
          </el-sub-menu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
defineProps({
  menuList: Array<RouteRecordRaw>,
})
</script>
<script lang="ts">
export default {
  name: 'MenuList',
}
</script>

<style lang="less" scoped></style>
