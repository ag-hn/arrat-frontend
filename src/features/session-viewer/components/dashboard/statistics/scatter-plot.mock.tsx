"use client";

import { Span } from "@/components/typeography/span";
import { ScatterChart } from "@/components/visualizations/scatter-chart";
import { hourOnlyFormatter } from "@/lib/formatters/date-value-formatter";

const scatterTabs = [
  {
    incident: "Tire marks",
    timeLine: new Date(Date.now() + -0.4 * 60 * 60 * 1000).getHours(),
    severity: 1.12,
    count: 2,
  },
  {
    incident: "Split right",
    timeLine: new Date(Date.now() + 1.2 * 60 * 60 * 1000).getHours(),
    severity: 2.23,
    count: 1,
  },
  {
    incident: "Bridge",
    timeLine: new Date(Date.now() + 1.1 * 60 * 60 * 1000).getHours(),
    severity: 0.24,
    count: .5,
  },
  {
    incident: "Tar lines",
    timeLine: new Date(Date.now() + 1.4 * 60 * 60 * 1000).getHours(),
    severity: 3.12,
    count: 4,
  },
  {
    incident: "Bridge shadow",
    timeLine: new Date(Date.now() + 0.94 * 60 * 60 * 1000).getHours(),
    severity: 3.33,
    count: 4,
  },
  {
    incident: "Tire marks",
    timeLine: new Date(Date.now() + 2 * 60 * 60 * 1000).getHours(),
    severity: 1.12,
    count: 2,
  },
  {
    incident: "Split right",
    timeLine: new Date(Date.now() + 2.2 * 60 * 60 * 1000).getHours(),
    severity: 2.23,
    count: 1,
  },
  {
    incident: "Bridge",
    timeLine: new Date(Date.now() + 3.1 * 60 * 60 * 1000).getHours(),
    severity: 1.3,
    count: 2,
  },
  {
    incident: "Rerouting lines",
    timeLine: new Date(Date.now() + 3.4 * 60 * 60 * 1000).getHours(),
    severity: 3.33,
    count: 1,
  },
  {
    incident: "Bridge shadow",
    timeLine: new Date(Date.now() + 3.94 * 60 * 60 * 1000).getHours(),
    severity: 3.33,
    count: 4,
  },
  {
    incident: "Repair patches",
    timeLine: new Date(Date.now() + 5 * 60 * 60 * 1000).getHours(),
    severity: 5.33,
    count: 2,
  },
];

/**
 * Shows statistical information for all units and segments on the route within
 * a scatter chart. 
 * @returns React Component
 * @deprecated THIS IS ONLY A MOCK EXAMPLE, DATA IS NOT LIVE.
 */
export function MockScatterPlot() {
  return (
    <div className="w-full flex flex-col gap-2">
      <Span tint={"subtle"} affects={"small"}>Incident reports</Span>

      <ScatterChart
        className="h-80"
        data={scatterTabs}
        category="incident"
        x="timeLine"
        y="severity"
        size="count"
        showOpacity={true}
        minXValue={13}
        maxXValue={20}
        yAxisWidth={24}
        valueFormatter={{
          x: (x) =>
            hourOnlyFormatter(new Date(Date.now() + x * 60 * 60 * 1000)),
        }}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onValueChange={() => { }}
      />
    </div>
  );
}
