"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";

type Props = {
  bridgeCollapsed: boolean;
};

export default function MapController({
  bridgeCollapsed,
}: Props) {

  const map = useMap();

  useEffect(() => {

    if (bridgeCollapsed) {

      map.flyTo(
        [12.9728, 77.5965],
        16,
        {
          duration: 3,
        }
      );

    }

  }, [bridgeCollapsed, map]);

  return null;
}