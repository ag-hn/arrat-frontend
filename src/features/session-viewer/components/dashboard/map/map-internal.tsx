"use client";

import { MapContainer } from "react-leaflet";
import { MapContent } from "./map-content";

export default function MapInternal() {
  return (
    <MapContainer
      attributionControl={false}
      className="z-0 w-full"
      scrollWheelZoom={true}
      gestureHandling={true}
    >
      <MapContent />
    </MapContainer>
  );
}
