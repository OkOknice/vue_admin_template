import type { RouteRecordRaw } from 'vue-router'

interface IUserInfo {
  username?: string
  avatar?: string
  userId?: number | string
}
export interface IUserStore {
  token: string | null
  menuList: RouteRecordRaw[]
  userInfo: IUserInfo
}
