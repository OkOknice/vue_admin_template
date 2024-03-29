interface ICommonResponseResult {
  code: number
  message: string
  ok: boolean
}

// 请求分页入参
export interface IUserPageReqParams {
  page: number
  limit: number
  username?: string
}

export interface IUser {
  id: number
  createTime?: string
  updateTime?: string
  username: string
  password?: string
  name: string
  phone?: string
  roleName?: string
}
// 分页响应参数
export interface IUserPageResData extends ICommonResponseResult {
  data: {
    records: IUser[]
    total: number
    size: number
    pages: number
  }
}

export interface IAddUserResData extends ICommonResponseResult {
  data?: null
}