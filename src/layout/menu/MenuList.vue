<template>
  <div>
    <template v-for="item in menuList" :key="item.path">
      <el-menu-item
        v-if="!item.children && !item.meta?.isHidden"
        :index="item.path"
      >
        <el-icon>
          <component :is="item?.meta?.icon" />
        </el-icon>
        <template #title>
          {{ item.meta?.routeName }}
        </template>
      </el-menu-item>
      <el-menu-item
        v-if="
          item.children && item.children.length === 1 && !item.meta?.isHidden
        "
        :index="item.path"
      >
        <el-icon>
          <component :is="item.children[0]?.meta?.icon" />
        </el-icon>
        <template #title>
          {{ item.children[0]?.meta?.routeName }}
        </template>
      </el-menu-item>
      <template
        v-if="item.children && item.children.length > 1 && !item.meta?.isHidden"
      >
        <el-sub-menu :index="item.path">
          <template #title>
            <el-icon>
              <component :is="item.meta?.icon" />
            </el-icon>
            {{ item.meta?.routeName }}
          </template>
          <!--组件递归-->
          <MenuList :menu-list="item.children" />
        </el-sub-menu>
      </template>
    </template>
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

<style lang="scss" scoped></style>
