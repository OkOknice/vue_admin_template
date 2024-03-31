interface ICommonResponseResult {
  code: number
  message: string
  ok: boolean
}
// 分页入参数
export interface IRolePageParams {
  page: number
  limit: number
  roleName?: string
}
// 角色信息
export interface IRoleInfo {
  id: number
  roleName: string
  remark: string | null
  ceateTime: string
  updateTime: string
}
// 分页返回数据
export interface IRolePageResData extends ICommonResponseResult {
  data?: {
    records: IRoleInfo[]
    total: number
    size: number
    pages: number
  }
}

// 返回数据
export interface IRoleResData extends ICommonResponseResult {
  data?: null
}
