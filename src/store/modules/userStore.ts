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
      userInfo: {
        avatar: '',
        username: '',
      },
    }
  },
  actions: {
    async loginAction(data: ILoginForm) {
      const res = await loginUser(data)
      console.log(res)
      if (res.code === 200 && res.data) {
        this.token = res.data
        localStorage.setItem('token', res.data)
        return ''
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    // 获取用户信息
    async loadUserInfo() {
      const res = await getUserInfoApi()
      if (res.code === 200) {
        // this.userInfo.userId = res.data.checkUser.userId
        this.userInfo.avatar = res.data.avatar
        this.userInfo.username = res.data.name
        return 'ok'
      } else {
        return Promise.reject(new Error('登录失效'))
      }
    },
    // 清除用户信息
    async clearUserInfo() {
      this.token = ''
      this.userInfo = {
        username: '',
        avatar: '',
      }
      localStorage.removeItem('token')
    },
  },
})

export default useUserStore
