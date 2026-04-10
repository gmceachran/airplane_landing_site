import { Link } from "react-router-dom";

import { EmailLeadForm } from "@/components/EmailLeadForm";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { getHeroImageUrl } from "@/lib/site";

export function HomePage() {
  const heroUrl = getHeroImageUrl();

  return (
    <div className="relative min-h-screen text-foreground">
      <div
        className="pointer-events-none fixed inset-0 -z-20 bg-zinc-950 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('${heroUrl}')` }}
        role="presentation"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-black/75 via-black/55 to-black/85"
        aria-hidden
      />

      <SiteHeader />

      <main>
        <section className="mx-auto flex max-w-5xl flex-col gap-10 px-4 pb-24 pt-16 sm:px-6 sm:pt-24">
          <div className="max-w-3xl space-y-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-300">
              Aviation parts · Warehouse inventory
            </p>
            <h1 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
              Roughly eight million parts.
              <span className="mt-1 block text-zinc-200">
                One serious opportunity for buyers.
              </span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-zinc-200 sm:text-xl">
              A substantial warehouse inheritance is being organized for sale.
              We are building a searchable catalog while connecting with
              operators, MROs, and resellers who need depth, consistency, and a
              direct line to the owner.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-6">
                <a href="#contact">Join the interest list</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/25 bg-black/20 px-6 text-white backdrop-blur-sm hover:bg-black/35"
              >
                <Link to="/parts">Parts catalog status</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Scale you can plan around",
                body: "Millions of line items suit high-volume programs, rotables, and hard-to-find legacy stock.",
              },
              {
                title: "Direct relationship",
                body: "Work with the owner-led team as inventory is validated, photographed, and listed.",
              },
              {
                title: "Catalog in motion",
                body: "SKUs are being inventoried now; early buyers can signal priorities before public launch.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/10 bg-black/35 p-6 backdrop-blur-md"
              >
                <h2 className="font-display text-lg font-semibold tracking-tight text-white">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  {item.body}
                </p>
              </article>
            ))}
          </div>

          <section className="space-y-6 rounded-2xl border border-white/10 bg-black/30 p-8 backdrop-blur-md sm:p-10">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Built for procurement teams who move fast
            </h2>
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              <div className="space-y-4 text-zinc-200">
                <p className="leading-relaxed">
                  Whether you are filling a critical AOG gap or building
                  long-cycle stock, this warehouse is meant to become a
                  dependable secondary source. Documentation and traceability
                  are being handled with the seriousness buyers expect.
                </p>
                <p className="leading-relaxed text-zinc-300">
                  If you represent an airline, MRO, distributor, or specialty
                  broker, introduce yourself and we will align you with the
                  right tranche of inventory as it becomes available.
                </p>
              </div>
              <EmailLeadForm />
            </div>
          </section>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/40 py-10 text-center text-sm text-zinc-400 backdrop-blur-md">
        <p>
          © {new Date().getFullYear()} AeroVault Supply · Aviation warehouse
          disposition
        </p>
      </footer>
    </div>
  );
}
