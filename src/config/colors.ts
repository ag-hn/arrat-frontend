import type { Color } from '@/types/colors.js'
import colors from 'tailwindcss/colors'

/** Default theming and color scheme for site. OPTION: light, dark */
export const defaultTheme = "light"

/**
 * Should follow the branding guildelines put up by Ohio (https://ohio.org/static/uploads/pdfs/Ohio-Brand+Guide-v1.6.pdf) 
 * Changing colors here much reflect changes in tailwind.config.ts 
 * */
const brand = {
    DEFAULT: "#202020" satisfies Color,
    subtle: "#606060" satisfies Color,
    muted: "#bcbcbc" satisfies Color,
} as const

/** 
 * Variations calcualted by matial design color picking tool (https://m2.material.io/design/color/the-color-system.html#tools-for-picking-colors)
*/
export const colorsConfig = {
    brand: brand.DEFAULT,
    fallback: "gray" satisfies Color,
    shade: 400,
    chart: {
        bar: [brand.DEFAULT, brand.subtle, brand.muted] satisfies string[],
        themeColorRange: [
            brand.DEFAULT,
            "blue",
            "sky",
            "cyan",
            "indigo",
            "violet",
            "fuchsia",
            "slate",
            "gray",
            "zinc",
            "neutral",
            "stone",
            "red",
            "amber",
            "orange",
            "yellow",
            "lime",
            "green",
            "emerald",
            "teal",
            "pink",
            "rose",
        ] satisfies Color[]
    },
    baseColors: colors

} as const