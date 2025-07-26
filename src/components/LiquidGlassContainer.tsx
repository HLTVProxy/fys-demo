import { cn } from "@/lib/utils";
import type { FC, PropsWithChildren } from "react";

interface LiquidGlassContainerProps extends PropsWithChildren {
  className?: string;
}

const LiquidGlassContainer: FC<LiquidGlassContainerProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "container mx-auto rounded bg-black/50 px-4 py-2 text-white backdrop-blur-lg lg:py-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default LiquidGlassContainer;
