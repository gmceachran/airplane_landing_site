/**
 * Default stock hero (warehouse shelves). Must return HTTP 200 — Unsplash IDs
 * can 404 if removed; verify with curl -sI before changing. HeroBackdrop
 * filters keep it visually softer.
 */
const DEFAULT_HERO =
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2400&q=82";

export function getHeroImageUrl(): string {
  const fromEnv = import.meta.env.VITE_HERO_IMAGE_URL;
  if (fromEnv && fromEnv.trim().length > 0) return fromEnv.trim();
  return DEFAULT_HERO;
}

export function getContactEmail(): string {
  const fromEnv = import.meta.env.VITE_CONTACT_EMAIL;
  if (fromEnv && fromEnv.trim().length > 0) return fromEnv.trim();
  return "owner@example.com";
}

export function getLeadFormEndpoint(): string | undefined {
  const v = import.meta.env.VITE_LEAD_FORM_ENDPOINT;
  if (v && v.trim().length > 0) return v.trim();
  return undefined;
}
