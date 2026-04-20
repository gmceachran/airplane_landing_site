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
  return "chaseproctor@roswellaero.com";
}

export function getLeadFormEndpoint(): string | undefined {
  const v = import.meta.env.VITE_LEAD_FORM_ENDPOINT;
  if (v && v.trim().length > 0) return v.trim();
  return undefined;
}

/**
 * Prefilled body for a "parts inquiry" mailto draft. Mailto bodies are plain
 * text — pipes form a readable table in every major mail client. Keep the copy
 * explicit so buyers know they can either attach a file or edit the table
 * inline.
 */
export function buildPartsInquiryMailtoBody(): string {
  return [
    "Hi Roswell Aerospace Solutions,",
    "",
    "Please find my parts inquiry below.",
    "Preferred: attach a parts list as CSV, XLSX, or PDF.",
    "Otherwise, add rows to the table below and send.",
    "",
    "--- PARTS LIST ---",
    "Part number | Qty | Condition | Notes",
    "----------- | --- | --------- | -----",
    "            |     |           |",
    "            |     |           |",
    "            |     |           |",
    "",
    "Additional context (timeline, certifications, AOG, etc.):",
    "",
    "",
    "Thank you,",
    "",
  ].join("\n");
}

/** Returns a full `mailto:` URL for a parts inquiry with subject and body. */
export function getPartsInquiryMailto(): string {
  const subject = encodeURIComponent(
    "Parts inquiry — Roswell Aerospace Solutions",
  );
  const body = encodeURIComponent(buildPartsInquiryMailtoBody());
  return `mailto:${getContactEmail()}?subject=${subject}&body=${body}`;
}
