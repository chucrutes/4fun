<script setup lang="ts">
import router from "@/router";
import type { Product } from "@/types/product";
import { Formatters } from "@/utils/formatter.utils";

type ProductCardProps = {
  product: Product;
};

const props = defineProps<ProductCardProps>();
</script>

<template>
  <button
    @click="() => router.push(`/products/${product.id}`)"
    class="py-2 cursor-pointer hover:scale-105"
  >
    <div
      class="border border-gray-900 rounded-2xl w-72 overflow-hidden bg-white hover:shadow-xl transition-all duration-300"
    >
      <div class="aspect-square w-full overflow-hidden bg-gray-100">
        <img
          :src="product.images[0]"
          :alt="product.title"
          crossorigin="anonymous"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div class="p-4">
        <h3 class="text-sm text-gray-500 uppercase tracking-widest">
          {{ product.title }}
        </h3>
        <p class="text-xl font-bold text-gray-900 mt-1">
          R$ {{ Formatters.formatToBrazillianNumber(product.price) }}
        </p>
      </div>
    </div>
  </button>
</template>
