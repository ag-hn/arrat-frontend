import { CircleAlert } from "lucide-react";
import { type ComponentWithDefaultProps } from "@/types/utils";
import { cn } from "@/lib/utils";

export function StateEmpty({
    className,
    ref,
    children,
    icon = <StateEmptyIcon />,
    title = <StateEmptyTitle />,
    description = <StateEmptyDescription />,
    footer,
}: ComponentWithDefaultProps<HTMLDivElement, {
    icon?: React.ReactNode,
    title?: React.ReactNode,
    description?: React.ReactNode,
    footer?: React.ReactNode,
}>) {
    return (
        <div
            ref={ref}
            className={cn(
                "w-full fade-in grid justify-center items-start gap-2",
                className,
            )}
        >
            <span className="w-full grid place-items-center">
                {icon}
            </span>

            <span className="grid place-items-center">
                {title}
                {description}
            </span>

            {children}

            {footer}
        </div>
    )
}

export function StateEmptyTitle({
    className,
    ref,
    children = "No results found",
}: ComponentWithDefaultProps<HTMLDivElement, {
    children?: React.ReactNode,
}>) {
    return (
        <h3 className={cn(
            "font-semibold leading-none tracking-tight",
            className,
        )} ref={ref}>
            {children}
        </h3>
    )
}

export function StateEmptyDescription({
    className,
    ref,
    children = "Collection of related information is shown here.",
}: ComponentWithDefaultProps<HTMLDivElement, {
    children?: React.ReactNode,
}>) {
    return (
        <p className={cn(
            "text-sm text-muted-foreground",
            className,
        )} ref={ref}>
            {children}
        </p>
    )
}

export function StateEmptyContent({
    className,
    ref,
    children = <i className="max-w-lg">You currently have no results to display. Update your filters to view different results.</i>,
}: ComponentWithDefaultProps<HTMLDivElement, {
    children?: React.ReactNode,
}>) {
    return (
        <div className={cn(
            "flex items-start px-3 pt-0",
            className,
        )} ref={ref}>
            {children}
        </div>
    )
}

export function StateEmptyFooter({
    className,
    ref,
    children = (<>
        If this message persists, contact your{" "}
        <a className="underline hover:no-underline" href="#">
            System Administrator
        </a>
        .
    </>
    ),
}: ComponentWithDefaultProps<HTMLDivElement, {
    children?: React.ReactNode,
}>) {
    return (
        <div className={cn(
            "flex items-start px-3 pt-0",
            className,
        )} ref={ref}>
            <p className="text-xs text-muted-foreground">
                {children}
            </p>
        </div>
    )
}

export function StateEmptyIcon({
    className,
    ref,
    children = <CircleAlert className="opacity-80" size={16} strokeWidth={2} />,
}: ComponentWithDefaultProps<HTMLDivElement>) {
    return (
        <div
            ref={ref}
            className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-full border border-border",
                className,
            )}
            aria-hidden="true"
        >
            {children}
        </div>
    )
}