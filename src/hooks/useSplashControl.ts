import { useLocation } from "wouter";
import { useEffect } from "react";
import { useSplashStore } from "@/store/splash";

// 設定哪些路徑需要顯示 SplashVideo
const splashRoutes = ["/", "/dashboard"];

export function useSplashControl() {
  const [location] = useLocation();
  const hasWatchedSplash = useSplashStore((state) => state.hasWatchedSplash);
  const setHasWatchedSplash = useSplashStore(
    (state) => state.setHasWatchedSplash,
  );

  const shouldShowSplash = splashRoutes.includes(location) && !hasWatchedSplash;

  // 如果進入非 splash 路徑，標記為已看過 splash
  useEffect(() => {
    if (!splashRoutes.includes(location)) {
      setHasWatchedSplash(true);
    }
  }, [location, setHasWatchedSplash]);

  return { shouldShowSplash };
}
