import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000', // Fastify backend base URL
})

// Request interceptor (istek öncesi)
api.interceptors.request.use(config => {
  // Ör: token ekleme
  // config.headers.Authorization = `Bearer ${token}`
  return config
})

// Response interceptor (cevap sonrası)
api.interceptors.response.use(
  response => response,
  error => {
    // Hataları merkezi yönet
    return Promise.reject(error)
  }
)

// Vue plugin objesi
export default {
  install: (app) => {
    app.config.globalProperties.$api = api
    // Ayrıca composition API ile kullanım için provide da yapabilirsin
    app.provide('api', api)
  }
}
