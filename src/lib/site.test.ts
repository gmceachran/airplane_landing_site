import { afterEach, describe, expect, it, vi } from "vitest";

import {
  buildPartsInquiryMailtoBody,
  getHeroImageUrl,
  getLeadFormEndpoint,
  getPartsInquiryMailto,
} from "./site";

describe("site helpers", () => {
  it("returns a non-empty hero URL", () => {
    expect(getHeroImageUrl().length).toBeGreaterThan(0);
  });

  it("returns default contact email when env is unset", async () => {
    vi.stubEnv("VITE_CONTACT_EMAIL", "");
    vi.resetModules();
    const { getContactEmail: getEmail } = await import("./site");
    expect(getEmail()).toBe("cdproctor23@gmail.com");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns undefined when lead endpoint unset", () => {
    expect(getLeadFormEndpoint()).toBeUndefined();
  });

  it("parts inquiry body contains attach prompt and table header", () => {
    const body = buildPartsInquiryMailtoBody();
    expect(body).toContain("attach a parts list");
    expect(body).toContain("Part number | Qty | Condition | Notes");
  });

  it("parts inquiry mailto is a properly encoded mailto URL", () => {
    const url = getPartsInquiryMailto();
    expect(url.startsWith("mailto:")).toBe(true);
    expect(url).toContain("subject=Parts%20inquiry");
    expect(url).toContain("body=");
  });
});
