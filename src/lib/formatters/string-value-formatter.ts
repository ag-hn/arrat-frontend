/**
 * Converts a string to title case, splitting on spaces, underscores, or hyphens.
 * 
 * @param v - The input string, which may be null or undefined.
 * @returns The title-cased string, or an empty string if input is falsy.
 */
export function stringToTitleCaseFormatter(v: string | null | undefined): string {
  if (!v) {
    return ''
  }

  return v.toLowerCase().split(/ |_|-/).map((word: string) => {
    return (word.charAt(0).toUpperCase() + word.slice(1))
  }).join(' ')
}

/**
 * Converts a string to title case, inserting spaces before capital letters and digits,
 * then splitting on spaces, underscores, or hyphens.
 * 
 * Example: "unitID123" -> "Unit I D 123"
 * 
 * @param v - The input string.
 * @returns The title-cased string with improved splitting for camelCase and digits.
 */
export function stringToTitleCaseAndSpacingFormatter(v: string): string {
  if (!v) return '';

  const words = v
    .replace(/[_\-]/g, ' ') // replace underscores and hyphens with space
    .match(/[A-Z]?[a-z]+|[A-Z]+(?![a-z])|\d+|[A-Z]/g);

  if (!words) return '';

  return words
    .map(word => {
      // If it's all digits, leave as is
      if (/^\d+$/.test(word)) return word;
      // Otherwise, title case
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}
