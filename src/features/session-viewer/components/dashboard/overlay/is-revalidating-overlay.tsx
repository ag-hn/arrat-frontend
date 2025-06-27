"use client"

import LoadingCircle from "@/components/icons/loading.circle";
import { useFilteredSessionGeojson } from "@/features/session-viewer/hooks/viewer/use-filtered-geojson";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function IsRevalidatingOverlay() {
  const { isRefetching } = useFilteredSessionGeojson()
  const delayed = useMinDelay(isRefetching, isRefetching ? 0 : 500)

  return (
    <div
      className={cn(
        "fill-mode-forwards",
        "w-full h-full absolute bg-background/10 backdrop-blur-sm grid place-items-center",
        delayed ? "animate-in fade-in" : "animate-out fade-out pointer-events-none",
      )}
    >
      <LoadingCircle className="size-12" />
    </div>
  )
}

function useMinDelay<TValue>(value: TValue, minDelay = 1000) {
  const [delayedValue, setDelayedValue] = useState(value);
  useEffect(() => {
    if (!minDelay) {
      setDelayedValue(value)
      return
    }

    const handlerId = setTimeout(() => {
      setDelayedValue(value)
    }, minDelay)

    return () => {
      clearTimeout(handlerId)
    }
  }, [minDelay, value])

  return delayedValue
}
