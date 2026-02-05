import type { Product } from "@/types/product";
import { apiClient, handleRequest, type ApiResponse } from "@/api/client";

type ListProductsResponse = Product[];
type ListProductsOptions = {
  offset: number;
  limit: number;
};

type GetProductResponse = Product;

export class ProductApi {
  private static readonly BASE_PATH = "/products";

  public static async list(
    options?: ListProductsOptions,
  ): Promise<ApiResponse<ListProductsResponse>> {
    const params = options
      ? `?offset=${options.offset}&limit=${options.limit}`
      : "";
    const url = `${this.BASE_PATH}${params}`;

    const response = await handleRequest<ListProductsResponse>(
      apiClient.get(url),
    );

    return response;
  }

  public static async get(
    id: number,
  ): Promise<ApiResponse<GetProductResponse>> {
    const url = `${this.BASE_PATH}/${id}`;

    const response = await handleRequest<GetProductResponse>(
      apiClient.get(url),
    );

    return response;
  }

  public static async delete(id: number): Promise<ApiResponse<boolean>> {
    const url = `${this.BASE_PATH}/${id}`;

    const response = await handleRequest<boolean>(apiClient.delete(url));

    return response;
  }
}
