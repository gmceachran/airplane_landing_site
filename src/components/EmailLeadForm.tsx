import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getContactEmail, getLeadFormEndpoint } from "@/lib/site";

type Status = "idle" | "loading" | "success" | "error";

export function EmailLeadForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    const endpoint = getLeadFormEndpoint();
    const owner = getContactEmail();

    if (endpoint) {
      setStatus("loading");
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: trimmed,
            name: name.trim() || undefined,
            source: "landing",
          }),
        });
        if (!res.ok) throw new Error("Request failed");
        setStatus("success");
        setMessage("Thank you — we will reach out shortly.");
        setEmail("");
        setName("");
      } catch {
        setStatus("error");
        setMessage("Something went wrong. Please email us directly.");
      }
      return;
    }

    const subject = encodeURIComponent("Interest in aviation parts inventory");
    const body = encodeURIComponent(
      [
        `Email: ${trimmed}`,
        name.trim() ? `Name: ${name.trim()}` : null,
        "",
        "I would like to learn more about availability and the upcoming catalog.",
      ]
        .filter(Boolean)
        .join("\n"),
    );
    window.location.href = `mailto:${owner}?subject=${subject}&body=${body}`;
    setStatus("idle");
    setMessage(
      "If your email app opened, send the draft to continue. You can also copy the address below.",
    );
  }

  return (
    <Card
      id="contact"
      className="border-sky-200/70 bg-white/60 text-card-foreground shadow-sm shadow-sky-950/5 backdrop-blur-md"
    >
      <CardHeader>
        <CardTitle className="font-display text-xl tracking-tight text-slate-900">
          Get availability updates
        </CardTitle>
        <CardDescription className="text-slate-600">
          Share your email for inventory announcements and buyer outreach. No
          spam — just relevant updates as SKUs are cataloged.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="lead-email">Work email</Label>
            <Input
              id="lead-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              required
              className="border-input bg-background/90"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lead-name">Name (optional)</Label>
            <Input
              id="lead-name"
              name="name"
              autoComplete="name"
              placeholder="Jordan Lee"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              className="border-input bg-background/90"
            />
          </div>
          <Button
            type="submit"
            disabled={status === "loading"}
            className="w-full sm:w-auto"
          >
            {status === "loading" ? "Sending…" : "Request information"}
          </Button>
          {message ? (
            <p
              className={
                status === "error"
                  ? "text-sm text-red-600"
                  : status === "success"
                    ? "text-sm text-emerald-700"
                    : "text-sm text-slate-600"
              }
              role="status"
            >
              {message}
            </p>
          ) : null}
          <p className="text-xs text-slate-500">
            Prefer email directly? Reach the owner at{" "}
            <a
              className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
              href={`mailto:${getContactEmail()}`}
            >
              {getContactEmail()}
            </a>
            .
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
