import { useState } from "react";
import { getProxiedImageUrl, getDefaultAvatarUrl } from "@/lib/imageProxy";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

const Avatar = ({
  src,
  alt,
  className = "",
  imgClassName = "",
}: AvatarProps) => {
  const [currentSrc, setCurrentSrc] = useState(getProxiedImageUrl(src));
  const [fallbackIndex, setFallbackIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // 備用圖片來源順序
  const fallbackSources = [
    getProxiedImageUrl(src), // 代理後的原始圖片
    getDefaultAvatarUrl(alt), // 預設頭像服務
    null, // 最終顯示首字母
  ];

  const handleError = () => {
    const nextIndex = fallbackIndex + 1;
    if (nextIndex < fallbackSources.length && fallbackSources[nextIndex]) {
      setFallbackIndex(nextIndex);
      setCurrentSrc(fallbackSources[nextIndex]!);
      setIsLoading(true);
    } else {
      // 所有圖片來源都失敗，顯示首字母
      setIsLoading(false);
      setCurrentSrc("");
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // 如果沒有可用的圖片來源，顯示首字母
  if (!currentSrc) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-500 font-bold text-white ${className}`}
      >
        {alt.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative rounded-full bg-[rgba(255,255,255,0.16)]",
        className,
      )}
    >
      {isLoading && (
        <div className="absolute inset-0 animate-pulse rounded-full bg-gray-300" />
      )}
      <img
        src={currentSrc}
        alt={alt}
        className={cn(
          "h-full w-full rounded-full object-cover transition-opacity duration-200",
          isLoading ? "opacity-0" : "opacity-100",
          imgClassName,
        )}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
      />
    </div>
  );
};

export default Avatar;
