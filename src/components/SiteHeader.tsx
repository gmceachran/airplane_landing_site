import type { MouseEvent } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "text-sm font-medium transition-colors hover:text-primary",
    isActive ? "text-primary" : "text-muted-foreground",
  );

export function SiteHeader() {
  const location = useLocation();

  /**
   * Router skips navigation when the target pathname matches the current one,
   * so clicking "Home" from "/#contact" leaves the hash in place and the page
   * scrolled to the form. Clear the hash and scroll to top manually.
   */
  function handleHomeClick(e: MouseEvent<HTMLAnchorElement>) {
    if (location.pathname !== "/") return;
    e.preventDefault();
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <header className="sticky top-0 z-20 border-b border-sky-200/65 bg-white/55 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          onClick={handleHomeClick}
          className="flex min-w-0 max-w-[65vw] items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:max-w-none"
        >
          <BrandLogo />
          <span className="sr-only">Roswell Aerospace Solutions</span>
        </Link>
        <nav className="hidden items-center gap-6 sm:flex" aria-label="Main">
          <NavLink to="/" onClick={handleHomeClick} className={navClass} end>
            Home
          </NavLink>
          <NavLink to="/parts" className={navClass}>
            Parts catalog
          </NavLink>
          <a
            href={`${import.meta.env.BASE_URL}#contact`}
            className={navClass({ isActive: false })}
          >
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
