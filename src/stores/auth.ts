import { defineStore } from "pinia";
import { AUTH_CONSTANTS } from "@/constants/auth.constants";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem(AUTH_CONSTANTS.TOKEN) || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setToken(token: string | null) {
      this.token = token;

      if (token) {
        localStorage.setItem(AUTH_CONSTANTS.TOKEN, token);
        return;
      }

      localStorage.removeItem(AUTH_CONSTANTS.TOKEN);
    },
    clearToken() {
      this.setToken(null);
    },
  },
});
