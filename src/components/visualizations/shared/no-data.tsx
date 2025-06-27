import React from "react";
import { Text } from "@/components/typeography/text";
import { cn } from "@/lib/utils";

interface NoDataProps {
  noDataText?: string;
  className?: string;
}
const NoData = ({ className, noDataText = "No data" }: NoDataProps) => {
  return (
    <div
      className={cn("w-full h-full border border-dashed rounded items-center justify-center border-border", className)}
    >
      <Text>
        {noDataText}
      </Text>
    </div>
  );
};

export default NoData;
