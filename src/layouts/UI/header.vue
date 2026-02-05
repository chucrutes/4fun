<script setup lang="ts">
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import Button from "@/components/atoms/button.vue";
import DashboardIcon from "@/assets/dashboard-icon.vue";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const { user, logout } = useAuthStore();

const handleLogout = () => {
  logout();
  router.push("/");
};
</script>

<template>
  <header
    class="grid grid-cols-3 items-center sticky top-0 z-50 bg-primary h-32 p-2"
  >
    <h1>Olá, {{ user?.name }}.</h1>
    <div class="flex justify-center">
      <div class="hover:scale-120">
        <button @click="router.push('/dashboard')">
          <DashboardIcon />
        </button>
      </div>
    </div>
    <div class="px-2 justify-self-end">
      <Button :click="handleLogout">
        <FontAwesomeIcon :icon="faSignOut" class="text-2xl" />
      </Button>
    </div>
  </header>
</template>
