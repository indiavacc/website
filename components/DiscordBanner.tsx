// "use client";

// import { motion } from "framer-motion";

// export default function DiscordBanner() {
//   return (
//     <motion.div
//       initial={{ y: -50, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6 }}
//       className="relative w-full max-w-7xl mx-auto rounded-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 px-6 py-6 shadow-lg"
//     >
//       {/* Fire gradient background */}
//       <div
//         className="absolute inset-0 w-full h-full"
//         style={{
//           zIndex: 0,
//           background:
//             "linear-gradient(270deg, #FFD700, #FF4500, #FF0000, #FF8C00)",
//           backgroundSize: "200% 200%",
//           animation: "fire 6s linear infinite",
//         }}
//       ></div>

//       {/* Strong frosted glass overlay */}
//       <div
//         className="absolute inset-0 w-full h-full bg-white/10 backdrop-blur-[120px]"
//         style={{
//           zIndex: 5,
//           WebkitBackdropFilter: "blur(120px)",
//           backdropFilter: "blur(120px)",
//         }}
//       />

//       {/* Content */}
//       <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full gap-4 md:gap-0">
//         <span className="text-black font-bold text-lg">
//           Join our Discord Community!
//         </span>
//         <a
//           href="https://discord.gg/YOUR_INVITE_LINK"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="bg-black/10 hover:bg-black/20 text-black px-4 py-2 rounded-lg font-semibold transition-colors"
//         >
//           Join Now
//         </a>
//       </div>

//       <style jsx>{`
//         @keyframes fire {
//           0% {
//             background-position: 0% 50%;
//           }
//           50% {
//             background-position: 100% 50%;
//           }
//           100% {
//             background-position: 0% 50%;
//           }
//         }
//       `}</style>
//     </motion.div>
//   );
// }

"use client";

import { motion } from "framer-motion";

export default function DiscordBanner() {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative w-full mx-auto overflow-hidden flex flex-col md:flex-row items-center justify-between px-28 py-4 shadow-lg"
      style={{
        background: "linear-gradient(270deg, #FFD700, #FFA500, #FF8C00)",
      }}
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full gap-4 md:gap-0">
        <span className="text-white backdrop-blur-xl font-semibold  text-lg md:text-xl flex flex-col gap-1">
          Join our Discord Community!
          <span className="font-extrabold">#DiscoverIndiaDiscoverVATSIM</span>
        </span>
        <a
          href="https://discord.gg/YOUR_INVITE_LINK"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black/20 hover:bg-black/30 text-white px-4 py-2 rounded-lg font-semibold transition-colors backdrop-blur-md"
        >
          Join Now
        </a>
      </div>
    </motion.div>
  );
}
