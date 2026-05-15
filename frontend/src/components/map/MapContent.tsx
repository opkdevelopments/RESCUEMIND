"use client";

import {
  MapContainer,
  TileLayer,
  Circle,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

import {
  useEffect,
  useState,
} from "react";

import L from "leaflet";

import MapController from "./MapController";
import CivilianMarkers from "./CivilianMarkers";

import "../../app/lib/leafletFix";

/* CUSTOM RESCUE ICON */
const rescueIcon = new L.Icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/854/854878.png",

  iconSize: [38, 38],
});

/* PRIMARY ROUTE */
const primaryRoute: [number, number][] = [
  [12.965, 77.585],
  [12.968, 77.589],
  [12.972, 77.594],
  [12.975, 77.599],
];

/* AI REROUTE */
const alternateRoute: [number, number][] = [
  [12.965, 77.585],
  [12.967, 77.592],
  [12.970, 77.596],
  [12.975, 77.599],
];

type Props = {
  bridgeCollapsed: boolean;
};

export default function MapContent({
  bridgeCollapsed,
}: Props) {

  /* VEHICLE POSITION */
const activeInitialRoute =
  bridgeCollapsed
    ? alternateRoute
    : primaryRoute;

const [vehiclePosition, setVehiclePosition] =
  useState<[number, number]>(
    activeInitialRoute[0]
  );

  /* MISSION STATUS */
const [missionComplete, setMissionComplete] =
  useState<boolean>(false);

  /* VEHICLE MOVEMENT */
useEffect(() => {

  const activeRoute =
    bridgeCollapsed
      ? alternateRoute
      : primaryRoute;

  let currentIndex = 0;

  const interval = setInterval(() => {

    currentIndex++;

    if (
      currentIndex >=
      activeRoute.length
    ) {

      clearInterval(interval);

      setMissionComplete(true);

      return;
    }

    setVehiclePosition(
      activeRoute[currentIndex]
    );

  }, 4000);

  return () =>
    clearInterval(interval);

}, [bridgeCollapsed]);

  return (
    <div className="relative h-full w-full">

      <MapContainer
        center={[12.9716, 77.5946]}
        zoom={13}
        className="h-full w-full rounded-3xl z-0"
      >

        {/* MAP TILES */}
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* CAMERA CONTROLLER */}
        <MapController
          bridgeCollapsed={
            bridgeCollapsed
          }
        />

        {/* FLOOD ZONE */}
        <Circle
          center={[12.9728, 77.5965]}
          radius={1200}
          pathOptions={{
            color: "#00d9ff",
            fillColor: "#00d9ff",
            fillOpacity: 0.25,
          }}
        />

        {/* COLLAPSE ZONE */}
        {bridgeCollapsed && (
          <Circle
            center={[12.9728, 77.5965]}
            radius={180}
            pathOptions={{
              color: "red",
              fillColor: "red",
              fillOpacity: 0.5,
            }}
          />
        )}

        {/* PRIMARY ROUTE */}
        {!bridgeCollapsed && (
          <Polyline
            positions={primaryRoute}
            pathOptions={{
              color: "red",
              weight: 6,
            }}
          />
        )}

        {/* ALTERNATE ROUTE */}
        {bridgeCollapsed && (
          <Polyline
            positions={alternateRoute}
            pathOptions={{
              color: "#00ffff",
              weight: 6,
            }}
          />
        )}

        {/* RESCUE VEHICLE */}
        <Marker
          position={vehiclePosition}
          icon={rescueIcon}
        >

          <Popup>

            🚑 Rescue Team Alpha

          </Popup>

        </Marker>

        {/* CIVILIANS */}
        <CivilianMarkers />

      </MapContainer>

      {/* SUCCESS OVERLAY */}
      {missionComplete && (

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[2000]">

          <div className="bg-green-500/20 backdrop-blur-xl border border-green-400 px-6 py-4 rounded-3xl shadow-2xl animate-pulse">

            <h2 className="text-2xl font-extrabold text-green-400 text-center">

              ✅ Civilians Successfully Evacuated

            </h2>

            <p className="text-green-200 text-center mt-2">

              Rescue mission completed safely

            </p>

          </div>

        </div>

      )}

    </div>
  );
}