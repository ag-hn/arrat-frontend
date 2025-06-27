export function hourOnlyFormatter(d: Date) {
  return Intl.DateTimeFormat("us", { hour12: true, hour: "2-digit", minute: "numeric" }).format(d)
}

export function longDateFormatter(d: string | number | Date) {
  if (!d) {
    return "N/A"
  }

  const date = typeof d === 'string' ? INTERNAL__unixToDate(d) : d

  return Intl.DateTimeFormat("us", { dateStyle: "full", timeStyle: "short" }).format(date)
}

export function shortDateFormatter(d: string | number | Date) {
  if (!d) {
    return "N/A"
  }

  const date = typeof d === 'string' ? INTERNAL__unixToDate(d) : d

  return Intl.DateTimeFormat("us", { dateStyle: "short", timeStyle: "medium" }).format(date)
}


function INTERNAL__unixToDate(d: string) {
  const date = new Date(0)
  date.setUTCSeconds(+d)
  return date
}
