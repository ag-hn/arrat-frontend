import { useState, useEffect, useRef, type RefObject } from "react";

type UseContentOverflowReturn<T extends HTMLElement = HTMLElement> = {
  ref: RefObject<T>;
  dy?: boolean;
  dx?: boolean;
};

export function useContentOverflow<
  T extends HTMLElement = HTMLElement,
>(): UseContentOverflowReturn<T> {
  const [dy, setOverflowDy] = useState<boolean | undefined>(undefined);
  const [dx, setOverflowDx] = useState<boolean | undefined>(undefined);

  const ref = useRef<T>(null);

  useEffect(() => {
    const { current } = ref;
    if (!current) {
      setOverflowDy(undefined);
      setOverflowDx(undefined);
      return;
    }

    const observer = new ResizeObserver(() => {
        const overflowDx = current.scrollWidth > current.clientWidth;
        const overflowDy = current.scrollHeight > current.clientHeight;
    
        setOverflowDx(overflowDx);
        setOverflowDy(overflowDy);
    });
    
    observer.observe(current);

    return () => observer.disconnect();
  }, [ref]);

  return {
    ref,
    dy,
    dx,
  };
}
