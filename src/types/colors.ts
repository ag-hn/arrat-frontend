import type colors from "tailwindcss/colors.js";

export type TailwindColor = `#${string}` | `--${string}`
type DefaultColors = Omit<typeof colors, "">
type DefaultColorsKeys = keyof DefaultColors
export type Color = TailwindColor | DefaultColorsKeys

export interface ColorClassNames {
  bgColor: string;
  hoverBgColor: string;
  selectBgColor: string;
  textColor: string;
  selectTextColor: string;
  hoverTextColor: string;
  borderColor: string;
  selectBorderColor: string;
  hoverBorderColor: string;
  ringColor: string;
  strokeColor: string;
  fillColor: string;
}
