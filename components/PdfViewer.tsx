"use client";

import { useEffect } from "react";
import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { motion } from "framer-motion";

interface PdfViewerProps {
  url: string; // local PDF path, e.g., "/pdfs/sample.pdf"
}

export default function PdfViewer({ url }: PdfViewerProps) {
  useEffect(() => {
    // Animate pages after they render
    const pages = document.querySelectorAll(".react-pdf__Page");
    pages.forEach((page, i) => {
      page.animate(
        [
          { opacity: 0, transform: "translateY(20px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: 600,
          delay: i * 100,
          fill: "forwards",
        }
      );
    });
  }, []);

  return (
    <div className="w-full inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-8">
      {/* Glass container */}
      <motion.div
        className="relative w-full max-w-5xl h-[80vh] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-auto flex flex-col items-center py-8 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer fileUrl={url} defaultScale={SpecialZoomLevel.PageWidth} />
        </Worker>
      </motion.div>
    </div>
  );
}
