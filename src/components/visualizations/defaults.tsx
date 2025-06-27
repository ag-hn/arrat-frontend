import { CartesianGrid, Line as RechartsLine } from "recharts";

export class DefaultLine extends RechartsLine {
  static defaultProps = {
    ...RechartsLine.defaultProps,
  }
}

export const DefaultCartesianGrid = <CartesianGrid vertical={false} />

