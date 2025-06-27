"use client"

import { env } from "@/env";
import { type TileSetOption, useUserState } from "@/features/session-viewer/hooks/state/use-user-state";
import { TileLayer } from "react-leaflet"

const TILES_MAP = {
    map: {
        name: "Map",
        attribution: env.NEXT_PUBLIC_TILE_SET_ATTRIBUTION,
        url: env.NEXT_PUBLIC_TILE_SET_URL,
    },
    satellite: {
        name: "Satellite",
        attribution: env.NEXT_PUBLIC_SATELLITE_TILE_SET_ATTRIBUTION,
        url: env.NEXT_PUBLIC_SATELLITE_TILE_SET_URL,
    }

} as const satisfies Record<TileSetOption, {
    attribution: string,
    url: string,
    name: string,
}>


export function MapTileset() {
    const [state] = useUserState()

    const { attribution, url } = TILES_MAP[state.tile];

    return (
        <TileLayer
            attribution={attribution}
            url={url}
        />
    )

}