"use client";

import { Sparkles, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="border-b border-border/40 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30 z-10 h-14 flex items-center px-4 md:px-6 shrink-0">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-primary/10 rounded-lg">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg font-bold tracking-tight text-foreground leading-none">
            JSONify
          </h1>
          <p className="text-[10px] text-muted-foreground leading-none mt-0.5">
            Professional JSON Editor
          </p>
        </div>
      </div>
      
      <div className="flex-1" />
      
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground hidden md:block">
          Format • Validate • Convert
        </span>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hidden sm:flex" asChild>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </header>
  );
}
