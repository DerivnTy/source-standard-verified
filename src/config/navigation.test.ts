import { describe, expect, it } from "vitest";
import { FOOTER_COLUMNS, MOBILE_NAV, PRIMARY_NAV, ROUTES } from "./navigation";

describe("public navigation", () => {
  it("uses clinic search language instead of Vendor Registry", () => {
    expect(ROUTES.vendors.label).toBe("Search Clinics");
    expect(PRIMARY_NAV).toContainEqual(ROUTES.vendors);
    expect(PRIMARY_NAV.some((item) => item.label === "Vendor Registry")).toBe(false);
  });

  it("removes Advisory Board from header, footer, and mobile nav", () => {
    const labels = [
      ...PRIMARY_NAV.map((item) => item.label),
      ...MOBILE_NAV.map((item) => item.label),
      ...FOOTER_COLUMNS.flatMap((column) => column.links.map((link) => link.label)),
    ];
    expect(labels).not.toContain("Advisory Board");
    expect(PRIMARY_NAV).not.toContainEqual(ROUTES.advisory);
    expect(MOBILE_NAV).not.toContainEqual(ROUTES.advisory);
  });

  it("keeps Apply", () => {
    expect(FOOTER_COLUMNS.some((column) => column.links.includes(ROUTES.apply))).toBe(true);
  });
});
