"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface DropdownItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface NavDropdownProps {
  title: string;
  items: (DropdownItem | null)[];
}

export default function NavDropdown({ title, items }: NavDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative flex-shrink-0"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 hover:text-grey-300 font-medium transition-colors">
        {title}
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 w-36 bg-black/30 backdrop-blur-md rounded-lg shadow-lg overflow-hidden z-50 border border-white/10"
          >
            {items.map(
              (item) =>
                item && (
                  <li key={item.href}>
                    {item.onClick ? (
                      <button
                        onClick={item.onClick}
                        className="w-full text-left block px-4 py-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        href={item.href || "#"}
                        className="block px-4 py-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                )
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
