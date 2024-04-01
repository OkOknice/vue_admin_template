<template>
  <div>
    <el-table
      :data="menuList"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="code" label="权限值" />
      <el-table-column prop="updateTime" label="修改时间" />
      <el-table-column label="操作">
        <template #default="scoped">
          <el-button
            icon="Plus"
            :disabled="!scoped.row.children.length && scoped.row.level === 4"
            size="small"
            plain
            @click="addMenu(scoped.row)"
          >
            {{ scoped.row.level > 2 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button
            icon="Edit"
            :disabled="scoped.row.level === 1"
            type="primary"
            size="small"
            @click="editMenu(scoped.row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            title="你确定删除该菜单吗?"
            @confirm="deleteMenu(scoped.row.id)"
          >
            <template #reference>
              <el-button
                :disabled="scoped.row.level === 1"
                icon="Delete"
                size="small"
                type="danger"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <WriteMenuForm
      ref="menuFormRef"
      :id="id"
      :pid="pid"
      :level="level"
      :name="name"
      :code="code"
      @refresh-page="getMenu"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

import WriteMenuForm from './cpns/WriteMenuForm.vue'

import { getMenuApi, deleteMenuApi } from '@/api/auth/menu'
import { IMenuInfo } from '@/api/auth/types/roleType'

const menuList = ref<IMenuInfo[]>([])
const id = ref<number>(0)
const pid = ref<number>(0)
const level = ref<number>(1)
const name = ref<string>('')
const code = ref<string>('')

const menuFormRef = ref<InstanceType<typeof WriteMenuForm>>()

onMounted(() => {
  getMenu()
})

const getMenu = async () => {
  const res = await getMenuApi()
  if (res.code === 200) {
    menuList.value = res.data
  }
}

const addMenu = (payload: IMenuInfo) => {
  console.log(payload)
  pid.value = payload.id
  level.value = payload.level + 1
  name.value = ''
  code.value = ''
  id.value = 0
  menuFormRef.value?.openDialog()
}

const editMenu = (payload: IMenuInfo) => {
  console.log(payload)
  id.value = payload.id
  name.value = payload.name
  code.value = payload.code as string
  level.value = payload.level
  pid.value = payload.pid
  menuFormRef.value?.openDialog()
}

const deleteMenu = async (id: number) => {
  const res = await deleteMenuApi(id)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
  getMenu()
}
</script>

<style lang="scss" scoped></style>
