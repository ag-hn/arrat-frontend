import { TRPCReactProvider } from "@/trpc/react";
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { type ReactNode } from "react";
import { ViewTransitions } from "./next-view-transitions";
import { ProviderNextThemes } from "./provider.next-themes";
import { RechartsErrorSuppression } from "./recharts-error-suppression";
import { Toaster } from './ui/toaster';
import { TooltipProvider } from './ui/tooltip';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ProviderNextThemes
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <RechartsErrorSuppression />

      <ViewTransitions>
        <TRPCReactProvider>
          <TooltipProvider>
            <NuqsAdapter>
              {children}
            </NuqsAdapter>
          </TooltipProvider>
        </TRPCReactProvider>
      </ViewTransitions>

      <Toaster />
    </ProviderNextThemes>
  )
}
