import { LayoutPage } from "@/components/layout/layout.page";
import { LayoutSection } from "@/components/layout/layout.section";
import { convertSearchParamsToFilters } from "@/features/session-manager/components/data-table.search-params";
import { WorkflowCreateSession } from "@/features/session-manager/components/workflow.create-session";
import { api } from "@/trpc/server";
import type { ServerComponentParams } from "@/types/utils";

export const dynamic = "force-dynamic"

export default async function SessionManagerCreatePage(
  {
    ...props
  }: ServerComponentParams
) {
  const data = await api.manager.unitList.query()
  const filters = convertSearchParamsToFilters(props.searchParams ?? {})

  return (
    <LayoutPage>
      <LayoutSection
        title="Create New Session"
      >
        <WorkflowCreateSession
          data={data}
          defaultColumnFilters={filters.defaultColumnFilters}
          defaultGlobalFilter={filters.defaultGlobalFilter}
        />
      </LayoutSection>
    </LayoutPage>
  )
} 

