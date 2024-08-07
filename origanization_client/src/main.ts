import pinia from '@/stores/index'
import { createApp } from 'vue'
import i18n from "@/plugins/i18n";
import '@/styles/common.scss'
import '@/styles/theme.scss'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { setupRouter } from './router'
import Directives from '@/utils/directive/index.js'

const app = createApp(App)

app.use(pinia)
app.use(i18n)
app.use(Directives) //全局注册
setupRouter(app)

app.mount('#app')
