<script setup lang="ts">
import DashboardIcon from "@/assets/dashboard-icon.vue";
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen text-center p-6"
  >
    <h1 class="text-6xl font-bold text-primary">404</h1>
    <p class="text-xl mt-4">Ops! Essa página não existe.</p>

    <div class="my-8 opacity-50">
      <DashboardIcon variant="blue" />
    </div>

    <router-link
      to="/"
      class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition"
    >
      Voltar para o Início
    </router-link>
  </div>
</template>
