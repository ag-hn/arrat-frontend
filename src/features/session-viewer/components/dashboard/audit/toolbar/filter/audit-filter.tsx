import { FilterReset } from "./filter-reset";
import {
  UnitFilterSelect,
  TypeFilterSelect,
} from "./filter-selects";
import { AuditDownload } from "./audit-download";
import { Separator } from "@/components/ui/separator";
import { LanelineScoreFilterSelect, SignScoreFilterSelect } from "./filter-scores-selects";

export function AuditFilter() {
  return (
    <div className="flex items-center gap-2">
      <AuditDownload />

      <Separator orientation="vertical" className="mx-0 h-4 hidden sm:block" />

      <div className="flex items-center gap-2 overflow-x-auto">
        <TypeFilterSelect className="w-full" />
        <UnitFilterSelect className="w-full" />

        <LanelineScoreFilterSelect className="w-full" />
        <SignScoreFilterSelect className="w-full" />
      </div>

      <FilterReset />
    </div>
  );
}
