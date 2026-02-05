<script setup lang="ts">
import Header from "./UI/header.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex flex-col flex-1 bg-secondary px-2">
      <RouterView />
    </main>
  </div>
</template>
