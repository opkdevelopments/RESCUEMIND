"use client";

import { motion } from "framer-motion";

export default function RadarPulse() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[400]">

      <motion.div
        animate={{
          scale: [1, 2.5],
          opacity: [0.5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
        className="absolute h-32 w-32 rounded-full border border-cyan-400"
      />

      <motion.div
        animate={{
          scale: [1, 3.5],
          opacity: [0.4, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeOut",
        }}
        className="absolute h-40 w-40 rounded-full border border-cyan-500"
      />

      <div className="h-4 w-4 rounded-full bg-cyan-400 shadow-[0_0_20px_#00ffff]" />
    </div>
  );
}