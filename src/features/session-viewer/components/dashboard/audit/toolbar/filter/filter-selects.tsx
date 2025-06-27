"use client";

import { MultiSelect, type MultiSelectPropsOption } from "@/components/ui/multi-select";
import { useSessionAndAuditParams } from "@/features/session-viewer/hooks/audit/use-audit-path-params";
import { useFeatureFilter } from "@/features/session-viewer/hooks/filters/use-filter-query-params";
import { extractUnit } from "@/lib/audit-utils";
import { INTERNAL__defaultTrpcClientSideParameters } from "@/lib/trpc";
import { api } from "@/trpc/react";
import { useMemo } from "react";

export function UnitFilterSelect({ className }: { className?: string }) {
  const { set, value } = useFeatureFilter('segment');
  const params = useSessionAndAuditParams();
  const { data } = api.session.geojson.useQuery({ session: params.session }, INTERNAL__defaultTrpcClientSideParameters)

  const units = useMemo(() => {
    if (!data?.geojson) {
      return;
    }

    const features = data.geojson.features
    if (!features || features.length <= 0) {
      return;
    }

    const uniqueUnits: MultiSelectPropsOption[] = []

    for (const f of features) {
      const extracted = extractUnit(f.properties.id);
      if (extracted && !uniqueUnits.find(u => u.value === extracted)) {
        uniqueUnits.push({
          label: extracted,
          value: extracted,
        })
      }
    }

    return uniqueUnits
  }, [data?.geojson])

  return (
    <MultiSelect
      className={className}
      title="Unit"
      selectedOptions={value}
      onSelectionChanged={(value) => set(value)}
      options={units ?? []}
    />
  );
}

export function TypeFilterSelect({ className }: { className?: string }) {
  const { set, value } = useFeatureFilter('type');

  return (
    <MultiSelect
      className={className}
      title="Type"
      selectedOptions={value}
      onSelectionChanged={(value) => set(value)}
      options={[
        {
          label: "Segment",
          value: "segment",
        },
        {
          label: "Sign",
          value: "sign",
        },
      ]}
    />
  );
}

