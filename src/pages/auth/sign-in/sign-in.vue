<script setup lang="ts">
import SignInForm from "./components/sign-in.form.vue";
</script>

<template>
  <div class="flex flex-1 justify-center items-center">
    <div class="w-full max-w-xl">
      <div class="pb-4">
        <h1>Acesse sua conta</h1>
      </div>
      <div
        class="border-3 border-primary rounded-2xl py-4 shadow-2xl shadow-primary/20"
      >
        <SignInForm />
      </div>
    </div>
  </div>
</template>
