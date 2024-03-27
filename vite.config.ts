import path from 'path'
import { ConfigEnv, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      vue(),
      viteMockServe({
        localEnabled: command === 'serve',
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd()), 'src/assets/icons'],
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/assets/styles/variable.scss";',
        },
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
