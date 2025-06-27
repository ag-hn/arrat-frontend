"use client";
import { LayoutSection } from "@/components/layout/layout.section";
import type { convertSearchParamsToFilters } from "@/features/session-manager/components/data-table.search-params";
import { TableSessions } from "@/features/session-manager/components/table.sessions";
import { INTERNAL__defaultTrpcClientSideParameters } from "@/lib/trpc";
import { api } from "@/trpc/react";
import { Loading } from "@/features/session-manager/components/table.sessions-loading";
import { StateEmpty, StateEmptyContent } from "@/components/blocks/state.empty";

export function SessionManagerContentClient({
  filters,
}: {
  filters: ReturnType<typeof convertSearchParamsToFilters>;
}) {
  const { data, isLoading, error } = api.manager.sessionList.useQuery(
    undefined,
    INTERNAL__defaultTrpcClientSideParameters,
  );

  if (error) {
    return (
      <LayoutSection
        title={<span className="text-muted-foreground">Sessions...</span>}
      >
        <StateEmpty
          title="Error"
          description="An error occurred while fetching the sessions"
          className="h-full"
        >
          <StateEmptyContent>
              {error.message}
          </StateEmptyContent>
        </StateEmpty>
      </LayoutSection>
    );
  }

  if (!data || isLoading) {
    return (
      <LayoutSection
        title={<span className="text-muted-foreground">Sessions...</span>}
      >
        <Loading />
      </LayoutSection>
    );
  }

  return (
    <LayoutSection title={`Sessions (${data.length})`}>
      <TableSessions
        data={data}
        defaultColumnFilters={filters.defaultColumnFilters}
        defaultGlobalFilter={filters.defaultGlobalFilter}
      />
    </LayoutSection>
  );
}
