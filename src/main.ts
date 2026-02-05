import "./style.css";
import App from "./app.vue";
import router from "./router";
import { createPinia } from "pinia";
import { apolloClient } from "@/graphql/apollo";
import { createApp, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";

const app = createApp({
  render: () => h(App),
});

app.provide(DefaultApolloClient, apolloClient);

app.use(router).use(createPinia()).mount("#app");
