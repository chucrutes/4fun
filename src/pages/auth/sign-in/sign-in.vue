<script setup lang="ts">
import SignInForm from "./components/sign-in.form.vue";
import H1 from "@/components/atoms/h1.vue";
</script>

<template>
  <div class="flex flex-1 justify-center items-center">
    <div class="w-full max-w-xl">
      <div class="pb-4">
        <H1>Acesse sua conta</H1>
      </div>
      <div
        class="border-3 border-primary rounded-2xl py-4 shadow-2xl shadow-primary/20"
      >
        <SignInForm />
      </div>
    </div>
  </div>
</template>
