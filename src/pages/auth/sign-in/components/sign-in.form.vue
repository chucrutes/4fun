<script setup lang="ts">
import Input from "@/components/atoms/input.vue";
import { useSignInForm } from "../composables/use-sign-in";
import FormField from "@/components/molecules/form-field.vue";
import ErrorSpan from "@/components/atoms/error-span.vue";
import Button from "@/components/atoms/button.vue";

const { email, handleSubmit, password, errors, errorMessage } = useSignInForm();
</script>

<template>
  <form @submit="handleSubmit" class="flex flex-col items-center gap-4">
    <ErrorSpan v-if="errorMessage" :message="errorMessage" />
    <FormField label="E-mail" id="email" :error="errors.email">
      <Input
        id="email"
        name="email"
        type="email"
        v-model="email"
        autocomplete="email"
      />
    </FormField>
    <FormField label="Senha" id="password" :error="errors.password">
      <Input
        id="password"
        name="password"
        type="password"
        v-model="password"
        autocomplete="current-password"
      />
    </FormField>
    <div class="py-2">
      <Button type="submit" size="lg"> Entrar </Button>
    </div>
  </form>
</template>
