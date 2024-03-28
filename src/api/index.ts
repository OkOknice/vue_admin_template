import Client from './request'

const client = new Client({
  baseURL: import.meta.env.VITE_URL,
  timeout: 5000,
})

export default client
