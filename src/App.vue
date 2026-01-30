<script setup lang="ts">
import { ref } from "vue";
import Input from "./components/atoms/input.vue";

const email = ref("");
const password = ref("");
</script>

<template>
  <main>
    <form action="">
      <label for="email">
        Email:
        <Input
          v-model="password"
          name="email"
          type="email"
          placeholder="Enter your email"
        />
      </label>
      <label for="password">
        password:
        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
          v-model="email"
        />
      </label>
    </form>
  </main>
</template>
