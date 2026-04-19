import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
};

/**
 * CSS-only approximation of the Roswell Aerospace Solutions, LLC card lockup:
 * staggered serif RAS, stacked sans name, rule. Jet mark intentionally omitted
 * until we have final art — swap for an SVG export when that lands.
 */
export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <span
      className={cn(
        "inline-flex max-w-[min(100%,20rem)] items-end gap-2.5 sm:gap-3",
        className,
      )}
    >
      <span className="relative h-9 w-[3.1rem] shrink-0 font-serif text-[1.65rem] font-normal leading-none tracking-tight text-primary sm:h-10 sm:w-[3.4rem] sm:text-[1.85rem]">
        <span className="absolute left-0 top-0">R</span>
        <span className="absolute left-[1.05rem] top-[0.4rem] sm:left-[1.15rem] sm:top-[0.45rem]">
          A
        </span>
        <span className="absolute left-[2.15rem] top-[0.95rem] sm:left-[2.3rem] sm:top-[1.05rem]">
          S
        </span>
      </span>

      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="flex min-w-0 flex-col leading-none">
          <span className="font-sans text-[0.5rem] font-bold tracking-[0.14em] text-primary sm:text-[0.55rem]">
            ROSWELL
          </span>
          <span className="font-sans text-[0.5rem] font-bold tracking-[0.14em] text-primary sm:text-[0.55rem]">
            AEROSPACE
          </span>
          <span className="font-sans text-[0.45rem] font-bold tracking-[0.12em] text-primary sm:text-[0.5rem]">
            SOLUTIONS, LLC
          </span>
        </span>
        <span className="h-px w-full bg-primary/90" aria-hidden />
      </span>
    </span>
  );
}
