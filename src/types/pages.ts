import type { ServerComponentParams } from "./utility";

export type AuditPageRouteProps = ServerComponentParams<{ 
    session: string, 
    /** Segment Id */
    id: string 
}>;
export type AuditPageRouteParams = AuditPageRouteProps["params"];
