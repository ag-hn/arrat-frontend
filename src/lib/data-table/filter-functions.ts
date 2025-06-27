/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type FilterFn } from "@tanstack/react-table";
import { isAfter, isBefore, isSameDay } from "date-fns";
import { isArrayOfDates } from "@/lib/is";
import { type TODO } from "@/types/utils";

export const inDateRange: FilterFn<TODO> = (row, columnId, value) => {
  const date = new Date(row.getValue(columnId));
  const [start, end] = value as Date[];

  if (isNaN(date.getTime())) return false;

  if (!start && !end) return true;

  // if no end date, check if it's the same day
  if (!end && !!start) return isSameDay(date, start);

  if ((!!start && isSameDay(date, start)) || (!!end && isSameDay(date, end))) return true;

  if (!start || !end) return false;

  return isAfter(date, start) && isBefore(date, end);
};

inDateRange.autoRemove = (val: TODO) =>
  !Array.isArray(val) || !val.length || !isArrayOfDates(val);

export const matchFilterString: FilterFn<TODO> = (row, columnId, filterValue) => {
  if (!Array.isArray(filterValue)) return false;
  return filterValue.some((val) => row.getValue<unknown[]>(columnId) === val);
};

matchFilterString.autoRemove = (val: TODO) => !Array.isArray(val) || !val?.length;

// function testFalsey(val: TODO) {
//   return val === undefined || val === null || val === "";
// }

export const filterStringContains: FilterFn<TODO> = (row, columnId, filterValue) => {
  if (!filterValue) return true;
  const cellValue = row.getValue(columnId);
  if (!cellValue) return false;
  const stringValue = cellValue && typeof cellValue === 'object' && !Array.isArray(cellValue) 
    ? Object.values(cellValue).join(' ')
    : String(cellValue);
  return stringValue.toLowerCase().includes(filterValue?.toString().toLowerCase());
};