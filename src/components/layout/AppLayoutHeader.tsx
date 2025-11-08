"use client";

import * as React from "react"

const AppLayoutHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={className}
      data-layout="header"
      {...props}
    />
  )
})
AppLayoutHeader.displayName = "AppLayoutHeader"

export { AppLayoutHeader };
