import { INTERNAL__frameLineToOverallSeverity } from "@/features/session-viewer/components/dashboard/audit/feature/segment.frames-list-item";
import { type AuditImageContextOption } from "@/server/api/trpc";
import { useEffect, useRef } from "react";

const INTERNAL__SCROLL_PADDING = 25;
let INTERNAL__scrolledToId: string | undefined = undefined;

/**
 * React hook to scroll to first matching frame which
  * contains line_score that is either level low or level medium.
  *
  * __*ENSURE CHILD ELEMENT HAS ID SET TO AuditImageContext.frame TO ENSURE PROPER SCROLL OFFSETS*__
  *
  *
  * @example
  * const frames = ...
  * const viewportRef = useScrollToFrame("id", frames)
  *
  * return (
  *   <ScrollArea viewportRef={viewportRef}>
  *     {frames?.map((f) => {
  *       <div id={f.frame}>
  *         {f.frame}
  *       </div>
  *     })}
  *   </ScrollArea>
  * )
  *
  * @param id Id of selected segment
  * @param frames frames associated to the selected segment
  * @returns viewportRef to set on scroll area viewport
  */
export function useScrollToFrame(id: string, frames: AuditImageContextOption[] | undefined) {
  const viewportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!frames || frames.length === 0 || !viewportRef.current) {
      return;
    }

    if (INTERNAL__scrolledToId === id) {
      return;
    }

    INTERNAL__scrolledToId = id;
    const potentialFrame = frames.find((f) => {
      const severity = INTERNAL__frameLineToOverallSeverity(f.line_score_left, f.line_score_right)
      return severity === 'level low' || severity === 'level medium'
    })

    if (!potentialFrame) {
      return;
    }

    const scrollToId = potentialFrame.frame
    const scrollToElement = document.getElementById(scrollToId)
    if (!scrollToElement) {
      return;
    }

    viewportRef.current?.scrollTo({
      behavior: "smooth",
      top: scrollToElement.offsetTop - INTERNAL__SCROLL_PADDING
    })
  }, [frames, id])

  return viewportRef
}
