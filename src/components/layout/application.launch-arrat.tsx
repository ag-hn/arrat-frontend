'use client'
import { useCustomRouter } from "@/hooks/use-custom-router";
import { SCROLL_POSITION_LOCAL_STORAGE_KEY } from "@/hooks/use-enforce-scroll-position";
import { ArrowRight } from "lucide-react";
import { Button, type ButtonProps } from "@/components/primitives/button";

/**
 * React Client Component to clear scroll position before navigating to session viewer
 */
export function ApplicationLaunchArrat({ children, href, ...props }: Omit<ButtonProps, "onClick"> & {
    href: string
}) {
    const router = useCustomRouter()

    return <Button
    iconPlacement="right"
    Icon={ArrowRight}
    onClick={async () => {
        localStorage.setItem(SCROLL_POSITION_LOCAL_STORAGE_KEY, '0')
        router.push(href)
    }}
    {...props}
    >
        {children ??  "Launch ARRAT"}
    </Button>
}