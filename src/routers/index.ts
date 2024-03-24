import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginIndex.vue'),
    },
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/HomeIndex.vue'),
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404/404.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
      name: 'Any',
    },
  ],
})

export default router
