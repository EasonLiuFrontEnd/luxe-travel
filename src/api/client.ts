import axios, { AxiosInstance } from 'axios'

const BASE_URL = 'https://luxetravel-peach.vercel.app'

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error('未授權訪問')
    } else if (error.response?.status >= 500) {
      console.error('伺服器錯誤')
    } else if (error.code === 'ECONNABORTED') {
      console.error('請求超時')
    }
    return Promise.reject(error)
  },
)

export default apiClient
