<script setup lang="ts">
import { onMounted, ref } from "vue";
import H1 from "@/components/atoms/h1.vue";
import type { Product } from "@/types/product";
import { ProductApi } from "../services/product-api";
import { CategoryApi } from "../services/category-api";
import ProductTable from "../components/product.table.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SummaryCard from "@/components/molecules/summary-card.vue";
import { faBoxOpen, faGrip } from "@fortawesome/free-solid-svg-icons";

const products = ref<Product[]>([]);
const activeCategories = ref("");
const isLoading = ref(true);

onMounted(async () => {
  try {
    const [prodRes, catRes] = await Promise.all([
      ProductApi.getProducts(),
      CategoryApi.getCategories(),
    ]);

    if (prodRes.success) products.value = prodRes.data;
    if (catRes.success) activeCategories.value = catRes.data.length.toString();
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="flex flex-col">
    <div class="py-16">
      <H1>Dashboard</H1>
    </div>
    <div
      class="gap-y-4 flex flex-col items-center md:flex-row md:flex-wrap md:justify-center md:gap-x-4 md:gap-y-0"
    >
      <div
        v-if="isLoading"
        class="bg-gray-100 rounded-xl p-5 border border-gray-200 animate-pulse"
      >
        <div class="h-4 bg-gray-300 rounded-md w-1/2 mb-4"></div>
        <div class="h-8 bg-gray-300 rounded-md w-1/4"></div>
      </div>
      <SummaryCard label="Produtos" :content="products.length.toFixed(0)">
        <FontAwesomeIcon :icon="faBoxOpen" size="2xl" />
      </SummaryCard>
      <SummaryCard label="Categorias ativas" :content="activeCategories">
        <FontAwesomeIcon :icon="faGrip" size="2xl" />
      </SummaryCard>
    </div>
    <div class="py-16">
      <div class="flex justify-center w-full">
        <div>
          <ProductTable :items="products" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
