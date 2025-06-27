/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from 'leaflet'
import 'leaflet-compass'

export function MapCompass() {
  const map = useMap()
  useEffect(() => {
    const controls: any = L.Control;
    const compass = new controls.Compass()
    map.addControl(compass)

    return () => {
      map.removeControl(compass)
    }
  }, [map])

  return null
}
