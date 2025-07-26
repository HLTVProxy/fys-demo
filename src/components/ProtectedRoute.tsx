import type { ComponentType } from "react";
import { useAuthStore } from "@/store/auth";
import Forbidden from "@/pages/Forbidden";

interface ProtectedRouteProps {
  component: ComponentType<Record<string, unknown>>;
  [key: string]: unknown;
}

const ProtectedRoute = ({
  component: Component,
  ...props
}: ProtectedRouteProps) => {
  const isLogin = useAuthStore((state) => state.isLogin);

  if (!isLogin) {
    return <Forbidden />;
  }

  return <Component {...props} />;
};

export default ProtectedRoute;
