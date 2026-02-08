import type { User } from "@/types/user";
import { apiClient, handleRequest } from "@/api/client";
import type { Result, SignInResponse } from "@/auth/auth.types";
import type { AuthService } from "@/auth/auth.service";

type SignInPayload = {
  email: string;
  password: string;
};

export class AuthApi implements AuthService {
  private static readonly BASE_PATH = "/auth";

  async signIn(payload: SignInPayload): Promise<Result<SignInResponse>> {
    const url = `${AuthApi.BASE_PATH}/login`;

    const response = await handleRequest<SignInResponse>(
      apiClient.post(url, payload),
    );

    return response;
  }

  async getProfile(token: string): Promise<Result<User>> {
    const url = `${AuthApi.BASE_PATH}/profile`;

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
