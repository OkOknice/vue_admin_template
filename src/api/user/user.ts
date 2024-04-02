/**
 * @author OKOK
 * @date 2024-04-02
 * @desc 用户 mock 请求接口
 */

import client from '..'
import type { ILoginResponseData, ILoginForm, IResponseUserInfo } from './type'

// 用户接口 API 的管理
enum USER_API {
  LOGIN_API = '/admin/acl/index/login', // 登录 API
  GET_USER_INFO_API = '/admin/acl/index/info', // 获取用户信息 API
  LOGIN_OUT_API = '/admin/acl/index/logout',
}

export const loginUser = (data: ILoginForm) => {
  return client.post<ILoginResponseData>({
    url: USER_API.LOGIN_API,
    data,
  })
}

export const getUserInfoApi = () => {
  return client.get<IResponseUserInfo>({
    url: USER_API.GET_USER_INFO_API,
  })
}

export const loginoutApi = () => {
  return client.get<any>({
    url: USER_API.LOGIN_OUT_API,
  })
}
