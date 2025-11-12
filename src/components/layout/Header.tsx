"use client";

import { Sparkles, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
  return (
    <header className="border-b border-border/40 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30 z-10 h-14 flex items-center px-4 md:px-6 shrink-0" role="banner">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-primary/10 rounded-lg" aria-hidden="true">
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
      
      <nav className="flex items-center gap-1" aria-label="Header navigation">
        <span className="text-xs text-muted-foreground hidden md:block mr-2" aria-hidden="true">
          Format • Validate • Convert
        </span>
        <Button 
          variant="ghost" 
          size="icon" 
          className="min-h-[44px] min-w-[44px] md:h-9 md:w-9" 
          asChild
        >
          <a 
            href="https://github.com/Centre-for-Information-Technology-India/JSONify" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="View JSONify on GitHub (opens in new tab)"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
          </a>
        </Button>
        <ThemeToggle />
      </nav>
    </header>
  );
}
