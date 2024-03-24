import { createApp } from 'vue'
import App from './App.vue'

// 导入路由
import router from '@/routers'

// 导入 pinia
import store from './store'

// 集成 element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-expect-error 忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 导入样式
import '@/assets/styles/index.scss'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})

app.use(router)
app.use(store)

app.mount('#app')

console.log(import.meta.env)
