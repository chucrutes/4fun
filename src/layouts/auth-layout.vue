<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import Button from "@/components/atoms/button.vue";
import DashboardIcon from "@/assets/dashboard-icon.vue";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import router from "@/router";

const { user, logout } = useAuthStore();

const handleLogout = () => {
  logout();
  router.push("/");
};
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header
      class="grid grid-cols-3 items-center sticky top-0 z-50 bg-primary h-32 p-2"
    >
      <h1>Olá, {{ user?.name }}.</h1>
      <div class="flex justify-center">
        <DashboardIcon />
      </div>
      <div class="px-2 justify-self-end">
        <Button :click="handleLogout">
          <FontAwesomeIcon :icon="faSignOut" class="text-2xl" />
        </Button>
      </div>
    </header>
    <main class="flex flex-col flex-1 bg-secondary px-2">
      <RouterView />
    </main>
  </div>
</template>
