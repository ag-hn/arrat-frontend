import { cn } from "@/lib/utils";
import { type ComponentWithDefaultProps } from "@/types/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/primitives/card";

export function LayoutSection({
    children,
    className,
    ref,
    title,
    description,
    footer,
}: ComponentWithDefaultProps<HTMLElement> & {
    title?: React.ReactNode;
    description?: React.ReactNode;
    footer?: React.ReactNode;
}) {
    return (
        <section
            ref={ref}
        >
            <Card>
                <CardHeader>
                    {title && (
                        <CardTitle>
                            {title}
                        </CardTitle>
                    )}
                    {description && (
                        <CardDescription>
                            {description}
                        </CardDescription>
                    )}
                </CardHeader>

                <CardContent className={cn("flex flex-col gap-4", className)}>
                    {children}
                </CardContent>

                {footer && (
                    <CardFooter>
                        {footer}
                    </CardFooter>
                )}
            </Card>
        </section>
    )
}
