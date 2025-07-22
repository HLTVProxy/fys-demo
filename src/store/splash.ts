import { create } from "zustand";

interface SplashState {
  isPlayed: boolean;
  setIsPlayed: (played: boolean) => void;
}

export const useSplashStore = create<SplashState>((set) => ({
  isPlayed: false,
  setIsPlayed: (played) => set({ isPlayed: played }),
}));
