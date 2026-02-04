import gql from "graphql-tag";
import { onMounted, onUnmounted, reactive, ref, watch } from "vue";
import type { Product } from "@/types/product";
import type { Category } from "@/types/category";
import { useQuery } from "@vue/apollo-composable";

type Item = Partial<
  Omit<Product, "category"> & { category: Partial<Category> }
>;

type ListProductsResponse = {
  products: Item[];
};

export const GET_PRODUCTS = gql`
  query GetProducts($offset: Int, $limit: Int) {
    products(offset: $offset, limit: $limit) {
      id
      title
      price
      category {
        name
      }
    }
  }
`;

export function useListProducts() {
  const scrollTrigger = ref<HTMLElement | null>(null);
  let observer: IntersectionObserver | null = null;

  const filters = reactive({
    offset: 0,
    limit: 5,
  });

  const loading = ref(false);
  const hasMore = ref(true);
  const items = ref<Item[]>([]);

  const { result } = useQuery<ListProductsResponse>(GET_PRODUCTS, filters);

  watch(
    result,
    (newResult) => {
      loading.value = true;
      if (newResult?.products) {
        const newItems = newResult.products;

        items.value.push(...newItems);

        if (newItems.length < filters.limit) {
          hasMore.value = false;
          loading.value = false;
        }
      }

      loading.value = false;
    },
    { immediate: true },
  );

  const loadMore = () => {
    loading.value = true;
    if (!hasMore.value) return;

    filters.offset += filters.limit;
  };

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        if (!entries || !entries[0]) return;

        if (entries[0].isIntersecting && !loading.value && hasMore.value) {
          loadMore();
        }
      },
      { rootMargin: "400px" },
    );

    if (!scrollTrigger.value) return;

    observer.observe(scrollTrigger.value);
  });

  onUnmounted(() => {
    if (observer) observer.disconnect();
  });

  return { items, loading, filters, hasMore, loadMore };
}
