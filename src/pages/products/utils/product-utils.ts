import type { Product } from "@/types/product";

export class ProductUtils {
  static highestPriceProducts(products: Product[], quantity: number) {
    return products.sort((a, b) => b.price - a.price).slice(0, quantity);
  }
}
