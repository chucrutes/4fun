import type { User } from "@/types/user";
import { AuthApi } from "@/pages/auth/services/auth-api";
import type { SignInError, SignInResponse } from "./auth.types";
import type { SignInSchemaType } from "@/pages/auth/sign-in/types/sign-in.schema";
import type { Result } from "@/shared/types/result";

export interface AuthService {
  getProfile(token: string): Promise<Result<User>>;
  signIn(data: SignInSchemaType): Promise<Result<SignInResponse, SignInError>>;
}

export const authService: AuthService = {
  async getProfile(token) {
    const authApi = new AuthApi();
    return authApi.getProfile(token);
  },

  async signIn(data: SignInSchemaType) {
    const authApi = new AuthApi();
    return authApi.signIn(data);
  },
};
