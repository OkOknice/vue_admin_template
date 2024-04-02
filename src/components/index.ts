/**
 * @author OKOK
 * @date 2024-04-02
 * @desc 公用组件的导出
 */

import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as commonComponent from './component'

const GlobalComponent = {
  install(app: App) {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    for (const [key, component] of Object.entries(commonComponent.default)) {
      app.component(key, component)
    }
  },
}

export default GlobalComponent
