import { type Page, type PageCollection } from "@/types/app";
import type { TODO } from "@/types/utils";

export function isPageCollection(value: Page | PageCollection): value is PageCollection {
  return "items" in value && !("url" in value)
}

export function isPage(value: Page | PageCollection): value is Page {
  return !("items" in value) && "url" in value
}

export function isArrayOfNumbers(arr: TODO): arr is number[] {
  if (!Array.isArray(arr)) return false;
  return arr.every((item) => typeof item === "number");
}

export function isArrayOfDates(arr: TODO): arr is Date[] {
  if (!Array.isArray(arr)) return false;
  return arr.every((item) => item instanceof Date);
}

export function isArrayOfStrings(arr: TODO): arr is string[] {
  if (!Array.isArray(arr)) return false;
  return arr.every((item) => typeof item === "string");
}

export function isArrayOfBooleans(arr: TODO): arr is boolean[] {
  if (!Array.isArray(arr)) return false;
  return arr.every((item) => typeof item === "boolean");
}

export function isJSON(value: string): boolean {
  try {
    JSON.parse(value);
    return true;
  } catch (error) {
    return false;
  }
}