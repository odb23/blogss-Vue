import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {Vue2Editor} from "vue2-editor"

import App from './App.vue'
import router from './router'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue2Editor)

app.mount('#app')
