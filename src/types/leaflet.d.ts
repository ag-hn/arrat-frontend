/* eslint @typescript-eslint/no-explicit-any: 0 */

import { type LeafletMouseEvent as LeafletMouseEventInternal, type MapOptions as LeafletMapOptions } from 'leaflet'
import { type AppSegmentFeature, type AppSignFeature } from '@/server/zod/schema.audit'

declare module 'leaflet' {
  interface LeafletPropagatedFrom {
    defaultOptions: any,
    feature: AppSegmentFeature | AppSignFeature
    options: any,
    _bounds: LatLngBounds,
    _eventParents: any,
    _initHooksCalled: boolean,
    _latlngs: LatLng[],
    _leaflet_id: number,
    _map: any,
    _mapToAdd: any,
    _parts: any[],
    _path: any,
    _pxBounds: Bounds,
    _rawPxBounds: Bounds,
    _renderer: any,
    _rings: any[],
    _zoomAnimated: boolean,
  }

  interface LeafletMouseEvent extends LeafletMouseEventInternal {
    propagatedFrom: LeafletPropagatedFrom
  }

  interface MapOptions extends LeafletMapOptions {
    gestureHandling?: boolean;
    gestureHandlingOptions?: {
      duration?: number,
      text?: {
        touch?: string,
        scroll?: string,
        scrollMac?: string,
      }
    }
  }
}
