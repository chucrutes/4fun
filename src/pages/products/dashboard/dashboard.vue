<script setup lang="ts">
import { onMounted, ref } from "vue";
import H1 from "@/components/atoms/h1.vue";
import type { Product } from "@/types/product";
import { ProductApi } from "../services/product-api";
import { Formatters } from "@/utils/formatter.utils";
import { ProductUtils } from "../utils/product-utils";
import { CategoryApi } from "../services/category-api";
import ProductTable from "../components/product-table.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SummaryCard from "@/components/molecules/summary-card.vue";
import { faBoxOpen, faGrip, faTag } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "../components/product-card.vue";

const products = ref<Product[]>([]);
const highestPriceProducts = ref<Product[]>([]);
const activeCategories = ref("");
const avgPrice = ref(0);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const [prodRes, catRes] = await Promise.all([
      ProductApi.getProducts(),
      CategoryApi.getCategories(),
    ]);

    if (prodRes.success) {
      products.value = prodRes.data;
      highestPriceProducts.value = ProductUtils.highestPriceProducts(
        products.value,
        5,
      );
      avgPrice.value = ProductUtils.avgPrice(products.value);
    }
    if (catRes.success) activeCategories.value = catRes.data.length.toString();
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="flex flex-col">
    <div class="p-8">
      <H1>Dashboard</H1>
    </div>
    <div
      class="gap-4 flex flex-col items-center md:flex-row md:flex-wrap md:justify-center py-4"
    >
      <SummaryCard label="Produtos" :content="products.length.toFixed(0)">
        <FontAwesomeIcon :icon="faBoxOpen" size="2xl" />
      </SummaryCard>
      <SummaryCard label="Categorias ativas" :content="activeCategories">
        <FontAwesomeIcon :icon="faGrip" size="2xl" />
      </SummaryCard>
      <SummaryCard
        label="Preço médio"
        :content="`R$ ${Formatters.formatToBrazillianNumber(avgPrice)}`"
      >
        <FontAwesomeIcon :icon="faTag" size="2xl" />
      </SummaryCard>
    </div>
    <div class="flex items-center justify-center w-full h-24">
      <div class="bg-gray-500 h-1 w-full"></div>
    </div>
    <div
      class="gap-4 flex flex-col items-center md:flex-row md:flex-wrap md:justify-center py-4"
    >
      <ProductCard
        v-for="item in highestPriceProducts"
        :key="item.id"
        :name="item.title"
        :price="item.price"
        :image="item.images[0] ?? ''"
      />
    </div>
    <div class="flex items-center justify-center w-full h-24">
      <div class="bg-gray-500 h-1 w-full"></div>
    </div>
    <div class="py-16">
      <div class="md:flex justify-center w-full">
        <div class="overflow-x-auto">
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
