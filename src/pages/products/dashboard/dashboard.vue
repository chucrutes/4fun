<script setup lang="ts">
import { onMounted, ref } from "vue";
import H1 from "@/components/atoms/h1.vue";
import type { Product } from "@/types/product";
import { ProductApi } from "../services/product-api";
import { Formatters } from "@/utils/formatter.utils";
import { ProductUtils } from "../utils/product-utils";
import { CategoryApi } from "../services/category-api";
import ProductTable from "../components/product.table.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SummaryCard from "@/components/molecules/summary-card.vue";
import { faBoxOpen, faGrip, faTag } from "@fortawesome/free-solid-svg-icons";

const products = ref<Product[]>([]);
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
      class="gap-4 flex flex-col items-center md:flex-row md:flex-wrap md:justify-center"
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
      <SummaryCard
        label="Preço médio"
        :content="`R$ ${Formatters.formatToBrazillianNumber(avgPrice)}`"
      >
        <FontAwesomeIcon :icon="faTag" size="2xl" />
      </SummaryCard>
    </div>
    <div class="py-16">
      <div class="flex justify-center w-full overflow-x-auto">
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
