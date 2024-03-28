<template>
  <div class="logo-wrapper">
    <div
      class="logo-title"
      :class="layoutStore.isExpand ? '' : 'logo-no-title'"
    >
      OKOK管理后台模板
    </div>
  </div>
</template>

<script setup lang="ts">
import useLayoutStore from '@/store/modules/layoutStore'
const layoutStore = useLayoutStore()
</script>

<style lang="scss" scoped>
.logo-wrapper {
  color: #fff;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* transition: all 1s; */
  .logo-title {
    font-size: 20px;
    opacity: 1;
    transition: all 1s;
    &.logo-no-title {
      opacity: 0;
      transition: all 0s;
    }
  }
}
</style>
