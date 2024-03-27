import { defineStore } from 'pinia'
import { nextTick } from 'vue'

const layoutStore = defineStore('layoutStore', {
  state: () => {
    return {
      isExpand: true,
      isRefresh: true,
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
  },
})

export default layoutStore
