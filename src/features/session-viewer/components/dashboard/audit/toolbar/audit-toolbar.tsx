import { AuditFilter } from "./filter/audit-filter";

export function AuditToolbar() {
  return (
    <div className="container flex flex-col-reverse justify-between p-0 gap-2 relative border-b px-3.5 py-2.5 text-card-foreground">
      <AuditFilter />
    </div>
  );
}
