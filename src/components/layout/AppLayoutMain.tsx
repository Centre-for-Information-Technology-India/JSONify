"use client";

import * as React from "react"
import { SidebarInset } from "@/components/ui/sidebar"

const AppLayoutMain = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ ...props }, ref) => {
  return (
    <SidebarInset
      ref={ref}
      data-layout="main"
      {...props}
    />
  )
})
AppLayoutMain.displayName = "AppLayoutMain"

export { AppLayoutMain };
