/**
 * @author OKOK
 * @date 2024-04-02
 * @desc 路由守卫
 */

import router from '.'
import pinia from '@/store'

// @ts-expect-error 该插件非 TS 写的
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import useUserStore from '@/store/modules/userStore'
import useLayoutStore from '@/store/modules/layoutStore'
import { ElNotification } from 'element-plus'

nprogress.configure({ showSpinner: false })

const userStore = useUserStore(pinia)
const layoutStore = useLayoutStore(pinia)

// 路由权限
router.beforeEach(async (to, form, next) => {
  const token = localStorage.getItem('token')
  const username = userStore.userInfo.username
  nprogress.start()
  // 有 token 的情况下
  if (token) {
    if (to.path === '/login') {
      next({
        path: '/',
      })
      return
    }
    // 看看是否有用户名
    if (username) {
      layoutStore.setMatchList(to.matched) // 设置面包屑
      next()
    } else {
      try {
        await userStore.loadUserInfo()
        layoutStore.setMatchList(to.matched) // 设置面包屑
        next()
      } catch (error) {
        // 清除缓存 跳转回登录页面
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
    // 没有 token 的情况下
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

router.afterEach(() => {
  nprogress.done()
})
