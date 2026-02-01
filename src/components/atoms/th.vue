<script setup lang="ts">
type ThProps = {
  name: string;
};
const { name } = defineProps<ThProps>();
</script>
<template>
  <th
    class="bg-secondary-900 px-6 py-2 border-b border-b-surface-500 border-r border-surface-500 last:border-r-0 first:border-l-0 text-xs font-semibold text-surface-contrast-light uppercase tracking-wider text-left"
  >
    {{ name }}
  </th>
</template>
