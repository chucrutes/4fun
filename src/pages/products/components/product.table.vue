<script setup lang="ts">
import Td from "@/components/atoms/td.vue";
import Th from "@/components/atoms/th.vue";
import Tr from "@/components/atoms/tr.vue";
import type { Product } from "@/types/product";
import Button from "@/components/atoms/button.vue";
import Table from "@/components/molecules/table.vue";
import { Formatters } from "@/utils/formatter.utils";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

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
      <Th>Ações</Th>
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
        <Td>
          <div class="flex justify-center gap-2">
            <Button :disabled="true">
              <FontAwesomeIcon :icon="faPen" />
            </Button>
            <Button :disabled="true">
              <FontAwesomeIcon :icon="faTrash" style="color: red" />
            </Button>
          </div>
        </Td>
      </Tr>
    </tbody>
  </Table>
</template>
