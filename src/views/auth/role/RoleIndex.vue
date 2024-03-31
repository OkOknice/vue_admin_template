<template>
  <div class="role-wrapper">
    <div class="role-header">
      <el-card style="height: 75px">
        <div class="role-card">
          <div>
            <el-form style="width: 300px">
              <el-form-item label="职位搜索：">
                <el-input
                  v-model="roleName"
                  placeholder="请输入职位名"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="btn">
            <el-button type="primary" @click="searchPageDate">搜索</el-button>
            <el-button type="primary" plain @click="resetSearch">
              重置
            </el-button>
          </div>
        </div>
      </el-card>
    </div>
    <div class="role-table">
      <el-card>
        <div class="table-btn">
          <el-button type="primary" icon="Plus" @click="addRole">
            添加职位
          </el-button>
        </div>
        <el-table border :data="roleList" style="width: 100%">
          <el-table-column
            label="序号"
            align="center"
            type="index"
            width="70"
          />
          <el-table-column label="ID" align="center" prop="id" />
          <el-table-column
            label="职位名称"
            align="center"
            prop="roleName"
            show-overflow-tooltip
          />
          <el-table-column
            label="创建时间"
            align="center"
            prop="createTime"
            show-overflow-tooltip
          />
          <el-table-column
            label="更新时间"
            align="center"
            prop="updateTime"
            show-overflow-tooltip
          />
          <el-table-column label="操作" width="300px" align="center">
            <template #default="scoped">
              <el-button
                icon="User"
                type="primary"
                size="small"
                plain
                @click="openAssignRole(scoped.row)"
              >
                分配角色
              </el-button>
              <el-button
                icon="Edit"
                type="primary"
                size="small"
                @click="edieRole(scoped.row)"
              >
                编辑
              </el-button>
              <el-popconfirm
                title="你确定删除该角色吗?"
                @confirm="deleteRole(scoped.row.id)"
              >
                <template #reference>
                  <el-button icon="Delete" size="small" type="danger">
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-footer">
          <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 15, 20]"
            layout="prev, pager, next, jumper, ->, total, sizes"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
    </div>
    <WriteRoleForm
      :id="roleId"
      :roleName="roleFormName"
      ref="writeRoleFormRef"
      @refres-page="getRolePage"
    />
    <AssignRole :id="roleId" ref="assignRoleRef" @refres-page="getRolePage" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getRolePageApi, deleteRoleApi } from '@/api/auth/role'

import type { IRoleInfo, IRolePageParams } from '@/api/auth/types/roleType'

import WriteRoleForm from './cpns/WriteRoleForm.vue'
import AssignRole from './cpns/AssignRole.vue'

const pageNo = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>(0)
const roleName = ref<string>('')
const roleList = ref<IRoleInfo[]>([])
const roleId = ref<number>(0)
const roleFormName = ref<string>('')

const writeRoleFormRef = ref<InstanceType<typeof WriteRoleForm>>()
const assignRoleRef = ref<InstanceType<typeof AssignRole>>()

onMounted(() => {
  getRolePage()
})

const getRolePage = async () => {
  const params: IRolePageParams = {
    page: pageNo.value,
    limit: pageSize.value,
    roleName: roleName.value,
  }
  const res = await getRolePageApi(params)
  if (res.code === 200 && res.data) {
    roleList.value = res.data.records
    total.value = res.data.total
  }
}

const openAssignRole = (payload: IRoleInfo) => {
  roleId.value = payload.id
  assignRoleRef.value?.openDrawer()
}

const addRole = () => {
  roleId.value = 0
  roleFormName.value = ''
  writeRoleFormRef.value?.openDialog()
}

const edieRole = (payload: IRoleInfo) => {
  roleId.value = payload.id
  roleFormName.value = payload.roleName
  writeRoleFormRef.value?.openDialog()
}

const deleteRole = async (id: number) => {
  const res = await deleteRoleApi(id)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getRolePage()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

const resetSearch = () => {
  roleName.value = ''
  pageNo.value = 1
  getRolePage()
}
const searchPageDate = () => {
  pageNo.value = 1
  getRolePage()
}
const handleSizeChange = (size: number) => {
  pageSize.value = size
  pageNo.value = 1
  getRolePage()
}
const handleCurrentChange = (num: number) => {
  pageNo.value = num
  getRolePage()
}
</script>

<style lang="scss" scoped>
.role-header {
  /* display: flex; */
  .role-card {
    display: flex;
    justify-content: space-between;
  }
}
.role-table {
  margin-top: 20px;
  .table-btn {
    margin-bottom: 20px;
  }
  .table-footer {
    margin-top: 20px;
  }
}
</style>
