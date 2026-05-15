"use client";

import { useEffect, useState } from "react";



export default function AIInsightPanel() {

  const [analysis, setAnalysis] =
    useState<string>("");

  useEffect(() => {

async function fetchAI() {

  try {

    const response = await fetch(
      "http://127.0.0.1:8000/ai-analysis"
    );

    const data = await response.json();

    console.log("AI DATA:", data);

    setAnalysis(
      data.analysis ||
      data.message ||
      "AI analysis unavailable"
    );

  } catch (error) {

    console.error(
      "AI fetch failed:",
      error
    );

  }
}

    fetchAI();

  }, []);

  return (
    <div className="bg-black/40 border border-cyan-500 rounded-2xl p-5 shadow-2xl">

      <h2 className="text-cyan-400 text-2xl font-bold">
        🧠 Live AI Analysis
      </h2>

      <p className="text-gray-300 text-sm mt-1">
        Real-time disaster intelligence
      </p>

      <div className="mt-4">

        <div className="bg-cyan-950/30 border border-cyan-500/30 rounded-xl p-4">

          <p className="text-white leading-relaxed animate-pulse">
            {analysis || "Analyzing disaster conditions..."}
          </p>

        </div>

      </div>

    </div>
  );
}