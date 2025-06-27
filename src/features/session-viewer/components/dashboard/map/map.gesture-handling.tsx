import { GestureHandling } from 'leaflet-gesture-handling'
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export function MapGestureHandling() {
  const map = useMap()
  useEffect(() => {
    if (!map) {
      return;
    }

    map.addHandler("gestureHandling", GestureHandling)
  }, [map])

  return null;
}
