import dynamic from "next/dynamic";
import { Overlay } from "../overlay/overlay";
import { MapLoader } from "./map-loader";

const DynamicMap = dynamic(() => import('./map-internal'), {
  ssr: false,
  loading: () => <MapLoader />,
})

export function Map() {
  return (
    <div className="relative container p-0 flex min-h-[32rem] lg:min-h-[42rem] overflow-hidden border border-solid border-subtle z-10 [&>div]:rounded-none [&>div]:border-none [&>div]:shadow-none">
      <DynamicMap />

      <Overlay />
    </div>
  );
}
