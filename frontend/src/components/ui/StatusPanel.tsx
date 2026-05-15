"use client";

import { useEffect, useState } from "react";

export default function RescueCountdown() {

  const [timeLeft, setTimeLeft] =
    useState(120);

  useEffect(() => {

    const timer = setInterval(() => {

      setTimeLeft((prev) => {

        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;

      });

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  /* FORMAT MM:SS */
  const minutes =
    Math.floor(timeLeft / 60);

  const seconds =
    timeLeft % 60;

  const formattedTime =
    `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;

  return (
    <div className="bg-black/40 backdrop-blur-md border border-red-500/40 rounded-2xl p-5 shadow-2xl animate-pulse">

      <h2 className="text-red-400 text-2xl font-bold">
        ⏳ Critical Rescue Window
      </h2>

      <p className="text-gray-300 text-sm mt-1">
        Flood conditions worsening
      </p>

      <div className="mt-6 flex items-center justify-center">

        <div className="text-6xl font-extrabold text-white tracking-widest">

          {formattedTime}

        </div>

      </div>

      <div className="mt-5">

        <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">

          <div
            className="h-full bg-red-500 transition-all duration-1000"
            style={{
              width: `${(timeLeft / 300) * 100}%`,
            }}
          />

        </div>

      </div>

      <p className="text-red-300 text-sm mt-4 text-center">
        Immediate evacuation required
      </p>

    </div>
  );
}