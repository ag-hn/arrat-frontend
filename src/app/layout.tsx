import "@/styles/globals.css";
import "@/styles/leaflet.custom.css";

import { defaultTheme } from "@/config/colors";
import { siteConfig } from "@/config/site";
import { sans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";
import { Prefetch } from "./prefetch";

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  icons: siteConfig.icons,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background min-h-[100svh] antialiased",
          defaultTheme,
          sans.className,
        )}
      >
        <Providers>
          <Prefetch />
          {children}
        </Providers>
      </body>
    </html>
  );
}
