import { useLocation } from "wouter";

// 可根據需求調整 splashConfig 預設值
const splashConfig: Record<string, boolean> = {
  "/": true,
  "/dashboard": true,
  "/ebans": false,
};
const defaultSplash = true;

export function useSplashControl() {
  const [location] = useLocation();
  const shouldShowSplash = Object.prototype.hasOwnProperty.call(
    splashConfig,
    location,
  )
    ? splashConfig[location]
    : defaultSplash;
  return { showSplash: shouldShowSplash };
}
