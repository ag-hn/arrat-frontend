import { type AppSegmentFeatureStartEnd } from "@/server/zod/schema.audit";
import { defaultFormatter } from "./default-value-formatter";

const INTERNAL__defaultPercentageOptions = { maximumFractionDigits: 1, maximumSignificantDigits: 3, style: 'percent' } satisfies Intl.NumberFormatOptions
const INTERNAL__percentageFormatter = new Intl.NumberFormat('us', INTERNAL__defaultPercentageOptions);

export function currencyFormatter(e: number) {
  return `$ ${Intl.NumberFormat("en-US").format(e)}`;
}

export function arraySumFormatter(arr: number[]): string {
  return defaultFormatter(arr.reduce((prefixSum, num) => prefixSum + num, 0));
}

export function percentageFormatterFromDecimal(number: number): string {
  return INTERNAL__percentageFormatter.format(number);
};

export function percentageFormatter(number: number): string {
  return INTERNAL__percentageFormatter.format(number / 100.0);
};

export function decimalFormatter(number: number): string {
  return new Intl.NumberFormat('us', { minimumFractionDigits: 3, minimumSignificantDigits: 5, maximumSignificantDigits: 6, maximumFractionDigits: 3, }).format(number)
}

export function digitOnlyFormatter(number: number): string {
  return new Intl.NumberFormat('us', { maximumFractionDigits: 0 }).format(number)
}

export function largeNumberFormatter(e: number) {
  let { value, append }: { value: number, append: string } = { value: 0, append: '' }

  if (e > 1000000000) {
    value = e / 1000000000
    append = 'B';
  } else if (e > 1000000) {
    value = e / 1000000
    append = 'M';
  } else if (e > 1000) {
    value = e / 1000
    append = 'K';
  } else {
    value = e
  }

  return `${Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value)}${append}`;
}


export function distanceFormatter(n: number): string {
  return new Intl.NumberFormat('us', { maximumFractionDigits: 2, maximumSignificantDigits: 2 }).format(n)
}

export function numberToMilesFormatter(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    unitDisplay: 'narrow',
  }).format(n) + " miles"
}

export function latitudeLongitudeFormatter(se: AppSegmentFeatureStartEnd) {
  const formatter = new Intl.NumberFormat('en-US', { style: 'decimal', unitDisplay: 'narrow', })
  return `(${formatter.format(se.latitude)}, ${formatter.format(se.longitude)})`
}