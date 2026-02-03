<script setup lang="ts">
import { onMounted, ref } from "vue";
import H1 from "@/components/atoms/h1.vue";
import { Formatters } from "@/utils/formatter.utils";
import ProductCard from "../components/product-card.vue";
import ProductTable from "../components/product-table.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useListProducts } from "./composables/use-list-products";
import SummaryCard from "@/components/molecules/summary-card.vue";
import { useDashboardSummary } from "./composables/use-dashboard-summary";
import { faBoxOpen, faGrip, faTag } from "@fortawesome/free-solid-svg-icons";

const isLoading = ref(true);
const scrollTrigger = ref(null);
const { hasMore, loadMore, items, loading } = useListProducts();
const {
  activeCategories,
  avgPrice,
  highestPriceProducts,
  productsQuantity,
  loadInfo,
} = useDashboardSummary();

onMounted(async () => {
  try {
    loadMore();
    loadInfo();
  } finally {
    isLoading.value = false;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0]) return;
      if (entries[0].isIntersecting && items.value.length > 0) {
        loadMore();
      }
    },
    { threshold: 1.0 },
  );

  if (!scrollTrigger.value) return;

  observer.observe(scrollTrigger.value);
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
      <SummaryCard
        label="Produtos"
        :content="
          Formatters.formatToBrazillianNumber(productsQuantity, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })
        "
      >
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
      <div class="bg-gray-500 h-1 w-full rounded-lg mx-4"></div>
    </div>

    <div class="flex flex-col justify-center align-middle">
      <div class="p-4">
        <H1>Mais caros</H1>
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
    </div>
    <div class="flex items-center justify-center w-full h-24">
      <div class="bg-gray-500 h-1 w-full rounded-lg mx-4"></div>
    </div>
    <div class="py-16">
      <div class="md:flex justify-center min-w-full">
        <div class="overflow-x-auto">
          <ProductTable :items="items" />
        </div>
      </div>
    </div>
    <div class="p-4 flex justify-center bg-white">
      <button
        v-if="hasMore && !loading"
        @click="loadMore"
        class="px-6 py-2 border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-all active:scale-95"
      >
        See More
      </button>

      <div
        v-else-if="loading"
        class="flex items-center gap-2 text-gray-500 italic"
      >
        <div
          class="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"
        ></div>
        Carregando...
      </div>

      <p v-else-if="!hasMore" class="text-gray-400 text-sm italic">
        Fim do catálogo
      </p>
    </div>

    <div ref="scrollTrigger" class="h-1"></div>
  </div>
</template>
