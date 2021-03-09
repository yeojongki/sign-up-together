import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App'
import Home from './views/home'

const routes = [{ path: '/', component: Home }]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
