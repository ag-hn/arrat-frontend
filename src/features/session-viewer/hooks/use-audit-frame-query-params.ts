import { parseAsString, useQueryState } from "nuqs";

const auditFrameQueryName = "f";
const parser = parseAsString.withOptions({
  scroll: false,
  throttleMs: 300,
  history: 'push',
})

/**
 * React hook to set or clear the current selected sub frame of a segment
 *
 * Setting this value will open up a modal for the frameId and display an enlarged image for it. 
 */
export function useAuditFrameQueryParams() {
  const [frame, setFrame] = useQueryState(auditFrameQueryName, parser)

  return {
    set: setFrame,
    clear: () => setFrame(null),
    frame: frame,
  };
}
