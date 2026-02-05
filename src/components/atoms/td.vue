<script setup lang="ts">
import { computed } from "vue";

export type TdProps = {
  align?: "left" | "center" | "right" | "justify";
};

const props = defineProps<TdProps>();

const alignmentClass = computed(() => {
  const map: Record<string, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
  };
  return map[props.align ?? "center"];
});
</script>

<template>
  <td
    :class="[
      'py-2 px-4 border-b border-b-gray-800 border-r border-gray-800 last:border-r-0 first:border-l-0',
      alignmentClass,
    ]"
  >
    <slot></slot>
  </td>
</template>
