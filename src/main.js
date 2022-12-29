import { createApp } from 'vue'
// import {Vue2Editor} from "vue2-editor"

import App from './App.vue'
import router from './router'


const app = createApp(App)

app.use(router)
// app.use(Vue2Editor)

app.mount('#app')
