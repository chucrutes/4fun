<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import Button from "@/components/atoms/button.vue";
import DashboardIcon from "@/assets/dashboard-icon.vue";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const { user, logout } = useAuthStore();
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
        <Button :click="() => logout()">
          <FontAwesomeIcon :icon="faSignOut" class="cursor-pointer text-2xl" />
        </Button>
      </div>
    </header>
    <main class="flex flex-col flex-1 bg-secondary">
      <h1>Auth</h1>
      <RouterView />
    </main>
  </div>
</template>
