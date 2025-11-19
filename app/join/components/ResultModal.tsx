"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertTriangle, X } from "lucide-react";

interface Props {
  open: boolean;
  error?: boolean;
  onClose: () => void;
}

export default function ResultModal({ open, error, onClose }: Props) {
  const Icon = error ? AlertTriangle : CheckCircle;
  const title = error ? "Submission Failed" : "Application Submitted!";
  const desc = error
    ? "We could not process your form. Please review the fields and try again."
    : "Thank you for applying to India vACC. We will review your application shortly.";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.7, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.7, y: 40 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative bg-gray-900 w-[95%] max-w-md rounded-2xl shadow-2xl p-6 border border-yellow-600/20"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-300 hover:text-white"
            >
              <X size={22} />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <Icon
                size={56}
                className={error ? "text-red-500" : "text-green-500"}
              />
            </div>

            {/* Title */}
            <h1 className="text-center text-xl font-bold text-white">
              {title}
            </h1>

            {/* Runway Divider */}
            <div className="mx-auto mt-4 mb-4 w-20 h-1 bg-yellow-500 rounded-full" />

            {/* Message */}
            <p className="text-gray-300 text-center text-sm leading-relaxed px-2">
              {desc}
            </p>

            {/* Boarding-Pass Style Info */}
            {!error && (
              <div className="mt-6 border border-yellow-700/30 bg-gray-800 rounded-xl px-4 py-3 text-gray-300">
                <div className="flex justify-between mb-1">
                  <span className="opacity-70 text-xs">ROUTE</span>
                  <span className="font-mono text-sm">
                    APPLICANT → INDIA vACC
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70 text-xs">ETA</span>
                  <span className="font-mono text-sm">3–7 DAYS</span>
                </div>
              </div>
            )}

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full mt-6 py-3 rounded-xl font-semibold text-black bg-gradient-to-r 
              ${
                error
                  ? "from-red-500 to-red-600"
                  : "from-yellow-500 to-yellow-600"
              } 
              shadow-lg hover:shadow-xl transition-all`}
              onClick={onClose}
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
