<script setup lang="ts">
type SummaryCardProps = {
  label: string;
  content: string;
};

const props = defineProps<SummaryCardProps>();
</script>

<template>
  <div class="border border-gray-900 rounded-2xl max-w-80">
    <div class="py-2 px-10">
      <div class="flex justify-around items-center">
        <div class="pr-8">
          <h2 class="text-gray-500">{{ label }}</h2>
          <h1>{{ content }}</h1>
        </div>
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
