"use client";

import { motion } from "framer-motion";

interface Flight {
  callsign: string;
  dep: string;
  arr: string;
  time: string;
  type: string; // Aircraft type
}

const dummyFlights: Flight[] = [
  { callsign: "AIC101", dep: "VIDP", arr: "VABB", time: "08:30", type: "A320" },
  { callsign: "BA202", dep: "EGLL", arr: "VIDP", time: "09:15", type: "B777" },
  { callsign: "DL303", dep: "KATL", arr: "VABB", time: "10:05", type: "B737" },
  { callsign: "IGO404", dep: "VABB", arr: "VIDP", time: "11:00", type: "A321" },
  { callsign: "LH505", dep: "EDDF", arr: "VIDP", time: "12:20", type: "A350" },
];

export default function FlightBoard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="overflow-x-auto rounded-2xl backdrop-blur-md bg-black/20 border border-white/10 shadow-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-black/30">
            <tr className="border-b border-green-400/30">
              <th className="px-4 py-2 text-green-200 font-mono">Callsign</th>
              <th className="px-4 py-2 text-green-200 font-mono">Dep</th>
              <th className="px-4 py-2 text-green-200 font-mono">Arr</th>
              <th className="px-4 py-2 text-green-200 font-mono">Time</th>
              <th className="px-4 py-2 text-green-200 font-mono">Aircraft</th>
            </tr>
          </thead>
          <tbody>
            {dummyFlights.map((f, idx) => (
              <motion.tr
                key={f.callsign}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="border-b border-green-400/20 hover:bg-green-900/20 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-green-300">
                  {f.callsign}
                </td>
                <td className="px-4 py-3 font-mono text-green-300">{f.dep}</td>
                <td className="px-4 py-3 font-mono text-green-300">{f.arr}</td>
                <td className="px-4 py-3 font-mono text-green-300">{f.time}</td>
                <td className="px-4 py-3 font-mono text-green-300">{f.type}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
