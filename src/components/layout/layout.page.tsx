import { cn } from "@/lib/utils";
import { type ComponentWithDefaultProps } from "@/types/utils";

export function LayoutPage({
    children,
    className,
    ref,
}: ComponentWithDefaultProps<HTMLElement> & {
    ref?: React.RefObject<HTMLElement>
}) {
    return (
        <main
            ref={ref}
            className={cn("container flex flex-grow flex-col items-stretch justify-start gap-3 md:gap-4 p-0 px-4 mt-4", className)}>
            {children}
        </main>
    )
}