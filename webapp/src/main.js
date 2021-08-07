import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ClickOutside from './utils/click-outside'
import './assets/styles/index.css'

createApp(App)
  .directive('click-outside', ClickOutside)
  .use(router)
  .mount('#app')
