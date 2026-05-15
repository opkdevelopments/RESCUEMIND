"use client";

import { useState } from "react";

type Props = {
  onDispatch: (
    start: string,
    destination: string
  ) => void;
};

export default function DispatchPanel({
  onDispatch,
}: Props) {

  const [start, setStart] =
    useState("");

  const [destination, setDestination] =
    useState("");

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-5 shadow-2xl">

      <h2 className="text-cyan-400 text-2xl font-bold">

        🚑 Emergency Dispatch

      </h2>

      <p className="text-gray-400 text-sm mt-1">

        Manual rescue coordination

      </p>

      {/* START */}
      <div className="mt-5">

        <label className="text-sm text-gray-300">

          Rescue Team Location

        </label>

        <input
          value={start}
          onChange={(e) =>
            setStart(e.target.value)
          }
          placeholder="Sector 3"
          className="w-full mt-2 bg-[#09101c] border border-cyan-500/20 rounded-xl px-4 py-3 outline-none text-white"
        />

      </div>

      {/* DESTINATION */}
      <div className="mt-4">

        <label className="text-sm text-gray-300">

          Emergency Location

        </label>

        <input
          value={destination}
          onChange={(e) =>
            setDestination(
              e.target.value
            )
          }
          placeholder="Sector 8 Hospital"
          className="w-full mt-2 bg-[#09101c] border border-cyan-500/20 rounded-xl px-4 py-3 outline-none text-white"
        />

      </div>

      {/* BUTTON */}
      <button
        onClick={() =>
          onDispatch(
            start,
            destination
          )
        }
        className="w-full mt-6 bg-cyan-500 hover:bg-cyan-400 transition-all rounded-2xl py-3 font-bold text-black shadow-lg"
      >

        Generate Rescue Route

      </button>

    </div>
  );
}