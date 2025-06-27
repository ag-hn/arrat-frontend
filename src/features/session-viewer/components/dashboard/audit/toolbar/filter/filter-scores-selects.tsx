"use client";

import { Icons } from "@/components/icons/icons";
import { Button } from "@/components/primitives/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { SUMMARY_SCORE_FILTER_DEFAULT_VALUE, SUMMARY_SCORE_FILTER_MAX_VALUE, SUMMARY_SCORE_FILTER_MIN_VALUE, type SummaryLanelineScoresFilter, type SummarySignScoresFilter, useSummaryScoreFeatureFilterQueryParams } from "@/features/session-viewer/hooks/filters/use-summary-score-filter-query-params";
import { cn } from "@/lib/utils";
import { PopoverClose } from "@radix-ui/react-popover";
import { Undo } from "lucide-react";
import { useCallback, useState } from "react";
import { DEFAULT_SLIDER_INPUT_FORMATTER, useSliderWithInput } from "./filter-scores-selects.helpers";
import { InformationToken } from "@/components/primitives/information-token";
import { getMetricDescriptionFromKey } from "@/lib/audit-utils";

export function INTERNAL__scoreIsNotDefaultAndWithinRange(value: number[]) {
  if (value.length !== 2 || value[0] === undefined || value[1] === undefined) {
    return false;
  }

  if (
    value[0] === SUMMARY_SCORE_FILTER_MIN_VALUE && value[1] === SUMMARY_SCORE_FILTER_MAX_VALUE
  ) {
    return false;
  }

  if (
    !(value[0] >= SUMMARY_SCORE_FILTER_MIN_VALUE && value[0] <= SUMMARY_SCORE_FILTER_MAX_VALUE) ||
    !(value[1] >= SUMMARY_SCORE_FILTER_MIN_VALUE && value[1] <= SUMMARY_SCORE_FILTER_MAX_VALUE)
  ) {
    return false;
  }

  return true;
}

