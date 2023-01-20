import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import stores from "./stores";
import { auth } from "./firebase/firebaseInit";

import Vue3editor from "vue3-editor";

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(Vue3editor);
    app.use(router);
    app.use(stores);

    app.mount("#app");
  }
});
