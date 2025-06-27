import { ReferenceLine } from "recharts";

export function ThresholdReference({ threshold }: { threshold: number}) {
  return (
    <ReferenceLine
      y={threshold}
      strokeDashoffset={2}
      className="stroke-red-400/75 dark:stroke-red-700/75"
      strokeWidth={"1px"}
      strokeDasharray={"8 6"}
      stroke=""
    />
  );
}
