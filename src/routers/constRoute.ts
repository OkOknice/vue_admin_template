/**
 * @author OKOK
 * @date 2024-04-02
 * @desc 常用路由模块
 */

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
    path: '/',
    redirect: '/home',
    name: 'layout',
    component: () => import('@/layout/LayoutIndex.vue'),
    meta: {
      routeName: 'layout',
      isHidden: false,
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/HomeIndex.vue'),
        meta: {
          routeName: '首页',
          isHidden: false,
          icon: 'House',
        },
      },
    ],
  },
  {
    path: '/screen',
    name: 'Screen',
    component: () => import('@/views/screen/ScreenIndex.vue'),
    meta: {
      routeName: '数据大屏',
      icon: 'Monitor',
    },
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/layout/LayoutIndex.vue'),
    meta: {
      routeName: '权限管理',
      icon: 'Lock',
    },
    children: [
      {
        path: '/auth/user',
        name: 'User',
        component: () => import('@/views/auth/user/UserIndex.vue'),
        meta: {
          routeName: '用户管理',
          icon: 'UserFilled',
        },
      },
      {
        path: '/auth/role',
        name: 'Role',
        component: () => import('@/views/auth/role/RoleIndex.vue'),
        meta: {
          routeName: '角色管理',
          icon: 'Avatar',
        },
      },
      {
        path: '/auth/menu',
        name: 'Permission',
        component: () => import('@/views/auth/menu/MenuIndex.vue'),
        meta: {
          routeName: '菜单管理',
          icon: 'Operation',
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
