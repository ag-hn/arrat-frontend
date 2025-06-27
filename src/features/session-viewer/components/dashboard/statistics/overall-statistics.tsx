import { MockCircleChart } from "./circle-chart.mock";

import { Text } from "@/components/typeography/text";
import { MockScatterPlot } from "./scatter-plot.mock";

/**
 * Shows statistical information for all units and segments on the route. 
 * @returns React Component
 * @deprecated THIS IS ONLY A MOCK EXAMPLE, DATA IS NOT LIVE.
 */
export function OverallStatistics() {
  return (
    <div className="container flex flex-col items-start gap-12 md:gap-6 p-0">
      <Text tint={"strong"} variant={"h4"}>
        Overall Statistics
      </Text>

      <MockCircleChart />
      <MockScatterPlot />
    </div>
  );
}
