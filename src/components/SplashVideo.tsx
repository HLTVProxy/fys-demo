import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { useSplashControl } from "@/hooks/useSplashControl";
import { useSplashStore } from "@/store/splash";

interface SplashVideoProps {
  className?: string;
}

const SplashVideo: React.FC<SplashVideoProps> = ({ className }) => {
  const [showEnterBtn, setShowEnterBtn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isPlayed = useSplashStore((state) => state.isPlayed);
  const setIsPlayed = useSplashStore((state) => state.setIsPlayed);
  const [location, navigate] = useLocation();
  const { showSplash } = useSplashControl();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // iOS Safari 需主動呼叫 play()
    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          console.error("Video playback failed.");
        });
      }
    };
    tryPlay();
    const handleEnded = () => {
      setShowEnterBtn(true);
    };
    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    showSplash &&
    !isPlayed && (
      <div
        className={cn(
          "fixed inset-0 flex touch-none select-none items-center justify-center overflow-hidden bg-black",
          className,
        )}
        style={{ WebkitOverflowScrolling: "auto" }}
      >
        <video
          ref={videoRef}
          src="/splash.mp4"
          autoPlay
          muted
          playsInline
          controls={false}
          preload="auto"
          className="h-full w-full object-cover"
        />
        {showEnterBtn && (
          <button
            className="absolute rounded-lg bg-white px-6 py-3 text-black transition-opacity duration-300"
            onClick={() => {
              setIsPlayed(true);
              if (location === "/") {
                navigate("/dashboard");
              }
            }}
          >
            Enter
          </button>
        )}
      </div>
    )
  );
};

export default SplashVideo;
