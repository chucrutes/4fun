import { authGuard } from "@/guards/auth-guard";
import { authRoutes } from "@/pages/auth/router";
import { productRoutes } from "@/pages/products/router";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...authRoutes,
    ...productRoutes,
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/pages/@fallbacks/not-found.vue"),
    },
  ],
});

router.beforeEach(authGuard);

export default router;
