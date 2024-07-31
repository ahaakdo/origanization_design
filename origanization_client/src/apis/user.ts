import httpInstance from '@/utils/request'

export function loginHandler() {
  return httpInstance({
    url: `/login`,
    method: 'POST'
  })
}

export function registerHandler() {
  return httpInstance({
    url: `/register`,
    method: 'POST'
  })
}

export function getCode() {
  return httpInstance({
    url: `/verifyCode`,
    method: 'POST'
  })
}