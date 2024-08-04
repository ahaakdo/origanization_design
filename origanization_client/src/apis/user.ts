import httpInstance from '@/utils/request'

//登录操作
export function loginHandler() {
  return httpInstance({
    url: `/login`,
    method: 'POST'
  })
}

//注册操作
export function registerHandler(params: any) {
  return httpInstance({
    url: `/register`,
    method: 'POST',
    data: params
  })
}