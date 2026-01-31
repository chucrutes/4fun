<script setup lang="ts">
import { ref, computed } from "vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface InputProps {
  id?: string;
  name: string;
  autocomplete?: string;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  modelValue?: string;
  disabled?: boolean;
}

const inputRef = ref<HTMLInputElement | null>(null);
const props = defineProps<InputProps>();
const passwordVisible = ref(false);

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

const inputType = computed(() => (passwordVisible.value ? "text" : props.type));

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};
</script>
<template>
  <div
    class="flex rounded-lg px2 py-1 border-2 border-surface-800 hover:border-primary focus-within:border focus-within:red-500 focus-within:border-red-500"
  >
    <input
      :id="name"
      :name="name"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :value="modelValue"
      :type="inputType"
      class="grow outline-none"
      :maxlength="maxLength"
      :disabled="disabled"
      @focus="scrollToInput"
      @input="handleInput"
    />
    <button
      v-if="type === 'password'"
      type="button"
      @click="togglePasswordVisibility"
      class="text-surface-300 hover:text-surface-50"
      aria-label="Toggle password visibility"
    >
      <FontAwesomeIcon
        :icon="passwordVisible ? faEye : faEyeSlash"
        class="h-5 w-5"
      />
    </button>
  </div>
</template>
