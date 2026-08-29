/**
 * Indexation gate.
 *
 * The directory contains thousands of clinic records. Most carry only a
 * name, a status and a city. Publishing all of them to Google as
 * indexable pages is the fastest way to accumulate thin-content debt and
 * damage the domain, so every record is scored on how much unique,
 * factual content its page can actually render.
 *
 * Records above the threshold are indexable and enter the sitemap.
 * Records below it render normally for humans, stay internally linked
 * (so crawlers can still traverse the graph), but carry
 * `noindex,follow` and are excluded from the sitemap. As data is filled
 * in, a page graduates automatically with no manual step.
 *
 * This module is imported by BOTH the page components and the sitemap
 * generator, so the two can never disagree.
 */

import type { Vendor } from "@/data/vendors";
import type { GreenlistEntry } from "@/data/greenlist";

/** Optional per-record SEO override block. Explicit beats computed. */
export type SeoOverride = {
  /** Replaces the generated <title> verbatim. */
  title?: string;
  /** Replaces the generated meta description verbatim. */
  description?: string;
  /** Force indexable (true) or force noindex (false). */
  index?: boolean;
};

export type IndexDecision = {
  indexable: boolean;
  score: number;
  threshold: number;
  /** Signals present on the record. */
  signals: string[];
  /** Highest-value signals still missing, best first. */
  missing: string[];
  /** Why the decision landed where it did. */
  reason: "override" | "participation" | "content-score";
};

/** Weighted content signals for a clinic record. */
const VENDOR_SIGNALS: {
  id: string;
  label: string;
  weight: number;
  has: (v: Vendor) => boolean;
}[] = [
  { id: "location", label: "City and state", weight: 2, has: (v) => Boolean(v.city && v.state) },
  { id: "website", label: "Website", weight: 2, has: (v) => Boolean(v.website) },
  { id: "category", label: "Category", weight: 1, has: (v) => Boolean(v.category) },
  {
    id: "focus",
    label: "Clinical focus",
    weight: 2,
    has: (v) => Boolean(v.clinicalFocus?.length || v.treatmentCategories?.length),
  },
  { id: "summary", label: "Written summary", weight: 3, has: (v) => Boolean(v.summary && v.summary.length > 80) },
  {
    id: "philosophy",
    label: "Clinical philosophy or patient focus",
    weight: 2,
    has: (v) => Boolean(v.clinicalPhilosophy || v.patientFocus),
  },
  { id: "director", label: "Medical director", weight: 2, has: (v) => Boolean(v.medicalDirector) },
  { id: "address", label: "Street address", weight: 1, has: (v) => Boolean(v.address) },
  { id: "contact", label: "Phone or email", weight: 1, has: (v) => Boolean(v.phone || v.email) },
  {
    id: "services",
    label: "Services or conditions treated",
    weight: 2,
    has: (v) => Boolean(v.servicesOffered?.length || v.conditionsTreated?.length),
  },
  {
    id: "coverage",
    label: "States served or telehealth coverage",
    weight: 1,
    has: (v) => Boolean(v.statesServed?.length || v.telehealthAvailability),
  },
  {
    id: "sourcing",
    label: "Named upstream sources",
    weight: 3,
    has: (v) => Boolean(v.verifiedManufacturers?.length),
  },
  {
    id: "verification",
    label: "Verification record",
    weight: 4,
    has: (v) => Boolean(v.reviewId || v.verifiedCategories?.length || v.verifiedCompounds?.length),
  },
  { id: "claimed", label: "Claimed by the clinic", weight: 1, has: (v) => Boolean(v.claimed) },
];

/**
 * Minimum weighted score for a clinic page to be worth indexing.
 * Location + website + category + focus + one more real field.
 */
export const VENDOR_INDEX_THRESHOLD = 8;

/** Records that have participated in the program always carry enough substance. */
const PARTICIPATED = new Set(["verified", "under-review", "active", "suspended", "expired"]);

export const scoreVendor = (v: Vendor): { score: number; signals: string[]; missing: string[] } => {
  let score = 0;
  const signals: string[] = [];
  const missing: { label: string; weight: number }[] = [];

  for (const s of VENDOR_SIGNALS) {
    if (s.has(v)) {
      score += s.weight;
      signals.push(s.label);
    } else {
      missing.push({ label: s.label, weight: s.weight });
    }
  }

  missing.sort((a, b) => b.weight - a.weight);
  return { score, signals, missing: missing.map((m) => m.label) };
};

export const vendorIndexDecision = (v: Vendor): IndexDecision => {
  const { score, signals, missing } = scoreVendor(v);
  const override = (v as Vendor & { seo?: SeoOverride }).seo;

  if (typeof override?.index === "boolean") {
    return {
      indexable: override.index,
      score,
      threshold: VENDOR_INDEX_THRESHOLD,
      signals,
      missing,
      reason: "override",
    };
  }

  // Removed records are never indexed.
  if (v.status === "removed") {
    return { indexable: false, score, threshold: VENDOR_INDEX_THRESHOLD, signals, missing, reason: "participation" };
  }

  if (PARTICIPATED.has(v.status)) {
    return { indexable: true, score, threshold: VENDOR_INDEX_THRESHOLD, signals, missing, reason: "participation" };
  }

  return {
    indexable: score >= VENDOR_INDEX_THRESHOLD,
    score,
    threshold: VENDOR_INDEX_THRESHOLD,
    signals,
    missing,
    reason: "content-score",
  };
};

export const isVendorIndexable = (v: Vendor): boolean => vendorIndexDecision(v).indexable;

/**
 * Facilities are a small, hand-curated set with genuinely rich
 * regulatory records, so the bar is simply "has a profile or a
 * documented regulatory position".
 */
export const facilityIndexDecision = (g: GreenlistEntry): IndexDecision => {
  const override = (g as GreenlistEntry & { seo?: SeoOverride }).seo;
  const signals: string[] = [];
  if (g.profile) signals.push("Regulatory profile");
  if (g.website) signals.push("Website");
  if (g.location) signals.push("Location");
  if (g.focus) signals.push("Focus");
  if (g.regulatoryAlert) signals.push("Documented regulatory status");

  if (typeof override?.index === "boolean") {
    return { indexable: override.index, score: signals.length, threshold: 2, signals, missing: [], reason: "override" };
  }

  const indexable = Boolean(g.profile || g.regulatoryAlert) && signals.length >= 2;
  return { indexable, score: signals.length, threshold: 2, signals, missing: [], reason: "content-score" };
};

export const isFacilityIndexable = (g: GreenlistEntry): boolean => facilityIndexDecision(g).indexable;

/** Aggregate indexation report, used by the SEO dashboard. */
export const vendorIndexationReport = (vs: Vendor[]) => {
  let indexable = 0;
  const nearMiss: { slug: string; name: string; score: number; needs: string[] }[] = [];

  for (const v of vs) {
    const d = vendorIndexDecision(v);
    if (d.indexable) {
      indexable += 1;
    } else if (d.score >= VENDOR_INDEX_THRESHOLD - 3) {
      nearMiss.push({ slug: v.slug, name: v.name, score: d.score, needs: d.missing.slice(0, 3) });
    }
  }

  nearMiss.sort((a, b) => b.score - a.score);
  return {
    total: vs.length,
    indexable,
    excluded: vs.length - indexable,
    threshold: VENDOR_INDEX_THRESHOLD,
    nearMiss: nearMiss.slice(0, 200),
  };
};
