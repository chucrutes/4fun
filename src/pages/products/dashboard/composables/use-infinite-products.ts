import { ref } from "vue";
import type { Product } from "@/types/product";
import { ProductApi } from "../../services/product-api";

export function useInfiniteProducts() {
  const items = ref<Product[]>([]);
  const offset = ref(0);
  const limit = 2;
  const loading = ref(false);
  const hasMore = ref(true);

  const loadMore = async () => {
    if (loading.value || !hasMore.value) return;

    loading.value = true;
    try {
      const response = await ProductApi.getProducts({
        offset: offset.value,
        limit,
      });

      if (!response.success) return;

      const resItems = response.data;

      if (resItems.length < limit) {
        hasMore.value = false;
      }

      items.value.push(...resItems);
      offset.value += limit;
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      loading.value = false;
    }
  };

  return { items, loading, hasMore, loadMore };
}
