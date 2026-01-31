import { apiClient, handleRequest } from "@/api/client";

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

  public static async signIn(payload: SignInPayload): Promise<any> {
    const url = `${this.BASE_PATH}/login`;

    const response = await handleRequest<SignInSuccessResponse>(
      apiClient.post(url, payload),
    );

    if (response.success) {
      console.log(response.data.access_token);
    }
    return response;
  }
}
