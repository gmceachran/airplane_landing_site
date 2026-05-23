import { useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api, type Component } from "@/lib/api";

type SearchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "results"; items: Component[]; query: string }
  | { status: "error"; message: string };

export function PartsSearchPage() {
  const [q, setQ] = useState("");
  const [state, setState] = useState<SearchState>({ status: "idle" });
  const abortRef = useRef<AbortController | null>(null);

  const runSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setState({ status: "idle" });
        return;
      }
      abortRef.current?.abort();
      abortRef.current = new AbortController();
      setState({ status: "loading" });
      try {
        const data = await api.searchComponents(query);
        setState({ status: "results", items: data.components, query });
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setState({ status: "error", message: String(err) });
      }
    },
    [],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void runSearch(q);
  };

  return (
    <div className="relative min-h-screen text-foreground">
      <HeroBackdrop />
      <SiteHeader />

      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-14 sm:px-6">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-widest text-sky-800">
            Parts catalog
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Search inventory
          </h1>
          <p className="text-slate-600">
            Search by part number, serial number, description, or manufacturer.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex gap-2"
          role="search"
          aria-label="Parts search"
        >
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="e.g. 1703M91P06 or CFM56 blade"
            className="flex-1 border-sky-200 bg-white/80 backdrop-blur-sm focus-visible:ring-sky-400"
            autoFocus
          />
          <Button type="submit" disabled={state.status === "loading"}>
            {state.status === "loading" ? "Searching…" : "Search"}
          </Button>
          {state.status !== "idle" && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setQ("");
                setState({ status: "idle" });
              }}
            >
              Clear
            </Button>
          )}
        </form>

        {state.status === "error" && (
          <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Error: {state.message}
          </p>
        )}

        {state.status === "results" && (
          <section aria-label="Search results">
            <p className="mb-3 text-sm text-slate-500">
              {state.items.length === 0
                ? `No parts found for "${state.query}".`
                : `${state.items.length} part${state.items.length !== 1 ? "s" : ""} for "${state.query}"`}
            </p>

            {state.items.length > 0 && (
              <div className="overflow-hidden rounded-2xl border border-sky-200/70 bg-white/70 shadow-sm shadow-sky-950/5 backdrop-blur-md">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-sky-100 bg-sky-50/60 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <th className="px-4 py-3 text-left">Part number</th>
                      <th className="hidden px-4 py-3 text-left md:table-cell">
                        Serial
                      </th>
                      <th className="hidden px-4 py-3 text-left lg:table-cell">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left">Description</th>
                      <th className="hidden px-4 py-3 text-left sm:table-cell">
                        Manufacturer
                      </th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.items.map((c, i) => (
                      <tr
                        key={c.id}
                        className={`border-b border-sky-100/60 last:border-0 ${i % 2 === 0 ? "" : "bg-sky-50/30"} hover:bg-sky-50/50 transition-colors`}
                      >
                        <td className="px-4 py-3 font-mono font-medium text-slate-800">
                          {c.part_number}
                        </td>
                        <td className="hidden px-4 py-3 text-slate-600 md:table-cell">
                          {c.serial_number ?? "—"}
                        </td>
                        <td className="hidden px-4 py-3 lg:table-cell">
                          {c.component_type && (
                            <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs text-sky-800">
                              {c.component_type}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          {c.description ?? "—"}
                        </td>
                        <td className="hidden px-4 py-3 text-slate-600 sm:table-cell">
                          {c.manufacturer ?? "—"}
                        </td>
                        <td className="px-4 py-3">
                          <Link
                            to={`/parts/${c.id}`}
                            className="text-sky-700 underline-offset-2 hover:underline"
                          >
                            View →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {state.status === "idle" && (
          <p className="text-sm text-slate-500">
            Start typing to search the parts inventory. Contact{" "}
            <a
              href="mailto:chaseproctor@roswellaero.com"
              className="underline underline-offset-2"
            >
              chaseproctor@roswellaero.com
            </a>{" "}
            for specific inquiries.
          </p>
        )}
      </main>
    </div>
  );
}
