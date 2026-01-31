import { createRouter, createWebHistory } from "vue-router";
import { authRoutes } from "@/modules/auth/router";

const router = createRouter({
  history: createWebHistory(),
  routes: [...authRoutes],
});

export default router;
