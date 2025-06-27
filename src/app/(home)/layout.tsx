import { ApplicationShell } from "@/components/layout/application.shell";
import { ApplicationHeader } from "@/components/layout/application.header";
import { ApplicationFooter } from "@/components/layout/application.footer";

export default function HomeLayout({
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
          <ApplicationHeader />
        ),
        footer: (
          <ApplicationFooter />
        ),
      }}
    </ApplicationShell>
  );
}


