import { ApplicationHeader } from "@/components/layout/application.header";
import { ApplicationShell } from "@/components/layout/application.shell";
import { NavigationLink } from "@/components/layout/navigation.link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

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
                    Session Manager
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            )}
          />
        ),
      }}
    </ApplicationShell>
  );
}

