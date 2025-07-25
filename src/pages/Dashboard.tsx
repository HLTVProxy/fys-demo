import ServerList from "@/components/Dashboard/ServerList";
import ImageBackgroundContainer from "@/components/ImageBackgroundContainer";
import { useSplashControl } from "@/hooks/useSplashControl";

const Dashboard = () => {
  // 啟用 splash
  useSplashControl(true);

  return (
    <ImageBackgroundContainer>
      <ServerList />
    </ImageBackgroundContainer>
  );
};

export default Dashboard;
