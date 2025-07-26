import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL || "",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              proxyReq.setHeader(
                "Authorization",
                env.VITE_API_AUTHORIZATION || "",
              );
              proxyReq.setHeader("Cookie", env.VITE_API_COOKIE || "");
              proxyReq.setHeader("X-Client", env.VITE_X_CLIENT || "");
            });
          },
        },
        // 添加圖片代理
        "/proxy-image": {
          target: "https://avatars.fyscs.cn",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/proxy-image/, ""),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              // 設置必要的 headers 以避免 CORS 問題
              proxyReq.setHeader(
                "User-Agent",
                "Mozilla/5.0 (compatible; FysDemo/1.0)",
              );
              proxyReq.setHeader("Referer", "https://fyscs.cn/");
            });
          },
        },
        "/proxy-logo": {
          target: "https://fyscs.cn",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/proxy-logo/, ""),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              proxyReq.setHeader(
                "User-Agent",
                "Mozilla/5.0 (compatible; FysDemo/1.0)",
              );
              proxyReq.setHeader("Referer", "https://fyscs.cn/");
            });
          },
        },
      },
    },
  };
});
