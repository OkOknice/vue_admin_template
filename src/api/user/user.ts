import client from '..'
import type { ResponseData, ILoginForm } from './type'

// 用户接口 API 的管理
enum USER_API {
  LOGIN_API = '/api/user/login', // 登录 API
  GET_USER_INFO_API = '/api/user/info', // 获取用户信息 API
}

export const loginUser = (data: ILoginForm) => {
  return client.post<ResponseData>({
    url: USER_API.LOGIN_API,
    data,
  })
}
