import client from '..'

import type {
  IRolePageParams,
  IRolePageResData,
  IConfirmRole,
  IMenuList,
  IAssignRoleReq,
} from './types/roleType'

import type { IResData } from './types/commonType'

enum ROLE_API {
  ROLE_PAGE_API = '/admin/acl/role', // 角色分页
  DELETE_ROLE_API = '/admin/acl/role/remove', // 删除角色
  ROLE_INFO_API = '/admin/acl/role/get', // 角色信息
  ADD_ROLE_API = '/admin/acl/role/save', // 新增角色
  UPDATE_ROLE_API = '/admin/acl/role/update', // 更新角色
  ASSIGN_ALL_ROLE_API = '/admin/acl/permission/toAssign', // 获取分配角色
  ASSIGN_ROLE_API = '/admin/acl/permission/doAssign', // 分配角色
}

// 获取角色数据分页
export const getRolePageApi = (params: IRolePageParams) => {
  return client.get<IRolePageResData>({
    url: `${ROLE_API.ROLE_PAGE_API}/${params.page}/${params.limit}`,
    params: {
      roleName: params.roleName || undefined,
    },
  })
}

// 删除角色
export const deleteRoleApi = (id: number) => {
  return client.delete<IResData>({
    url: `${ROLE_API.DELETE_ROLE_API}/${id}`,
  })
}

// 新增角色
export const addRoleApi = (data: IConfirmRole) => {
  return client.post<IResData>({
    url: ROLE_API.ADD_ROLE_API,
    data,
  })
}

// 编辑角色
export const updateRoleApi = (data: IConfirmRole) => {
  return client.put<IResData>({
    url: ROLE_API.UPDATE_ROLE_API,
    data,
  })
}

// 获取分配角色
export const getMenuRoleApi = (id: number) => {
  return client.get<IMenuList>({
    url: `${ROLE_API.ASSIGN_ALL_ROLE_API}/${id}`,
  })
}

// 分配角色
export const assignRoleApi = (data: IAssignRoleReq) => {
  return client.post<IResData>({
    url: `${ROLE_API.ASSIGN_ROLE_API}?roleId=${data.roleId}&permissionId=${data.permissionId}`,
  })
}
