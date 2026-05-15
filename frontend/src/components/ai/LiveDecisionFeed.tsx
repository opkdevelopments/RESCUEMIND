"use client";

import { useEffect, useState } from "react";

const messages = [
  "AI detected rising flood depth",
  "Civilian cluster identified",
  "Primary route risk increased",
  "Bridge instability detected",
  "Alternative rescue corridor selected",
];

export default function LiveDecisionFeed() {

  const [index, setIndex] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setIndex((prev) =>
        prev === messages.length - 1 ? 0 : prev + 1
      );

    }, 4000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div className="bg-black/20 border border-cyan-500 p-4 rounded-xl">
      <h2 className="text-cyan-400 font-bold text-lg">
        AI Live Decision Stream
      </h2>

      <p className="text-white mt-3 animate-pulse">
        {messages[index]}
      </p>
    </div>
  );
}