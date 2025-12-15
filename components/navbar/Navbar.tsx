/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavLogo from "./NavLogo";
import NavDropdown from "./NavDropdown";
import LoginButton from "../LoginButton";
import { useSession } from "next-auth/react";
import { Menu, X } from "lucide-react";

const getLinks = (session: any) => [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Controllers",
    items: [
      session ? { label: "Roster", href: "/controllers" } : null,
      { label: "Sector Files", href: "https://files.aero-nav.com/VXXX" },
    ],
  },
  {
    label: "Pilots",
    items: [
      { label: "Flights", href: "/live/flights" },
      { label: "Controllers", href: "/live/controllers" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    label: "Join Us",
    href: "/join",
    hidden: true,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();

  const links = getLinks(session);

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
      className={`fixed top-0 left-0 w-full z-30 px-4 sm:px-8 py-4 transition-all duration-500
        ${
          scrolled
            ? "bg-black/60 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }
      `}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <NavLogo />

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-sm font-medium items-center">
          {links.map((link) =>
            !link.hidden ? (
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
            ) : null
          )}
          {/* <LoginButton /> */}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden mt-4 bg-black/30 backdrop-blur-xl rounded-lg border border-white/10 p-4 space-y-3"
          >
            {links.map((link) =>
              link.items ? (
                <details key={link.label} className="group">
                  <summary className="cursor-pointer text-white/90 py-2 group-open:text-white font-medium flex justify-between items-center">
                    {link.label}
                  </summary>
                  <div className="pl-4 mt-2 space-y-2">
                    {link.items.map(
                      (item) =>
                        item && (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block text-white/70 hover:text-white transition-colors"
                          >
                            {item.label}
                          </Link>
                        )
                    )}
                  </div>
                </details>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-2 transition-colors ${
                    pathname === link.href
                      ? "text-amber-400 font-semibold"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}

            <div className="border-t border-white/10 pt-3">
              <LoginButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
