<script setup lang="ts">
import ErrorSpan from "@/components/atoms/error-span.vue";
type FormFieldrops = {
  label: string;
  id: string;
  error?: string;
};

defineProps<FormFieldrops>();
</script>

<template>
  <div class="flex flex-col w-full max-w-sm gap-1">
    <label :for="id" class="text-left font-medium text-xl">
      {{ label }}
    </label>
    <slot></slot>
    <ErrorSpan v-if="error" :message="error" />
  </div>
</template>
