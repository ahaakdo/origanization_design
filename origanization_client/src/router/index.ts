import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import remaining from './modules/remaining'
import type { App } from 'vue'

export const publicRoutes: Array<RouteRecordRaw> = [
  ...remaining
]

const router = createRouter({
  history: createWebHistory(),
  routes: publicRoutes
})

// 初始化路由表
export function resetRoute() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

//导出setupRoute
export const setupRouter = (app: App<Element>) => {
  app.use(router)
}