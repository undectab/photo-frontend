import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'

export default defineConfig({
  plugins: [
    vue(),
    Pages(), // 📌 Sayfa yönlendirmeleri için plugin
  ],
  server: {
    host: true, // 📡 dış IP'lerden erişim için gerekli
    allowedHosts: [
      'e2e0921b0c21.ngrok-free.app' // 🌐 ngrok adresin
    ]
  }
})
