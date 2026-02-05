import type { Category } from "./category";

export type Product = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
};

export type PartialProduct = Pick<Product, "id" | "title" | "price"> & {
  category: Pick<Category, "id" | "name">;
};
