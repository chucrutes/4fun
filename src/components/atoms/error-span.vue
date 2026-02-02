<script setup lang="ts">
type ErrorSpanProps = {
  message: string;
};

const { message } = defineProps<ErrorSpanProps>();
</script>

<template>
  <span class="text-red-500 text-lg mt-1"> {{ message }}</span>
</template>
