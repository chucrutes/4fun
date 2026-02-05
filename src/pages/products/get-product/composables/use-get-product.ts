import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import type { Product } from "@/types/product";
import { ProductApi } from "../../services/product-api";

type RouteParams = {
  id: number;
};

export function useGetProduct() {
  const route = useRoute();
  const item = ref<Product>();
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchData = async (id: number) => {
    loading.value = true;
    error.value = null;

    const response = await ProductApi.get(id);

    if (!response.success) {
      error.value = "Produto não encontrado";
      loading.value = false;
      return;
    }

    item.value = response.data;
    loading.value = false;
  };

  onMounted(() => {
    fetchData((route.params as unknown as RouteParams).id);
  });

  return {
    item,
  };
}
