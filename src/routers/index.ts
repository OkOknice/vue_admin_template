import { createRouter, createWebHashHistory } from 'vue-router'
import { constRoute } from './constRoute'
import pinia from '@/store'
import useUserStore from '@/store/modules/userStore'
import { ElNotification } from 'element-plus'

const router = createRouter({
  history: createWebHashHistory(),
  routes: constRoute,
})

const userStore = useUserStore(pinia)

// 路由权限
router.beforeEach(async (to, form, next) => {
  const token = localStorage.getItem('token')
  const username = userStore.userInfo.username
  // 有 token 的情况下
  if (token) {
    console.log(username)
    if (to.path === '/login') {
      next({
        path: '/',
      })
      return
    }
    if (username) {
      console.log(username)
      next()
    } else {
      try {
        await userStore.loadUserInfo()
        next()
      } catch (error) {
        console.log(error)
        ElNotification({
          type: 'error',
          message: (error as Error).message,
        })
        localStorage.clear()
        next({
          path: '/login',
          query: {
            redirect: to.path,
          },
        })
      }
    }
  } else {
    if (to.path !== '/login') {
      next({
        path: '/login',
        query: {
          redirect: to.path,
        },
      })
    } else {
      next()
    }
  }
})

export default router
