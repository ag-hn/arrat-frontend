import { LayoutPage } from "@/components/layout/layout.page";
import { LayoutSection } from "@/components/layout/layout.section";
import { WorkflowCreateSessionLoading } from "@/features/session-manager/components/workflow.create-session-loading";

export default async function LoadingPage() {
  return (
    <LayoutPage>
      <LayoutSection
        title="Create New Session"
      >
        <WorkflowCreateSessionLoading />
      </LayoutSection>
    </LayoutPage>
  );
}
