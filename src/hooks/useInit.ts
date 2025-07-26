import useSWR from "swr";
import { useEffect } from "react";
import fetcher from "@/lib/fetcher";
import type { InitResponse } from "@/types/init";
import { useAuthStore } from "@/store/auth";

export const useInit = () => {
  const { setAuthData } = useAuthStore();

  // 使用 SWR 獲取伺服器列表數據
  const { data, error, isLoading } = useSWR<InitResponse>(
    "/api/silverwing/system/init",
    (url) => fetcher(url) as Promise<InitResponse>,
    {
      revalidateOnFocus: false,
    },
  );

  // 當數據變化時更新 auth store
  useEffect(() => {
    setAuthData(data || null);
  }, [data, setAuthData]);

  return {
    data,
    error,
    isLoading,
  };
};
