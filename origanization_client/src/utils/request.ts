//axios封装
import axios from "axios";
import { ElMessage } from 'element-plus'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useUserStore } from "@/stores";

const httpInstance = axios.create({
  baseURL: 'http://127.0.0.1:3000/api',
  timeout: 5000
})
// 请求队列
const RequestList = new Set<string>()
// 响应队列
const ResponseMap = new Map<string, any>()
// 生成唯一标识
function generateKey(config: AxiosRequestConfig): string {
  return `${config.url}&${config.method}`
}

// 添加请求拦截器
httpInstance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log(RequestList);
  console.log(ResponseMap);

  const key = generateKey(config)
  // console.log(key);
  // 请求队列中是否有当前请求 有则返回最新请求
  if (RequestList.has(key))
    return Promise.resolve(ResponseMap.get(key))
  // 重复请求时，忽略后面的请求
  if (RequestList.has(key))
    return Promise.reject(new Error('重复请求'))
  // 请求队列中添加当前请求
  RequestList.add(key)
  const stores = useUserStore()
  const token = stores.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 响应成功处理函数
async function successHandler(response: AxiosResponse) {
  // 请求队列中移除当前请求
  const key = generateKey(response.config)
  RequestList.delete(key)
  // 响应队列中添加当前响应
  ResponseMap.set(key, response)
  switch (response.data.status) {
    case 200:
      // 成功返回的处理逻辑
      return await Promise.resolve(response.data)
    case 201:
      // 成功创建的处理逻辑
      return await Promise.resolve(response.data)
    case 204:
      // 成功删除的处理逻辑
      return await Promise.resolve(response.data)
    default:
      return await Promise.reject(response.data)
  }
}

// 响应错误处理函数
async function errorHandler(response: AxiosResponse) {
  // 请求队列中移除当前请求
  const key = generateKey(response.config)
  RequestList.delete(key)
  //   const userStore = useUserStore()
  switch (response.data.status) {
    case 400:
      console.log(response.data.status)
      ElMessage.error(response.data.message)
      return await Promise.reject(response.data)
    case 401:
      console.log(response.data.status)
      ElMessage.error(response.data.message)
      //   userStore.logout()
      return await Promise.reject(response.data)
    case 402:
      console.log(response.data.status)
      ElMessage.error(response.data.message)
      //   userStore.logout()
      return await Promise.reject(response.data)
    case 403:
      console.log(response.data.status)
      ElMessage.error(response.data.message)
      //   userStore.logout()
      return await Promise.reject(response.data)
    case 404:
      console.log(response.data.status)
      ElMessage.error(response.data.message)
      return await Promise.reject(response.data)
    default:
      throw new Error('系统未知错误，请反馈给管理员')
  }
}

// 添加响应拦截器
httpInstance.interceptors.response.use(async function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  console.log(response.data)
  if (response.data.status >= 400) {
    // ElMessage.error(response.data.message)
    return await errorHandler(response)
  } else {
    return await successHandler(response)
  }
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default httpInstance