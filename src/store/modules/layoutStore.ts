/**
 * @author OKOK
 * @date 2024-04-02
 * @desc 布局 store
 */

import { defineStore } from 'pinia'
import { nextTick } from 'vue'

const layoutStore = defineStore('layoutStore', {
  state: () => {
    return {
      isExpand: true,
      isRefresh: true,
      matchList: [],
    }
  },
  actions: {
    changeIsExpand() {
      this.isExpand = !this.isExpand
    },
    changeIsRefresh() {
      this.isRefresh = false
      nextTick(() => {
        this.isRefresh = true
      })
    },
    setMatchList(payload: any) {
      payload = payload.filter((item: any) => {
        return item.path !== '/'
      })
      this.matchList = payload
    },
  },
})

export default layoutStore
