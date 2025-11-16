import React from "react";
import { motion } from "framer-motion";

interface DividerProps {
  title?: string;
}

export default function Divider({ title }: DividerProps) {
  return (
    <div className="relative flex items-center justify-center w-full my-24 px-16">
      {/* Left Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex-1 h-[3px] bg-gradient-to-r from-transparent via-[#FFD700]/70 to-[#FFD700] rounded-full origin-left"
      />

      {/* Title */}
      {title && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-8 text-2xl md:text-3xl font-medium tracking-wide text-white/90 select-none"
        >
          {title}
        </motion.span>
      )}

      {/* Right Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex-1 h-[3px] bg-gradient-to-l from-transparent via-[#FFD700]/70 to-[#FFD700] rounded-full origin-right"
      />
    </div>
  );
}
