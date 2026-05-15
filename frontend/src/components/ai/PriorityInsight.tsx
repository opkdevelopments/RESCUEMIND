"use client";

import { useEffect, useState } from "react";

type PriorityData = {
  highest_priority: string;
  reason: string;
  eta: string;
  risk_level: string;
};

export default function PriorityInsight() {

  const [data, setData] =
    useState<PriorityData | null>(null);

  useEffect(() => {

    async function fetchPriority() {

      try {

        const response = await fetch(
          "http://127.0.0.1:8000/priority"
        );

        const result: PriorityData =
          await response.json();

        setData(result);

      } catch (error) {

        console.error(
          "Priority fetch failed:",
          error
        );

      }
    }

    fetchPriority();

  }, []);

  if (!data) return null;

  return (
    <div className="bg-black/20 border border-red-500 p-5 rounded-xl">

      <h2 className="text-red-400 text-xl font-bold">
        AI Priority Analysis
      </h2>

      <p className="text-white mt-3">
        Highest Priority: {data.highest_priority}
      </p>

      <p className="text-orange-300">
        {data.reason}
      </p>

      <p className="text-cyan-300 mt-2">
        Rescue ETA: {data.eta}
      </p>

      <p className="text-red-400 mt-1">
        Risk: {data.risk_level}
      </p>

    </div>
  );
}