<script setup lang="ts">
import ArrowButton from "./arrow-button.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface Props {
  src: string;
  alt: string;
  nextImage: () => void;
  previousImage: () => void;
}

defineProps<Props>();
</script>

<template>
  <div
    class="relative aspect-square bg-gray-100 overflow-hidden rounded-lg group"
  >
    <img
      :src="src"
      :alt="alt"
      class="w-full h-full object-cover transition-transform duration-500"
    />

    <ArrowButton label="Imagem anterior" :click="previousImage" class="left-2">
      <FontAwesomeIcon :icon="faArrowLeft" />
    </ArrowButton>
    <ArrowButton label="Próxima Imagem" :click="previousImage" class="right-2">
      <FontAwesomeIcon :icon="faArrowRight" />
    </ArrowButton>
  </div>
</template>
