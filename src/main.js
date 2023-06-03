import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'

const { VITE_DEVMODE } = import.meta.env

if (VITE_DEVMODE) {
  const link = document.querySelector("link[rel~='icon']")
  link.href = '/favicon_DEV.ico'
}
createApp(App).use(router).use(store).mount('#app')
