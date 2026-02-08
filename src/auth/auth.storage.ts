import type { User } from "@/types/user";
import { AUTH_CONSTANTS } from "@/constants/auth.constants";

export const authStorage = {
  getAccessToken(): string | null {
    return localStorage.getItem(AUTH_CONSTANTS.ACCESS_TOKEN);
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(AUTH_CONSTANTS.REFRESH_TOKEN);
  },

  getUser(): User | null {
    const raw = localStorage.getItem(AUTH_CONSTANTS.USER);
    return raw ? JSON.parse(raw) : null;
  },

  setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem(AUTH_CONSTANTS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(AUTH_CONSTANTS.REFRESH_TOKEN, refreshToken);
  },

  clearTokens() {
    localStorage.removeItem(AUTH_CONSTANTS.ACCESS_TOKEN);
    localStorage.removeItem(AUTH_CONSTANTS.REFRESH_TOKEN);
  },

  setUser(user: User) {
    localStorage.setItem(AUTH_CONSTANTS.USER, JSON.stringify(user));
  },

  clearUser() {
    localStorage.removeItem(AUTH_CONSTANTS.USER);
  },
};
