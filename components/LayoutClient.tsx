"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSettingsStore } from "@/app/store/useSettingsStore";
import Footer from "./Footer";
import { BASE_URL } from "@/lib/api";
import { usePathname } from "next/navigation";
import useSettings from "@/app/hooks/useSettings";
import Navbar from "./navbar/Navbar";

function shouldShowBanner(pathname: string) {
  switch (pathname) {
    case "/events":
      return true;
    default:
      return false;
  }
}

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useSettings();
  const { settings } = useSettingsStore();

  const showBanner = shouldShowBanner(pathname);
  const maxScroll = showBanner ? 200 : 400;
  const opacity = useTransform(scrollY, [0, maxScroll], [1, 0]);
  const heightClass = showBanner ? "h-[50vh]" : "h-screen";
  const gradientHeightClass = showBanner ? "h-[50%]" : "h-[40vh]";

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex flex-col bg-black text-white"
    >
      <Navbar />

      {/* Shared background */}
      <motion.div
        className={`fixed top-0 left-0 w-full ${heightClass} z-10 overflow-hidden`}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Background image */}
        <motion.img
          src={`${BASE_URL}${settings?.background?.url}`}
          alt="Background"
          className="w-full h-full object-cover"
          style={{ opacity }}
        />

        {/* Black overlay and gradient */}
        <div className="absolute inset-0 bg-black/40" />
        <div
          className={`absolute bottom-0 left-0 w-full ${gradientHeightClass} bg-gradient-to-b from-transparent to-black`}
        />

        {/* Scroll indicator */}
        {!showBanner && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.4,
              duration: 1,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 animate-bounce"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </motion.div>
        )}
      </motion.div>

      {/* Page content now overlays on top */}
      <main className="relative z-10 flex-grow">{children}</main>

      <Footer />
    </div>
  );
}
