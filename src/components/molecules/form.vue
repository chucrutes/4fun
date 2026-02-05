<script setup lang="ts">
type FormProps = {
  handleSubmit: (e?: Event | undefined) => void;
};

defineProps<FormProps>();
</script>

<template>
  <form @submit="handleSubmit" class="flex flex-col items-center gap-4">
    <slot></slot>
  </form>
</template>
