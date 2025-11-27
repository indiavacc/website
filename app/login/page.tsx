/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Divider from "@/components/Divider";

const containerAnimation = {
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fieldAnimation = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export default function LoginPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  if (session) {
    redirect("/");
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: true,
      callbackUrl: "/",
    });

    setLoading(false);
  };

  const handleVatsimLogin = () => {
    signIn("vatsim", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <Divider title="Sign In" />
      <div className="flex justify-center mt-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl"
        >
          <motion.form
            onSubmit={handleLogin}
            variants={containerAnimation}
            initial="hidden"
            animate="show"
            className="space-y-7"
          >
            {/* Email */}
            <motion.div variants={fieldAnimation as any}>
              <label className="text-white text-md font-medium mb-2 block">
                Email
              </label>
              <input
                type="email"
                required
                className="input-style"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </motion.div>

            {/* Password */}
            <motion.div variants={fieldAnimation as any}>
              <label className="text-white text-md font-medium mb-2 block">
                Password
              </label>
              <input
                type="password"
                required
                className="input-style"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
            </motion.div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={true}
              whileHover={!loading ? { scale: 1.05 } : {}}
              whileTap={!loading ? { scale: 0.96 } : {}}
              className={`w-full bg-gradient-to-r from-orange-600 to-amber-500 text-black font-bold py-3 rounded-xl ${
                loading || (true && "opacity-80 cursor-not-allowed")
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </motion.button>
          </motion.form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="h-[1px] bg-white/20 flex-1" />
            <span className="text-gray-300 text-sm">or</span>
            <div className="h-[1px] bg-white/20 flex-1" />
          </div>

          {/* VATSIM Button */}
          <motion.button
            onClick={handleVatsimLogin}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            disabled={true}
            className={`w-full bg-blue-600/80 hover:bg-blue-600 text-white font-bold py-3 rounded-xl border border-blue-400/40 ${
              true && "opacity-80 cursor-not-allowed"
            }`}
          >
            Sign in with VATSIM
          </motion.button>
        </motion.div>
      </div>

      {/* Same input style used as Join Page — KEEP CONSISTENT */}
      <style>{`
        .input-style {
          width: 100%;
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.25);
          padding: 14px 12px;
          color: white;
          border-radius: 12px;
          outline: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .input-style:focus {
          border-color: #ffbf47;
          box-shadow: 0 0 10px rgba(255, 191, 71, 0.35);
        }
      `}</style>
    </div>
  );
}
