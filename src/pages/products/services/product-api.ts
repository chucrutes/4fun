import type { Product } from "@/types/product";
import { apiClient, handleRequest, type ApiResponse } from "@/api/client";

type GetProductsResponse = Product[];

export class ProductApi {
  private static readonly BASE_PATH = "/products";

  public static async getProducts(): Promise<ApiResponse<GetProductsResponse>> {
    const url = `${this.BASE_PATH}`;

    const response = await handleRequest<GetProductsResponse>(
      apiClient.get(url),
    );

    return response;
  }
}
