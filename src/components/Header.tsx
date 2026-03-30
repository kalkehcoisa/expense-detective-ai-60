import { Search } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
            <Search className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-display font-bold tracking-tight">
            Expense <span className="text-gradient">Detective</span>
          </h1>
        </div>
        <span className="text-sm text-muted-foreground font-medium hidden sm:block">AI Financial Insights</span>
      </div>
    </header>
  );
}
