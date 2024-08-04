export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: "/",
    component: () => import('@/views/Layout/index.vue'),
  },
]