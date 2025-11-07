import { Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-border/40 sticky top-0 bg-background/95 backdrop-blur z-10">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tighter text-foreground">
            JSONify
          </h1>
        </div>
        <p className="text-sm text-muted-foreground hidden md:block">
          The ultimate JSON toolkit for developers.
        </p>
      </div>
    </header>
  );
}
