"use client"

import * as React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"

type AppLayoutProps = React.ComponentProps<typeof SidebarProvider>
export function AppLayout({ children, ...props }: AppLayoutProps) {
  return (
    <SidebarProvider {...props}>{children}</SidebarProvider>
  )
}
