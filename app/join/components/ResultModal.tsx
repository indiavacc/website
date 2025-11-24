"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertTriangle, X, Copy } from "lucide-react";

interface Props {
  open: boolean;
  error?: boolean;
  onClose: () => void;
  ticketData?: string; // The data to copy in description
}

export default function ResultModal({
  open,
  error,
  onClose,
  ticketData,
}: Props) {
  const [copied, setCopied] = useState(false);

  const Icon = error ? AlertTriangle : CheckCircle;
  const title = error ? "Submission Failed" : "Application Submitted!";
  const desc = error
    ? "We could not process your form. Please review the fields and try again."
    : "Thank you for applying to India vACC. We will review your application shortly.";

  const handleCopy = () => {
    if (!ticketData) return;
    navigator.clipboard.writeText(ticketData);
    setCopied(true);
  };

  const ticketButtonText = copied ? "Create Ticket" : "Copy Data First";

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

            {/* Success Guidelines */}
            {!error && ticketData && (
              <div className="mt-6 border border-yellow-700/30 bg-gray-800 rounded-xl px-4 py-3 text-gray-300 space-y-3">
                <p className="text-sm">
                  Please create a ticket with the following:
                </p>
                <div className="flex justify-between items-center">
                  <span className="opacity-70 text-xs">ASSIGN STAFF</span>
                  <span className="font-mono text-sm">
                    India Subdivision Staff
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-70 text-xs">SUBJECT</span>
                  <span className="font-mono text-sm">
                    ATC Training Request
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-70 text-xs">DESCRIPTION</span>
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded bg-yellow-600 hover:bg-yellow-700 transition ${
                      copied ? "bg-green-500 hover:bg-green-600" : ""
                    }`}
                  >
                    <Copy size={14} />
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre className="text-xs font-mono bg-gray-900 p-2 rounded max-h-32 overflow-y-auto overflow-x-auto">
                  {ticketData}
                </pre>
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
              shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
              onClick={() => {
                if (!copied) return;
                onClose();
                window.open("https://hq.vatwa.net/support/create", "_blank");
              }}
              disabled={!copied && !error} // allow click if error, otherwise only after copy
            >
              {error ? "Create Ticket" : ticketButtonText}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
