"use client";


import DisasterMap from "../components/map/DisasterMap";

import LiveFeed from "../components/dashboard/LiveFeed";

import AIInsightPanel from "../components/ai/AIInsightPanel";
import PriorityInsight from "../components/ai/PriorityInsight";
import LiveDecisionFeed from "../components/ai/LiveDecisionFeed";

import RescueCountdown from "../components/ui/RescueCountdown";

import DispatchPanel from "../components/dispatch/DispatchPanel";


import { useState } from "react";

export default function Home() {

  const [dispatchResult, setDispatchResult] =
  useState("");

  function handleDispatch(
  start: string,
  destination: string
) {

  setDispatchResult(
    `🚑 Rescue route generated successfully.

Team Position: ${start}

Emergency Location: ${destination}

✅ Best Route: Alpha Corridor
⏱ ETA: 4 minutes
⚠ Risk Level: Moderate

AI Recommendation:
Avoid flooded bridge sector and use eastern bypass corridor for safer civilian evacuation.`
  );

}

  return (
    <main className="min-h-screen bg-[#050816] text-white overflow-hidden">

      {/* TOP NAVBAR */}
      <div className="border-b border-cyan-500/20 bg-black/30 backdrop-blur-md">

        <div className="flex items-center justify-between px-6 py-4">

          {/* LOGO */}
          <div>

            <h1 className="text-3xl font-extrabold tracking-wider text-cyan-400">
              RESCUEMIND
            </h1>

            <p className="text-xs text-gray-400 mt-1">
              Emergency Rescue Intelligence System
            </p>

          </div>

          {/* STATUS */}
          <div className="flex items-center gap-3">

            <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />

            <p className="text-sm text-green-400 font-medium tracking-wide">
              SYSTEM ACTIVE
            </p>

          </div>

        </div>

      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-12 gap-4 p-4 h-[calc(100vh-90px)]">

        {/* LEFT PANEL */}
        <div className="col-span-3 rounded-3xl border border-cyan-500/20 bg-[#0b1220] p-4 overflow-y-auto shadow-2xl">

          <div className="space-y-4">

            {/* AI ANALYSIS */}
            <AIInsightPanel />

            {/* COUNTDOWN */}
            <RescueCountdown />

            {/* DISPATCH PANEL */}
<DispatchPanel
  onDispatch={handleDispatch}
/>
{dispatchResult && (

  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-5 shadow-2xl">

    <h2 className="text-cyan-400 text-xl font-bold">

      🧠 AI Dispatch Result

    </h2>

    <div className="mt-4 text-sm text-gray-200 whitespace-pre-line leading-7">

      {dispatchResult}

    </div>

  </div>

)}

          </div>

        </div>

        {/* CENTER PANEL */}
        <div className="col-span-6 relative rounded-3xl border border-cyan-500/20 bg-[#0b1220] overflow-hidden shadow-2xl">

          {/* MAP */}
          <DisasterMap />

          {/* LIVE FEED */}
          <div className="absolute top-24 right-4 z-[1000]">

            <LiveFeed floodLevel={70} />

          </div>

          {/* BOTTOM OVERLAYS */}
          <div className="absolute bottom-4 left-4 right-4 z-[1000] grid grid-cols-2 gap-4">

            <PriorityInsight />

            <LiveDecisionFeed />

          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="col-span-3 rounded-3xl border border-cyan-500/20 bg-[#0b1220] p-4 overflow-y-auto shadow-2xl">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-5">

            <h2 className="text-2xl font-bold text-cyan-300">
              LIVE ALERTS
            </h2>

            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />

          </div>

          {/* ALERT LIST */}
          <div className="space-y-3">

            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 animate-pulse">

              <p className="text-sm text-red-400 font-medium">
                🚨 Route Delta-4 collapsed
              </p>

            </div>

            <div className="rounded-xl bg-orange-500/10 border border-orange-500/20 p-4">

              <p className="text-sm text-orange-300 font-medium">
                🌊 Flood spread increasing near Sector 5
              </p>

            </div>

            <div className="rounded-xl bg-cyan-500/10 border border-cyan-500/20 p-4">

              <p className="text-sm text-cyan-300 font-medium">
                🚑 Rescue Team Alpha deployed
              </p>

            </div>

            <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-4">

              <p className="text-sm text-yellow-300 font-medium">
                ⚠ AI rerouting due to road blockage
              </p>

            </div>

            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">

              <p className="text-sm text-green-300 font-medium">
                ✅ Civilian cluster located safely
              </p>

            </div>

          </div>

          {/* SYSTEM STATUS */}
          <div className="mt-8 border-t border-cyan-500/10 pt-5">

            <h3 className="text-sm text-cyan-400 mb-4 tracking-wider font-semibold">
              SYSTEM STATUS
            </h3>

            <div className="space-y-3 text-sm">

              <div className="flex items-center justify-between">

                <span className="text-gray-400">
                  Active Rescue Units
                </span>

                <span className="text-green-400 font-bold">
                  12
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-gray-400">
                  Flood Severity
                </span>

                <span className="text-red-400 font-bold">
                  HIGH
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-gray-400">
                  AI Response Time
                </span>

                <span className="text-cyan-300 font-bold">
                  0.8s
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}