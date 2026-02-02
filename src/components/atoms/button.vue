<script setup lang="ts">
type ButtonProps = {
  click?: (event: MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  disabled?: boolean;
};

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
  size: "md",
  isLoading: false,
  disabled: false,
});

const variants = {
  primary: "bg-primary text-white hover:bg-primary-dark border-transparent",
  outline: "border-2 border-primary text-primary hover:bg-primary/5",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-8 py-3 text-lg",
};
</script>

<template>
  <button
    @click="click"
    :type="type"
    :disabled="disabled || isLoading"
    class="font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    :class="[variants[variant], sizes[size]]"
  >
    <slot></slot>
  </button>
</template>
