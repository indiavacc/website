"use client";

import Divider from "@/components/Divider";
import { useTeamStore } from "@/app/store/useTeamStore";
import { motion } from "framer-motion";
import { CircleUserRound } from "lucide-react";
import useTeam from "../hooks/useTeam";

export default function TeamPage() {
  useTeam();
  const { teamMembers } = useTeamStore();

  return (
    <div className="min-h-screen pt-32 pb-20">
      <Divider title="Our Team" />

      <div className="px-6">
        {!teamMembers?.length ? (
          <span className="mt-2 px-3 py-1 text-md font-semibold rounded-md backdrop-blur-md text-white">
            No team members yet.
          </span>
        ) : (
          <div className="mx-auto flex flex-wrap justify-center gap-8 max-w-7xl">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.id}
                className="flex flex-col items-center rounded-xl p-4 bg-white/5 backdrop-blur-md w-64"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
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
    </div>
  );
}
