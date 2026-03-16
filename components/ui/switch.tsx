"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default" | "lg"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "bg-background peer group/switch inline-flex shrink-0 items-center rounded-full border-4 shadow-xs transition-all disabled:opacity-50 w-16 h-8 data-[state=checked]:border-blue-500 data-[state=unchecked]:border-slate-600 dark:data-[state=unchecked]:bg-input/80",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full ring-0 transition-transform h-8 w-8 data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-slate-600"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
