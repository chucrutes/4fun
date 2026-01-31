import type { RouteRecordRaw } from "vue-router";
import GuestLayout from "@/layouts/guest-layout.vue";
import SignIn from "../views/sign-in.vue";

export const authRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: SignIn,
    meta: {
      layout: GuestLayout,
    },
  },
];
