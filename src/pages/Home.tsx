import ImageBackgroundContainer from "@/components/ImageBackgroundContainer";
import { useLocation } from "wouter";

const Home = () => {
  const [, navigate] = useLocation();
  return (
    <ImageBackgroundContainer>
      <button
        className="rounded-lg bg-white px-6 py-3 text-black shadow-lg transition-opacity duration-300"
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Enter
      </button>
    </ImageBackgroundContainer>
  );
};

export default Home;
