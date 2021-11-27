import { createRouter, createWebHashHistory, RouteRecordRaw, createWebHistory } from 'vue-router'
// import Home from '../components/Home.vue'
// import About from '../components/About.vue'
// import errorPage from '../components/404.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    component: () => import('@/views/Home.vue'),
    meta: {
      transition: 'slide-left',
    },
    children: [
      {
        path: 'workTime',
        component: () => import('@/views/HelloWorld.vue'),
      },
      {
        path: 'hours',
        component: () => import('@/views/Hours.vue'),
      },
    ],
  },
  {
    path: '/',
    redirect: '/home',
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export { router }
