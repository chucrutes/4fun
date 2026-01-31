<script setup lang="ts">
import Input from "@/components/atoms/input.vue";
import { useSignInForm } from "../composables/use-sign-in";
import FormField from "@/components/molecules/form-field.vue";

const { email, handleSubmit, password, errors } = useSignInForm();
</script>

<template>
  <form @submit="handleSubmit" class="flex flex-col items-center gap-4">
    <FormField label="E-mail" id="email" :error="errors.email">
      <Input
        id="email"
        name="email"
        type="email"
        v-model="email"
        autocomplete="email"
        v-placeholder="null"
      />
    </FormField>
    <FormField label="Senha" id="password" :error="errors.password">
      <Input
        id="password"
        name="password"
        type="password"
        v-model="password"
        autocomplete="password"
      />
    </FormField>
    <button class="p-2" type="submit">Entrar</button>
  </form>
</template>
