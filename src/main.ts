import "./style.css";
import app from "./app.vue";
import router from "./router";
import { createApp } from "vue";
import { createPinia } from "pinia";

createApp(app).use(router).use(createPinia()).mount("#app");
