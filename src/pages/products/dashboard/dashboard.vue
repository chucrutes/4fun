<script setup lang="ts">
import { onMounted, ref } from "vue";
import H1 from "@/components/atoms/h1.vue";
import Button from "@/components/atoms/button.vue";
import { Formatters } from "@/utils/formatter.utils";
import ProductCard from "../components/product-card.vue";
import { useProducts } from "./composables/use-products";
import ProductTable from "../components/product-table.vue";
import SearchInput from "@/components/atoms/search-input.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SummaryCard from "@/components/molecules/summary-card.vue";
import { useDashboardSummary } from "./composables/use-dashboard-summary";
import { faBoxOpen, faGrip, faTag } from "@fortawesome/free-solid-svg-icons";
import SectionDivider from "@/components/molecules/section-divider.vue";

const isLoading = ref(true);

const {
  items,
  hasMore,
  loadMore,
  filters,
  loading: listLoading,
  deleteProduct,
} = useProducts();
const {
  activeCategories,
  avgPrice,
  highestPriceProducts,
  productsQuantity,
  loadInfo,
} = useDashboardSummary();

onMounted(async () => {
  try {
    loadInfo();
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

    <SectionDivider />

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

    <SectionDivider />

    <div class="flex flex-col justify-center items-center">
      <div class="md:min-w-6xl max-w-full">
        <div class="flex jus py-4">
          <SearchInput v-model="filters.title" name="filterByName" />
        </div>

        <div class="overflow-x-auto">
          <ProductTable
            :items="items"
            :delete-product="deleteProduct"
          ></ProductTable>
        </div>
      </div>
    </div>

    <div class="flex justify-center p-4">
      <Button v-if="hasMore" :disabled="listLoading" @click="loadMore" size="lg"
        >Ver mais
      </Button>

      <p v-if="!hasMore && !listLoading" class="text-gray-400 text-sm italic">
        Fim do catálogo
      </p>
    </div>
  </div>
</template>
