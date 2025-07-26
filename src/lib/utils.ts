import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-tw"; // 繁體中文本地化

// 設置本地化和啟用相對時間插件
dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 工具函數：格式化創建時間
export const formatBanTime = (created: string) => {
  return dayjs(created).format("YYYY/MM/DD HH:mm");
};

// 工具函數：計算並格式化過期時間
export const formatExpirationTime = (created: string, length: number) => {
  if (length === 0) return "有生之年"; // 永久封禁

  const expirationTime = dayjs(created).add(length, "minute");
  const now = dayjs();
  const isExpired = expirationTime.isBefore(now);

  if (isExpired) return "已到期";

  return expirationTime.format("YYYY/MM/DD HH:mm");
};

// 工具函數：格式化封禁持續時間
export const formatBanDuration = (minutes: number) => {
  if (minutes === 0) return "有生之年"; // 永久封禁

  if (minutes < 60) {
    return `${minutes} 分鐘`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours < 24) {
    return remainingMinutes > 0
      ? `${hours} 小時 ${remainingMinutes} 分鐘`
      : `${hours} 小時`;
  }

  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  if (remainingHours > 0) {
    return `${days} 天 ${remainingHours} 小時`;
  }

  return `${days} 天`;
};

// 工具函數：根據封禁狀態獲取 BanIcon 顏色
export const getBanIconColor = (created: string, length: number) => {
  const expirationStatus = formatExpirationTime(created, length);

  if (expirationStatus === "已到期") {
    return "text-yellow-400"; // 已到期 - 黃色
  } else if (expirationStatus === "有生之年") {
    return "text-red-600"; // 永久封禁 - 紅色
  } else {
    // 檢查是否還沒到期（顯示具體時間的情況）
    const expirationTime = dayjs(created).add(length, "minute");
    const now = dayjs();
    if (expirationTime.isAfter(now)) {
      return "text-red-600"; // 尚未到期 - 紅色
    } else {
      return "text-green-600"; // 其他情況 - 綠色
    }
  }
};
