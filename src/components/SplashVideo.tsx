import { useEffect, useRef, useState, type FC } from "react";
import { useLocation } from "wouter";
import { useSplashControl } from "@/hooks/useSplashControl";
import { useSplashStore } from "@/store/splash";

const SplashVideo: FC = () => {
  const [showEnterBtn, setShowEnterBtn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const setHasWatchedSplash = useSplashStore(
    (state) => state.setHasWatchedSplash,
  );
  const [location, navigate] = useLocation();
  const { shouldShowSplash } = useSplashControl();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldShowSplash) return;

    setShowEnterBtn(false);

    const handleEnded = () => {
      setShowEnterBtn(true);
    };

    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [shouldShowSplash]);

  const handleEnterClick = () => {
    setHasWatchedSplash(true);
    if (location === "/") {
      navigate("/dashboard");
    }
  };

  if (!shouldShowSplash) return null;

  return (
    <div
      className="fixed inset-0 z-[1] flex touch-none select-none items-center justify-center overflow-hidden bg-black"
      style={{ WebkitOverflowScrolling: "auto" }}
    >
      <video
        ref={videoRef}
        src="/assets/splash.mp4"
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
          onClick={handleEnterClick}
        >
          Enter
        </button>
      )}
    </div>
  );
};

export default SplashVideo;
