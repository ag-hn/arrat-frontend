"use client";
import { StateEmpty, StateEmptyContent, StateEmptyDescription, StateEmptyTitle } from "@/components/blocks/state.empty";
import LoadingCircle from "@/components/icons/loading.circle";
import { buttonVariants } from "@/components/primitives/button.variants";
import { IconWrapper } from "@/components/primitives/icon-wrapper";
import { useSessionAndAuditRouter } from "@/features/session-viewer/hooks/use-session-and-audit-router";
import { useSessionList } from "@/features/session-viewer/hooks/viewer/use-session-list";
import { cn } from "@/lib/utils";
import { BadgePlusIcon, Link, ScanSearchIcon } from "lucide-react";
import { useEffect } from "react";

export function ForceSessionRedirect() {
  const router = useSessionAndAuditRouter();
  const { data, error } = useSessionList();

  useEffect(() => {
    const potentialSession = data?.[0];
    if (!potentialSession || !router) {
      return;
    }

    const id = setTimeout(() => {
      router.setSession(potentialSession.session);
    }, 250);

    return () => {
      clearTimeout(id);
    };
  }, [data, router]);

  if (error) {
    return (
      <StateEmpty
        title={<StateEmptyTitle>Unable to locate sessions</StateEmptyTitle>}
      >
        <StateEmptyContent>{error.message}</StateEmptyContent>
      </StateEmpty>
    );
  }

  if (Array.isArray(data) && data.length === 0) {
    return (
      <StateEmpty
        className="max-w-2xl"
        title={
          <StateEmptyTitle className="text-2xl">
            No visible sessions yet
          </StateEmptyTitle>
        }
        description={
          <StateEmptyDescription className="text-center">
            Let&apos;s get started by generating your first session or by updating an
            existing session&apos;s visibility. All visible sessions will show up here.
          </StateEmptyDescription>
        }
        icon={null}
      >
        <StateEmptyContent className="mt-4 gap-4 items-stretch justify-center text-muted-foreground">
          <div className="flex w-full flex-col items-center justify-center gap-2 fade-in text-center">
            <IconWrapper variant={"teal"} className="w-fit rounded-full p-4">
              <BadgePlusIcon />
            </IconWrapper>

            <span className="font-light">
              Generate a session and start another analysis.
            </span>

            <Link
              href={"/session-manager/create"}
              className={cn(
                buttonVariants({
                  variant: "primary",
                  size: "md",
                }),
              )}
            >
              Create a session
            </Link>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-2 fade-in text-center">
            <IconWrapper variant={"violet"} className="w-fit rounded-full p-4">
              <ScanSearchIcon />
            </IconWrapper>

            <span className="flex-1 font-light">
              Find the sessions you are looking for.
            </span>

            <Link
              href={"/session-manager"}
              className={cn(
                buttonVariants({
                  variant: "primary",
                  size: "md",
                }),
              )}
            >
              Explore sessions
            </Link>
          </div>
        </StateEmptyContent>
      </StateEmpty>
    );
  }

  return <LoadingCircle className="size-8" />;
}
