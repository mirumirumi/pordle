import axios from 'axios'
import App from './App.vue'
import VueAxios from 'vue-axios'
import router from './router/router'
import Toaster from "@/components/modules/vue-toaster"
import { createApp } from 'vue'
import { key, store } from './store/store'

const app = createApp(App)
  .use(router)
  .use(store, key)
  .use(VueAxios, axios)
  .mount('#app')

app.use(Toaster, {
  position: "bottom-right",
  duration: 5555,
}).provide('toast', app.config.globalProperties.$toast)
  
app.mount('#app')
