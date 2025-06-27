/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { type Color } from "@/types/colors";
import type { BaseAnimationTimingProps } from "./animation-timing-props";
import { type IntervalType, type ValueFormatter } from "@/lib/visualizations";
import { type CustomTooltipProps } from "./tooltip";

type FixedProps = {
  eventType: "dot" | "category" | "bar" | "slice" | "bubble";
  categoryClicked: string;
};

type BaseEventProps = FixedProps & Record<string, number | string>;

export type EventProps = BaseEventProps | null | undefined;

export type Formatter<T = any> = (value: T) => string;
type TickFormatter = Formatter | {
  dx?: Formatter,
  dy?: Formatter,
}

export type ChartFormatters = {
  value?: ValueFormatter,
  label?: ValueFormatter,
  tick?: TickFormatter,
}

interface BaseChartProps extends BaseAnimationTimingProps, React.HTMLAttributes<HTMLDivElement> {
  data: any[];
  categories: string[];
  index: string;
  colors?: (Color | string)[];
  formatters?: ChartFormatters | undefined;
  startEndOnly?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  yAxisWidth?: number;
  intervalType?: IntervalType;
  showTooltip?: boolean;
  showLegend?: boolean;
  showLabels?: boolean;
  showGridLines?: boolean;
  autoMinValue?: boolean;
  minValue?: number;
  maxValue?: number;
  allowDecimals?: boolean;
  noDataText?: string;
  onValueChange?: (value: EventProps) => void;
  enableLegendSlider?: boolean;
  customTooltip?: React.ComponentType<CustomTooltipProps>;
  rotateLabelX?: {
    angle: number;
    verticalShift?: number;
    xAxisHeight?: number;
  };
  tickGap?: number;
}

export default BaseChartProps;