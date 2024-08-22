import { createPinia } from "pinia";
import piniaPluginPersistendstate from "pinia-plugin-persistedstate";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistendstate);
app.use(pinia);
app.use(router);

app.mount("#app");
