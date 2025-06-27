"use client";

import { Check, ChevronsUpDown, EyeOffIcon, SparkleIcon } from "lucide-react";
import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import LoadingCircle from "../../../../components/icons/loading.circle";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import { INTERNAL__APPLICATION_PLATFORM_LOADING_AVATAR_TRIGGER } from "./application.platform-client";

function INTERNAL__extractFallbackLetter(name: string | undefined) {
  if (!name || name.length < 2) {
    return "??";
  }

  const split = name.split(" ");
  if (split.length < 2) {
    return (name[0] ?? "") + (name[1] ?? "");
  }

  return (split?.[0]?.[0] ?? "") + (split?.[1]?.[0] ?? "");
}

export type ApplicationPlatformProps = {
  platforms?: string[];
  defaultPlatform?: string;
  selected?: string;
  onSelect?: (e: string) => void;
};
export function ApplicationPlatform({
  platforms: platforms,
  selected,
  defaultPlatform: defaultPlatform,
  onSelect,
}: ApplicationPlatformProps) {
  const [internalState, setSelectedPlatform] = React.useState(defaultPlatform);
  const selectedPlatform = selected ?? internalState;

  if (!platforms || platforms.length === 0) {
    return (
      <INTERNAL__ButtonWrapper className="pointer-events-none">
        <INTERNAL__Content
          key={selectedPlatform}
          selected={selectedPlatform}
          platforms={platforms}
        />
      </INTERNAL__ButtonWrapper>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <INTERNAL__ButtonWrapper>
          <INTERNAL__Content
            key={selectedPlatform}
            selected={selectedPlatform}
            platforms={platforms}
          />
        </INTERNAL__ButtonWrapper>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] group-data-[collapsible=icon]:w-fit"
        align="start"
        side="bottom"
      >
        {platforms.map((version) => (
          <DropdownMenuItem
            key={version}
            onSelect={() => {
              setSelectedPlatform(version);
              onSelect?.(version);
            }}
          >
            {version}{" "}
            {version === selectedPlatform && <Check className="ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const INTERNAL__ButtonWrapper = React.forwardRef<
  React.ComponentRef<typeof SidebarMenuButton>,
  React.ComponentPropsWithoutRef<typeof SidebarMenuButton>
>(({ className, children, ...props }, ref) => {
  return (
    <SidebarMenuButton
      ref={ref}
      size="lg"
      variant={"outline"}
      className={cn("max-w-full justify-start md:max-w-96", className)}
      {...props}
    >
      {children}
    </SidebarMenuButton>
  );
});
INTERNAL__ButtonWrapper.displayName = "INTERNAL__ButtonWrapper";

type INTERNAL__ContentProps = { selected: string | undefined } & Pick<
  ApplicationPlatformProps,
  "platforms"
>;
function INTERNAL__Content({
  selected: selectedPlatform,
  platforms,
}: INTERNAL__ContentProps) {
  if (
    selectedPlatform === INTERNAL__APPLICATION_PLATFORM_LOADING_AVATAR_TRIGGER
  ) {
    return (
      <>
        <Avatar className="size-8">
          <AvatarImage src={""} alt={"Loading valid sessions"} />
          <AvatarFallback>
            <LoadingCircle className="size-3" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0.5 leading-none">
          <span className="font-semibold">Selected session</span>
          <span className="">Loading...</span>
        </div>

        {(platforms?.length ?? 0) > 0 ? (
          <ChevronsUpDown className="ml-auto" />
        ) : null}
      </>
    );
  }

  const platformsAreEmptyAndNotSelected = !platforms || (platforms.length === 0 && !selectedPlatform)
  if (platformsAreEmptyAndNotSelected) {
    return (
      <>
        <Avatar className="size-8">
          <AvatarImage src={""} alt={selectedPlatform} />
          <AvatarFallback>
            <SparkleIcon className="size-4 -rotate-45" />
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-0.5 leading-none">
          <span className="font-semibold">Selected session</span>
          <span className="flex gap-x-2">No visible sessions</span>
        </div>
      </>
    );
  }

  const isNotValidPlatform = !platformsAreEmptyAndNotSelected && !platforms?.includes(selectedPlatform ?? '');

  return (
    <>
      <Avatar className="size-8">
        <AvatarImage src={""} alt={selectedPlatform} />
        <AvatarFallback>
          {INTERNAL__extractFallbackLetter(selectedPlatform)}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-0.5 leading-none">
        <span className="font-semibold">Selected session</span>
        <span className="flex gap-x-2">
          {isNotValidPlatform && (
            <EyeOffIcon className="size-3 text-muted-foreground" />
          )}
          {selectedPlatform
            ? selectedPlatform
            : "Road Audit Tool"}
        </span>
      </div>

      {(platforms?.length ?? 0) > 0 ? (
        <ChevronsUpDown className="ml-auto" />
      ) : null}
    </>
  );
}
