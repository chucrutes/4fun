import { useAuthStore } from "@/auth/auth.store";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export async function authGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isUserAuthenticated = authStore.isAuthenticated;

  if (requiresAuth && !isUserAuthenticated) {
    return next("/");
  }

  if (isUserAuthenticated) {
    try {
      await authStore.fetchUser();
    } catch (error) {
      authStore.logout();
      return next("/");
    }
  }

  if (to.path === "/" && isUserAuthenticated) {
    return next("/dashboard");
  }

  next();
}
