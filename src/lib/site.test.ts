import { describe, expect, it } from "vitest";

import { getContactEmail, getHeroImageUrl, getLeadFormEndpoint } from "./site";

describe("site helpers", () => {
  it("returns a non-empty hero URL", () => {
    expect(getHeroImageUrl().length).toBeGreaterThan(0);
  });

  it("returns default contact email when env is unset", () => {
    expect(getContactEmail()).toBe("owner@example.com");
  });

  it("returns undefined when lead endpoint unset", () => {
    expect(getLeadFormEndpoint()).toBeUndefined();
  });
});
