import dynamic from "next/dynamic";
import { DynamicLayout } from "./dynamic-layout";
import { IsRevalidatingOverlay } from "./is-revalidating-overlay";

const DynamicTilesetToggle = dynamic(() => import('./tileset-toggle'), {
  ssr: false,
})

export function Overlay() {
  return (
    <>
      <DynamicLayout
        contentClassName="place-self-end"
      >
        <DynamicTilesetToggle />
      </DynamicLayout>

      <IsRevalidatingOverlay />
    </>
  )
}

