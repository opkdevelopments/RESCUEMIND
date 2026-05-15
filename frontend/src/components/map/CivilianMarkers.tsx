"use client";

import { Circle, Marker, Popup } from "react-leaflet";
import { civilians } from "../../data/civilians";

export default function CivilianMarkers() {
  return (
    <>
      {civilians.map((civilian) => (
        <div key={civilian.id}>
          <Circle
            center={civilian.position as [number, number]}
            radius={80}
            pathOptions={{
              color: "red",
              fillColor: "red",
              fillOpacity: 0.3,
            }}
          />

          <Marker position={civilian.position as [number, number]}>
            <Popup>
              🚨 {civilian.name}
              <br />
              Priority: {civilian.priority}
            </Popup>
          </Marker>
        </div>
      ))}
    </>
  );
}