import { Link } from "react-router-dom";

import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getContactEmail, getHeroImageUrl } from "@/lib/site";

export function PartsPlaceholderPage() {
  const heroUrl = getHeroImageUrl();
  const owner = getContactEmail();

  return (
    <div className="relative min-h-screen text-foreground">
      <div
        className="pointer-events-none fixed inset-0 -z-20 bg-zinc-950 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('${heroUrl}')` }}
        role="presentation"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-black/80 via-black/65 to-black/90"
        aria-hidden
      />

      <SiteHeader />

      <main className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-16 sm:px-6 sm:py-24">
        <Card className="border-white/15 bg-black/45 text-card-foreground shadow-none backdrop-blur-md">
          <CardHeader>
            <CardTitle className="font-display text-2xl tracking-tight text-white">
              Parts catalog coming soon
            </CardTitle>
            <CardDescription className="text-zinc-300">
              We are actively inventorying and verifying millions of aviation
              parts. The searchable storefront will open in a separate
              experience once data quality and imagery meet our bar.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-zinc-200">
              Need something now? Email the owner directly with part numbers,
              quantities, and any certification requirements. We will respond
              as listings go live.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <a
                  href={`mailto:${owner}?subject=${encodeURIComponent("Parts inquiry — AeroVault")}`}
                >
                  Email {owner}
                </a>
              </Button>
              <Button asChild variant="outline" className="border-white/25">
                <Link to="/">Back to overview</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
