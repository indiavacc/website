"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Divider from "@/components/Divider";
import { useSettingsStore } from "@/app/store/useSettingsStore";

const AboutPage = () => {
  const { settings } = useSettingsStore();
  const fullText = settings?.about || "";

  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!fullText) return;

    let index = 0;
    const typingSpeed = 40; // milliseconds per character

    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      index++;

      if (index === fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <section className="flex flex-col justify-center items-center px-8 md:px-16 lg:px-24 py-16">
        <Divider title="About Us" />
        <div className="max-w-4xl mx-auto -mt-16 px-6 py-12 bg-black/40 backdrop-blur-md rounded-2xl shadow-xl">
          <motion.p
            className="text-gray-200 text-lg mb-4 leading-relaxed whitespace-pre-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {displayedText}
            <span
              className="inline-block w-[2px] bg-gray-200 rounded-sm ml-1 align-text-bottom"
              style={{
                height: "1.2em",
                animation: isTyping ? "none" : "blink 1.2s step-start infinite",
              }}
            />
          </motion.p>
        </div>
      </section>

      <style jsx>{`
        @keyframes blink {
          0%,
          50%,
          100% {
            opacity: 1;
          }
          75% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
