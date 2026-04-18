import { getHeroImageUrl } from "@/lib/site";

/**
 * Fixed warehouse photography with a light mist overlay. Photo is slightly
 * de-saturated and brightened so the background reads calmer behind panels.
 */
export function HeroBackdrop() {
  const heroUrl = getHeroImageUrl();

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 -z-20 bg-sky-100 bg-cover bg-center bg-fixed brightness-[1.12] contrast-[0.85] saturate-[0.52]"
        style={{ backgroundImage: `url('${heroUrl}')` }}
        role="presentation"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-white/90 via-sky-50/78 to-blue-50/92"
        aria-hidden
      />
    </>
  );
}
