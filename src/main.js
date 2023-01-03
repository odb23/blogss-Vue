import { createApp } from 'vue'
// import {Vue2Editor} from "vue2-editor"

import App from './App.vue'
import router from './router'
import stores from './stores'


const app = createApp(App)

app.use(router)
app.use(stores)
// app.use(Vue2Editor)

app.mount('#app')
