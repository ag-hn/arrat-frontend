"use client";

import { siteConfig } from "@/config/site";
import { BotIcon } from "lucide-react";
import { IconWrapper } from "../primitives/icon-wrapper";

export function ApplicationLogo() {
  return (
    <div className="flex items-center gap-3">
      <IconWrapper
        variant="primary"
        aria-hidden
        size="sm"
        className="dark:inset-shadow-2xs relative flex items-center justify-center border-background bg-gradient-to-b from-blue-500 to-foreground ring-1 ring-black/10 dark:from-blue-700 dark:ring-white/10"
      >
        <div className="absolute inset-x-0 inset-y-1.5 border-y border-dotted border-white/25"></div>
        <div className="absolute inset-x-1.5 inset-y-0 border-x border-dotted border-white/25"></div>
        <BotIcon className="size-4 text-white drop-shadow" />
      </IconWrapper>

      <div className="grid">
        <span className="block truncate text-sm font-semibold text-foreground">
          ARRAT
        </span>
        <span className="block truncate text-xs text-muted-foreground">
          {siteConfig.description}
        </span>
      </div>
    </div>
  );
}
