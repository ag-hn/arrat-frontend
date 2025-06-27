export function unknownErrorToStringFormatter(err: unknown, prefix?: string) {
  if (typeof err !== 'string' && !(err instanceof Error)) {
    return `${prefix}Unknown error occured.`
  }

  return errorToStringFormatter(err, prefix)
}

export function errorToStringFormatter(err: string | Error | undefined, prefix?: string) {
  if (!err) {
    return 'Authentication error';
  }

  if (typeof err === 'string') {
    return `${prefix ?? ''}${err}`
  }

  if (err instanceof Error) {
    return `${prefix ?? ''}${err.message}`
  }

  return 'Authentication error';
}
