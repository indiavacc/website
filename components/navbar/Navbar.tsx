"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavLogo from "./NavLogo";
import NavDropdown from "./NavDropdown";

const links = [
  { label: "Home", href: "/" },
  {
    label: "Controllers",
    items: [
      { label: "Roster", href: "/controllers" },
      { label: "Sector Files", href: "https://files.aero-nav.com/VXXX" },
      { label: "Join ATC", href: "/join" },
    ],
  },
  {
    label: "Pilots",
    items: [
      { label: "Flights", href: "/flights" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    label: "About",
    items: [
      { label: "Staff", href: "/team" },
      { label: "Policies", href: "/policies" },
      { label: "About Us", href: "/about" },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 w-full z-30 px-8 py-4 transition-all duration-500 ${
        scrolled
          ? "bg-black/60 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <NavLogo />
        <div className="space-x-6 text-sm font-medium flex items-center">
          {links.map((link) =>
            link.items ? (
              <NavDropdown
                key={link.label}
                title={link.label}
                items={link.items}
              />
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  pathname === link.href
                    ? "bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent font-semibold"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </div>
    </motion.nav>
  );
}
