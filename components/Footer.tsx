"use client";

import { useSettingsStore } from "@/app/store/useSettingsStore";
import { motion } from "framer-motion";

export default function Footer() {
  const { settings } = useSettingsStore();
  const socials = settings?.socials || [];

  return (
    <footer className="relative mt-24 z-20">
      <div className="bg-[#0b0b0b]/95 backdrop-blur-md py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-gray-200">India VACC</span> •
            All rights reserved.
          </p>

          <div className="flex gap-5 items-center">
            {socials.length > 0 ? (
              socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 bg-transparent rounded-md hover:scale-110 transition-transform duration-300"
                >
                  <motion.img
                    src={`${social.logo.url}`}
                    alt={social.name}
                    className="
                      w-5 h-5
                      object-contain
                      brightness-0 invert
                      drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]
                      transition-all duration-300
                    "
                  />
                </a>
              ))
            ) : (
              <p className="text-gray-500 text-sm">Loading socials...</p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
