import { useSplashControl } from "@/hooks/useSplashControl";
import { Link } from "wouter";

const Forbidden = () => {
  useSplashControl(false);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="text-center">
        <div className="my-8 px-4">
          <img src="/assets/403.jpg" alt="Forbidden" className="mx-auto mb-4" />
        </div>
        <Link href="/">
          <a className="rounded-lg bg-white px-6 py-3 text-black shadow-lg transition-opacity duration-300">
            Back to Home
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
