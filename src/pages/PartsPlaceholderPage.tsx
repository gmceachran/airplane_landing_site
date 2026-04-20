import { Link } from "react-router-dom";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getContactEmail, getPartsInquiryMailto } from "@/lib/site";

export function PartsPlaceholderPage() {
  const owner = getContactEmail();
  const inquiryMailto = getPartsInquiryMailto();

  return (
    <div className="relative min-h-screen text-foreground">
      <HeroBackdrop />

      <SiteHeader />

      <main className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-16 sm:px-6 sm:py-24">
        <Card className="border-sky-200/70 bg-white/60 text-card-foreground shadow-sm shadow-sky-950/5 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="font-display text-2xl tracking-tight text-slate-900">
              Parts catalog coming soon
            </CardTitle>
            <CardDescription className="text-slate-600">
              We are actively inventorying and verifying thousands of aviation
              parts. The searchable storefront will open in a separate
              experience once data quality and imagery meet our bar.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-slate-700">
              Need something now? Email a parts list directly — attach a CSV,
              XLSX, or PDF, or edit the prefilled table in the draft. We will
              respond as listings go live.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <a href={inquiryMailto}>Email parts list to {owner}</a>
              </Button>
              <Button asChild variant="outline" className="border-sky-300">
                <Link to="/">Back to overview</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
