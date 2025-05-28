import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Importe o CSS do Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@/assets/styles/colors.css';

createApp(App)
  .use(router)
  .mount('#app')
