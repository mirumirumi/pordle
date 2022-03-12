// eslint-disable-next-line
// @ts-nocheck@

import App from "./App.vue"
import axios from "axios"
import VueAxios from "vue-axios"
import router from "./router/router"
import Toaster from "@/components/modules/vue-toaster"
import { createApp } from "vue"
import { createPinia } from "pinia"

const app = createApp(App)
  .use(router)
  .use(createPinia())
  .use(VueAxios, axios)
  .mount("#app")

// app.use(Toaster, {
//   position: "bottom-right",
//   duration: 5555,
// }).provide("toast", app.config.globalProperties.$toast)
  
// app.mount("#app")
