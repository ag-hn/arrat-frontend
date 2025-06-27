/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { type Color } from "@/types/colors";
import { BaseColors } from ".";

export const constructCategoryColors = (
  categories: string[],
  colors: (Color | string)[],
): Map<string, Color | string> => {
  const categoryColors = new Map<string, Color | string>();
  categories.forEach((category, idx) => {
    categoryColors.set(category, colors[idx] ?? BaseColors.Gray);
  });
  return categoryColors;
};

export const getYAxisDomain = (
  autoMinValue: boolean,
  minValue: number | undefined,
  maxValue: number | undefined,
) => {
  const minDomain = autoMinValue ? "auto" : minValue ?? 0;
  const maxDomain = maxValue ?? "auto";
  return [minDomain, maxDomain];
};

export const constructCategories = (data: any[], color?: string): string[] => {
  if (!color) {
    return [];
  }

  const categories = new Set<string>();
  data.forEach((datum) => {
    categories.add(datum[color]);
  });
  return Array.from(categories);
};

export function hasOnlyOneValueForThisKey(array: any[], keyToCheck: string) {
  const val = [];

  for (const obj of array) {
    if (Object.prototype.hasOwnProperty.call(obj, keyToCheck)) {
      val.push(obj[keyToCheck]);
      if (val.length > 1) {
        return false;
      }
    }
  }

  return true;
}