export interface ResponseData {
  code?: number
  message?: string
  ok?: boolean
  data?: any
}

export interface ILoginForm {
  username: string
  password: string
}

export interface IResponseUserInfo {
  code: number
  message?: string
  data?: any
}
