// Note: import from 'nuqs/server' to avoid the "use client" directive
import {
  ARRAY_DELIMITER,
  RANGE_DELIMITER,
} from "@/config/delimiter";
import { type SearchParams } from "@/types/utils";
import {
  createParser,
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsString,
  parseAsTimestamp,
} from "nuqs/server";

export const parseAsSort = createParser({
  parse(queryValue) {
    const [id, desc] = queryValue.split(".");
    if (!id && !desc) return null;
    return { id, desc: desc === "desc" };
  },
  serialize(value) {
    return `${value.id}.${value.desc ? "desc" : "asc"}`;
  },
});

export const parseAsGlobalFilter = createParser({
  parse(queryValue): unknown {
    return JSON.parse(queryValue);
  },
  serialize(value) {
    return !value ? '' : JSON.stringify(value);
  },
}).withDefault('');


export const parseAsDateRange = parseAsArrayOf(parseAsTimestamp, RANGE_DELIMITER)
.withDefault([])

export const parseAsVisibility = parseAsArrayOf(parseAsString, ARRAY_DELIMITER)
.withDefault([])

export const searchParamsParser = {
  // GLOBAL FILTER
  global: parseAsGlobalFilter,
  // FILTERS
  createdAt: parseAsDateRange,
  description: parseAsString,
  visibility: parseAsVisibility,
};

export const searchParamsCache = createSearchParamsCache(searchParamsParser);

export const convertSearchParamsToFilters = (searchParams: SearchParams) => {
  const search = searchParamsCache.parse(searchParams)
  return {
    defaultGlobalFilter: search.global,
    defaultColumnFilters: Object.entries(search).map(([key, value]) => ({ id: key, value, })).filter(({ id, value }) => !value || id !== "global")
  }
}