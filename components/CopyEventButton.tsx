"use client"

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button"
import { VariantProps } from "class-variance-authority";
import { CopyIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner"

interface CopyEventButtonProp extends Omit<React.ComponentProps<"button">, "children" | "onclick">, VariantProps<typeof buttonVariants> {
    eventId: string
    clerkUserId: string
}

export default function CopyEventButton({
    eventId,
    clerkUserId,
    className,
    size,
    variant,
    ...props
}: CopyEventButtonProp) {
    type CopyState = "idle" | "copied" | "error"

    function getCopyLabel(state: CopyState) {
        switch (state) {
            case "copied":
                return "Copied!"
            case "error":
                return "Error"
            case "idle":
            default:
                return "Copy Link"
        }
    }

    const [copyState, setCopystate] = useState<CopyState>("idle")

    const handleCopy = () => {
        const url = `${location.origin}/book/${clerkUserId}/${eventId}`

        navigator.clipboard
            .writeText(url)
            .then(() => {
                setCopystate("copied")
                toast("Link copied successfully", {
                    duration: 3000
                })
                setTimeout(() => setCopystate("idle"), 2000)
            })
            .catch(() => {
                setCopystate("error")
                setTimeout(() => setCopystate("idle"), 2000)
            })
    }

    return (
        <Button onClick={handleCopy}
            className={cn(buttonVariants({ variant, size }), 'cursor-pointer', className)}
            variant={variant}
            size={size}
            {...props}>
            <CopyIcon className="size-4 mr-2" />
            {getCopyLabel(copyState)}
        </Button>
    )
}
