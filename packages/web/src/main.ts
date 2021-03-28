import { createApp } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import App from './App'
import './styles/index.scss'

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('./views/home') },
  { path: '/login', component: () => import('./views/login') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
