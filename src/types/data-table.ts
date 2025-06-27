import {
  type RangeDatePickerProps
} from "@/components/primitives/form.date-picker";
import { type InputProps } from "@/components/primitives/form.input";
import { type FormSelectMultiProps } from "@/components/primitives/form.select-multi";
import type { JSX } from "react";

export type SearchParams = Record<string, string | string[] | undefined>;

export type DatePreset = {
  label: string;
  from: Date;
  to: Date;
  shortcut: string;
};

// TODO: we could type the value(!) especially when using enums
export type Option = {
  label: string;
  value: string | boolean | number | undefined;
};

export type Input = Pick<InputProps, "type" | "placeholder" | "className"> & {
  __type: "input";
  options?: Option[];
};

export type Checkbox = {
  __type: "checkbox";
  component?: (props: Option) => JSX.Element | null;
  options?: Option[];
};

export type Select = Pick<
  FormSelectMultiProps,
  "options" | "placeholder" | "className"
> & {
  __type: "select";
};

export type Slider = {
  __type: "slider";
  min: number;
  max: number;
  // if options is undefined, we will provide all the steps between min and max
  options?: Option[];
};

export type Timerange = Pick<
  RangeDatePickerProps,
  "presets" | "disabledDays" | "numberOfMonths" | "className"
> & {
  __type: "timerange";
  options?: Option[]; // required for TS
};

export type Base<TData> = {
  __key: keyof TData;
  label: string;
  /**
   * Defines if the command input is disabled for this field
   */
  commandDisabled?: boolean;
};

export type DataTableCheckboxFilterField<TData> = Base<TData> & Checkbox;
export type DataTableSliderFilterField<TData> = Base<TData> & Slider;
export type DataTableInputFilterField<TData> = Base<TData> & Input;
export type DataTableTimerangeFilterField<TData> = Base<TData> & Timerange;
export type DataTableSelectFilterField<TData> = Base<TData> & Select;

export type DataTableFilterField<TData> =
  | DataTableCheckboxFilterField<TData>
  | DataTableSliderFilterField<TData>
  | DataTableInputFilterField<TData>
  | DataTableTimerangeFilterField<TData>
  | DataTableSelectFilterField<TData>;

export type DataTableFilterFields<TData> = DataTableFilterField<TData>[];
