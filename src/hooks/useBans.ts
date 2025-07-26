import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import type { BansResponse } from "@/types/bans";

export const useBans = () => {
  // 使用 SWR 獲取伺服器列表數據
  const { data, error, isLoading } = useSWR<BansResponse>(
    "/api/silverwing/system/bans",
    (url) => fetcher(url) as Promise<BansResponse>,
    {
      revalidateOnFocus: false,
    },
  );

  return {
    data,
    error,
    isLoading,
  };
};
