import ImageBackgroundContainer from "@/components/ImageBackgroundContainer";
import { useSplashControl } from "@/hooks/useSplashControl";

const Ebans = () => {
  // 不啟用 splash
  useSplashControl(false);

  return (
    <ImageBackgroundContainer imgSrc="/assets/icebear.jpg">
      <h1 className="text-center text-2xl font-bold text-white">Ebans</h1>
    </ImageBackgroundContainer>
  );
};

export default Ebans;
