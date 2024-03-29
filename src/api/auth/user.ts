import client from '..'

import type {
  IUser,
  IUserPageReqParams,
  IUserPageResData,
  IAddUserResData,
} from './types/userType'

enum USER_API {
  USER_PAGE_API = '/admin/acl/user', // 获取用户管理分页
  USER_ADD_API = '/admin/acl/user/save',
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
  return client.post<IAddUserResData>({
    url: USER_API.USER_ADD_API,
    data: {
      user: data,
    },
  })
}
