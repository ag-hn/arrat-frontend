import React from "react";

export interface NoDataProps {
  noDataText?: string;
}
const NoData = ({ noDataText = "No data" }: NoDataProps) => {
  return (
    <div
      className={"w-full h-full border border-dashed rounded place-content-center border-border"}
    >
      <p className="text-xs text-muted-foreground text-center">
        {noDataText}
      </p>
    </div>
  );
};

export default NoData;
