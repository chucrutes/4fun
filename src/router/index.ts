import { useAuthStore } from "@/stores/auth";
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

router.beforeEach(async (to, _from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  const authStore = useAuthStore();
  const isUserAuthenticated = authStore.isAuthenticated;

  if (!isUserAuthenticated && requiresAuth) {
    next("/");

    return;
  }

  try {
    await authStore.fetchUser();
  } catch {
    authStore.logout();

    next("/");
    return;
  }

  if (to.path === "/" && isUserAuthenticated) {
    next("/dashboard");
    return;
  }

  next();
});

export default router;
