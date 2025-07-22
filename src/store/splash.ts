import { create } from "zustand";

interface SplashState {
  hasWatchedSplash: boolean;
  setHasWatchedSplash: (watched: boolean) => void;
}

export const useSplashStore = create<SplashState>((set) => ({
  hasWatchedSplash: false,
  setHasWatchedSplash: (watched) => set({ hasWatchedSplash: watched }),
}));
