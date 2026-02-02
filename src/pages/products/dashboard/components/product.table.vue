<script setup lang="ts">
import Td from "@/components/atoms/td.vue";
import Th from "@/components/atoms/th.vue";
import Tr from "@/components/atoms/tr.vue";
import type { Product } from "@/types/product";
import Table from "@/components/molecules/table.vue";
import { Formatters } from "@/utils/formatter.utils";

type ProductTableProps = {
  items: Product[];
};

const props = defineProps<ProductTableProps>();
</script>

<template>
  <Table>
    <thead>
      <Th>Título</Th>
      <Th>Preço</Th>
    </thead>
    <tbody>
      <Tr v-for="(item, index) in items" :key="item.id" :index="index">
        <Td>{{ item.title }}</Td>
        <Td>
          <span
            class="inline-flex items-center justify-center px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 border border-green-200 rounded-full"
          >
            $ {{ Formatters.formatNumber(item.price.toString()) }}
          </span>
        </Td>
      </Tr>
    </tbody>
  </Table>
</template>
