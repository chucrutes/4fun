import type { Product } from "@/types/product";

export class ProductUtils {
  static highestPriceProducts(products: Product[], quantity: number) {
    return products.sort((a, b) => b.price - a.price).slice(0, quantity);
  }

  static avgPrice(products: Product[]) {
    const totalProducts = products.length;
    if (totalProducts === 0) return 0;

    const total = products.reduce((acc, product) => acc + product.price, 0);

    return total / totalProducts;
  }
}
