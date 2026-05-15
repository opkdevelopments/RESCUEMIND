"use client";

import { useEffect, useState } from "react";

export default function AlertsPanel() {

  const [alerts, setAlerts] = useState<string[]>([
    "⚠️ Flood water rising near MG Road",
    "⚠️ Rescue convoy moving toward civilian cluster",
  ]);

  useEffect(() => {

    const bridgeTimer = setTimeout(() => {

      setAlerts((prev) => [
        ...prev,
        "🚨 Bridge collapse detected.",
        "Primary route unavailable.",
        "AI rerouting rescue convoy.",
      ]);

    }, 20000);

    return () => clearTimeout(bridgeTimer);

  }, []);

  return (
    <div className="bg-black/40 border border-red-500 rounded-2xl p-5 shadow-xl">

      <h2 className="text-red-400 text-2xl font-bold mb-4 animate-pulse">
        🚨 Live Emergency Alerts
      </h2>

      <div className="space-y-3">

        {alerts.map((alert, index) => (

          <div
            key={index}
            className="bg-red-950/40 border border-red-500 rounded-xl p-3 text-white animate-pulse"
          >
            {alert}
          </div>

        ))}

      </div>

    </div>
  );
}