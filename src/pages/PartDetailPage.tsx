import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

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
import { api, type ComponentDetail } from "@/lib/api";

type LoadState =
  | { status: "loading" }
  | { status: "loaded"; data: ComponentDetail }
  | { status: "error"; message: string };

function DL({
  items,
}: {
  items: [string, React.ReactNode][];
}) {
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
      {items.map(([label, value]) => (
        <>
          <dt key={`dt-${label}`} className="font-medium text-slate-500">
            {label}
          </dt>
          <dd key={`dd-${label}`} className="text-slate-800">
            {value ?? "—"}
          </dd>
        </>
      ))}
    </dl>
  );
}

export function PartDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setState({ status: "loading" });
    api
      .getComponent(id)
      .then(({ component }) => {
        if (!cancelled) setState({ status: "loaded", data: component });
      })
      .catch((err: unknown) => {
        if (!cancelled)
          setState({ status: "error", message: String(err) });
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div className="relative min-h-screen text-foreground">
      <HeroBackdrop />
      <SiteHeader />

      <main className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-14 sm:px-6">
        <div>
          <Link
            to="/parts"
            className="text-sm text-sky-700 underline-offset-2 hover:underline"
          >
            ← Back to search
          </Link>
        </div>

        {state.status === "loading" && (
          <p className="text-slate-500">Loading…</p>
        )}

        {state.status === "error" && (
          <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {state.message}
          </p>
        )}

        {state.status === "loaded" && <PartDetail data={state.data} />}
      </main>
    </div>
  );
}

function PartDetail({ data: c }: { data: ComponentDetail }) {
  return (
    <>
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-900">
          {c.part_number}
        </h1>
        {c.description && (
          <p className="mt-1 text-lg text-slate-600">{c.description}</p>
        )}
        {c.component_type && (
          <span className="mt-2 inline-block rounded-full bg-sky-100 px-3 py-0.5 text-xs font-medium text-sky-800">
            {c.component_type}
          </span>
        )}
      </div>

      <Card className="border-sky-200/70 bg-white/65 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-base">Identity</CardTitle>
        </CardHeader>
        <CardContent>
          <DL
            items={[
              ["Part number", <span className="font-mono">{c.part_number}</span>],
              ["Serial number", c.serial_number],
              ["Manufacturer", c.manufacturer],
              ["Type", c.component_type],
            ]}
          />
        </CardContent>
      </Card>

      {c.warehouse_status && (
        <Card className="border-sky-200/70 bg-white/65 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-base">Warehouse</CardTitle>
            <CardDescription>Current shelf position and condition</CardDescription>
          </CardHeader>
          <CardContent>
            <DL
              items={[
                ["Shelf", c.warehouse_status.shelf],
                ["Condition", c.warehouse_status.condition],
                [
                  "Available for sale",
                  c.warehouse_status.available_for_sale ? (
                    <span className="text-green-700">Yes</span>
                  ) : (
                    <span className="text-slate-500">No</span>
                  ),
                ],
              ]}
            />
          </CardContent>
        </Card>
      )}

      {c.latest_life_data && (
        <Card className="border-sky-200/70 bg-white/65 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-base">Latest life data</CardTitle>
            <CardDescription>As of {c.latest_life_data.snapshot_date}</CardDescription>
          </CardHeader>
          <CardContent>
            <DL
              items={[
                ["Total part cycles (TPC)", c.latest_life_data.tpc?.toLocaleString()],
                ["Cycles remaining (SLR CYC)", c.latest_life_data.slr_cyc?.toLocaleString()],
                ["Hours remaining (SLR HRS)", c.latest_life_data.slr_hrs?.toLocaleString()],
                ["Source", c.latest_life_data.source],
              ]}
            />
          </CardContent>
        </Card>
      )}

      {c.certifications.length > 0 && (
        <Card className="border-sky-200/70 bg-white/65 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-base">
              Certifications ({c.certifications.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {c.certifications.map((cert) => (
              <div key={cert.id} className="rounded-lg border border-sky-100 p-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs text-sky-800">
                    {cert.form_type ?? "—"}
                  </span>
                  <span className="text-slate-500">{cert.form_tracking_number}</span>
                </div>
                <DL
                  items={[
                    ["Authority", cert.approving_authority],
                    ["Condition", cert.condition_at_release],
                    ["Release date", cert.release_date],
                  ]}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {c.installation_history.length > 0 && (
        <Card className="border-sky-200/70 bg-white/65 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-base">Installation history</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {c.installation_history.map((ev, i) => (
                <li key={i} className="flex flex-wrap gap-4 rounded-lg bg-sky-50/60 px-3 py-2">
                  <span><strong>Aircraft:</strong> {ev.aircraft_tail ?? "—"}</span>
                  <span><strong>Engine:</strong> {ev.engine_sn ?? "—"}</span>
                  <span><strong>Position:</strong> {ev.position ?? "—"}</span>
                  {ev.installed_date && (
                    <span className="text-slate-500">{ev.installed_date}</span>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-wrap gap-3">
        <Button asChild variant="outline" className="border-sky-300">
          <a href="mailto:chaseproctor@roswellaero.com?subject=Parts inquiry — {c.part_number}">
            Inquire about this part
          </a>
        </Button>
        <Button asChild variant="ghost">
          <Link to="/parts">← Back to search</Link>
        </Button>
      </div>
    </>
  );
}
