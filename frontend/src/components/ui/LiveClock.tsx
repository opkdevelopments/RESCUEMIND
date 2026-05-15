"use client";

import {
  useEffect,
  useState,
} from "react";

export default function LiveClock() {

  const [time, setTime] =
    useState("");

  useEffect(() => {

    const updateClock = () => {

      const now = new Date();

      setTime(
        now.toLocaleTimeString()
      );

    };

    updateClock();

    const interval =
      setInterval(updateClock, 1000);

    return () =>
      clearInterval(interval);

  }, []);

  return (
    <div className="absolute bottom-4 right-4 z-[2000] bg-black/40 backdrop-blur-lg border border-cyan-500/20 px-4 py-2 rounded-xl text-cyan-300 text-sm font-medium shadow-lg">

      🕒 {time}

    </div>
  );
}