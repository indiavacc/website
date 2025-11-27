"use client";

// import PdfViewer from "@/components/PdfViewer";

import dynamic from "next/dynamic";

export const PdfViewer = dynamic(() => import("@/components/PdfViewer"), {
  ssr: false, // disable server-side rendering
});

const PoliciesPage = () => {
  const pdfPath = "pdfs/Constitution_Policy.pdf";
  return (
    <div className="min-h-screen pt-32 pb-20">
      <PdfViewer url={pdfPath} />
    </div>
  );
};

export default PoliciesPage;
