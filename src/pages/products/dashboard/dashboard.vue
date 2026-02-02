<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Product } from "@/types/product";
import { ProductApi } from "../services/product-api";
import { CategoryApi } from "../services/category-api";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SummaryCard from "@/components/molecules/summary-card.vue";
import { faBoxOpen, faGrip } from "@fortawesome/free-solid-svg-icons";
import ProductTable from "./components/product.table.vue";

const products = ref<Product[]>([]);
const activeCategories = ref("");

onMounted(async () => {
  try {
    const res = await ProductApi.getProducts();
    const categoryRes = await CategoryApi.getCategories();

    if (res.success) {
      products.value = res.data;
    }
    if (categoryRes.success) {
      activeCategories.value = categoryRes.data.length.toFixed(0);
    }
  } catch (e) {}
});
</script>

<template>
  <div class="flex flex-col">
    <h1 class="py-16">Dashboard</h1>
    <div
      class="gap-y-4 flex flex-col items-center md:flex-row md:flex-wrap md:justify-center md:gap-x-4 md:gap-y-0"
    >
      <SummaryCard label="Produtos" :content="products.length.toFixed(0)">
        <FontAwesomeIcon :icon="faBoxOpen" size="2xl" />
      </SummaryCard>
      <SummaryCard label="Categorias ativas" :content="activeCategories">
        <FontAwesomeIcon :icon="faGrip" size="2xl" />
      </SummaryCard>
    </div>
    <div class="flex justify-center py-16 w-full">
      <div>
        <ProductTable :items="products" />
      </div>
    </div>
  </div>
</template>
