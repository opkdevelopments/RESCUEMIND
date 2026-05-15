"use client";

import { useEffect, useState } from "react";

export default function RescueCountdown() {
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 0;

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-red-950 border border-red-500 p-4 rounded-xl shadow-lg">
      <h2 className="text-red-400 text-lg font-bold">
        🚨 Critical Rescue Window
      </h2>

      <p className="text-4xl font-bold text-white mt-2">
        {timeLeft}s
      </p>

      <p className="text-red-300 mt-2">
        Flood levels rising rapidly
      </p>
    </div>
  );
}