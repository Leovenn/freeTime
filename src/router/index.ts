import { createRouter, createWebHashHistory, RouteRecordRaw, createWebHistory } from 'vue-router'
// import Home from '../components/Home.vue'
// import About from '../components/About.vue'
// import errorPage from '../components/404.vue'
import Home from '@/views/Home.vue'
import Time from '@/views/HelloWorld.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    component: Home,
    meta: {
      transition: 'slide-left',
    },
    children: [
      {
        path: 'workTime',
        component: Time,
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
