"use client";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";

import { Icons } from "@/components/icons/icons";
import { Button } from "@/components/primitives/button";
import { Card } from "@/components/primitives/card";
import { Text } from "@/components/typeography/text";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useSessionAndAuditParams } from "@/features/session-viewer/hooks/audit/use-audit-path-params";
import { generateAuditPath } from "@/features/session-viewer/hooks/use-session-and-audit-router.helpers";
import { useSelectedFeatureAndFilteredGeojson } from "@/features/session-viewer/hooks/viewer/use-selected-feature-and-filtered-geojson";
import { useSessionBins } from "@/features/session-viewer/hooks/viewer/use-session-bins";
import { isAppSignFeatureV1, isAppSignFeatureV2, scoreToSeverity, segmentFeatureToSeverity } from "@/lib/audit-utils";
import { stringToTitleCaseAndSpacingFormatter } from "@/lib/formatters/string-value-formatter";
import { cn } from "@/lib/utils";
import { type AppFeatureOption, type AppSegmentFeature, type AppSignFeature } from "@/server/zod/schema.audit";
import { type AppSessionsBin } from "@/server/zod/session.bins";
import { type AuditSeverity } from "@/types/map/feature";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { type ComponentProps, type PropsWithChildren } from "react";
import { AuditSelectBackground } from "./audit-select-background";

