<script setup lang="ts">
type ArrowButtonProps = {
  label: string;
  click: () => void;
};

defineProps<ArrowButtonProps>();
</script>

<template>
  <button
    @click.stop="click"
    type="button"
    v-bind="$attrs"
    class="absolute top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-opacity opacity-0 group-hover:opacity-100 flex items-center justify-center"
    :aria-label="label"
  >
    <slot></slot>
  </button>
</template>
