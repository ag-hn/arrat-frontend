/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
"use client"

import { Button } from "@/components/primitives/button";
import { useUserState, type TileSetOption } from "@/features/session-viewer/hooks/state/use-user-state";
import { cn } from "@/lib/utils";
import { type ComponentClassName } from "@/types/utility";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

const background = {
  map: "/map-tileset-preview.png",
  satellite: "/satellite-tileset-placeholder.png"
} satisfies Record<TileSetOption, string>

export function TileSetToggle() {
  const [option, setState] = useUserState()
  const invertedOption = option.tile === "map" ? "satellite" : "map";

  return (
    <Button
      variant={"outline"}
      className="overflow-hidden relative w-24 h-24 text-fluid-xs flex items-end p-0"
      onClick={() => {
        setState((prev) => {
          return {
            ...prev,
            tile: invertedOption
          }
        })
      }}
    >
      <Background tilesetPreview={background[invertedOption]} />
    </Button>
  )
}

export function Background({ className, children, tilesetPreview }: ComponentClassName<{ tilesetPreview: string | StaticImport }>) {
  return (
    <div className={cn("group top-0 absolute w-full h-full grid place-items-center", className)}>
      <Image className="absolute w-full" src={tilesetPreview} alt="image" width={24} height={24} />

      {children}

      <div className="transition-all cursor-pointer duration-500 absolute w-full h-full bg-gradient-to-t from-slate-800/35 via-slate-800/25 to-slate-800/10" >
        <div className="opacity-0 hover:opacity-100 transition duration-500 absolute inset-0 h-full w-full bg-gradient-to-t from-slate-800/35 via-slate-800/25 to-slate-800/10"></div>
      </div>
    </div>

  )
}

export default TileSetToggle