export function LanelineScoreFilterSelect({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const { setLaneline, value, pendingValues } = useSummaryScoreFeatureFilterQueryParams();
  const [pendingValue, setPendingValue] = useState<SummaryLanelineScoresFilter>(pendingValues)

  const selectedValuesFn = useCallback(() => {
    const ret: string[] = []
    if (INTERNAL__scoreIsNotDefaultAndWithinRange(value.lanelineCombined))
      ret.push('Combined');

    if (INTERNAL__scoreIsNotDefaultAndWithinRange(value.lanelineConsistency))
      ret.push('Consistency');

    if (INTERNAL__scoreIsNotDefaultAndWithinRange(value.lanelineVisibility))
      ret.push('Visibility');

    if (INTERNAL__scoreIsNotDefaultAndWithinRange(value.lanelineDetection))
      ret.push('Detection');

    if (INTERNAL__scoreIsNotDefaultAndWithinRange(value.lanelineCurvature))
      ret.push('Curvature');

    return ret
  }, [value.lanelineCombined, value.lanelineConsistency, value.lanelineCurvature, value.lanelineDetection, value.lanelineVisibility])

  const selectedValues = selectedValuesFn()
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "flex flex-row border-dashed border-input py-2 text-foreground justify-center",
            selectedValues?.length > 0 ? "justify-normal" : "justify-center",
            className)}
        >
          <Icons.input.append className="mr-1 h-4 w-4" />
          <span >
            Laneline Scores
          </span>
          {selectedValues?.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="slate"
                className="rounded-sm px-2 font-normal md:hidden dark:text-foreground"
              >
                {selectedValues.length}
              </Badge>
              <div className="hidden space-x-1 md:flex">
                {selectedValues.length > 2 ? (
                  <Badge
                    variant="slate"
                    className="rounded-sm px-1 font-normal dark:text-foreground"
                  >
                    {selectedValues.length} selected
                  </Badge>
                ) : (
                  selectedValues
                    .map((option) => (
                      <Badge
                        key={option}
                        variant="slate"
                        className="rounded-sm px-1 font-normal dark:text-foreground"
                      >
                        {option}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="flex flex-col gap-2 sm:w-[max(var(--radix-popover-trigger-width),_30rem)] "
        align="start"
        onOpenAutoFocus={undefined} /** force popover to focus first element */
      >
        <p>
          <span className="text-base text-muted-foreground">*{" "}</span>
          <span className="text-xs leading-none text-muted-foreground">Ensure values are between <b>{SUMMARY_SCORE_FILTER_MIN_VALUE}%</b> - <b>{SUMMARY_SCORE_FILTER_MAX_VALUE}%</b> and your second value is larger than the first.</span>
        </p>


        <div className="flex flex-col gap-3">
          <INTERNAL__RangeComponent
            associatedScoreKey="laneline_combined"
            title="Combined"
            defaultValue={value.lanelineCombined}
            onRangeChange={(value) => setPendingValue((p) => {
              p.lanelineCombined = value
              return p
            })}
          />

          <INTERNAL__RangeComponent
            associatedScoreKey="laneline_consistency"
            title="Consistency"
            defaultValue={value.lanelineConsistency}
            onRangeChange={(value) => setPendingValue((p) => {
              p.lanelineConsistency = value
              return p
            })}
          />

          <INTERNAL__RangeComponent
            associatedScoreKey="laneline_curvature"
            title="Curvature"
            defaultValue={value.lanelineCurvature}
            onRangeChange={(value) => setPendingValue((p) => {
              p.lanelineCurvature = value
              return p
            })}
          />

          <INTERNAL__RangeComponent
            associatedScoreKey="laneline_detection"
            title="Detection"
            defaultValue={value.lanelineDetection}
            onRangeChange={(value) => setPendingValue((p) => {
              p.lanelineDetection = value
              return p
            })}
          />

          <INTERNAL__RangeComponent
            associatedScoreKey="laneline_visibility"
            title="Visibility"
            defaultValue={value.lanelineVisibility}
            onRangeChange={(value) => setPendingValue((p) => {
              p.lanelineVisibility = value
              return p
            })}
          />
        </div>

        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 pt-5">
          <PopoverClose asChild>
            <Button variant={"ghost"} size="md" className="justify-center">Close</Button>
          </PopoverClose>
          <Button variant={"default"} size="md" className="justify-center" onClick={() => {
            void setLaneline(pendingValue)
            setOpen(false)
          }}>Confirm</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function SignScoreFilterSelect({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const { setSigns, value, pendingValues } = useSummaryScoreFeatureFilterQueryParams();
  const [pendingValue, setPendingValue] = useState<SummarySignScoresFilter>(pendingValues)

  const selectedValuesFn = useCallback(() => {
    const ret: string[] = []
    if (INTERNAL__scoreIsNotDefaultAndWithinRange(value.signOverall))
      ret.push('Accuracy');
    if (INTERNAL__scoreIsNotDefaultAndWithinRange(value.signUnderstandability))
      ret.push('Understandability');
    if (INTERNAL__scoreIsNotDefaultAndWithinRange(value.signLegibility))
      ret.push('Legibility');
    if (INTERNAL__scoreIsNotDefaultAndWithinRange(value.signConspicuity))
      ret.push('Conspicuity');

    return ret
  }, [value.signConspicuity, value.signLegibility, value.signOverall, value.signUnderstandability])

  const selectedValues = selectedValuesFn()
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "flex flex-row border-dashed border-input py-2 text-foreground justify-center",
            selectedValues?.length > 0 ? "justify-normal" : "justify-center",
            className)}
        >
          <Icons.input.append className="mr-1 h-4 w-4" />
          <span className="">
            Sign Scores
          </span>
          {selectedValues?.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="slate"
                className="rounded-sm px-2 font-normal md:hidden dark:text-foreground"
              >
                {selectedValues.length}
              </Badge>
              <div className="hidden space-x-1 md:flex">
                {selectedValues.length > 2 ? (
                  <Badge
                    variant="slate"
                    className="rounded-sm px-1 font-normal dark:text-foreground"
                  >
                    {selectedValues.length} selected
                  </Badge>
                ) : (
                  selectedValues
                    .map((option) => (
                      <Badge
                        key={option}
                        variant="slate"
                        className="rounded-sm px-1 font-normal dark:text-foreground"
                      >
                        {option}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="flex flex-col gap-2 sm:w-[max(var(--radix-popover-trigger-width),_30rem)] "
        align="start"
        onOpenAutoFocus={undefined} /** force popover to focus first element */
      >
        <p>
          <span className="text-base text-muted-foreground">*{" "}</span>
          <span className="text-xs leading-none text-muted-foreground">Ensure values are between <b>0%</b> - <b>100%</b> and your second value is larger than the first.</span>
        </p>

        <div className="flex flex-col gap-3">
          <INTERNAL__RangeComponent
            associatedScoreKey="sign_overall"
            title="Overall"
            defaultValue={value.signOverall}
            onRangeChange={(value) => setPendingValue((p) => {
              p.signOverall = value
              return p
            })}
          />
          <INTERNAL__RangeComponent
            associatedScoreKey="understandability"
            title="Understandability"
            defaultValue={value.signUnderstandability}
            onRangeChange={(value) => setPendingValue((p) => {
              p.signUnderstandability = value
              return p
            })}
          />
          <INTERNAL__RangeComponent
            associatedScoreKey="glance_legibility"
            title="Legibility"
            defaultValue={value.signLegibility}
            onRangeChange={(value) => setPendingValue((p) => {
              p.signLegibility = value
              return p
            })}
          />
          <INTERNAL__RangeComponent
            associatedScoreKey="conspicuity"
            title="Conspicuity"
            defaultValue={value.signConspicuity}
            onRangeChange={(value) => setPendingValue((p) => {
              p.signConspicuity = value
              return p
            })}
          />
        </div>

        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 pt-5">
          <PopoverClose asChild>
            <Button variant={"ghost"} size="md" className="justify-center">Close</Button>
          </PopoverClose>
          <Button variant={"default"} size="md" className="justify-center" onClick={() => {
            void setSigns(pendingValue)
            setOpen(false)
          }}>Confirm</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}


function INTERNAL__RangeComponent({
  title,
  associatedScoreKey,
  defaultValue,
  onRangeChange,
}: {
  title: string,
  associatedScoreKey: string,
  defaultValue: number[],
  onFromChange?: (value: number) => void,
  onToChange?: (value: number) => void,
  onRangeChange?: (value: [number, number]) => void,
}) {
  const {
    sliderValue,
    handleSliderChange,
    displays,
  } = useSliderWithInput({
    minValue: SUMMARY_SCORE_FILTER_MIN_VALUE,
    maxValue: SUMMARY_SCORE_FILTER_MAX_VALUE,
    initialValue: defaultValue
  });

  const hasChanged = sliderValue[0] !== defaultValue[0] || sliderValue[1] !== defaultValue[1];
  const isDefault = sliderValue[0] === SUMMARY_SCORE_FILTER_DEFAULT_VALUE[0] && sliderValue[1] === SUMMARY_SCORE_FILTER_DEFAULT_VALUE[1];
  return (
    <div className="grid grid-cols-[1fr,_2fr] gap-4 items-start">
      <InformationToken
        content={getMetricDescriptionFromKey(associatedScoreKey)}
      >
        <Label>
          {title} 
          {hasChanged ? (<span className="text-xs text-muted-foreground animate-in fade-in">(changed)</span>) : null}
        </Label>
      </InformationToken>

      <div className="inline-flex flex-col gap-1">
        <div className="flex flex-row justify-end items-center gap-2 text-xs text-muted-foreground min-h-7">
          {
            !isDefault && (
              <Button
                variant="secondary"
                size="icon"
                className="size-7"
                onClick={() => {
                  const newValue: [number, number] = SUMMARY_SCORE_FILTER_DEFAULT_VALUE
                  handleSliderChange(newValue)
                  onRangeChange?.(newValue)
                }}>
                <Undo className="size-3" />
              </Button>

            )
          }

          <span>
            {displays.combined}
          </span>
        </div>

        <Slider
          showTooltip
          tooltipContent={DEFAULT_SLIDER_INPUT_FORMATTER}
          className="grow"
          value={sliderValue}
          onValueChange={(value: [number, number]) => {
            handleSliderChange(value)
            onRangeChange?.(value)
          }}
          min={SUMMARY_SCORE_FILTER_MIN_VALUE}
          max={SUMMARY_SCORE_FILTER_MAX_VALUE}
          aria-label={`Dual range slider with inputs between ${SUMMARY_SCORE_FILTER_MIN_VALUE} and ${SUMMARY_SCORE_FILTER_MAX_VALUE}%`}
        />
      </div>
    </div>
  );
}

// function INTERNAL__RangeComponentWithInputs({
//   title,
//   defaultValue,
//   onRangeChange,
// }: {
//   title: string,
//   defaultValue: number[],
//   onFromChange?: (value: number) => void,
//   onToChange?: (value: number) => void,
//   onRangeChange?: (value: [number, number]) => void,
// }) {
//   const [range, setRange] = useState<[number, number]>(defaultValue
//     ? [defaultValue[0] ?? SUMMARY_SCORE_FILTER_MIN_VALUE, defaultValue[1] ?? SUMMARY_SCORE_FILTER_MAX_VALUE]
//     : SUMMARY_SCORE_FILTER_DEFAULT_VALUE)
//
//   const {
//     sliderValue,
//     inputValues,
//     validateAndUpdateValue,
//     handleInputChange,
//     handleSliderChange,
//   } = useSliderWithInput({
//     minValue: SUMMARY_SCORE_FILTER_MIN_VALUE,
//     maxValue: SUMMARY_SCORE_FILTER_MAX_VALUE,
//     initialValue: defaultValue
//   });
//
//   const id = useId();
//   const debounceFrom = useDebounce(sliderValue[0], 500)
//   const hasChanged = sliderValue[0] !== defaultValue[0] || sliderValue[1] !== defaultValue[1];
//   const isDefault = sliderValue[0] === SUMMARY_SCORE_FILTER_DEFAULT_VALUE[0] && sliderValue[1] === SUMMARY_SCORE_FILTER_DEFAULT_VALUE[1];
//   return (
//     <div className="grid grid-cols-[1fr,_2fr] gap-3 items-center">
//       <Label>{title} {hasChanged ? (<span className="text-xs text-muted-foreground animate-in fade-in">(changed)</span>) : null}</Label>
//
//       <div className="inline-flex gap-1">
//         <div
//           className={cn(
//             'flex-1 inline-flex -space-x-px rounded-lg shadow-sm shadow-black/5 rtl:space-x-reverse',
//             '[&>*>input]:rounded-none [&>*>input]:shadow-none [&>*>input:focus-visible]:z-10 [&>*:first-child>input]:rounded-s-lg [&>*:last-child>input]:rounded-e-lg',
//           )}
//         >
//           <Input
//             value={inputValues[0]}
//             onChange={(e) => handleInputChange(e, 0)}
//             onBlur={() => validateAndUpdateValue(inputValues[0]!, 0)}
//             id={`${id}-1`}
//             placeholder="From %"
//             className={cn(
//               "min-w-8 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none",
//               "invalid:bg-red-100 invalid:ring-destructive invalid:border-destructive",
//             )}
//             type="number"
//             inputMode="decimal"
//             aria-label={`Enter minimum percentage between ${SUMMARY_SCORE_FILTER_MIN_VALUE} and ${SUMMARY_SCORE_FILTER_MAX_VALUE}%`}
//             min={`${SUMMARY_SCORE_FILTER_MIN_VALUE}`}
//             max={`${SUMMARY_SCORE_FILTER_MAX_VALUE}`}
//           />
//           <Slider
//             className="grow flex-1 hidden sm:block"
//             value={sliderValue}
//             onValueChange={handleSliderChange}
//             min={SUMMARY_SCORE_FILTER_MIN_VALUE}
//             max={SUMMARY_SCORE_FILTER_MAX_VALUE}
//             aria-label={`Dual range slider with inputs between ${SUMMARY_SCORE_FILTER_MIN_VALUE} and ${SUMMARY_SCORE_FILTER_MAX_VALUE}%`}
//           />
//           <Input
//             value={inputValues[1]}
//             onChange={(e) => handleInputChange(e, 1)}
//             onBlur={() => validateAndUpdateValue(inputValues[1]!, 1)}
//             id={`${id}-2`}
//             className={cn(
//               "min-w-8 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none",
//               "invalid:bg-red-100 invalid:ring-destructive invalid:border-destructive",
//             )}
//             placeholder="To %"
//             type="number"
//             aria-label={`Enter minimum percentage between ${SUMMARY_SCORE_FILTER_MIN_VALUE} and ${SUMMARY_SCORE_FILTER_MAX_VALUE}%`}
//             min={`${debounceFrom}`}
//             max={`${SUMMARY_SCORE_FILTER_MAX_VALUE}`}
//           />
//         </div>
//
//         {
//           !isDefault && (
//             <Button variant="ghost" size="icon" onClick={() => {
//               const newValue: [number, number] = SUMMARY_SCORE_FILTER_DEFAULT_VALUE
//               setRange(newValue);
//               onRangeChange?.(newValue)
//             }}>
//               <Undo className="size-3" />
//             </Button>
//
//           )
//         }
//
//       </div>
//     </div>
//   );
// }
//

