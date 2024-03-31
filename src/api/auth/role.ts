import client from '..'

import type {
  IRolePageParams,
  IRolePageResData,
  IRoleResData,
} from './types/roleType'

enum ROLE_API {
  ROLE_PAGE_API = '/admin/acl/role',
  DELETE_ROLE_API = '/admin/acl/role/remove',
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
  return client.delete<IRoleResData>({
    url: `${ROLE_API.DELETE_ROLE_API}/${id}`,
  })
}
