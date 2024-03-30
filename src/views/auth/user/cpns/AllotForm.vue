<template>
  <div>
    <el-drawer v-model="isShowDrawer">
      <template #header>分配角色</template>
      <template #default>
        <el-form>
          <el-form-item label="用户姓名：">
            <el-input disabled></el-input>
          </el-form-item>
          <el-form-item label="职位列表：">
            <div>
              <el-checkbox v-model="isAllSelect" label="Option 1" size="large">
                全选
              </el-checkbox>
              <el-checkbox-group>
                <el-checkbox value="Online activities" name="type">
                  O
                </el-checkbox>
                <el-checkbox value="Promotion activities" name="type">
                  Pro
                </el-checkbox>
                <el-checkbox value="Offline activities" name="type">
                  Off
                </el-checkbox>
                <el-checkbox value="Simple brand exposure" name="type">
                  S
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button>取消</el-button>
          <el-button type="primary">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts" name="AllotForm">
import { ref } from 'vue'

const isShowDrawer = ref<boolean>(false)
const isAllSelect = ref<boolean>(false)

const openDrawer = () => {
  isShowDrawer.value = true
}
defineExpose({
  openDrawer,
})
</script>

<style lang="scss" scoped></style>
