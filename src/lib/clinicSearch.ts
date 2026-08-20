import type { Vendor, VendorPublicStatus } from "@/data/vendors";

/** Strong name matches only. Never used to browse the full indexed list. */
export const MAX_CLINIC_SEARCH_RESULTS = 8;
export const MIN_CLINIC_SEARCH_CHARS = 2;

export type ClinicSearchHit =
  | { kind: "indexed"; vendor: Vendor }
  | { kind: "unknown"; name: string };

export function isSourceStandardVerified(status: VendorPublicStatus): boolean {
  return status === "verified" || status === "active";
}

export function normalizeClinicName(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

/**
 * Name-only clinic lookup. An empty query returns nothing — the public
 * product is a single-clinic question, not a directory wall.
 *
 * If the typed name is not a close match for an indexed clinic, the hit is
 * still returned as Not Source Standard Verified for that name.
 */
export function searchClinics(query: string, list: readonly Vendor[]): ClinicSearchHit[] {
  const raw = query.trim();
  if (raw.length < MIN_CLINIC_SEARCH_CHARS) return [];

  const needle = normalizeClinicName(raw);
  if (!needle) return [];

  const exact: Vendor[] = [];
  const strong: Vendor[] = [];
  const contains: Vendor[] = [];

  for (const vendor of list) {
    const name = normalizeClinicName(vendor.name);
    if (!name) continue;
    if (name === needle) {
      exact.push(vendor);
      continue;
    }
    const words = name.split(" ");
    if (name.startsWith(needle) || words.some((word) => word.startsWith(needle))) {
      strong.push(vendor);
      continue;
    }
    if (needle.length >= 3 && name.includes(needle)) {
      contains.push(vendor);
    }
  }

  const byName = (a: Vendor, b: Vendor) => a.name.localeCompare(b.name);
  const toHits = (vendors: Vendor[]): ClinicSearchHit[] =>
    vendors.sort(byName).map((vendor) => ({ kind: "indexed" as const, vendor }));

  if (exact.length > 0) return toHits(exact);

  if (strong.length > 0 && strong.length <= MAX_CLINIC_SEARCH_RESULTS) {
    return toHits(strong);
  }

  if (contains.length > 0 && contains.length <= MAX_CLINIC_SEARCH_RESULTS) {
    return toHits(contains);
  }

  return [{ kind: "unknown", name: raw }];
}
