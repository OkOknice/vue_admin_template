<template>
  <div>
    <el-button type="primary">主要按钮</el-button>
    <Test />
  </div>
</template>

<script setup lang="ts">
import Test from '@/components/Test.vue'
import { loginUser } from './api/user/user'

loginUser().then((res) => {
  // console.log(res.message)
  console.log(res)
})
// import { ref } from 'vue'
// const a = ref<number>(0)
</script>

<style lang="less" scoped></style>
