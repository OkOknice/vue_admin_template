/**
 * @author OKOK
 * @date 2024-04-02
 * @desc 创建路由
 */

import { createRouter, createWebHashHistory } from 'vue-router'

import { constRoute } from './constRoute'

const router = createRouter({
  history: createWebHashHistory(),
  routes: constRoute,
})

export default router
