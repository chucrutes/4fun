<script setup lang="ts">
interface Props {
  bold?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  bold: false,
});
</script>

<template>
  <h2 :class="[{ 'font-bold': props.bold }]">
    <slot></slot>
  </h2>
</template>
