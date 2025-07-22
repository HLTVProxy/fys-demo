import { useEffect, useRef, useState, type FC } from "react";
import { useLocation } from "wouter";
import { useSplashControl } from "@/hooks/useSplashControl";
import { useSplashStore } from "@/store/splash";

const SplashVideo: FC = () => {
  const [showEnterBtn, setShowEnterBtn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isPlayed = useSplashStore((state) => state.isPlayed);
  const setIsPlayed = useSplashStore((state) => state.setIsPlayed);
  const [location, navigate] = useLocation();
  const { showSplash } = useSplashControl();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
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
        className="fixed inset-0 flex touch-none select-none items-center justify-center overflow-hidden bg-black"
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
