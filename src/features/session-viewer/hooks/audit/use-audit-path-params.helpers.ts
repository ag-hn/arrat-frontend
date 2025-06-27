import { type AuditPageRouteParams } from "@/types/pages";

const INTERNAL__signUrlParamIdPrefix = 'sign-'

type PathParamBase<TTag extends string> = {
  __tag: TTag,
}

type PathParamContent<TTag extends string, TOriginal> = PathParamBase<TTag> & {
  original: TOriginal,
  param: string,
}

type PathParamSegment = PathParamContent<'__tag_segment', string>
type PathParamSign = PathParamContent<'__tag_sign', number>

export type PathParamOption = PathParamSegment | PathParamSign


/**
 * Takes the original audit path param id and transforms it to 
 * the id for sign or segment audits.
 *
 * Keys contain information for original values and how
 * they are represented as url parameters
 */
export function transformPathParamToAuditKey(params: AuditPageRouteParams): PathParamOption | undefined {
  const param = params?.id
  if (!param) {
    return undefined
  }

  if (!param.startsWith(INTERNAL__signUrlParamIdPrefix)) {
    return {
      __tag: "__tag_segment",
      original: param,
      param: param,
    } satisfies PathParamSegment;
  }

  return {
    __tag: "__tag_sign",
    original: +param.replace(INTERNAL__signUrlParamIdPrefix, ''),
    param: param,
  } satisfies PathParamSign;
}

export function createSignUrlParamId(original: number) {
  return `${INTERNAL__signUrlParamIdPrefix}${original}`
}

export function decodeUrlSession(params: AuditPageRouteParams): string {
  const param = params.session
  return !param ? "" : decodeURIComponent(param)
}
