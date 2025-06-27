/* eslint-disable @typescript-eslint/no-duplicate-type-constituents */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { type ReactNode, useMemo, type ReactElement } from "react"
import { CartesianGrid, Line, ScatterChart as RechartsScatterChart, type LineProps, LineChart as RechartsLineChart, XAxis, Bar, type BarProps, BarChart as RechartsBarChart, type CartesianGridProps, type XAxisProps, type YAxisProps, type LabelProps, type TooltipProps, type LegendProps, type AreaProps, AreaChart as RechartsAreaChart, Area, type PieProps, PieChart as RechartsPieChart, Pie, type RadarProps, RadarChart as RechartsRadarChart, Radar, PolarGrid, PolarAngleAxis, type PolarGridProps, type RadialBarProps, RadialBarChart as RechartsRadialBarChart, RadialBar, Scatter } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/visualizations/chart"
import { type CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart"
import NoData, { type NoDataProps } from '@/components/visualizations/no-data'
import type { ComponentWithClassNameAndChildren, TODO } from "@/types/utils"
import { cn } from "@/lib/utils"

type GenerateContentProps = {
  chartId: string,
  key: string,
  index: string,
  color: string,
}
type GenerateContentFunction<TData> = (props: GenerateContentProps, parent: ChartDisplayProps) => ReactElement<TData>

type INTERNAL__FunctionalComponent = React.FunctionComponent<CategoricalChartProps>;

type INTERNAL__ChartOverride<TFCP> = boolean | null | undefined | ReactElement<TFCP>

type INTERNAL__ChartDisplayProps<TProps, TData extends object = object, TTag extends string = '__tag'> = ComponentWithClassNameAndChildren<{
  __tag: TTag,
  data: TData[],
  index: string,
  props?: CategoricalChartProps,
  config?: ChartConfig,
  overrides?: {
    /**
     * renderShape: (props) => (
      <Line
        key={props.key}
        dataKey={props.key}
        type="natural"
        stroke={props.color}
        fill={props.color}
        strokeWidth={2}
        dot={true}
      />
    )
     * or
     * 
     * renderShape: (props) => (
      <Bar
        key={props.key}
        dataKey={props.key}
        stroke={props.color}
        fill={props.color}
      />
    )
     */
    renderShape?: GenerateContentFunction<TProps>,
    /**
     * <Customized component={<CartesianGrid vertical={false} />} />
     */
    grid?: INTERNAL__ChartOverride<CartesianGridProps | PolarGridProps>,
    axisDx?: INTERNAL__ChartOverride<XAxisProps>,
    axisDy?: INTERNAL__ChartOverride<YAxisProps>,
    label?: INTERNAL__ChartOverride<LabelProps>,
    tooltip?: INTERNAL__ChartOverride<TooltipProps<any, any>>,
    noData?: INTERNAL__ChartOverride<NoDataProps>,
    legend?: INTERNAL__ChartOverride<LegendProps>,

    rest?: INTERNAL__ChartOverride<TODO>,
  }
}>

type INTERNAL__PieChartDisplayProps<TData extends object = object> = INTERNAL__ChartDisplayProps<PieProps, TData, '__pie_chart'> & {
  nameKey: string,
  config: ChartConfig,
}

type ChartDisplayProps<TData extends object = object> =
  | INTERNAL__ChartDisplayProps<LineProps, TData, '__line_chart'>
  | INTERNAL__ChartDisplayProps<AreaProps, TData, '__area_chart'>
  | INTERNAL__ChartDisplayProps<BarProps, TData, '__bar_chart'>
  | INTERNAL__ChartDisplayProps<RadarProps, TData, '__radar_chart'>
  | INTERNAL__ChartDisplayProps<RadialBarProps, TData, '__radial_bar_chart'>
  | INTERNAL__ChartDisplayProps<LineProps, TData, '__scatter_chart'>
  | INTERNAL__PieChartDisplayProps<TData>

export type TagOption = ChartDisplayProps["__tag"]

type DisplayMapContent<TProps extends object = object> = {
  Comp: INTERNAL__FunctionalComponent,
  defaultRenderShape: GenerateContentFunction<TProps>,
  defaultLegend?: ReactElement<LegendProps, TODO>,
  defaultGrid?: ReactElement<CartesianGridProps | PolarGridProps, TODO>,

  defaultNoData?: ((props: ChartDisplayProps) => ReactElement<NoDataProps, TODO> | undefined) | ReactElement<NoDataProps, TODO>,
  defaultTooltip?: ((props: ChartDisplayProps) => ReactElement<TooltipProps<TODO, TODO>, TODO> | undefined) | ReactElement<TooltipProps<TODO, TODO>, TODO>,
  defaultAxisDx?: ((props: ChartDisplayProps) => ReactElement<XAxisProps, TODO> | undefined) | ReactElement<XAxisProps, TODO>,
  defaultAxisDy?: ((props: ChartDisplayProps) => ReactElement<YAxisProps, TODO> | undefined) | ReactElement<YAxisProps, TODO>,
  rest?: (props: ChartDisplayProps) => ReactElement<CartesianGridProps | PolarGridProps, TODO>,
}

const displayMap: Record<TagOption, DisplayMapContent> = {
  __bar_chart: {
    Comp: (p) => <RechartsBarChart {...p} />,
    defaultRenderShape: (props) => (
      <Bar
        key={props.key}
        dataKey={props.key}
        stroke={props.color}
        fill={props.color}
      />
    ),
    defaultTooltip: <ChartTooltip position={{ y: 8 }} cursor={{ opacity: 0.35 }} content={<ChartTooltipContent hideLabel />} />,
    defaultLegend: undefined,
    defaultGrid: <CartesianGrid vertical={false} />,
    defaultAxisDx: (props) => <XAxis dataKey={props.index} tickLine={false} axisLine={false} tickMargin={8} />,
    defaultNoData: <NoData />,
  } satisfies DisplayMapContent<BarProps>,
  __line_chart: {
    Comp: (p) => <RechartsLineChart {...p} />,
    defaultRenderShape: (props) => (
      <Line
        key={props.key}
        dataKey={props.key}
        type="monotoneX"
        stroke={props.color}
        fill={props.color}
        strokeWidth={2}
        dot={false}
      />
    ),
    defaultTooltip: <ChartTooltip position={{ y: 8 }} content={<ChartTooltipContent hideLabel />} />,
    defaultLegend: undefined,
    defaultGrid: <CartesianGrid vertical={false} />,
    defaultAxisDx: (props) => <XAxis dataKey={props.index} tickLine={false} axisLine={false} tickMargin={8} />,
    defaultNoData: <NoData />,
  } satisfies DisplayMapContent<LineProps>,
  __area_chart: {
    Comp: (p) => <RechartsAreaChart {...p} />,
    defaultRenderShape: (props) => (
      <Area
        key={props.key}
        dataKey={props.key}
        type="natural"
        stroke={props.color}
        fill={props.color}
        fillOpacity={0.35}
        stackId={props.chartId}
        dot={false}
      />
    ),
    defaultTooltip: <ChartTooltip position={{ y: 8 }} content={<ChartTooltipContent hideLabel />} />,
    defaultLegend: undefined,
    defaultGrid: <CartesianGrid vertical={false} />,
    defaultAxisDx: (props) => <XAxis dataKey={props.index} tickLine={false} axisLine={false} tickMargin={8} />,
    defaultNoData: <NoData />,
  } satisfies DisplayMapContent<AreaProps>,
  __radar_chart: {
    Comp: (p) => <RechartsRadarChart {...p} />,
    defaultRenderShape: (props) => (
      <Radar
        key={props.key}
        dataKey={props.key}
        type="natural"
        stroke={props.color}
        fill={props.color}
        fillOpacity={0.35}
        dot={{ r: 3, fillOpacity: 1, }}
      />
    ),
    defaultTooltip: <ChartTooltip content={<ChartTooltipContent hideLabel />} />,
    defaultLegend: <ChartLegend content={<ChartLegendContent />} />,
    defaultGrid: <PolarGrid />,
    rest: (p) => <PolarAngleAxis dataKey={p.index} />,
    defaultNoData: <NoData />,
  } satisfies DisplayMapContent<RadarProps>,
  __radial_bar_chart: {
    Comp: (p) => <RechartsRadialBarChart {...p} />,
    defaultRenderShape: (props) => (
      <RadialBar
        key={props.key}
        dataKey={props.key}
        type="natural"
        stroke={props.color}
        fill={props.color}
        fillOpacity={0.35}
      />
    ),
    defaultTooltip: <ChartTooltip content={<ChartTooltipContent hideLabel />} />,
    defaultLegend: <ChartLegend content={<ChartLegendContent />} />,
    defaultGrid: <PolarGrid gridType="circle" />,
    defaultNoData: <NoData />,
  } satisfies DisplayMapContent<RadialBarProps>,
  __pie_chart: {
    Comp: (p) => <RechartsPieChart {...p} />,
    defaultRenderShape: (props, parent) => (
      <Pie
        key={props.key}
        dataKey={props.index}
        nameKey={props.key}
        fill={props.color}
        data={parent.data}
      />
    ),
    defaultTooltip: (p) => "nameKey" in p ? <ChartTooltip content={<ChartTooltipContent hideLabel nameKey={p.nameKey} />} /> : undefined,
    defaultNoData: <NoData />,
  } satisfies DisplayMapContent<PieProps>,
  __scatter_chart: {
    Comp: (p) => <RechartsScatterChart {...p} />,
    defaultRenderShape: (props) => (
      <Scatter
        key={props.key}
        dataKey={props.key}
        type="natural"
        stroke={props.color}
        fill={props.color}
        strokeWidth={2}
      />
    ),
    defaultTooltip: <ChartTooltip content={<ChartTooltipContent hideLabel />} />,
    defaultLegend: undefined,
    defaultGrid: <CartesianGrid vertical={false} />,
    defaultAxisDx: (props) => <XAxis dataKey={props.index} tickLine={false} axisLine={false} tickMargin={8} />,
    defaultNoData: <NoData />,
  } satisfies DisplayMapContent<LineProps>,

} satisfies Record<TagOption, DisplayMapContent>

const INTERNAL__MaxExpectedChartColorCount = 6

/**
 * __*Default config matches the object schema of the first object*__
 */
export function ChartDisplay(p: ChartDisplayProps) {
  const { children, className, config, index, props, data, overrides, __tag } = p;
  const { Comp, defaultRenderShape, defaultTooltip, defaultLegend, defaultGrid, defaultAxisDx, defaultAxisDy, defaultNoData, rest } = displayMap[__tag]
  const usingConfig = useMemo((): ChartConfig => {
    if (config) {
      return config;
    }

    if (!data || data.length === 0) {
      return {};
    }

    const firstObject = data[0]
    if (!firstObject) {
      return {};
    }

    const newConfig: ChartConfig = {}
    let i = 0;
    for (const key of Object.keys(firstObject)) {
      if (key === index) {
        continue;
      }

      const chartNumber = (i % (INTERNAL__MaxExpectedChartColorCount - 1)) + 1
      newConfig[key] = {
        color: `hsl(var(--chart-${chartNumber}))`,
        label: key,
      }
      i++;
    }

    return newConfig
  }, [config, data, index])

  const keys = Object.keys(usingConfig)
  const renderShape = typeof overrides?.renderShape === 'undefined' || overrides?.renderShape === null ? (defaultRenderShape) : overrides.renderShape;

  return (
    <ChartContainer config={usingConfig} className={cn("max-h-96 w-full", className)}>
      {!data || data.length === 0 ? (
        <>
          {INTERNAL__GenerateComponentOrDefault(overrides?.noData, typeof defaultNoData === 'function' ? defaultNoData?.(p) : defaultNoData)}
        </>
      ) : (
        <Comp
          accessibilityLayer
          data={data}
          dataKey={index}
          margin={{
            left: 12,
            right: 12,
          }}
          {...props}
        >
          {INTERNAL__GenerateComponentOrDefault(overrides?.grid, defaultGrid)}
          {INTERNAL__GenerateComponentOrDefault(overrides?.axisDx, typeof defaultAxisDx === 'function' ? defaultAxisDx?.(p) : defaultAxisDx)}
          {INTERNAL__GenerateComponentOrDefault(overrides?.axisDy, typeof defaultAxisDy === 'function' ? defaultAxisDy?.(p) : defaultAxisDy)}
          {INTERNAL__GenerateComponentOrDefault(overrides?.label, null)}
          {INTERNAL__GenerateComponentOrDefault(overrides?.legend, defaultLegend)}
          {INTERNAL__GenerateComponentOrDefault(overrides?.tooltip, typeof defaultTooltip === 'function' ? defaultTooltip?.(p) : defaultTooltip)}
          {INTERNAL__GenerateComponentOrDefault(overrides?.rest, (rest?.(p)))}

          {renderShape && keys.map((k) => {
            if (k === index) {
              return null;
            }

            return (
              renderShape({
                key: k,
                index: index,
                chartId: 'id',
                color: `var(--color-${k})`,
              }, p)
            )
          })}

          {children}

        </Comp>
      )
      }
    </ChartContainer>
  )
}

function INTERNAL__GenerateComponentOrDefault(override: INTERNAL__ChartOverride<any>, defaultReturn: ReactNode) {
  if (typeof override === 'boolean' && override === false) {
    return null;
  }

  if (typeof override === 'undefined' || override === true || override === null) {
    return defaultReturn;
  }

  return override;
}
