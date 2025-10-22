import axios, { AxiosInstance } from 'axios'

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://luxetravel-peach.vercel.app'
    : ''

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
    return Promise.reject(error)
  },
)

export default apiClient
