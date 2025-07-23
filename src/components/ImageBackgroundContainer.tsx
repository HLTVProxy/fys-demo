import type { FC, PropsWithChildren } from "react";
import { cn } from "../lib/utils";

interface ImageBackgroundContainerProps extends PropsWithChildren {
  children: React.ReactNode;
  imgSrc?: string;
  className?: string;
}

const ImageBackgroundContainer: FC<ImageBackgroundContainerProps> = ({
  children,
  imgSrc = "/assets/webarebears.jpg",
  className,
}) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div
      className={cn(
        "min-h-screen w-full min-w-full",
        // 電腦版使用 CSS 背景
        !isMobile && "bg-cover bg-fixed bg-center bg-no-repeat",
        className,
      )}
      style={!isMobile ? { backgroundImage: `url(${imgSrc})` } : undefined}
    >
      {/* 手機版專用的固定背景 */}
      {isMobile && (
        <div
          className="fixed inset-0 -z-10 h-lvh w-screen bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imgSrc})` }}
        />
      )}
      <div
        className={cn(
          "min-h-screen w-full overflow-y-auto pt-14",
          // 手機版滾動優化和防止過度滾動
          "touch-pan-y overscroll-none",
        )}
        style={{
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "none",
        }}
      >
        <div className="container mx-auto py-4">{children}</div>
      </div>
    </div>
  );
};

export default ImageBackgroundContainer;
