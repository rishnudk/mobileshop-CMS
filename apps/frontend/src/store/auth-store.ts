import { create } from "zustand";
import { ApiClient } from "../lib/api/api-client";
import { LoginInput } from "@mobileshop/shared";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (input: LoginInput) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (input: LoginInput) => {
    set({ isLoading: true, error: null });
    try {
      const response = await ApiClient.post<{ token: string; user: User }>(
        "/auth/login",
        input
      );
      ApiClient.setToken(response.token);
      set({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to log in. Please check your credentials.";
      set({
        error: msg,
        isLoading: false,
      });
      throw err;
    }
  },

  logout: () => {
    ApiClient.clearToken();
    set({ user: null, isAuthenticated: false, error: null });
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  },

  checkAuth: async () => {
    const token = ApiClient.getToken();
    if (!token) {
      set({ user: null, isAuthenticated: false, isLoading: false });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const user = await ApiClient.get<User>("/auth/me");
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch {
      // Token is invalid/expired
      ApiClient.clearToken();
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
