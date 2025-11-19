"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useSettingsStore } from "@/app/store/useSettingsStore";
import { useState, useEffect } from "react";

function getBrandLogos(logos: { name: string; url: string }[]) {
  let dark: string | null = null;
  let light: string | null = null;

  if (!logos) return;
  for (const { name, url } of logos) {
    const lower = name.toLowerCase();

    if (!dark && (lower.includes("dark") || lower.includes("black"))) {
      dark = url;
    }
    if (!light && (lower.includes("light") || lower.includes("white"))) {
      light = url;
    }

    // If both found, stop
    if (dark && light) break;
  }

  return {
    dark: dark ?? light, // fallback
    light: light ?? dark, // fallback
  };
}

export default function NavLogo() {
  const { settings } = useSettingsStore();
  const [scrolled, setScrolled] = useState(false);

  const brandLogos = getBrandLogos(settings?.namedLogo);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Link href="/">
      <motion.div
        className={`
          inline-flex items-center p-2 rounded-lg cursor-pointer select-none
          transition-all duration-100
        `}
        whileTap={{ scale: 0.9, y: 2, filter: "brightness(0.9)" }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.img
          src={`${scrolled ? brandLogos?.light : brandLogos?.dark}`}
          alt={"IndiaVACC"}
          className="h-10 w-auto"
        />
      </motion.div>
    </Link>
  );
}
