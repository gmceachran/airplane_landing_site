import { useState, useRef } from "react";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";

type CheckState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "found"; partNumber: string }
  | { status: "not_found"; partNumber: string }
  | { status: "error"; message: string };

export function PartsSearchPage() {
  const [q, setQ] = useState("");
  const [state, setState] = useState<CheckState>({ status: "idle" });
  const abortRef = useRef<AbortController | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = q.trim();
    if (!trimmed) return;

    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setState({ status: "loading" });

    try {
      const data = await api.checkPart(trimmed);
      setState(
        data.found
          ? { status: "found", partNumber: data.part_number }
          : { status: "not_found", partNumber: data.part_number },
      );
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      setState({ status: "error", message: String(err) });
    }
  };

  const reset = () => {
    setQ("");
    setState({ status: "idle" });
  };

  return (
    <div className="relative min-h-screen text-foreground">
      <HeroBackdrop />
      <SiteHeader />

      <main className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-14 sm:px-6">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-widest text-sky-800">
            Parts availability
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Check a part number
          </h1>
          <p className="text-slate-600">
            Enter an exact part number to check whether we have it in inventory.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex gap-2"
          role="search"
          aria-label="Part number check"
        >
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="e.g. 1703M91P06"
            className="flex-1 border-sky-200 bg-white/80 font-mono backdrop-blur-sm focus-visible:ring-sky-400"
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <Button type="submit" disabled={state.status === "loading" || !q.trim()}>
            {state.status === "loading" ? "Checking…" : "Check"}
          </Button>
          {state.status !== "idle" && (
            <Button type="button" variant="outline" onClick={reset}>
              Clear
            </Button>
          )}
        </form>

        {state.status === "found" && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <span className="text-3xl">✓</span>
              <div className="space-y-1">
                <p className="font-semibold text-emerald-800">
                  Yes — we have{" "}
                  <span className="font-mono">{state.partNumber}</span> in
                  inventory.
                </p>
                <p className="text-sm text-emerald-700">
                  Contact us for pricing, condition, and availability details.
                </p>
                <a
                  href="mailto:chaseproctor@roswellaero.com"
                  className="mt-2 inline-block text-sm font-medium text-emerald-800 underline underline-offset-2"
                >
                  chaseproctor@roswellaero.com
                </a>
              </div>
            </div>
          </div>
        )}

        {state.status === "not_found" && (
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <span className="text-3xl">✗</span>
              <div className="space-y-1">
                <p className="font-semibold text-slate-800">
                  We don't currently have{" "}
                  <span className="font-mono">{state.partNumber}</span> in
                  inventory.
                </p>
                <p className="text-sm text-slate-600">
                  Our inventory changes frequently. Reach out and we'll let you
                  know if it becomes available.
                </p>
                <a
                  href="mailto:chaseproctor@roswellaero.com"
                  className="mt-2 inline-block text-sm font-medium text-slate-700 underline underline-offset-2"
                >
                  chaseproctor@roswellaero.com
                </a>
              </div>
            </div>
          </div>
        )}

        {state.status === "error" && (
          <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Something went wrong. Please try again.
          </p>
        )}

        {state.status === "idle" && (
          <p className="text-sm text-slate-500">
            Need help finding a part? Contact us at{" "}
            <a
              href="mailto:chaseproctor@roswellaero.com"
              className="underline underline-offset-2"
            >
              chaseproctor@roswellaero.com
            </a>
          </p>
        )}
      </main>
    </div>
  );
}
