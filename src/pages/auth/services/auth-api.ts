import type { User } from "@/types/user";
import { apiClient, handleRequest, type ApiResponse } from "@/api/client";

type SignInPayload = {
  email: string;
  password: string;
};

type SignInSuccessResponse = {
  access_token: string;
  refresh_token: string;
};

export class AuthApi {
  private static readonly BASE_PATH = "/auth";

  public static async signIn(
    payload: SignInPayload,
  ): Promise<ApiResponse<SignInSuccessResponse>> {
    const url = `${this.BASE_PATH}/login`;

    const response = await handleRequest<SignInSuccessResponse>(
      apiClient.post(url, payload),
    );

    return response;
  }

  public static async getProfile(token: string): Promise<ApiResponse<User>> {
    const url = `${this.BASE_PATH}/profile`;

    const response = await handleRequest<User>(
      apiClient.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    );

    return response;
  }
}
