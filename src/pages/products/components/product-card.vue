<script setup lang="ts">
import { Formatters } from "@/utils/formatter.utils";

type ProductCardProps = {
  name: string;
  price: number;
  image: string | undefined;
  imageAlt?: string;
};

const props = defineProps<ProductCardProps>();
</script>

<template>
  <div
    class="border border-gray-900 rounded-2xl w-72 overflow-hidden bg-white hover:shadow-xl transition-all duration-300"
  >
    <div class="aspect-square w-full overflow-hidden bg-gray-100">
      <img
        :src="image"
        :alt="imageAlt || name"
        crossorigin="anonymous"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    <div class="p-4">
      <h3 class="text-sm text-gray-500 uppercase tracking-widest">
        {{ name }}
      </h3>
      <p class="text-xl font-bold text-gray-900 mt-1">
        R$ {{ Formatters.formatToBrazillianNumber(price) }}
      </p>
    </div>
  </div>
</template>
