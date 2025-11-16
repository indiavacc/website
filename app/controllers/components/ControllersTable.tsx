"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

interface Controller {
  CID: string;
  name: string;
  rating: string;
  title: string;
  permissions: string;
}

interface ControllerTableProps {
  residents: Controller[];
  visitors: Controller[];
  bannerImage?: string;
}

export default function ControllerTable({
  residents,
  visitors,
}: ControllerTableProps) {
  const [activeTab, setActiveTab] = useState<"residents" | "visitors">(
    "residents"
  );
  const controllers = activeTab === "residents" ? residents : visitors;
  const permissionHierarchy = ["DEL", "GND", "TWR", "APP", "CTR"];

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* Tabs */}
        <div className="flex mb-2 justify-start">
          {["residents", "visitors"].map((tab) => (
            <button
              key={tab}
              className={`relative px-2 py-1 font-medium transition-colors ${
                activeTab === tab ? "text-orange-400" : "text-white/70"
              }`}
              onClick={() => setActiveTab(tab as "residents" | "visitors")}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute left-1/4 bottom-0 w-1/2 h-0.5 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"
                />
              )}
            </button>
          ))}
        </div>
        {/* Table */}
        <div className="overflow-x-auto rounded-2xl backdrop-blur-md bg-black/20 border border-white/10 shadow-lg">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/10 backdrop-blur-sm">
              <tr>
                <th className="px-4 py-2">CID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Rating</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2 text-center">DEL</th>
                <th className="px-4 py-2 text-center">GND</th>
                <th className="px-4 py-2 text-center">TWR</th>
                <th className="px-4 py-2 text-center">APP</th>
                <th className="px-4 py-2 text-center">CTR</th>
              </tr>
            </thead>
            <tbody>
              {controllers.map((c, idx) => {
                const topIndex = permissionHierarchy.indexOf(c.permissions);
                return (
                  <motion.tr
                    key={c.CID}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-4 py-4">{c.CID}</td>
                    <td className="px-4 py-4">{c.name}</td>
                    <td className="px-4 py-4">
                      <Badge className="relative px-3 py-1 rounded-full text-white font-medium overflow-hidden border-0 bg-transparent">
                        <span
                          className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500"
                          style={{ zIndex: 0 }}
                        />
                        <span className="relative z-10">{c.rating}</span>
                      </Badge>
                    </td>

                    <td className="px-4 py-4">{c.title}</td>
                    {permissionHierarchy.map((perm, i) => {
                      const hasPermission = i <= topIndex;
                      return (
                        <td key={perm} className="px-4 py-4 text-center">
                          {hasPermission ? (
                            <Check
                              className="mx-auto text-green-400 animate-pulse"
                              size={22}
                            />
                          ) : (
                            <X className="mx-auto text-red-500" size={22} />
                          )}
                        </td>
                      );
                    })}
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
