"use client";

import dynamic from "next/dynamic";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import RadarPulse from "../ui/RadarPulse";

import {
  getFloodStatus,
} from "../../services/api";


import LiveClock from "../ui/LiveClock";

/* LOAD MAP WITHOUT SSR */
const MapContent = dynamic(
  () =>
    import("./MapContent").then(
      (mod) => mod.default
    ),
  {
    ssr: false,

    loading: () => (
      <div className="h-full w-full flex items-center justify-center text-cyan-400 text-xl font-bold">

        Loading Disaster Map...

      </div>
    ),
  }
);

export default function DisasterMap() {

  /* FLOOD LEVEL */
  const [floodLevel, setFloodLevel] =
    useState(30);

  /* BRIDGE COLLAPSE */
  const [bridgeCollapsed, setBridgeCollapsed] =
    useState(false);

  /* AUDIO ENABLE */
  const [audioEnabled, setAudioEnabled] =
    useState(false);

  /* AUDIO REF */
  const alertAudio =
    useRef<HTMLAudioElement | null>(
      null
    );

  /* FLOOD LEVEL AUTO UPDATE */
  useEffect(() => {

    const interval = setInterval(
      async () => {

        try {

          const data =
            await getFloodStatus();

          setFloodLevel(
            data.flood_level
          );

        } catch (error) {

          console.error(
            "Flood status fetch failed:",
            error
          );

        }

      },
      3000
    );

    return () =>
      clearInterval(interval);

  }, []);

  /* BRIDGE COLLAPSE EVENT */
  useEffect(() => {

    const timer = setTimeout(() => {

      setBridgeCollapsed(true);

      /* PLAY SOUND */
      if (
        audioEnabled &&
        alertAudio.current
      ) {

        alertAudio.current
          .play()
          .catch(() => {
            console.log(
              "Audio blocked"
            );
          });

      }

    }, 20000);

    return () =>
      clearTimeout(timer);

  }, [audioEnabled]);

  /* ENABLE AUDIO */
  function enableAudio() {

    if (alertAudio.current) {

      alertAudio.current
        .play()
        .then(() => {

          alertAudio.current?.pause();

          if (alertAudio.current) {

            alertAudio.current.currentTime = 0;

          }

          setAudioEnabled(true);

        })
        .catch((error) => {

          console.error(
            "Audio enable failed:",
            error
          );

        });

    }

  }

  return (

    
    <div className="relative h-full w-full">

      {/* AUDIO */}
      <audio
        ref={alertAudio}
        src="/sounds/alert.mp3"
        preload="auto"
      />

      {/* ENABLE AUDIO BUTTON */}
      {!audioEnabled && (
        <button
          onClick={enableAudio}
          className="absolute top-4 right-4 z-[2000] bg-red-600 hover:bg-red-700 transition-all duration-300 px-5 py-3 rounded-2xl text-sm font-bold shadow-2xl border border-red-400 animate-pulse"
        >

          🔊 Enable Emergency Audio

        </button>
      )}

      {/* MAP */}
      <MapContent
        bridgeCollapsed={
          bridgeCollapsed
        }
      />

      {/* RADAR EFFECT */}
      <RadarPulse />

      {/* LIVE STATUS PANEL */}
      <div className="absolute top-4 left-4 z-[500] bg-black/50 backdrop-blur-xl border border-cyan-500/30 rounded-3xl px-6 py-5 shadow-2xl w-[260px]">

        {/* TITLE */}
        <h2 className="text-cyan-400 text-2xl font-extrabold tracking-wide leading-tight">

          LIVE DISASTER MAP

        </h2>

        <p className="text-gray-300 text-sm mt-1">

          AI-powered emergency monitoring

        </p>

        {/* FLOOD LEVEL */}
        <div className="mt-6">

          <p className="text-red-400 text-sm font-semibold tracking-wide">

            Flood Severity

          </p>

          <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden mt-3">

            <div
              className="h-full bg-red-500 transition-all duration-1000"
              style={{
                width: `${floodLevel}%`,
              }}
            />

          </div>

          <div className="flex items-center justify-between mt-3">

            <p className="text-white text-2xl font-bold">

              {floodLevel}%

            </p>

            <div
              className={`text-xs px-3 py-1 rounded-full border ${
                floodLevel > 70
                  ? "bg-red-500/20 border-red-500 text-red-400"
                  : floodLevel > 40
                  ? "bg-yellow-500/20 border-yellow-500 text-yellow-400"
                  : "bg-green-500/20 border-green-500 text-green-400"
              }`}
            >

              {floodLevel > 70
                ? "CRITICAL"
                : floodLevel > 40
                ? "HIGH"
                : "STABLE"}

            </div>

          </div>

        </div>

        {/* BRIDGE STATUS */}
        <div className="mt-6">

          <p className="text-sm text-gray-400 tracking-wide">

            Bridge Status

          </p>

          <div
            className={`mt-3 px-4 py-3 rounded-2xl font-bold border text-center transition-all duration-500 ${
              bridgeCollapsed
                ? "bg-red-950/80 border-red-500 text-red-400 animate-pulse shadow-lg shadow-red-500/20"
                : "bg-green-950/80 border-green-500 text-green-400"
            }`}
          >

            {bridgeCollapsed
              ? "🚨 COLLAPSED"
              : "✅ STABLE"}

          </div>

        </div>

        {/* AI STATUS */}
        <div className="mt-6 border-t border-cyan-500/10 pt-4">

          <div className="flex items-center justify-between">

            <span className="text-gray-400 text-sm">
              Emergency Audio
            </span>

            <span
              className={`text-sm font-bold ${
                audioEnabled
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >

              {audioEnabled
                ? "ACTIVE"
                : "DISABLED"}

            </span>

          </div>

        </div>

      </div>
<LiveClock />
    </div>
  );
}