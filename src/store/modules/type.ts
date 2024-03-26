import type { RouteRecordRaw } from 'vue-router'
export interface IUserStore {
  token: string | null
  menuList: RouteRecordRaw[]
}
