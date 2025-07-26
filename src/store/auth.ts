import { create } from "zustand";
import type { InitResponse } from "@/types/init";

interface AuthState {
  isLogin: boolean;
  profile: InitResponse["profile"] | null;
  setAuthData: (data: InitResponse | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: false,
  profile: null,
  setAuthData: (data) =>
    set({
      isLogin: !!data?.profile,
      profile: data?.profile || null,
    }),
  clearAuth: () =>
    set({
      isLogin: false,
      profile: null,
    }),
}));
