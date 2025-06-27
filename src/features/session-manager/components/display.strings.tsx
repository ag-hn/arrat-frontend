import { cn } from "@/lib/utils"
import { type ComponentWithDefaultProps } from "@/types/utils"
import { Text } from "@/components/typeography/text"
import { type ReactNode } from "react"

export interface DisplayStringsProps extends ComponentWithDefaultProps<HTMLDivElement> {
    value: string | string[] | undefined,
    limit?: number,
}

export function DisplayStrings({
    value,
    limit = 3,
    children,
    className,
    ref,
}: DisplayStringsProps) {

    return (
        <div
            ref={ref}
            className={cn("flex-1 flex flex-row items-baseline", className)}
        >
            {children}

            {value === undefined ? (
                <INTERNAL__ParagraphWrapper className="text-muted-foreground">{"-"}</INTERNAL__ParagraphWrapper>
            ) : typeof value === "string" ? (
                <INTERNAL__ParagraphWrapper>{value}</INTERNAL__ParagraphWrapper>
            ) : value.length === 1 ? (
                <INTERNAL__ParagraphWrapper>{value}</INTERNAL__ParagraphWrapper>
            ) : value.length <= limit ? (
                <INTERNAL__ParagraphWrapper>{value.join(", ")}</INTERNAL__ParagraphWrapper>
            ) : value.length > limit ? (
                <>
                    <INTERNAL__ParagraphWrapper>{`${value[0]}`}</INTERNAL__ParagraphWrapper>
                    <INTERNAL__ParagraphWrapper className="px-0 text-muted-foreground text-[0.65rem]">{" "}and {value.length-1} more</INTERNAL__ParagraphWrapper>
                </>
            ) : (
                <INTERNAL__ParagraphWrapper>{value}</INTERNAL__ParagraphWrapper>
            )}
        </div>
    )
}

function INTERNAL__ParagraphWrapper({
    children = "",
    className
}: {
    children?: ReactNode,
    className?: string,
}) {
    return (
        <Text
            variant={"p"}
            affects={"small"}
            override={'removeMarginsAndLeading'}
            className={cn("px-1 font-normal line-clamp-1 text-start break-all", className)}
        >
            {children}
        </Text>
    )
}