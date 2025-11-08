"use client";

import * as React from "react"
import { Sidebar } from "@/components/ui/sidebar"

const AppLayoutSidebar = React.forwardRef<
  React.ElementRef<typeof Sidebar>,
  React.ComponentProps<typeof Sidebar>
>(({ className, side = "left", ...props }, ref) => {
  return (
    <Sidebar
      ref={ref}
      data-layout="sidebar"
      side={side}
      className={className}
      {...props}
    />
  )
})
AppLayoutSidebar.displayName = "AppLayoutSidebar"

export { AppLayoutSidebar };
