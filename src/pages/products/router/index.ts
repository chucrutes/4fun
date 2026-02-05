import Dashboard from "../dashboard/dashboard.vue";
import type { RouteRecordRaw } from "vue-router";
import AuthLayout from "@/layouts/auth-layout.vue";
import GetProduct from "../get-product/get-product.vue";

export const productRoutes: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    component: Dashboard,
    meta: {
      layout: AuthLayout,
      requiresAuth: true,
    },
  },
  {
    path: "/products/:id",
    component: GetProduct,
    meta: {
      layout: AuthLayout,
      requiresAuth: true,
    },
    props: true,
  },
];
