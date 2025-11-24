/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import Divider from "@/components/Divider";
import { submitApplication } from "../api/application";
import ResultModal from "./components/ResultModal";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type AviationBg = "Yes" | "No";

interface FormData {
  discord: string;
  hours: string;
  reason: string;
  familiarity: number;
  aviationBg: AviationBg;
  bgDetails: string;
  monthlyTime: string;
}

type Errors = Partial<Record<keyof FormData, string>>;

const FAMILIARITY = [
  "Not Familiar",
  "Somewhat",
  "Familiar",
  "Very Familiar",
  "Expert",
];

// Animations
const containerAnimation = {
  show: {
    transition: {
      staggerChildren: 0.09,
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

const shakeEffect = {
  x: [0, -8, 8, -8, 8, 0],
  transition: { duration: 0.35 },
};

const DEFAULT_DATA: FormData = {
  discord: "",
  hours: "",
  reason: "",
  familiarity: 2,
  aviationBg: "No",
  bgDetails: "",
  monthlyTime: "",
};

const createDescription = (user: any, formData: FormData) => `
    CID: ${user.vatsim.cid}
    Email: ${user.email}
    Discord ID: ${formData.discord}
    Total Hours on VATSIM: ${formData.hours}
    Why: ${formData.reason}
    Familiarity with phraseology: ${FAMILIARITY[formData.familiarity]}
    Aviation background: ${formData.aviationBg}
    ${formData.bgDetails}
    Can give time: ${formData.monthlyTime}
`;

export default function JoinPage() {
  const [formData, setFormData] = useState<FormData>(DEFAULT_DATA);

  const [errors, setErrors] = useState<Errors>({});

  const [loading, setLoading] = useState(false);

  const session = useSession();

  if (!session.data) {
    redirect("/login");
  }

  const [modal, setModal] = useState<{
    open: boolean;
    isError: boolean;
  } | null>(null);

  const handleChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: Errors = {};
    const required: (keyof FormData)[] = [
      "discord",
      "hours",
      "reason",
      "monthlyTime",
    ];

    required.forEach((key) => {
      if (!formData[key]) newErrors[key] = "Required";
    });

    if (formData.aviationBg === "Yes" && !formData.bgDetails) {
      newErrors.bgDetails = "Please provide details";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    // const cleanData = {
    //   ...formData,
    //   familiarity: FAMILIARITY[formData.familiarity],
    //   hours: Number(formData.hours),
    //   aviationBg: formData.aviationBg === "No" ? false : true,
    // };

    try {
      const desc = createDescription(session.data.user, formData);
      console.log("🚀 ~ handleSubmit ~ desc:", desc, session);
      // const res = await submitApplication(cleanData);

      // if (res?.error) throw new Error(res.error.message);

      setModal({
        open: true,
        isError: false,
      });

      // Clear form only on success!
      setFormData(DEFAULT_DATA);
    } catch (err: any) {
      setModal({
        open: true,
        isError: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <Divider title="ATC Training Application" />
      <div className="px-6 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl"
        >
          <motion.form
            onSubmit={handleSubmit}
            variants={containerAnimation}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {/* Discord */}
            <motion.div variants={fieldAnimation as any}>
              <label className="text-white text-md font-medium mb-1 block">
                Discord Username
              </label>
              <input
                type="text"
                className="input-style"
                value={formData.discord}
                onChange={(e) => handleChange("discord", e.target.value)}
              />
              {errors.discord && (
                <motion.p animate={shakeEffect} className="error-text">
                  {errors.discord}
                </motion.p>
              )}
            </motion.div>

            {/* Hours */}
            <motion.div variants={fieldAnimation as any}>
              <label className="text-white text-md font-medium mb-1 block">
                Total Hours on VATSIM
              </label>
              <input
                type="text"
                className="input-style"
                value={formData.hours}
                onChange={(e) =>
                  handleChange("hours", e.target.value.replace(/\D/g, ""))
                }
              />
              {errors.hours && (
                <motion.p animate={shakeEffect} className="error-text">
                  {errors.hours}
                </motion.p>
              )}
            </motion.div>

            {/* Reason */}
            <motion.div variants={fieldAnimation as any}>
              <label className="text-white text-md font-medium mb-1 block">
                Why do you want to be an ATC under India vACC?
              </label>
              <textarea
                rows={4}
                className="textarea-style"
                value={formData.reason}
                onChange={(e) => handleChange("reason", e.target.value)}
              />
              {errors.reason && (
                <motion.p animate={shakeEffect} className="error-text">
                  {errors.reason}
                </motion.p>
              )}
            </motion.div>

            {/* Familiarity Slider */}
            <motion.div variants={fieldAnimation as any}>
              <label className="text-white text-md font-medium mb-2 block">
                Familiarity with ICAO Phraseology
              </label>

              <div className="slider-container">
                <div className="relative flex items-center">
                  <input
                    type="range"
                    min={0}
                    max={4}
                    step={0.01} // Smooth drag
                    value={formData.familiarity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        familiarity: parseFloat(e.target.value),
                      })
                    }
                    onMouseUp={(e) => {
                      const val = parseFloat(e.currentTarget.value);
                      const rounded = Math.round(val);
                      setFormData({ ...formData, familiarity: rounded });
                    }}
                    onTouchEnd={(e) => {
                      const val = parseFloat(e.currentTarget.value);
                      const rounded = Math.round(val);
                      setFormData({ ...formData, familiarity: rounded });
                    }}
                    className="w-full h-2 rounded-full cursor-pointer appearance-none bg-gradient-to-r from-yellow-400 to-orange-500"
                  />
                </div>

                <p className="text-gray-300 text-center text-md font-medium mt-2">
                  {FAMILIARITY[Math.round(formData.familiarity)]}
                </p>
              </div>
            </motion.div>

            {/* Aviation Background */}
            <motion.div variants={fieldAnimation as any}>
              <label className="text-white text-md font-medium mb-2 block">
                Aviation Background?
              </label>

              <div className="flex gap-4 flex-wrap">
                {(["Yes", "No"] as AviationBg[]).map((opt) => (
                  <label
                    key={opt}
                    className={`radio-pill ${
                      formData.aviationBg === opt ? "active" : ""
                    }`}
                    onClick={() => handleChange("aviationBg", opt)}
                  >
                    {opt}
                  </label>
                ))}
              </div>

              {formData.aviationBg === "Yes" && (
                <div>
                  <label className="text-white text-md font-medium mb-1 block mt-3">
                    Please Mention your aviation background briefly
                  </label>
                  <textarea
                    rows={3}
                    className="textarea-style"
                    value={formData.bgDetails}
                    onChange={(e) => handleChange("bgDetails", e.target.value)}
                  />
                  {errors.bgDetails && (
                    <motion.p animate={shakeEffect} className="error-text">
                      {errors.bgDetails}
                    </motion.p>
                  )}
                </div>
              )}
            </motion.div>

            {/* Monthly time */}
            <motion.div variants={fieldAnimation as any}>
              <label className="text-white text-md font-medium mb-1 block">
                How much time are you willing to contribute per month for
                controlling?
              </label>
              <input
                type="text"
                className="input-style"
                value={formData.monthlyTime}
                onChange={(e) =>
                  handleChange("monthlyTime", e.target.value.replace(/\D/g, ""))
                }
              />
              {errors.monthlyTime && (
                <motion.p animate={shakeEffect} className="error-text">
                  {errors.monthlyTime}
                </motion.p>
              )}
            </motion.div>

            {/* Submit */}
            <motion.button
              whileHover={!loading ? { scale: 1.04 } : {}}
              whileTap={!loading ? { scale: 0.97 } : {}}
              type="submit"
              className={`w-full bg-gradient-to-r from-orange-600 to-amber-500 text-black font-bold py-3 rounded-xl flex justify-center items-center ${
                loading && "opacity-80 cursor-not-allowed"
              }`}
              disabled={loading}
            >
              {loading ? (
                <motion.span
                  className="flex items-center gap-2"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                >
                  🛫 Waiting for clearance...
                </motion.span>
              ) : (
                "Submit Application"
              )}
            </motion.button>
          </motion.form>
        </motion.div>
        {modal && (
          <ResultModal
            open={modal.open}
            error={modal.isError}
            onClose={() => setModal(null)}
          />
        )}

        {/* Styling */}
        <style>{`
          .input-style,
          .textarea-style {
            width: 100%;
            background: transparent;
            border: 1.5px solid rgba(255,255,255,0.25);
            padding: 14px 12px;
            color: white;
            border-radius: 12px;
            outline: none;
            transition: border-color 0.25s ease, box-shadow 0.25s ease;
          }
          .input-style:focus,
          .textarea-style:focus {
            border-color: #ffbf47;
            box-shadow: 0 0 10px rgba(255, 191, 71, 0.35);
          }
          .textarea-style {
            resize: none;
          }
          .error-text {
            color: #ff7b7b;
            font-size: 0.82rem;
            margin-top: 4px;
            font-weight: 500;
          }

          /* Slider Customization */
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            height: 22px;
            width: 22px;
            border-radius: 50%;
            background: #ffffff;
            border: 3px solid #f59e0b; /* amber-500 */
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
            transition: transform 0.15s ease;
          }
          input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(1.15);
            box-shadow: 0px 0px 10px rgba(245, 158, 11, 0.6);
          }
          input[type="range"]::-moz-range-thumb {
            height: 22px;
            width: 22px;
            border-radius: 50%;
            background: #ffffff;
            border: 3px solid #f59e0b;
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
            transition: transform 0.15s ease;
          }
          input[type="range"]::-moz-range-thumb:hover {
            transform: scale(1.15);
            box-shadow: 0px 0px 10px rgba(245, 158, 11, 0.6);
          }

          /* Radio Pill Buttons */
          .radio-pill {
            padding: 6px 14px;
            border-radius: 18px;
            font-size: 0.85rem;
            border: 1px solid rgba(255,255,255,0.25);
            cursor: pointer;
            color: white;
            transition: 0.25s ease;
            user-select: none;
          }

          .radio-pill:hover {
            border-color: #ffbf47;
            transform: translateY(-1px);
          }

          .radio-pill.active {
            background: linear-gradient(to right, #ff8200, #ffbf47);
            color: #111;
            border-color: transparent;
            box-shadow: 0 0 10px rgba(255,191,71,0.35);
            font-weight: 600;
          }
        `}</style>
      </div>
    </div>
  );
}
