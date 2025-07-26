/**
 * 將外部圖片 URL 轉換為本地代理 URL 以避免 CORS 問題
 * @param imageUrl 原始圖片 URL
 * @returns 代理後的 URL
 */
export function getProxiedImageUrl(imageUrl: string): string {
  if (!imageUrl) {
    return "";
  }

  // 如果是 avatars.fyscs.cn 的圖片
  if (imageUrl.includes("avatars.fyscs.cn")) {
    return imageUrl.replace("https://avatars.fyscs.cn", "/proxy-image");
  }

  // 如果是 fyscs.cn 的圖片
  if (imageUrl.includes("fyscs.cn/image/")) {
    // 檢查是否是已知有問題的 URL
    if (imageUrl.includes("logo-256.png")) {
      console.warn("檢測到受防護的圖片 URL，使用本地替代方案:", imageUrl);
      // 使用本地存儲的 logo 或其他替代方案
      return "/assets/logo-fallback.png"; // 你可以在 public/assets/ 中放置替代圖片
    }
    return imageUrl.replace("https://fyscs.cn", "/proxy-logo");
  }

  // 對於其他圖片，可以考慮使用第三方圖片代理服務
  // 或者返回原始 URL（可能會有 CORS 問題）
  return imageUrl;
}

/**
 * 獲取預設頭像 URL
 * @param nickname 使用者暱稱
 * @returns 預設頭像 URL 或首字母
 */
export function getDefaultAvatarUrl(nickname: string): string {
  // 可以使用 dicebear 或其他頭像生成服務
  const firstLetter = nickname?.charAt(0)?.toUpperCase() || "?";
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(firstLetter)}&background=6b7280&color=ffffff&size=32`;
}
