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
  return (
    <div
      className={cn(
        "fixed inset-0 flex h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat",
        className,
      )}
      style={imgSrc ? { backgroundImage: `url(${imgSrc})` } : undefined}
    >
      {children}
    </div>
  );
};

export default ImageBackgroundContainer;
