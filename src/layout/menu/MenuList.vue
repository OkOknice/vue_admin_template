<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item v-if="!item.meta.isHidden" :index="item.path">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.routeName }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有子路由但只有一个 --home -->
    <template
      v-if="item.children && item.children.length === 1 && item.path === '/'"
    >
      <el-menu-item
        v-if="!item.children[0].meta.isHidden"
        :index="item.children[0].path"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.routeName }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有子路由但只有一个 --not home -->
    <template
      v-if="item.children && item.children.length === 1 && item.path !== '/'"
    >
      <el-sub-menu :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.routeName }}</span>
        </template>

        <el-menu-item
          v-if="!item.children[0].meta.isHidden"
          :index="item.children[0].path"
        >
          <el-icon>
            <component :is="item.children[0].meta.icon"></component>
          </el-icon>
          <template #title>
            <span>{{ item.children[0].meta.routeName }}</span>
          </template>
        </el-menu-item>
      </el-sub-menu>
    </template>
    <!-- 有子路由且大于一个 -->
    <el-sub-menu
      v-if="item.children && item.children.length > 1"
      :index="item.path"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.routeName }}</span>
      </template>
      <MenuList :menu-list="item.children"></MenuList>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts" name="MenuList">
defineProps(['menuList'])
</script>

<style lang="scss" scoped></style>
