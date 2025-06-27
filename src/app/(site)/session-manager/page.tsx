import { LayoutPage } from "@/components/layout/layout.page";
import { LayoutSection } from "@/components/layout/layout.section";
import { Link } from "@/components/next-view-transitions";
import { Surface } from "@/components/primitives/surface";
import { convertSearchParamsToFilters } from "@/features/session-manager/components/data-table.search-params";
import type { ServerComponentParams } from "@/types/utils";
import { BadgePlusIcon } from "lucide-react";
import { SessionManagerContentClient } from "./content.client";

export const dynamic = "force-dynamic"

export default async function SessionManagerPage({
  ...props
}: ServerComponentParams) {
  const filters = convertSearchParamsToFilters(props.searchParams ?? {});

  return (
    <LayoutPage>
      <LayoutSection
        title="Session Manager"
        description="Create and manage session viewable in the road audit tool."
      >
        <Link href="/session-manager/create">
          <Surface className="flex flex-row items-center gap-2">
            <BadgePlusIcon className="h-4 w-4" />
            <h3>Create New Session</h3>
          </Surface>
        </Link>
      </LayoutSection>

      <SessionManagerContentClient filters={filters} />
    </LayoutPage>
  );
}
