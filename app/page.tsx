"use client";

import DiscordBanner from "@/components/DiscordBanner";
import PartnersSection from "@/components/PartnersSection";
import { useSettingsStore } from "@/app/store/useSettingsStore";
import { motion } from "framer-motion";
import Events from "@/components/Events";

export default function HomePage() {
  const { settings } = useSettingsStore();
  return (
    <>
      <section className="relative min-h-[100vh] flex items-center">
        <div className="relative z-20 px-8 md:px-16 lg:px-24 text-white max-w-2xl">
          {/* Welcome text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-lg md:text-xl font-medium mb-2"
          >
            Welcome to <span className="inline-block animate-wave">👋</span>
          </motion.p>

          {/* Big title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(255,140,0,0.3)] animate-gradient"
          >
            India vACC
          </motion.h1>

          {/* subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="mt-4 text-base md:text-lg leading-relaxed"
          >
            {settings?.subtitle}
          </motion.p>
        </div>
      </section>
      <Events />
      <PartnersSection />
      <DiscordBanner />
    </>
  );
}
