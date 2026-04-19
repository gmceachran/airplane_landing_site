import { Link } from "react-router-dom";

import { EmailLeadForm } from "@/components/EmailLeadForm";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";

export function HomePage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <HeroBackdrop />

      <SiteHeader />

      <main>
        <section className="mx-auto flex max-w-5xl flex-col gap-10 px-4 pb-24 pt-16 sm:px-6 sm:pt-24">
          <div className="max-w-3xl space-y-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-800">
              Aviation parts · Warehouse inventory
            </p>
            <h1 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              Roughly eight million parts.
              <span className="mt-1 block text-sky-900/90">
                One serious opportunity for buyers.
              </span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-700 sm:text-xl">
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
                className="rounded-full border-sky-300/80 bg-sky-50/50 px-6 text-slate-900 shadow-sm backdrop-blur-sm hover:border-sky-400/80 hover:bg-sky-100/60"
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
                className="rounded-2xl border border-sky-200/70 bg-white/60 p-6 shadow-sm shadow-sky-950/5 backdrop-blur-md"
              >
                <h2 className="font-display text-lg font-semibold tracking-tight text-slate-900">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {item.body}
                </p>
              </article>
            ))}
          </div>

          <section className="space-y-6 rounded-2xl border border-sky-200/70 bg-white/55 p-8 shadow-sm shadow-sky-950/5 backdrop-blur-md sm:p-10">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Built for procurement teams who move fast
            </h2>
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              <div className="space-y-4 text-slate-700">
                <p className="leading-relaxed">
                  Whether you are filling a critical AOG gap or building
                  long-cycle stock, this warehouse is meant to become a
                  dependable secondary source. Documentation and traceability
                  are being handled with the seriousness buyers expect.
                </p>
                <p className="leading-relaxed text-slate-600">
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

      <footer className="border-t border-sky-200/70 bg-white/50 py-10 text-center text-sm text-slate-600 backdrop-blur-md">
        <p>
          © {new Date().getFullYear()} Roswell Aerospace Solutions · Aviation
          warehouse disposition
        </p>
      </footer>
    </div>
  );
}
