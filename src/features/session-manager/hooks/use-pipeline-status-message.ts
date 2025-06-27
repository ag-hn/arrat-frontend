import { useEffect, useState } from "react";

const messages = [
  "Igniting the engines...",
  "Planting the seeds of innovation...",
  "Hatching some magic...",
  "Charging the batteries...",
  "Polishing the pixels...",
  "Preparing the launchpad...",
  "Hold on, we're getting everything ready.",
  "Calibrating the sensors...",
  "Tuning the algorithms...",
  "Aligning the stars...",
  "Fueling the rocket...",
  "Warming up the circuits...",
  "Loading the data streams...",
  "Spinning up the cloud...",
  "Optimizing the codebase...",
  "Checking the flight path...",
  "Synchronizing the modules...",
  "Running final diagnostics...",
  "Securing the perimeter...",
] as const;

export function usePipelineStatusMessage(ms = 5000) {
  const [index, setIndex] = useState(INTERNAL__getRandomInteger(0, messages.length))

  useEffect(() => {
    const handler = setTimeout(() => {
      setIndex((i) => (i + 1) % messages.length)
    }, ms)

    return () => {
      clearTimeout(handler)
    }
  }, [ms, index])

  return messages[index]!
}


function INTERNAL__getRandomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
