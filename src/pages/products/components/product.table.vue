<script setup lang="ts">
import Td from "@/components/atoms/td.vue";
import Th from "@/components/atoms/th.vue";
import Tr from "@/components/atoms/tr.vue";
import type { PartialProduct } from "@/types/product";
import Button from "@/components/atoms/button.vue";
import Table from "@/components/molecules/table.vue";
import { Formatters } from "@/utils/formatter.utils";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTrash, faPen, faEye } from "@fortawesome/free-solid-svg-icons";
import router from "@/router";

type ProductTableProps = {
  items: PartialProduct[];
  deleteProduct: (id: number) => void;
};

const props = defineProps<ProductTableProps>();
</script>

<template>
  <Table>
    <thead>
      <Th>Título</Th>
      <Th>Categoria</Th>
      <Th>Preço</Th>
      <Th>Ações</Th>
    </thead>
    <tbody>
      <Tr v-for="(item, index) in items" :key="item.id" :index="index">
        <Td>{{ item.title }}</Td>
        <Td>{{ item.category.name }}</Td>
        <Td>
          <span
            class="inline-flex items-center justify-center px-6 py-2 text-sm font-semibold text-green-700 bg-green-100 border border-green-200 rounded-full"
          >
            R$ {{ Formatters.formatToBrazillianNumber(item.price) }}
          </span>
        </Td>
        <Td>
          <div class="flex justify-center gap-2">
            <Button :click="() => router.push(`/products/${item.id}`)">
              <FontAwesomeIcon :icon="faEye" />
            </Button>
            <Button :disabled="true">
              <FontAwesomeIcon :icon="faPen" />
            </Button>
            <Button :click="() => deleteProduct(item.id)">
              <FontAwesomeIcon :icon="faTrash" style="color: red" />
            </Button>
          </div>
        </Td>
      </Tr>
    </tbody>
  </Table>
</template>
