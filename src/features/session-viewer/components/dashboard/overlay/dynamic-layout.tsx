import { cn } from "@/lib/utils";
import { type ComponentClassName } from "@/types/utility";

export function DynamicLayout({ children, className, contentClassName }: ComponentClassName<{ contentClassName?: string, }>) {

  return (
    <div className={cn(
      "pointer-events-none items-stretch justify-stretch absolute w-full h-full grid grid-cols-1 gap-4 p-4 sm:p-8 transition-all duration-500 z-10",
      className
    )}>

      <ContentWrapper
        className={cn(
          contentClassName
        )}>
        {children}
      </ContentWrapper>

    </div>
  )
}

export function ContentWrapper({ className, eventsCaptureWrapperClassName, children }: ComponentClassName<{ eventsCaptureWrapperClassName?: string }>) {
  return (
    <div className={cn(
      "duration-1000 animate-in fade-in delay-200",
      className
    )}>
      <div className={cn("pointer-events-auto", eventsCaptureWrapperClassName)}>
        {children}
      </div>
    </div>
  )
}
