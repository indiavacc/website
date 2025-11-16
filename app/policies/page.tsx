"use client";
import { motion } from "framer-motion";
import { Construction } from "lucide-react";

const PoliciesPage = () => {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <section className="flex flex-col justify-center items-center text-black text-2xl px-8 md:px-16 lg:px-24 py-16">
        <Construction />
        <motion.b>Under Construction</motion.b>
      </section>
    </div>
  );
};

export default PoliciesPage;
