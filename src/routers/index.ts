import { createRouter, createWebHashHistory } from 'vue-router'

import { constRoute } from './constRoute'

const router = createRouter({
  history: createWebHashHistory(),
  routes: constRoute,
})

export default router
