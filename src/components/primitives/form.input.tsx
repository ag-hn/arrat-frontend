import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/primitives/button"
import { focusInput, focusRing } from "@/lib/styles"
import { EyeIcon, EyeOffIcon, SearchIcon } from "lucide-react"
import { Tooltip } from "./tooltip"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [typeState, setTypeState] = React.useState(type)

    const isPassword = type === "password"
    const isSearch = type === "search"

    return (
      <div className="relative flex-1 flex flex-row">
        <input
          type={typeState}
          className={cn(
            focusInput,
            "flex w-full min-h-9 rounded-md border border-input bg-card px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            isPassword ? "pe-9 rounded-e-none" : "",
            isSearch ? "pl-8" : "",
            className
          )}
          ref={ref}
          {...props}
        />

        {isSearch && (
          <div
            className={cn(
              "pointer-events-none absolute bottom-0 left-3 flex h-full items-center justify-center",
            )}
          >
            <SearchIcon
              className="text-muted-foreground size-4 shrink-0"
              aria-hidden="true"
            />
          </div>
        )}

        {isPassword && (
          <Tooltip
            delayDuration={0}
            content={(
              "Change password visibility"
            )}
            asChild
          >
            <span>
              <Button
                onClick={() => {
                  setTypeState(typeState === "password" ? "text" : "password")
                }}
                variant={"outline"}
                size="icon"
                className={cn(focusRing, "h-full bg-card ps-4 pe-4 rounded-none shadow-sm rounded-s-none rounded-e-lg border border-border border-l-transparent")}
                aria-label={"Change password visibility"}
                type="button"
              >
                <span>
                  {typeState === "password" ? (
                    <EyeIcon aria-hidden="true" className="text-muted-foreground size-4 shrink-0" />
                  ) : (
                    <EyeOffIcon aria-hidden="true" className="text-muted-foreground size-4 shrink-0" />
                  )}
                </span>
              </Button>
            </span>
          </Tooltip>

        )}
      </div>
    )
  }
)
FormInput.displayName = "FormInput"

export { FormInput }