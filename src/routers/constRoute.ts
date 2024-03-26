import type { RouteRecordRaw } from 'vue-router'

// 常用路由
export const constRoute: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginIndex.vue'),
    meta: {
      routeName: '登录',
      isHidden: true,
    },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/HomeIndex.vue'),
    meta: {
      routeName: '首页',
      isHidden: false,
    },
  },
  {
    path: '/',
    // redirect: '/home',
    name: 'layout',
    component: () => import('@/layout/LayoutIndex.vue'),
    meta: {
      routeName: 'layout',
      isHidden: false,
    },
    children: [
      {
        path: '/test',
        name: 'test',
        component: () => import('@/views/home/HomeIndex.vue'),
        meta: {
          routeName: '测试',
          isHidden: false,
        },
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/404.vue'),
    meta: {
      routeName: '404',
      isHidden: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      routeName: '任意路由',
      isHidden: true,
    },
  },
]
