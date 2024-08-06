import httpInstance from '@/utils/request'

type login = {
  token: string
}

//登录操作
export function loginHandler(params: any) {
  return httpInstance<login>({
    url: `/login`,
    method: 'POST',
    data: params
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