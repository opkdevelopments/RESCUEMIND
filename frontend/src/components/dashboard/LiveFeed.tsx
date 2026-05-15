"use client";

interface Props {
  floodLevel: number;
}

export default function LiveFeed({ floodLevel }: Props) {

  const dangerMode = floodLevel > 60;

  const alerts = dangerMode
    ? [
        "⚠ Route Delta-4 collapsed",
        "🧠 AI rerouting rescue convoy",
        "🚨 Flood severity critical",
      ]
    : [
        "✅ Rescue route operational",
        "🌊 Flood under monitoring",
      ];

  return (

    <div className="bg-black/50 border border-red-500/30 rounded-2xl p-4 text-white">

      <h2 className="text-red-400 text-xl font-bold mb-4">
        🚨 Live Emergency Alerts
      </h2>

      <div className="space-y-3">

        {alerts.map((alert, index) => (

          <div
            key={index}
            className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 animate-pulse"
          >
            {alert}
          </div>

        ))}

      </div>

    </div>
  );
}