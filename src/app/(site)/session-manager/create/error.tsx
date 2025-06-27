"use client";

import {
  StateEmpty,
  StateEmptyDescription,
  StateEmptyTitle,
} from "@/components/blocks/state.empty";
import { LayoutPage } from "@/components/layout/layout.page";
import { LayoutSection } from "@/components/layout/layout.section";
import { NavigationLink } from "@/components/layout/navigation.link";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <LayoutPage>
      <LayoutSection title="Create New Session">
        <StateEmpty
          title={<StateEmptyTitle>Looks like an error was thrown when trying to gather units.</StateEmptyTitle>}
          description={
            <StateEmptyDescription>{error.message}</StateEmptyDescription>
          }
        >
        <NavigationLink
          variant={"outline"}
          className="text-strong-foreground text-center justify-center align-center"
          href={"/session-manager"}
        >
            Back to manager
        </NavigationLink>

        </StateEmpty>

      </LayoutSection>
    </LayoutPage>
  );
}
