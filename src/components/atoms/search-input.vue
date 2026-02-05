<script setup lang="ts">
import { ref } from "vue";

interface InputProps {
  id?: string;
  name: string;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  modelValue?: string;
  disabled?: boolean;
}

const inputRef = ref<HTMLInputElement | null>(null);
const props = defineProps<InputProps>();

defineExpose({
  inputRef,
  focus: () => inputRef.value?.focus(),
});

const emit = defineEmits<{
  "update:modelValue": [modelValue: string];
}>();

const scrollToInput = () => {
  inputRef.value?.scrollIntoView({ behavior: "smooth", block: "center" });
};

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;

  emit("update:modelValue", value);
};
</script>
<template>
  <input
    :id="name"
    :name="name"
    :placeholder="placeholder ?? 'Pesquise aqui'"
    :value="modelValue"
    type="search"
    class="flex grow outline-none rounded-lg px-2 py-1 border border-gray-800 hover:border-primary focus-within:border-2 focus-within:border-primary"
    :maxlength="maxLength"
    :disabled="disabled"
    @focus="scrollToInput"
    @input="handleInput"
  />
</template>
