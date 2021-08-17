import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ClickOutside from './utils/click-outside'
import CKEditor from '@ckeditor/ckeditor5-vue'
import './assets/styles/index.css'

createApp(App)
  .directive('click-outside', ClickOutside)
  .use(router)
  .use(CKEditor)
  .mount('#app')
