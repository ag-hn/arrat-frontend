import { ApplicationShell } from "@/components/layout/application.shell";
import { ApplicationHeader } from "@/components/layout/application.header";
import { ApplicationFooter } from "@/components/layout/application.footer";
import { ApplicationPlatformClient } from "@/features/session-viewer/components/layout/application.platform-client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { NavigationLink } from "@/components/layout/navigation.link";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApplicationShell>
      {{
        content: (
          children
        ),
        header: (
          <ApplicationHeader
            sessionItem={(
              <>
                <Breadcrumb className="hidden sm:block min-w-max">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <NavigationLink href={'/'}>
                          Home
                        </NavigationLink>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      Sessions
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </BreadcrumbList>
                </Breadcrumb>

                <ApplicationPlatformClient />
              </>
            )}
          />
        ),
        footer: (
          <ApplicationFooter />
        ),
      }}
    </ApplicationShell>
  );
}

