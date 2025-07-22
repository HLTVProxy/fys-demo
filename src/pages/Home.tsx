import { useLocation } from "wouter";

const Home = () => {
  const [, navigate] = useLocation();
  return (
    <div className="flex h-[calc(100vh-5rem)] w-full items-center justify-center">
      <button
        className="rounded-lg bg-white px-6 py-3 text-black shadow-lg transition-opacity duration-300"
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Enter
      </button>
    </div>
  );
};

export default Home;
