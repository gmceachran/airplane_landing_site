import { afterEach, describe, expect, it, vi } from "vitest";

import { getHeroImageUrl, getLeadFormEndpoint } from "./site";

describe("site helpers", () => {
  it("returns a non-empty hero URL", () => {
    expect(getHeroImageUrl().length).toBeGreaterThan(0);
  });

  it("returns default contact email when env is unset", async () => {
    vi.stubEnv("VITE_CONTACT_EMAIL", "");
    vi.resetModules();
    const { getContactEmail: getEmail } = await import("./site");
    expect(getEmail()).toBe("owner@example.com");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns undefined when lead endpoint unset", () => {
    expect(getLeadFormEndpoint()).toBeUndefined();
  });
});
