/**
 * @author OKOK
 * @date 2024-04-02
 * @desc 用户请求的 mock 类型接口定义
 */

interface ICommonResponseResult {
  code: number
  message: string
  ok: boolean
}
export interface ILoginForm {
  username: string
  password: string
}

export interface ILoginResponseData extends ICommonResponseResult {
  data: string
}

export interface IResponseUserInfo extends ICommonResponseResult {
  data: IUserInfo
}
interface IUserInfo {
  name: string
  avatar: string
  buttons: string[]
  roles: string[]
  routes: string[]
}
