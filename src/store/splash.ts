import { create } from "zustand";

interface SplashState {
  hasWatchedSplash: boolean;
  shouldShowSplash: boolean;
  setHasWatchedSplash: (watched: boolean) => void;
  setShouldShowSplash: (show: boolean) => void;
}

export const useSplashStore = create<SplashState>((set) => ({
  hasWatchedSplash: false,
  shouldShowSplash: false,
  setHasWatchedSplash: (watched) => set({ hasWatchedSplash: watched }),
  setShouldShowSplash: (show) => set({ shouldShowSplash: show }),
}));
