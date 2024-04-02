/**
 * @author OKOK
 * @date 2024-04-02
 * @desc 初始化请求实例对象
 */

import Client from './request'

const client = new Client({
  baseURL: import.meta.env.VITE_URL,
  timeout: 5000,
})

export default client
