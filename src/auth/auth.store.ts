import { defineStore } from "pinia";
import type { User } from "@/types/user";
import { authStorage } from "./auth.storage";
import { authService } from "./auth.service";
import type { SignInSchemaType } from "@/pages/auth/sign-in/types/sign-in.schema";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: authStorage.getAccessToken(),
    refreshToken: authStorage.getRefreshToken(),
    user: authStorage.getUser(),
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.accessToken),
  },
  actions: {
    setUser(user: User | null) {
      this.user = user;

      user ? authStorage.setUser(user) : authStorage.clearUser();
    },

    setTokens(accessToken: string | null, refreshToken: string | null = null) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;

      if (accessToken && refreshToken) {
        authStorage.setTokens(accessToken, refreshToken);
      } else {
        authStorage.clearTokens();
      }
    },

    async signIn(data: SignInSchemaType) {
      const authResponse = await authService.signIn(data);

      if (!authResponse.success || !authResponse.data.access_token) {
        return { success: false, error: "INVALID_CREDENTIALS" };
      }

      const { access_token, refresh_token } = authResponse.data;

      const profileResponse = await authService.getProfile(access_token);

      if (!profileResponse.success) {
        return { success: false, error: "PROFILE_ERROR" };
      }

      if (profileResponse.data.role !== "admin") {
        return { success: false, error: "FORBIDDEN" };
      }

      this.setTokens(access_token, refresh_token);
      this.setUser(profileResponse.data);

      return { success: true };
    },

    logout() {
      this.setTokens(null);
      this.setUser(null);
    },

    async fetchUser() {
      if (!this.accessToken) return;

      const response = await authService.getProfile(this.accessToken);

      if (response.success) {
        this.setUser(response.data);
      } else {
        this.logout();
      }
    },
  },
});
