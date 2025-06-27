import { ThresholdIndicator } from "./threshold-indicator";
import { ThresholdReference } from "./threshold-reference";

/**
 * Type representing a valid recharts x, y, or z axis key.
 * Plays well for rendering ReferenceLine locations, bars and lines,
 * and other graphical elements.
 */
type RechartsKeyInternal = string | number;

export type Thresholds = {
  check: number;
  alerts: RechartsKeyInternal[];
};

export type ThresholdsProps<
  TPayload = Record<string, unknown>,
  TPaylodKey extends keyof TPayload = keyof TPayload,
> = Record<string, unknown> & {
  thresholds?: Thresholds;
  payloadKey: TPaylodKey;
  formattedGraphicalItems: {
    props: {
      key: TPaylodKey;
      points: {
        x: number;
        y: number;
        payload: TPayload;
      }[];
    };
  }[];
};

export function Thresholds({ thresholds, ...rest }: ThresholdsProps) {
  if (!thresholds) {
    return <></>;
  }

  return (
    <>
      <ThresholdReference threshold={thresholds.check} />
      <ThresholdIndicator thresholds={thresholds} {...rest} />
    </>
  );
}
