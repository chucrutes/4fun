import type { Product } from "@/types/product";
import { apiClient, handleRequest, type ApiResponse } from "@/api/client";

type GetProductsResponse = Product[];
type GetProductsOptions = {
  offset: number;
  limit: number;
};

export class ProductApi {
  private static readonly BASE_PATH = "/products";

  public static async getProducts(
    options?: GetProductsOptions,
  ): Promise<ApiResponse<GetProductsResponse>> {
    const params = options
      ? `?offset=${options.offset}&limit=${options.limit}`
      : "";
    const url = `${this.BASE_PATH}${params}`;

    const response = await handleRequest<GetProductsResponse>(
      apiClient.get(url),
    );

    return response;
  }

  public static async deleteProduct(
    id: number,
  ): Promise<ApiResponse<GetProductsResponse>> {
    const url = `${this.BASE_PATH}/${id}`;

    const response = await handleRequest<GetProductsResponse>(
      apiClient.delete(url),
    );

    return response;
  }
}
