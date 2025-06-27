import { ReferenceLine } from "recharts";
import { type ThresholdsProps } from ".";

export const ThresholdIndicator = ({
  thresholds
}: ThresholdsProps) => {
  if (!thresholds?.alerts) {
    return;
  }

  return thresholds.alerts.map((alert) => {
    if (typeof alert !== 'string' && typeof alert !== 'number' && typeof alert !== 'undefined') {
      return;
    }

    return [
      <ReferenceLine
        key={`${alert}-desktop`}
        x={alert}
        className="hidden stroke-red-100/50 dark:stroke-red-700/50 md:block"
        strokeWidth={"1rem"}
        width=""
        stroke=""
      />,
      <ReferenceLine
        key={`${alert}-mobile`}
        x={alert}
        className="block stroke-red-200/90 dark:stroke-red-700/50 md:hidden"
        strokeWidth={"2px"}
        stroke=""
      />,
    ];
  });
};