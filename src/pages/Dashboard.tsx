import ImageBackgroundContainer from "@/components/ImageBackgroundContainer";
import { useSplashControl } from "@/hooks/useSplashControl";

const Dashboard = () => {
  // 啟用 splash
  useSplashControl(true);

  return (
    <ImageBackgroundContainer>
      <h1 className="mb-6 text-center text-2xl font-bold text-white">
        Dashboard
      </h1>
      {Array.from({ length: 100 }, (_, i) => (
        <div
          key={i}
          className="mb-4 rounded-lg bg-gray-700 p-4 text-white shadow-lg"
        >
          Dashboard Item {i + 1}
        </div>
      ))}
    </ImageBackgroundContainer>
  );
};

export default Dashboard;
