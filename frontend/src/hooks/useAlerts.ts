"use client";

export default function useAlerts(floodLevel: number) {

  if (floodLevel > 60) {

    return [
      "⚠ Route Delta-4 collapsed",
      "🧠 AI rerouting rescue convoy",
      "🚨 Flood severity critical",
    ];

  }

  return [
    "✅ Rescue route operational",
    "🌊 Flood under monitoring",
  ];
}