import { deepEqual } from "@/lib/utils";
import type { TransformedUnitEntryList } from "../types/transformers";

export function validateUnitMetadata(units: TransformedUnitEntryList) {
  if (!Array.isArray(units) || units.length <= 1) {
    return { valid: true };
  }

  const valid = units.every((a, i) =>
    units.every((b, j) =>
      i === j || (a.route === b.route && deepEqual(a?.metadata, b?.metadata))
    )
  );

  return { valid };
}
