"use client";

import { useFilteredFlights } from "@/app/hooks/useFilterFlights";
import Divider from "@/components/Divider";
import { RatingMap } from "@/lib/flights.enums";
import { motion } from "framer-motion";

function getOnlineDuration(loginTime: Date) {
  const now = new Date(); // current time
  const diffMs = now.getTime() - loginTime.getTime(); // difference in milliseconds

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}h ${minutes}m`;
}

export default function ControllerBoard() {
  const { controllers, loading } = useFilteredFlights(
    180000 // fetch every 3 minutes
  );

  if (loading)
    return (
      <div className="max-w-7xl mx-auto bg-black/30 backdrop-blur-md p-4 rounded-2xl">
        <p className="text-green-300 font-mono">Loading...</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Divider title="Live Controllers" />
      {controllers.length > 0 ? (
        <>
          <div className="overflow-x-auto rounded-2xl backdrop-blur-md bg-black/20 border border-white/10 shadow-lg">
            <table className="w-full text-left border-collapse">
              <thead className="bg-black/30">
                <tr className="border-b border-green-400/30">
                  <th className="px-4 py-2 text-green-200 font-mono">
                    Callsign
                  </th>
                  <th className="px-4 py-2 text-green-200 font-mono">
                    Frequency
                  </th>
                  <th className="px-4 py-2 text-green-200 font-mono">Name</th>
                  <th className="px-4 py-2 text-green-200 font-mono">Rating</th>
                  <th className="px-4 py-2 text-green-200 font-mono">Time</th>
                </tr>
              </thead>
              <tbody>
                {controllers.map((c, idx) => {
                  const now = new Date();
                  return (
                    <motion.tr
                      key={c.cid}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-green-400/20 hover:bg-green-900/20 transition-colors"
                    >
                      <td className="px-4 py-3 font-mono text-green-300">
                        {c.callsign}
                      </td>
                      <td className="px-4 py-3 font-mono text-green-300">
                        {c.frequency}
                      </td>
                      <td className="px-4 py-3 font-mono text-green-300">
                        {c.name}
                      </td>
                      <td className="px-4 py-3 font-mono text-green-300">
                        {RatingMap[c.rating]}
                      </td>
                      <td className="px-4 py-3 font-mono text-green-300">
                        {getOnlineDuration(new Date(c.logon_time))}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className=" bg-black/30 backdrop-blur-md p-4 rounded-2xl">
          <p className="text-green-300 font-mono">No controllers online.</p>
        </div>
      )}
    </div>
  );
}
