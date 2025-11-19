"use client";

import { motion } from "framer-motion";
import React from "react";

interface Partner {
  name: string;
  website: string;
  photo: { url: string };
}

interface PartnersSliderProps {
  partners: Partner[];
}

export const PartnersSlider: React.FC<PartnersSliderProps> = ({ partners }) => {
  if (!partners?.length) return null;

  return (
    <div className="w-full py-8 flex flex-wrap items-center justify-center gap-10">
      {partners.map((p, i) => (
        <motion.a
          key={`${p.name}-${i}`}
          href={p.website}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          className="group flex items-center cursor-pointer justify-center"
        >
          <motion.img
            src={`${p.photo.url}`}
            alt={p.name}
            className="h-14 w-auto object-contain grayscale brightness-75 
                       group-hover:grayscale-0 group-hover:brightness-100 
                       transition-all duration-300"
          />
        </motion.a>
      ))}
    </div>
  );
};
