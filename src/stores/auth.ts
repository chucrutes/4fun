import { defineStore } from "pinia";
import { AUTH_CONSTANTS } from "@/constants/auth.constants";
import { AuthApi } from "@/pages/auth/services/auth-api";
import type { User } from "@/types/user";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: localStorage.getItem(AUTH_CONSTANTS.ACCESS_TOKEN) || null,
    refreshToken: localStorage.getItem(AUTH_CONSTANTS.REFRESH_TOKEN) || null,
    user: localStorage.getItem(AUTH_CONSTANTS.USER)
      ? (JSON.parse(localStorage.getItem(AUTH_CONSTANTS.USER) || "{}") as User)
      : null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },
  actions: {
    setUser(user: User | null) {
      this.user = user;

      if (user) {
        localStorage.setItem(AUTH_CONSTANTS.USER, JSON.stringify(user));

        return;
      }

      localStorage.removeItem(AUTH_CONSTANTS.USER);
    },
    setTokens(accessToken: string | null, refreshToken?: string | null) {
      this.accessToken = accessToken;

      if (accessToken) {
        localStorage.setItem(AUTH_CONSTANTS.ACCESS_TOKEN, accessToken);
        localStorage.setItem(AUTH_CONSTANTS.REFRESH_TOKEN, refreshToken || "");
        return;
      }

      localStorage.removeItem(AUTH_CONSTANTS.ACCESS_TOKEN);
      localStorage.removeItem(AUTH_CONSTANTS.REFRESH_TOKEN);
    },
    logout() {
      this.setTokens(null);
      this.setUser(null);
    },
    async fetchUser() {
      const response = await AuthApi.getProfile(this.accessToken || "");

      if (response.success) {
        this.setUser(response.data);
        return;
      }

      this.logout();
    },
  },
});
