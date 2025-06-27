export function defaultFormatter(value: number): string {
    return Intl.NumberFormat("us").format(value).toString();
} 
