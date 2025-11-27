"use client";

import { useFilteredFlights } from "@/app/hooks/useFilterFlights";
import Divider from "@/components/Divider";
import { motion } from "framer-motion";

export default function FlightBoard() {
  const { flights, loading } = useFilteredFlights(
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
      <Divider title="Live Flights" />
      {flights.length > 0 ? (
        <>
          <div className="overflow-x-auto rounded-2xl backdrop-blur-md bg-black/20 border border-white/10 shadow-lg">
            <table className="w-full text-left border-collapse">
              <thead className="bg-black/30">
                <tr className="border-b border-green-400/30">
                  <th className="px-4 py-2 text-green-200 font-mono">
                    Callsign
                  </th>
                  <th className="px-4 py-2 text-green-200 font-mono">Dep</th>
                  <th className="px-4 py-2 text-green-200 font-mono">Arr</th>
                  <th className="px-4 py-2 text-green-200 font-mono">
                    Transponder
                  </th>
                  <th className="px-4 py-2 text-green-200 font-mono">
                    Enroute Time
                  </th>
                  <th className="px-4 py-2 text-green-200 font-mono">
                    Aircraft
                  </th>
                </tr>
              </thead>
              <tbody>
                {flights.map((f, idx) => (
                  <motion.tr
                    key={f.cid}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-green-400/20 hover:bg-green-900/20 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-green-300">
                      {f.callsign}
                    </td>
                    <td className="px-4 py-3 font-mono text-green-300">
                      {f.flight_plan?.departure}
                    </td>
                    <td className="px-4 py-3 font-mono text-green-300">
                      {f.flight_plan?.arrival}
                    </td>
                    <td className="px-4 py-3 font-mono text-green-300">
                      {f.transponder}
                    </td>
                    <td className="px-4 py-3 font-mono text-green-300">
                      {f.flight_plan?.enroute_time}
                    </td>
                    <td className="px-4 py-3 font-mono text-green-300">
                      {f.flight_plan?.aircraft_short}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className=" bg-black/30 backdrop-blur-md p-4 rounded-2xl">
          <p className="text-green-300 font-mono">No Flights Found.</p>
        </div>
      )}
    </div>
  );
}
