import { ConfigEnv, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
//@ts-expect-error 忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import path from 'path'

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      vue(),
      viteMockServe({
        enable: command === 'serve',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  }
}

// defineConfig({
//   plugins: [vue(), viteMockServe({})],
//   resolve: {
//     alias: {
//       '@': path.resolve('./src'),
//     },
//   },
// })
