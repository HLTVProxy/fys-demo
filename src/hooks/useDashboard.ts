import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import type { DashboardResponse } from "@/types/dashboard";

export const useDashboard = () => {
  // 使用 SWR 獲取伺服器列表數據
  const { data, error, isLoading } = useSWR<DashboardResponse>(
    "/api/silverwing/system/dashboard",
    (url) => fetcher(url) as Promise<DashboardResponse>,
    {
      revalidateOnFocus: false,
    },
  );

  return {
    servers: data?.servers || [],
    error,
    isLoading,
  };
};
