import { Link, NavLink } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "text-sm font-medium transition-colors hover:text-primary",
    isActive ? "text-primary" : "text-muted-foreground",
  );

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-sky-200/65 bg-white/55 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className="font-display text-sm font-semibold tracking-tight text-slate-900"
        >
          AeroVault Supply
        </Link>
        <nav className="hidden items-center gap-6 sm:flex" aria-label="Main">
          <NavLink to="/" className={navClass} end>
            Home
          </NavLink>
          <NavLink to="/parts" className={navClass}>
            Parts catalog
          </NavLink>
          <a href={`${import.meta.env.BASE_URL}#contact`} className={navClass({ isActive: false })}>
            Contact
          </a>
        </nav>
        <Button asChild size="sm" className="sm:hidden">
          <Link to="/parts">Catalog</Link>
        </Button>
      </div>
    </header>
  );
}
