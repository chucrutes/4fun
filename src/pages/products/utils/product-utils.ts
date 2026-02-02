import type { Product } from "@/types/product";

export class ProductUtils {
  static highestPriceProducts(products: Product[], quantity: number) {
    return products.sort((a, b) => b.price - a.price).slice(0, quantity);
  }
  static test(products: Product[]) {
    let str = "";

    products.map((item) => {
      console.log(item.title);
      str += item.title;
    });

    return str;
  }
}
