import Dashboard from "../dashboard/dashboard.vue";
import type { RouteRecordRaw } from "vue-router";
import AuthLayout from "@/layouts/auth-layout.vue";

export const productRoutes: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    component: Dashboard,
    meta: {
      layout: AuthLayout,
      requiresAuth: true,
    },
  },
];
