import "./style.css";
import App from "./App.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";

createApp(App).use(createPinia()).mount("#app");

createApp(App).mount("#app");
