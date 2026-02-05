<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import GuestLayout from "@/layouts/guest-layout.vue";
import Toast from "./components/toast.vue";

const route = useRoute();

const layout = computed(() => {
  return route.meta.layout || GuestLayout;
});
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
  <Toast />
</template>
