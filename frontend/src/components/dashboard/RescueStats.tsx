"use client";

import { useEffect, useState } from "react";

export default function RescueStats() {

  const [floodLevel, setFloodLevel] = useState(36);
  const [increasing, setIncreasing] = useState(true);

  useEffect(() => {

    const interval = setInterval(() => {

      setFloodLevel((prev) => {

        if (prev >= 95) {
          setIncreasing(false);
        }

        if (prev <= 20) {
          setIncreasing(true);
        }

        return increasing ? prev + 2 : prev - 2;
      });

    }, 2000);

    return () => clearInterval(interval);

  }, [increasing]);

  return (

    <div className="bg-black/40 border border-cyan-500 rounded-2xl p-4 text-white">

      <h2 className="text-cyan-400 text-xl font-bold mb-4">
        🚨 Disaster Status
      </h2>

      <div className="text-3xl font-bold">
        Flood Level: {floodLevel}%
      </div>

    </div>

  );
}