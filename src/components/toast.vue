<script setup lang="ts">
import { useToast } from "@/stores/use-toast";

const toastStore = useToast();
</script>

<template>
  <Teleport to="body">
    <div class="fixed top-5 right-5 z-100 flex flex-col gap-2.5">
      <TransitionGroup
        enter-active-class="transition all duration-300 ease-out"
        enter-from-class="opacity-0 translate-x-[30px]"
        leave-active-class="transition all duration-300 ease-in"
        leave-to-class="opacity-0 scale-90"
      >
        <div
          v-for="toast in toastStore.toasts"
          :key="toast.id"
          :class="[
            'px-5 py-3 rounded-lg text-white flex justify-between min-w-48 shadow-lg',
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500',
          ]"
        >
          <span>{{ toast.message }}</span>
          <button
            @click="toastStore.removeToast(toast.id)"
            class="ml-4 hover:opacity-70 transition-opacity"
          >
            ×
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
