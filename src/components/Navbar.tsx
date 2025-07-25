import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, useLocation } from "wouter";
import FysLogo from "./img/FysLogo";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useSplashStore } from "@/store/splash";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const shouldShowSplash = useSplashStore((state) => state.shouldShowSplash);
  const shouldShowMenu = !shouldShowSplash && location !== "/";

  return (
    <div className="fixed z-10 w-full bg-black/30 px-4 py-2 text-white backdrop-blur-lg">
      <div className="container mx-auto">
        <div className="flex w-full items-center gap-4">
          {/* Logo */}
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <FysLogo />
          </Link>
          {shouldShowMenu && (
            <>
              {/* 電腦版選單，如果播放 SplashVideo 時不顯示 */}
              <NavigationMenu className="hidden w-auto md:flex">
                <NavigationMenuList className="flex items-center justify-center gap-4">
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/ebans">Ebans</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              {/* 漢堡選單按鈕 */}
              <button
                className="ml-auto rounded p-2 md:hidden"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </>
          )}
        </div>
        {/* 手機版選單，如果播放 SplashVideo 時不顯示 */}
        {shouldShowMenu && (
          <div
            className={cn(
              "flex w-full origin-top flex-col overflow-hidden transition-all duration-300 md:hidden",
              menuOpen
                ? "scale-y-100 pb-2 pt-4 opacity-100"
                : "pointer-events-none max-h-0 scale-y-0 opacity-0",
            )}
            style={{ willChange: "transform, opacity, max-height" }}
          >
            <Link
              href="/dashboard"
              className="block w-full border-y border-white py-4 text-left"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/ebans"
              className="block w-full border-b border-white py-4 text-left"
              onClick={() => setMenuOpen(false)}
            >
              Ebans
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
