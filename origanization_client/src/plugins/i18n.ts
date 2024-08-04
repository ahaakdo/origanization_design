import { createI18n } from 'vue-i18n'
import { messages } from './messages'

const i18n = createI18n({
  legacy: false, //处理报错信息
  locale: localStorage.getItem('lang') || 'zh',
  messages
})

export default i18n