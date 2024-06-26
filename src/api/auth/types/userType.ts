/**
 * @author OKOK
 * @date 2024-04-02
 * @desc 用户 API 的类型定义
 */

import { IRoleInfo } from './roleType'
import type { ICommonResponseResult } from './commonType'

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

// 用户信息
export interface IUserResInfo extends ICommonResponseResult {
  data?: IUser
}

interface IRoleList {
  allRolesList: IRoleInfo[]
  assignRoles: IRoleInfo[]
}
// 用户角色
export interface IUserRoleResData extends ICommonResponseResult {
  data?: IRoleList
}

// 分配用户角色
export interface IReqUserRole {
  roleIdList: number[]
  userId: number
}
