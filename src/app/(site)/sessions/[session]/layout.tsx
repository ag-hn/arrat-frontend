"use client"
import { FeatureCurrentlySelectedHoverCard } from "@/features/session-viewer/components/dashboard/audit/feature/feature.currently-selected-hover-card";
import { StatisticsSummary } from "@/features/session-viewer/components/dashboard/audit/statistics/statistics.summary";
import LoadingCircle from "@/components/icons/loading.circle";
import { Text } from "@/components/typeography/text";
import { useIsValidSession } from "@/features/session-viewer/hooks/frames/use-is-valid-session";
import { DynamicLayout } from "./dynamic-layout";
import { EnforceScrollPostion } from "./enforce-scroll-position";
import { Prefetch } from "./prefetch";

export const dynamic = "force-dynamic"

export default function DashboardLayout({
  map,
  sidebar,
  content,
  modal,
}: {
  map: React.ReactNode;
  sidebar: React.ReactNode;
  content: React.ReactNode;
  modal: React.ReactNode;
}) {
  const { isValid, isLoading, errors, session } = useIsValidSession()
  if (isLoading) {
    return (
      <div className="container grid place-items-center px-4 py-8 h-full content-center justify-center">
        <LoadingCircle className='size-8' />
      </div>
    )
  }

  if (errors.length >= 1) {
    return (
      <div className="container grid place-items-center px-4 py-8 h-full content-center justify-center text-center">
        <Text variant={"h2"}>Error occurred while retrieving session information. Refresh and try again.</Text>
        <Text variant={"p"} affects={"lead"}>If the error continues to happen, contact your support team.</Text>
        {errors && errors.map((error) => {
          return (
            <Text key={error.message} variant={"p"} affects={"subtle"} tint="destructive">{error.message}</Text>
          )
        })}
      </div>
    )
  }

  if (!isValid) {
    return (
      <div className="container grid place-items-center px-4 py-8 h-full content-center justify-center text-center">
        <Text variant={"h2"}>{session ? <>Session <b>{session}</b></> : <>The selected session</>} is not valid. Ensure all remote session files are present and formatted correctly then try again.</Text>
        <Text variant={"p"} affects={"lead"}>If the error continues to happen, contact your support team.</Text>
      </div>
    )
  }

  return (
    <>
      <Prefetch />

      <EnforceScrollPostion />

      {modal}

      <div className="container flex flex-grow flex-col items-start justify-start gap-3 md:gap-4 p-0 px-4 mt-4">
        <StatisticsSummary />

        <DynamicLayout>
          {{
            map: (
              map
            ),
            sidebar: sidebar ? sidebar : undefined,
            content: content ? content : undefined,
            hover: <FeatureCurrentlySelectedHoverCard />
          }}
        </DynamicLayout>
      </div>
    </>
  );
}
