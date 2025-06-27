import { errorToStringFormatter } from "@/lib/formatters/error-formatters";
import { type FormErrorsProps } from "./form.error-helpers";
import { cn } from "@/lib/utils";

export function FormErrors({
  children,
  className,
  errors,
  ref,
}: FormErrorsProps) {
  return (
    <ul
      className={cn("text-destructive text-xs space-y-2", className)}
      ref={ref}
    >
      {children}
      {
        !!errors && (
          errors.map((e, i) => {
            return (
              <li key={i}> {errorToStringFormatter(e)} </li>
            )
          })
        )
      }
    </ul>
  )
}