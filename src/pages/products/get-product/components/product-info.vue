<script setup lang="ts">
import type { Product } from "@/types/product";
import { Formatters } from "@/utils/formatter.utils";

interface Props {
  item: Product;
}

defineProps<Props>();
</script>

<template>
  <div class="flex flex-col p-6">
    <div class="text-sm text-gray-500 mb-2 capitalize">
      {{ item.category.name }} / {{ item.slug }}
    </div>

    <H1 :bold="true">{{ item.title }}</H1>

    <div class="text-2xl font-semibold text-blue-600 mb-6">
      R$ {{ Formatters.formatToBrazillianNumber(item.price) }}
    </div>

    <div class="prose prose-sm text-gray-600 mb-8">
      <h3 class="text-gray-900 font-medium mb-2">Descrição</h3>
      <p>{{ item.description }}</p>
    </div>

    <div class="mt-auto pt-6 border-t border-gray-100">
      <div class="flex items-center gap-3">
        <img
          v-if="item.category.image"
          :src="item.category.image"
          class="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p class="text-xs text-gray-400 uppercase tracking-wider font-bold">
            Categoria
          </p>
          <p class="text-sm font-medium text-gray-700">
            {{ item.category.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
