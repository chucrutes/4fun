import type { Category } from "@/types/category";
import { apiClient, handleRequest, type ApiResponse } from "@/api/client";

type GetCategoriesResponse = Category[];

export class CategoryApi {
  private static readonly BASE_PATH = "/categories";

  public static async getCategories(): Promise<
    ApiResponse<GetCategoriesResponse>
  > {
    const url = `${this.BASE_PATH}`;

    const response = await handleRequest<GetCategoriesResponse>(
      apiClient.get(url),
    );

    return response;
  }
}
