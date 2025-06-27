import { SUMMARY_SCORE_FILTER_DEFAULT_VALUE, SUMMARY_SCORE_FILTER_MAX_VALUE, SUMMARY_SCORE_FILTER_MIN_VALUE } from "@/features/session-viewer/hooks/filters/use-summary-score-filter-query-params";
import { useCallback, useMemo, useState } from "react";

export const DEFAULT_SLIDER_INPUT_FORMATTER = ((v: number | string | undefined) => typeof v === 'undefined' ? 'N/A' : `${v}%`)

type UseSliderWithInputProps = {
  minValue?: number;
  maxValue?: number;
  initialValue?: number[];
  defaultValue?: number[];
  displayFormatter?: (value: number | string | undefined) => string;
};

export function useSliderWithInput({
  minValue = SUMMARY_SCORE_FILTER_MIN_VALUE,
  maxValue = SUMMARY_SCORE_FILTER_MAX_VALUE,
  initialValue = SUMMARY_SCORE_FILTER_DEFAULT_VALUE,
  defaultValue = SUMMARY_SCORE_FILTER_DEFAULT_VALUE,
  displayFormatter = DEFAULT_SLIDER_INPUT_FORMATTER,
}: UseSliderWithInputProps) {
  const [sliderValue, setSliderValue] = useState(initialValue);
  const [inputValues, setInputValues] = useState(initialValue.map((v) => v.toString()));
  const displays = useMemo(() => {
    if (!inputValues) {
      return {
        combined: 'N/A',
        firstValue: 'N/A',
        secondValue: 'N/A',
      }
    }

    const firstValueAsString = displayFormatter(inputValues[0])
    const secondValueAsString = displayFormatter(inputValues[1])
    return {
      combined: `${firstValueAsString}, ${secondValueAsString}`,
      firstValue: firstValueAsString,
      secondValue: secondValueAsString,
    }
  }, [displayFormatter, inputValues])

  const showReset = sliderValue.length === defaultValue.length &&
    !sliderValue.every((value, index) => value === defaultValue[index]);

  const validateAndUpdateValue = useCallback(
    (rawValue: string, index: number) => {
      if (rawValue === "" || rawValue === "-") {
        const newInputValues = [...inputValues];
        newInputValues[index] = "0";
        setInputValues(newInputValues);

        const newSliderValues = [...sliderValue];
        newSliderValues[index] = 0;
        setSliderValue(newSliderValues);
        return;
      }

      const numValue = parseFloat(rawValue);

      if (isNaN(numValue)) {
        const newInputValues = [...inputValues];
        newInputValues[index] = sliderValue[index]!.toString();
        setInputValues(newInputValues);
        return;
      }

      let clampedValue = Math.min(maxValue, Math.max(minValue, numValue));

      if (sliderValue.length > 1) {
        if (index === 0) {
          clampedValue = Math.min(clampedValue, sliderValue[1]!);
        } else {
          clampedValue = Math.max(clampedValue, sliderValue[0]!);
        }
      }

      const newSliderValues = [...sliderValue];
      newSliderValues[index] = clampedValue;
      setSliderValue(newSliderValues);

      const newInputValues = [...inputValues];
      newInputValues[index] = clampedValue.toString();
      setInputValues(newInputValues);
    },
    [sliderValue, inputValues, minValue, maxValue],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const newValue = e.target.value;
      if (newValue === "" || /^-?\d*\.?\d*$/.test(newValue)) {
        const newInputValues = [...inputValues];
        newInputValues[index] = newValue;
        setInputValues(newInputValues);
      }
    },
    [inputValues],
  );

  const handleSliderChange = useCallback((newValue: number[]) => {
    setSliderValue(newValue);
    setInputValues(newValue.map((v) => v.toString()));
  }, []);

  const resetToDefault = useCallback(() => {
    setSliderValue(defaultValue);
    setInputValues(defaultValue.map((v) => v.toString()));
  }, [defaultValue]);

  return {
    sliderValue,
    inputValues,
    validateAndUpdateValue,
    handleInputChange,
    handleSliderChange,
    resetToDefault,
    showReset,
    displays,
  };
}

