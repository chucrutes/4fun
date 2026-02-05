<script setup lang="ts">
import { ref } from "vue";
import ProductInfo from "./components/product-info.vue";
import ProductImage from "./components/product-image.vue";
import { useGetProduct } from "./composables/use-get-product";

const { item } = useGetProduct();

const currentIndex = ref(0);

const nextImage = () => {
  if (!item.value) return;
  currentIndex.value = (currentIndex.value + 1) % item.value.images.length;
};

const previousImage = () => {
  if (!item.value) return;
  const numberOfImages = item.value.images.length;
  currentIndex.value =
    (currentIndex.value - 1 + numberOfImages) % numberOfImages;
};
</script>

<template>
  <div v-if="!item"></div>
  <template v-else>
    <div class="max-w-6xl mx-auto p-4 md:p-8">
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <ProductImage
          :alt="item.title"
          :src="item.images[currentIndex] || ''"
          :next-image="() => nextImage()"
          :previous-image="() => previousImage()"
        />

        <ProductInfo :item="item" />
      </div>
    </div>
  </template>
</template>
