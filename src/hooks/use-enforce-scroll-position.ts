import { useEffect } from "react";

export const SCROLL_POSITION_LOCAL_STORAGE_KEY = "SCROLL_POSITION_LOCAL_STORAGE_KEY"
function INTERNAL__setScrollToLocalStorage() {
  localStorage.setItem(SCROLL_POSITION_LOCAL_STORAGE_KEY, `${window.scrollY}`)
}

function INTERNAL__setScrollFromLocalStorage() {
  const pos = localStorage.getItem(SCROLL_POSITION_LOCAL_STORAGE_KEY);
  if (pos) {
    window.scrollTo(0, +pos);
  }

}
export function useEnforceScrollPosition() {
  useEffect(() => {
    if (!window) {
      return;
    }

    window.addEventListener("beforeunload", INTERNAL__setScrollToLocalStorage)

    INTERNAL__setScrollFromLocalStorage()

    return () => {
      window.removeEventListener("beforeunload", INTERNAL__setScrollToLocalStorage)
    }
  }, [])
}
