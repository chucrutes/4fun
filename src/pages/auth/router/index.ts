import SignIn from "../sign-in/sign-in.vue";
import type { RouteRecordRaw } from "vue-router";
import GuestLayout from "@/layouts/guest-layout.vue";

export const authRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: SignIn,
    meta: {
      layout: GuestLayout,
    },
  },
];
