"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Divider from "@/components/Divider";
import { useSettingsStore } from "@/app/store/useSettingsStore";
import useTeam from "../hooks/useTeam";
import { useTeamStore } from "../store/useTeamStore";
import { CircleUserRound } from "lucide-react";
import dynamic from "next/dynamic";

export const PdfViewer = dynamic(() => import("@/components/PdfViewer"), {
  ssr: false, // disable server-side rendering
});

const AboutPage = () => {
  useTeam();
  const { teamMembers } = useTeamStore();
  const { settings } = useSettingsStore();
  const pdfPath = "pdfs/Constitution_Policy.pdf";

  const fullText = settings?.about || "";

  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!fullText) return;

    let index = 0;
    const typingSpeed = 40; // milliseconds per character

    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      index++;

      if (index === fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <section className="flex flex-col justify-center items-center px-8 md:px-16 lg:px-24 pb-8">
        <Divider title="About Us" />
        <div className="max-w-4xl mx-auto px-6 py-12 bg-black/40 backdrop-blur-md rounded-2xl shadow-xl">
          <motion.p
            className="text-gray-200 text-lg mb-4 leading-relaxed whitespace-pre-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {displayedText}
            <span
              className="inline-block w-[2px] bg-gray-200 rounded-sm ml-1 align-text-bottom"
              style={{
                height: "1.2em",
                animation: isTyping ? "none" : "blink 1.2s step-start infinite",
              }}
            />
          </motion.p>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center px-8 md:px-16 lg:px-24 pb-8">
        <Divider title="Our Team" />

        <div className="px-6">
          {!teamMembers?.length ? (
            <span className="mt-2 px-3 py-1 text-md font-semibold rounded-md backdrop-blur-md text-white">
              No team members yet.
            </span>
          ) : (
            <div className="mx-auto flex flex-wrap justify-center gap-8 max-w-5xl">
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member.id}
                  className="flex flex-col items-center rounded-xl p-4 bg-white/5 backdrop-blur-md w-64"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  {/* Photo */}
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                    {member.photo ? (
                      <motion.img
                        src={member.photo?.url ?? "#"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <CircleUserRound className="w-full h-full text-white/100" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col items-center text-center">
                    {member.name ? (
                      <h3 className="text-xl font-semibold">{member.name}</h3>
                    ) : (
                      <span className="mt-1 px-3 py-1 text-xs font-semibold rounded-full bg-red-600/80 text-white">
                        Vacant
                      </span>
                    )}
                    <p className="text-gray-400">{member.position}</p>
                    <span className="mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-orange-600/80 text-white">
                      {member.rank}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="flex flex-col justify-center items-center px-8 md:px-16 lg:px-24 pb-8">
        <Divider title="Our Constitution Policy" />
        <PdfViewer url={pdfPath} />
      </section>

      <style jsx>{`
        @keyframes blink {
          0%,
          50%,
          100% {
            opacity: 1;
          }
          75% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
