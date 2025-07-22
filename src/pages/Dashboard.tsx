import ImageBackgroundContainer from "@/components/ImageBackgroundContainer";
import { useSplashControl } from "@/hooks/useSplashControl";

const Dashboard = () => {
  // 啟用 splash
  useSplashControl(true);

  return (
    <ImageBackgroundContainer>
      <h1 className="text-center text-2xl font-bold text-white">Dashboard</h1>
    </ImageBackgroundContainer>
  );
};

export default Dashboard;
