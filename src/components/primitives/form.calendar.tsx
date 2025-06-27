"use client"

import { addYears, format, type FormatOptions, isSameMonth, type Locale } from "date-fns"
import * as React from "react"
import {
  Day,
  DayButton,
  DayPicker,
  useDayPicker,
  type DayButtonProps,
  type DayPickerProps,
  type DayProps,
  type Matcher
} from "react-day-picker"

import { NextMonthIcon, NextYearIcon, PreviousMonthIcon, PreviousYearIcon } from "@/components/icons/icons"
import { focusRing } from "@/lib/styles"
import { cn } from "@/lib/utils"

interface NavigationButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  onClick: () => void
  icon: React.ElementType
  disabled?: boolean
}

const NavigationButton = React.forwardRef<
  HTMLButtonElement,
  NavigationButtonProps
>(
  (
    { onClick, icon, disabled, ...props }: NavigationButtonProps,
    forwardedRef,
  ) => {
    const Icon = icon
    return (
      <button
        ref={forwardedRef}
        type="button"
        disabled={disabled}
        className={cn(
          "flex size-8 shrink-0 select-none items-center justify-center rounded-sm border p-1 outline-hidden transition sm:size-[30px]",
          // text color
          "text-foreground hover:text-accent-foreground",
          // border color
          "border-border",
          // background color
          "hover:bg-gray-50 active:bg-gray-100",
          "dark:hover:bg-gray-900 dark:active:bg-gray-800",
          // disabled
          "disabled:pointer-events-none",
          "disabled:border-gray-200 dark:disabled:border-gray-800",
          "disabled:text-gray-400 dark:disabled:text-gray-600",
          focusRing,
        )}
        onClick={onClick}
        {...props}
      >
        <Icon className="size-full shrink-0" />
      </button>
    )
  },
)

NavigationButton.displayName = "NavigationButton"

