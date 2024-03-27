import { defineStore } from 'pinia'
import { loginUser } from '@/api/user/user'

import { constRoute } from '@/routers/constRoute'

import type { ILoginForm } from '@/api/user/type'
import type { IUserStore } from './types/type'

const useUserStore = defineStore('user', {
  state: (): IUserStore => {
    return {
      token: localStorage.getItem('token'),
      menuList: constRoute,
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
  },
})

export default useUserStore
