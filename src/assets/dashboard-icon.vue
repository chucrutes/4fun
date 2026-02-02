<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  variant?: "white" | "blue";
}>();

const colors = {
  white: "#d1d5db",
  blue: "#3498db",
};

const iconColor = computed(() => colors[props.variant || "white"]);
</script>

<template>
  <svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <symbol id="square">
        <rect width="20" height="20" rx="4" />
      </symbol>
      <symbol id="rectangle">
        <rect width="20" height="45" rx="4" />
      </symbol>
    </defs>

    <g :fill="iconColor">
      <use href="#rectangle" x="15" y="5" />
      <use href="#square" x="15" y="55" />

      <use href="#square" x="45" y="5" />
      <use href="#rectangle" x="45" y="30" />
    </g>
  </svg>
</template>
