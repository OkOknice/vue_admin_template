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

export interface IConfirmRole {
  id: number
  roleName: string
}

// 分配角色
export interface IMenuInfo {
  id: number
  createTime: string
  updateTime: string
  pid: 0
  name: string
  code: string | null
  toCode: string | null
  type: number
  status: number | null
  level: number
  select: boolean
  children: []
}
// export interface IMenuData extends IMenuInfo {
//   children: IMenuInfo[]
// }

export interface IMenuList extends ICommonResponseResult {
  data: IMenuInfo[]
}

export interface IAssignRoleReq {
  roleId: number
  permissionId: number[]
}
