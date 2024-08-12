import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('use-user', () => {
  const token = ref<string>('')
  //存储token
  const setToken = (val: string) => {
    token.value = val
  }
  return {
    token,
    setToken
  }
}, {
  persist: true
})