const Calendar = ({
  mode = "range",
  weekStartsOn = 1,
  numberOfMonths = 1,
  enableYearNavigation = true,
  hideNavigation = true,
  disableNavigation,
  locale,
  className,
  classNames,
  ...props
}: DayPickerProps & { enableYearNavigation?: boolean }) => {
  const localeOption: FormatOptions | undefined = locale && locale.localize ? { 
    locale: locale as Locale
  } : undefined
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <DayPicker
      mode={mode}
      hideNavigation={hideNavigation}
      disableNavigation={disableNavigation}
      weekStartsOn={weekStartsOn}
      numberOfMonths={numberOfMonths}
      locale={locale}
      showOutsideDays={numberOfMonths === 1}
      className={cn(className)}
      classNames={{
        months: "flex space-y-0",
        month: "space-y-4 p-3",
        nav: "gap-1 flex items-center rounded-full size-full justify-between p-4",
        month_grid: "w-full border-collapse space-y-1",
        weekday:
          "w-9 font-medium text-sm sm:text-xs text-center text-muted-foreground pb-2",
        week: "w-full mt-0.5",
        day: cn(
          "relative p-0 text-center focus-within:relative",
          "text-foreground",
        ),
        day_button: cn(
          focusRing,
          "size-9 rounded-sm text-sm focus:z-10",
        ),
        today: "font-semibold",
        selected: cn(
          "rounded-sm",
          "aria-selected:bg-primary aria-selected:text-primary-foreground",
        ),
        disabled:
          "text-gray-300 dark:text-gray-700 line-through disabled:hover:bg-transparent",
        outside: "text-gray-400 dark:text-gray-600",
        range_middle: cn(
          "rounded-none",
          "aria-selected:bg-gray-100 aria-selected:text-gray-900",
          "dark:aria-selected:bg-gray-900 dark:aria-selected:text-gray-50",
        ),
        range_start: "rounded-r-none rounded-l",
        range_end: "rounded-l-none rounded-r",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: (props) => {
          if (props.orientation === "left") {
            return (
              <PreviousMonthIcon aria-hidden="true" className="size-4" />
            )
          }

          return (
            <NextMonthIcon aria-hidden="true" className="size-4" />
          )
        },
        MonthCaption: ({ ...props }) => {
          const {
            goToMonth,
            nextMonth,
            previousMonth,
            dayPickerProps,
            months: displayMonths,
          } = useDayPicker()

          const {
            fromDate,
            toDate,
          } = dayPickerProps

          const currentMonth = displayMonths?.[0]?.date ?? new Date()
          const numberOfMonths = dayPickerProps.numberOfMonths ?? 0


          const displayIndex = displayMonths.findIndex((month) =>
            isSameMonth(props.calendarMonth.date, month.date),
          )
          const isFirst = displayIndex === 0
          const isLast = displayIndex === displayMonths.length - 1

          const hideNextButton = numberOfMonths > 1 && (isFirst || !isLast)
          const hidePreviousButton = numberOfMonths > 1 && (isLast || !isFirst)

          const goToPreviousYear = () => {
            const targetMonth = addYears(currentMonth, -1)
            if (
              previousMonth &&
              (!fromDate || targetMonth.getTime() >= fromDate.getTime())
            ) {
              goToMonth(targetMonth)
            }
          }

          const goToNextYear = () => {
            const targetMonth = addYears(currentMonth, 1)
            if (
              nextMonth &&
              (!toDate || targetMonth.getTime() <= toDate.getTime())
            ) {
              goToMonth(targetMonth)
            }
          }

          return (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {enableYearNavigation && !hidePreviousButton && (
                  <NavigationButton
                    disabled={
                      !!disableNavigation ||
                      !previousMonth ||
                      (fromDate &&
                        addYears(currentMonth, -1).getTime() <
                        fromDate.getTime())
                    }
                    aria-label="Go to previous year"
                    onClick={goToPreviousYear}
                    icon={PreviousYearIcon}
                  />
                )}
                {!hidePreviousButton && (
                  <NavigationButton
                    disabled={!!disableNavigation || !previousMonth}
                    aria-label="Go to previous month"
                    onClick={() => previousMonth && goToMonth(previousMonth)}
                    icon={PreviousMonthIcon}
                  />
                )}
              </div>

              <div
                role="presentation"
                aria-live="polite"
                className="text-sm font-medium capitalize tabular-nums text-foreground"
              >
                {format(props.calendarMonth.date, "LLLL yyy", localeOption)}
              </div>

              <div className="flex items-center gap-1">
                {!hideNextButton && (
                  <NavigationButton
                    disabled={!!disableNavigation || !nextMonth}
                    aria-label="Go to next month"
                    onClick={() => nextMonth && goToMonth(nextMonth)}
                    icon={NextMonthIcon}
                  />
                )}
                {enableYearNavigation && !hideNextButton && (
                  <NavigationButton
                    disabled={
                      !!disableNavigation ||
                      !nextMonth ||
                      (toDate &&
                        addYears(currentMonth, 1).getTime() > toDate.getTime())
                    }
                    aria-label="Go to next year"
                    onClick={goToNextYear}
                    icon={NextYearIcon}
                  />
                )}
              </div>
            </div>
          )
        },
        DayButton: ({ children, className, modifiers, ...props }: DayButtonProps) => {
          const today = modifiers.today
          const selected = modifiers.selected
          const range_middle = modifiers.range_middle
          const disabled = modifiers.disabled
          return (
            <DayButton
              type="button"
              modifiers={modifiers}
              className={cn(
                "relative",
                "text-inherit",
                "bg-transparent",
                {
                //   "text-primary-foreground": selected,
                //   "text-foreground hover:bg-gray-200 dark:hover:bg-gray-700": !selected,
                //   // "rounded-sm": selected,
                //   "aria-selected:bg-primary aria-selected:text-primary-foreground": selected,
                //   "text-gray-600 dark:text-gray-400": selected && range_middle,
                //   "font-semibold": today,
                //   "rounded-none aria-selected:bg-gray-100 aria-selected:text-gray-900 dark:aria-selected:bg-gray-900 dark:aria-selected:text-gray-50": range_middle,
                //   // "rounded-r-none rounded-l": modifiers.range_start,
                //   // "rounded-l-none rounded-r": modifiers.range_end,
                  "text-gray-300 dark:text-gray-700 line-through disabled:hover:bg-transparent": disabled,
                //   "text-gray-400 dark:text-gray-600": modifiers.outside,
                },
                className,
              )}
              {...props}
            >
              {/** Is Today Line */}
              {today && (
                <span
                  className={cn(
                    "absolute inset-x-1/2 bottom-1.5 h-0.5 w-4 -translate-x-1/2 rounded-[2px]",
                    {
                      "bg-primary": !selected,
                      "bg-background": selected,
                      "bg-gray-400 dark:bg-gray-600": selected && range_middle,
                      "bg-gray-400 text-gray-400 dark:bg-gray-400 dark:text-gray-600":
                        disabled,
                    },
                  )}
                />
              )}

              {children}
            </DayButton>
          )
        },
        Day: ({ className, ...props }: DayProps) => {
          return (
            <Day
              {...props}
              className={cn(
                className,
              )}
            />
          )
        },
      }}

      {...(props)}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar, type Matcher }
