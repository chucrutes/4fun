import gql from "graphql-tag";
import { useDebounceFn } from "@vueuse/core";
import { computed, reactive, ref, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import type { PartialProduct } from "@/types/product";
import { ProductApi } from "../../services/product-api";

type ListProductsResponse = {
  products: PartialProduct[];
};

export const GET_PRODUCTS = gql`
  query GetProducts($offset: Int, $limit: Int, $title: String) {
    products(offset: $offset, limit: $limit, title: $title) {
      id
      title
      price
      category {
        name
      }
    }
  }
`;

export function useProducts() {
  const filters = reactive({
    offset: 0,
    limit: 10,
    title: "",
  });

  const hasMore = ref(true);
  const items = ref<PartialProduct[]>([]);

  const { result, loading: graphqlLoading } = useQuery<ListProductsResponse>(
    GET_PRODUCTS,
    filters,
  );

  const loading = computed(() => graphqlLoading.value);

  const debouncedSearch = useDebounceFn(() => {
    filters.offset = 0;
  }, 800);

  watch(
    () => filters.title,
    () => debouncedSearch(),
  );

  watch(
    result,
    (newResult) => {
      if (!newResult?.products) return;

      const newItems = newResult.products;

      if (filters.offset === 0) {
        items.value = newItems;
      } else {
        items.value = [...items.value, ...newItems];
      }

      hasMore.value = newItems.length >= filters.limit;
    },
    { immediate: true },
  );

  const loadMore = () => {
    if (loading.value || !hasMore.value) return;

    filters.offset += filters.limit;
  };

  const deleteProduct = (id: number) => {
    ProductApi.deleteProduct(id);

    items.value = items.value.filter((value) => value.id !== id);
  };

  return {
    items,
    loading,
    filters,
    hasMore,

    loadMore,
    deleteProduct,
  };
}
