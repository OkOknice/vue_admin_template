import { defineStore } from 'pinia'
import { loginUser, getUserInfoApi } from '@/api/user/user'

import { constRoute } from '@/routers/constRoute'

import type { ILoginForm } from '@/api/user/type'
import type { IUserStore } from './types/type'

const useUserStore = defineStore('user', {
  state: (): IUserStore => {
    return {
      token: localStorage.getItem('token'),
      menuList: constRoute,
      userInfo: {},
    }
  },
  actions: {
    async loginAction(data: ILoginForm) {
      const res = await loginUser(data)
      if (res.code === 200 && res.data) {
        this.token = res.data.token
        localStorage.setItem('token', res.data.token)
        return ''
      } else {
        return Promise.reject(new Error(res.data.message))
      }
    },
    // 获取用户信息
    async loadUserInfo() {
      const res = await getUserInfoApi()
      if (res.code === 200) {
        this.userInfo.userId = res.data.checkUser.userId
        this.userInfo.avatar = res.data.checkUser.avatar
        this.userInfo.username = res.data.checkUser.username
      }
    },
    // 清除用户信息
    async clearUserInfo() {
      this.token = ''
      this.userInfo = {}
      localStorage.removeItem('token')
    },
  },
})

export default useUserStore
