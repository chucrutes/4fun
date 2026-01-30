<template>
  <div class="flex flex-col min-h-screen">
    <header class="sticky top-0 bg-primary z-50">
      <div class="flex items-center px-6 h-32 relative w-full">
        <div class="flex flex-1 justitfy-start">
          <img src="/logo.png" alt="Logo" width="35" />
        </div>
        <nav class="flex-none">
          <ul class="flex flex-row">
            <Li>Item 1</Li>
            <Li>Item 2</Li>
            <Li>Item 3</Li>
          </ul>
        </nav>
      </div>
      <div class="flex-1"></div>
    </header>
    <main class="flex-1 bg-primary p-4">
      <p class="text-left">teste</p>
    </main>
    <footer class="h-32">
      <h1>Footer area</h1>
    </footer>
  </div>
</template>

<script setup lang="ts">
import Li from "./components/atoms/li.vue";
</script>
