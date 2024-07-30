import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Cinnamoroll from '../packages/index.js'

createApp(App)
  .use(Cinnamoroll)
  .mount('#app')
