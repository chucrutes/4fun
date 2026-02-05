import { ref } from "vue";
import type { Product } from "@/types/product";
import { ProductApi } from "../../services/product-api";
import { CategoryApi } from "../../services/category-api";
import { ProductUtils } from "../../utils/product-utils";

export function useDashboardSummary() {
  const products = ref<Product[]>([]);
  const highestPriceProducts = ref<Product[]>([]);
  const activeCategories = ref("");
  const avgPrice = ref(0);
  const productsQuantity = ref(0);
  const productsPerCategory = ref<Record<string, number>>();

  const loadInfo = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        ProductApi.getProducts(),
        CategoryApi.getCategories(),
      ]);

      if (prodRes.success) {
        products.value = prodRes.data;
        productsQuantity.value = products.value.length;
        highestPriceProducts.value = ProductUtils.highestPriceProducts(
          products.value,
          5,
        );
        productsPerCategory.value = ProductUtils.countProductsByCategory(
          products.value,
        );
        avgPrice.value = ProductUtils.avgPrice(products.value);
      }
      if (catRes.success)
        activeCategories.value = catRes.data.length.toString();
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  return {
    avgPrice,
    productsQuantity,
    activeCategories,
    productsPerCategory,
    highestPriceProducts,

    loadInfo,
  };
}