export function AuditSelect() {
  const { isLoading, error, selected, geojson } = useSelectedFeatureAndFilteredGeojson()
  const bins = useSessionBins()

  const [carousalApi, setCarousalApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (!carousalApi || !selected) {
      return;
    }

    carousalApi.scrollTo(selected.index);
  }, [selected, carousalApi]);

  if (error) {
    return <>Error...</>;
  }

  if (isLoading) {
    return (
      <INTERNAL__LoadingState />
    );
  }

  const allSlides = geojson?.features.length;

  return (
    <div className="b-0 container mb-3 justify-center self-end md:mx-4">
      <Carousel
        setApi={setCarousalApi}
        className="container max-w-[80%] md:max-w-[90%]"
        opts={{ dragFree: true, dragThreshold: 2 }}
      >
        <CarouselContent className="ml-0 gap-3">
          {geojson?.features.map((i) => {
            const key = i.properties.id;
            const fullyVisible = selected
              ? selected.feature.properties.id === key
              : true;

            const { className: badgeClassName, ...rest } = _getFeatureStyle(i, bins);
            return (
              <CarouselItem
                key={key}
                className={cn(
                  "relative pl-1 basis-10/12 sm:basis-1/3 md:basis-1/4",
                  fullyVisible ? "opacity-100" : "opacity-35",
                )}
              >
                <SelectLink
                  audit={i}
                >
                  <div className={"p-1"}>
                    <Card className="p-0">
                      <div className="aspect-video p-4 grid justify-center items-end ">
                        <div className="z-10 text-center">
                          <Text tint={"inverted"} variant={"label"}>
                            {stringToTitleCaseAndSpacingFormatter(key)}
                          </Text>
                        </div>
                      </div>

                      <AuditSelectBackground feature={i} />
                    </Card>
                  </div>
                  <Badge
                    {...rest}
                    className={cn(
                      "absolute right-0 top-0 aspect-square rounded-full bg-opacity-100 opacity-100",
                      badgeClassName,
                    )}
                  />
                </SelectLink>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <SelectLink
          audit={selected?.prev}
          prefetch
        >
          <SelectPreviousButton
            canScrollOverride={!selected?.prev}
          />
        </SelectLink>
        <SelectLink
          audit={selected?.next}
          prefetch
        >
          <SelectNextButton
            canScrollOverride={!selected?.next}
          />
        </SelectLink>
      </Carousel>

      <div className="text-sm text-muted-foreground text-right pt-6">Showing {allSlides} total.</div>
    </div>
  );
}

function SelectLink({ children, audit, ...rest }: PropsWithChildren<{ audit?: AppFeatureOption } & Omit<ComponentProps<typeof Link>, "href">>) {
  const searchParams = useSearchParams();
  const key = useSessionAndAuditParams();
  if (!audit) {
    return children
  }

  return (
    <Link
      href={{
        pathname: generateAuditPath(key.session, audit.properties.id),
        query: searchParams.toString()
      }}
      scroll={false}
      {...rest}
    >
      {children}
    </Link>
  )
}

const SelectPreviousButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & {
    canScrollOverride?: boolean
  }
>(({ className, variant = "outline", size = "icon", canScrollOverride, ...props }, ref) => {
  const { orientation, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={typeof canScrollOverride === 'undefined' ? !canScrollPrev : canScrollOverride}
      {...props}
    >
      <Icons.actions.previous className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
SelectPreviousButton.displayName = 'SelectPreviousButton'

const SelectNextButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & {
    canScrollOverride?: boolean
  }
>(({ className, variant = "outline", size = "icon", canScrollOverride, ...props }, ref) => {
  const { orientation, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      disabled={typeof canScrollOverride === 'undefined' ? !canScrollNext : canScrollOverride}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      {...props}
    >
      <Icons.actions.next className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
SelectNextButton.displayName = 'SelectNextButton'

const severityMap: Record<AuditSeverity, BadgeProps> = {
  "level low": {
    variant: "red",
  },
  "level medium": {
    variant: "amber",
  },
  "level high": {
    variant: "emerald",
  },
};

function _getFeatureStyle(feature: AppSegmentFeature | AppSignFeature | undefined, bin: AppSessionsBin): BadgeProps {
  if (!feature) {
    return {};
  }

  const severity = isAppSignFeatureV2(feature)
    ? scoreToSeverity(feature.properties.overall_score, bin)
    : isAppSignFeatureV1(feature)
      ? scoreToSeverity(feature.properties.score, bin)
      : segmentFeatureToSeverity(feature, bin);

  return severityMap[severity];
}

function INTERNAL__LoadingState() {
  return (
    <div className="b-0 container mb-3 justify-center self-end md:mx-4">
      <Carousel
        className="container max-w-[80%] md:max-w-[90%]"
        opts={{ dragFree: true, dragThreshold: 2 }}
      >
        <CarouselContent className="-ml-1 gap-3">
          <CarouselItem
            className={cn(
              "relative pl-1 basis-10/12 sm:basis-1/3 md:basis-1/4",
              "opacity-35",
            )}
          >
            <Skeleton className="aspect-video w-[200px] h-[100px]" />
          </CarouselItem>
          <CarouselItem
            className={cn(
              "relative pl-1 basis-10/12 sm:basis-1/3 md:basis-1/4",
              "opacity-35",
            )}
          >
            <Skeleton className="aspect-video w-[200px] h-[100px]" />
          </CarouselItem>
          <CarouselItem
            className={cn(
              "relative pl-1 basis-10/12 sm:basis-1/3 md:basis-1/4",
              "opacity-35",
            )}
          >
            <Skeleton className="aspect-video w-[200px] h-[100px]" />
          </CarouselItem>
          <CarouselItem
            className={cn(
              "relative pl-1 basis-10/12 sm:basis-1/3 md:basis-1/4",
              "opacity-35",
            )}
          >
            <Skeleton className="aspect-video w-[200px] h-[100px]" />
          </CarouselItem>
          <CarouselItem
            className={cn(
              "relative pl-1 basis-10/12 sm:basis-1/3 md:basis-1/4",
              "opacity-35",
            )}
          >
            <Skeleton className="aspect-video w-[200px] h-[100px]" />
          </CarouselItem>
        </CarouselContent>

        <SelectPreviousButton
          canScrollOverride={false}
        />
        <SelectNextButton
          canScrollOverride={false}
        />
      </Carousel>
    </div>

  )
}
