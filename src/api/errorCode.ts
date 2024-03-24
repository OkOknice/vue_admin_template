import { ElMessage } from 'element-plus'

export const getErrorCode = (code: number, error: any) => {
  let message = ''
  switch (code) {
    case 401:
      message = '未登录'
      break
    case 403:
      message = '登录过期，请重新登录'
      break
    case 404:
      message = '网络请求不存在'
      break
    case 500:
      message = '服务器出现问题'
      break
    default:
      message = error.response?.data?.message
      break
  }
  ElMessage({
    type: 'error',
    message,
  })
}
