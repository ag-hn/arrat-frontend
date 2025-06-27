import { cn } from "@/lib/utils";
import type { ComponentWithDefaultProps } from "@/types/utils";

export function Placeholder({
  className,
  children,
  ref,
  ...props
}: ComponentWithDefaultProps<HTMLDivElement>) {
  return (
    <div
      ref={ref}
      className={
        cn(
          "relative h-full overflow-hidden rounded bg-background border border-border animate-pulse",
          className,
        )
      }
      {...props}
    >
      <svg
        className="absolute inset-0 h-full w-full stroke-muted"
        fill="none"
      >
        <defs>
          <pattern
            id="pattern-1"
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
          </pattern>
        </defs>

        {children}

        <rect
          stroke="none"
          fill="url(#pattern-1)"
          width="100%"
          height="100%"
        ></rect>
      </svg>
    </div>
  );
}
