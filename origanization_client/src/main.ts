import pinia from '@/stores/index'
import { createApp } from 'vue'
import i18n from "@/plugins/i18n";
import '@/styles/common.scss'
import '@/styles/theme.scss'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { setupRouter } from './router'

const app = createApp(App)

app.use(pinia)
app.use(i18n)
setupRouter(app)

app.mount('#app')
