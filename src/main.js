import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import apiPlugin from './plugins/api'

const app = createApp(App)
app.use(apiPlugin)
setupRouter(app)
app.mount('#app')
