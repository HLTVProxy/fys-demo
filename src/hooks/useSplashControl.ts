import { useEffect } from "react";
import { useSplashStore } from "@/store/splash";

export function useSplashControl(enableSplash: boolean = false) {
  const hasWatchedSplash = useSplashStore((state) => state.hasWatchedSplash);
  const setHasWatchedSplash = useSplashStore(
    (state) => state.setHasWatchedSplash,
  );
  const setShouldShowSplash = useSplashStore(
    (state) => state.setShouldShowSplash,
  );

  const shouldShowSplash = enableSplash && !hasWatchedSplash;

  // 設置全局 splash 狀態
  useEffect(() => {
    setShouldShowSplash(shouldShowSplash);
  }, [shouldShowSplash, setShouldShowSplash]);

  // 如果頁面不需要 splash，標記為已看過 splash
  useEffect(() => {
    if (!enableSplash) {
      setHasWatchedSplash(true);
    }
  }, [enableSplash, setHasWatchedSplash]);

  return { shouldShowSplash };
}
