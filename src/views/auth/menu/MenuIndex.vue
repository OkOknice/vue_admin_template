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
            :disabled="!scoped.row.children.length && scoped.row.level !== 1"
            size="small"
            plain
          >
            {{ scoped.row.level > 2 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button
            icon="Edit"
            :disabled="scoped.row.level === 1"
            type="primary"
            size="small"
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getMenuApi, deleteMenuApi } from '@/api/auth/menu'
import { IMenuInfo } from '@/api/auth/types/roleType'
import { ElMessage } from 'element-plus'

const menuList = ref<IMenuInfo[]>([])

onMounted(() => {
  getMenu()
})

const getMenu = async () => {
  const res = await getMenuApi()
  if (res.code === 200) {
    menuList.value = res.data
  }
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
