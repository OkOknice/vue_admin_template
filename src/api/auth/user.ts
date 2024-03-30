import client from '..'

import type {
  IUser,
  IUserPageReqParams,
  IUserPageResData,
  IUserResData,
  IUserResInfo,
  IUserRoleResData,
  IReqUserRole,
} from './types/userType'

enum USER_API {
  USER_PAGE_API = '/admin/acl/user', // 获取用户管理分页
  USER_ADD_API = '/admin/acl/user/save', // 新增用户
  USER_INFO_API = '/admin/acl/user/get', // 获取用户信息
  USER_UPDATE_API = '/admin/acl/user/update', // 更新用户信息
  DELETE_USER_API = '/admin/acl/user/remove', // 删除用户
  BATCH_USER_API = '/admin/acl/user/batchRemove', // 批量删除
  USER_ROLE_API = '/admin/acl/user/toAssign', // 用户角色
  ASSIGN_USER_ROLE_API = '/admin/acl/user/doAssignRole',
}

// 获取分页数据
export const getUserPageApi = (data: IUserPageReqParams) => {
  return client.get<IUserPageResData>({
    url: `${USER_API.USER_PAGE_API}/${data.page}/${data.limit}`,
    params: {
      username: data.username || undefined,
    },
  })
}

// 添加用户
export const addUserApi = (data: IUser) => {
  return client.post<IUserResData>({
    url: USER_API.USER_ADD_API,
    data: data,
  })
}

//获取用户信息
export const getUserInfoResApi = (id: number) => {
  return client.get<IUserResInfo>({
    url: `${USER_API.USER_INFO_API}/${id}`,
  })
}

// 更新用户信息
export const updateUserInfoApi = (data: IUser) => {
  return client.put<IUserResData>({
    url: USER_API.USER_UPDATE_API,
    data,
  })
}

// 删除用户
export const deleteUserApi = (id: number) => {
  return client.delete<IUserResData>({
    url: `${USER_API.DELETE_USER_API}/${id}`,
  })
}

// 批量删除用户
export const deleteAllUserApi = (data: number[]) => {
  return client.delete<IUserResData>({
    url: USER_API.BATCH_USER_API,
    data,
  })
}

// 获取用户角色
export const getUserRoleApi = (id: number) => {
  return client.get<IUserRoleResData>({
    url: `${USER_API.USER_ROLE_API}/${id}`,
  })
}

// 分配用户角色
export const assginUserRoleApi = (data: IReqUserRole) => {
  return client.post<IUserResData>({
    url: USER_API.ASSIGN_USER_ROLE_API,
    data,
  })
}
