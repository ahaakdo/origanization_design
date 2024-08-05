import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUtilStore = defineStore('use-util', () => {
  const loginOrRegister = ref('Login')
  //保存是登录还是注册
  const setLoginType = (newType: any) => {
    loginOrRegister.value = newType
  }
  return {
    loginOrRegister,
    setLoginType
  }
}, {
  persist: true
})