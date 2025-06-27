"use client"

import "leaflet/dist/leaflet.css";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css"

import { MapTileset } from "./map-tileset";
import { MapPageUpdates } from "./map.page-update";
import { GeoJsonLoaderSession } from "./geojson-loader.session";
import { MapCompass } from "./map-compass";
import { MapGestureHandling } from "./map.gesture-handling";

export function MapContent() {
  return (
    <>
      <MapGestureHandling />

      <MapTileset />

      <GeoJsonLoaderSession />

      <MapPageUpdates />

      <MapCompass />
    </>
  );
}
