import { focusInput } from "@/lib/styles"
import { cn } from "@/lib/utils"
import * as React from "react"

const FormTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        focusInput,
        "flex min-h-[80px] w-full rounded-md border border-input bg-card shadow-sm px-3 py-2 text-base disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
FormTextarea.displayName = "FormTextarea"

export { FormTextarea }
