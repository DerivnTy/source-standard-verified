// Source Standard – Public Vendor Directory
// Data schema designed for batched imports of vendor listings.
// Most listings begin with status "unverified" — meaning Source Standard
// has not published a completed verification for the vendor. It is NOT
// a judgment of safety, legitimacy, or compliance.

export type VendorPublicStatus =
  | "verified"
  | "unverified"
  | "under-review"
  | "suspended"
  | "removed";

export type VendorCategory =
  | "TRT Clinic"
  | "Hormone Optimization"
  | "Peptides"
  | "Wellness"
  | "Compounding Pharmacy"
  | "Other";

export type Vendor = {
  // Identity
  slug: string;
  name: string;

  // Public status (drives badge, filters, and disclaimers)
  status: VendorPublicStatus;

  // Location
  city?: string;
  state?: string; // 2-letter US state code preferred (e.g., "FL")
  zip?: string;

  // Outbound
  website?: string;

  // Clinical detail
  medicalDirector?: string;
  clinicalFocus?: string[]; // e.g., ["TRT", "Peptides", "Weight Loss"]
  category?: VendorCategory;

  // Verification record (only populated when status === "verified")
  reviewId?: string; // Format: SS-YYYY-#####
  reviewDate?: string; // ISO yyyy-mm-dd
  verifiedCategories?: string[]; // categories/compounds reviewed under SS framework

  // Public-facing notes (optional, surfaced on profile)
  publicNote?: string;

  // Free-form summary for profile body (optional)
  summary?: string;

  // Legacy documentation table — preserved for back-compat with existing
  // verified vendor profiles. New imports do not need to populate this.
  documentation?: {
    label: string;
    status: "On file" | "Verified" | "Not provided";
    note?: string;
  }[];
};

// ---------- Status presentation ----------

export const VENDOR_STATUS_LABEL: Record<VendorPublicStatus, string> = {
  verified: "Verified",
  unverified: "Unverified",
  "under-review": "Under Review",
  suspended: "Suspended",
  removed: "Removed",
};

// Short consumer-facing definition (used in tooltips, registry legend)
export const VENDOR_STATUS_SHORT: Record<VendorPublicStatus, string> = {
  verified:
    "Source Standard has published a completed verification for this vendor.",
  unverified:
    "Source Standard verification is not currently published for this vendor. This does not mean unsafe, noncompliant, or illegitimate.",
  "under-review":
    "An application is currently undergoing review under SS-FRAMEWORK-2026.01.",
  suspended:
    "A previously published verification has been suspended pending further review.",
  removed:
    "This listing has been removed from the public directory.",
};

// Long disclaimer (used on individual vendor profile pages)
export const VENDOR_STATUS_DISCLOSURE: Record<VendorPublicStatus, string> = {
  verified:
    "This listing reflects documentation reviewed at the time of verification. Verification is time-bound and tied to a public Review ID.",
  unverified:
    'This listing appears in the Source Standard public directory. "Unverified" means Source Standard has not published a completed verification for this vendor. It does not indicate that the vendor is unsafe, noncompliant, or illegitimate. It indicates only that Source Standard verification is not currently on file as a published record.',
  "under-review":
    "This vendor has an application currently under review. No completed verification has been published yet. Status will update when review is complete.",
  suspended:
    "A previously published verification for this vendor has been suspended. The listing remains public for transparency. Refer to the public note for context where available.",
  removed:
    "This listing has been removed from the public directory. The record is preserved for transparency.",
};

// ---------- Short neutral profile note ----------
// Used on individual vendor profile pages where a brief status note is
// needed. The full definition lives once on the directory index.
export const VENDOR_STATUS_PROFILE_NOTE: Record<VendorPublicStatus, string> = {
  verified:
    "Source Standard has published a completed verification for this vendor.",
  unverified:
    "Source Standard verification is not currently published for this vendor.",
  "under-review":
    "An application for this vendor is currently under review.",
  suspended:
    "A previously published verification for this vendor has been suspended.",
  removed:
    "This listing has been removed from the public directory.",
};

// ---------- Initial dataset ----------
// Imports are appended here in batches.

const normalizeWebsite = (url: string): string => {
  if (!url) return url;
  if (url.startsWith("http")) return url;
  return `https://${url}`;
};

export const vendors: Vendor[] = [
  {
    slug: "mattr-biowellness-club",
    name: "MATTR Biowellness Club",
    status: "unverified",
    city: "Austin",
    state: "TX",
    zip: "78735",
    website: normalizeWebsite("mattrbiowellnessclub.com"),
    medicalDirector: "Dr. Jamal",
    clinicalFocus: ["Peptide Therapy", "Longevity"],
    category: "Wellness",
  },
  {
    slug: "austin-regenerative-therapy",
    name: "Austin Regenerative Therapy",
    status: "unverified",
    city: "Austin",
    state: "TX",
    zip: "78701",
    website: "https://www.google.com/search?q=austinregentherapy.com",
    medicalDirector: "Dr. Gerald Harris",
    clinicalFocus: ["Regenerative Medicine"],
    category: "Wellness",
  },
  {
    slug: "saving-face-austin",
    name: "Saving Face Austin",
    status: "unverified",
    city: "Austin",
    state: "TX",
    zip: "78701",
    website: normalizeWebsite("savingfaceaustin.com"),
    medicalDirector: "Dr. Rocco Piazza",
    clinicalFocus: ["Aesthetics", "Peptides"],
    category: "Wellness",
  },
  {
    slug: "ageless-mens-health-nashville",
    name: "Ageless Men’s Health",
    status: "unverified",
    city: "Nashville",
    state: "TN",
    zip: "37203",
    website: normalizeWebsite("agelessmenshealth.com"),
    medicalDirector: "Dr. Andrew J. Stahl",
    clinicalFocus: ["TRT", "HRT"],
    category: "TRT Clinic",
  },
  {
    slug: "thrivemd-dallas",
    name: "ThriveMD",
    status: "unverified",
    city: "Dallas",
    state: "TX",
    zip: "75231",
    website: normalizeWebsite("thrivemddallas.com"),
    medicalDirector: "Dr. Scott T. Moore",
    clinicalFocus: ["HRT", "Peptides"],
    category: "Hormone Optimization",
  },
  {
    slug: "defy-medical",
    name: "Defy Medical",
    status: "unverified",
    city: "Tampa",
    state: "FL",
    zip: "33609",
    website: normalizeWebsite("defymedical.com"),
    medicalDirector: "Dr. Justin Saya",
    clinicalFocus: ["Integrative Health"],
    category: "Hormone Optimization",
  },
  {
    slug: "south-florida-hrt",
    name: "South Florida HRT",
    status: "unverified",
    city: "Miami",
    state: "FL",
    zip: "33131",
    website: "https://www.google.com/search?q=southfloridahrt.com",
    medicalDirector: "Dr. Oscar Hevia",
    clinicalFocus: ["Men’s Health", "HRT"],
    category: "Hormone Optimization",
  },
  {
    slug: "infinite-wellness-scottsdale",
    name: "Infinite Wellness",
    status: "unverified",
    city: "Scottsdale",
    state: "AZ",
    zip: "85251",
    website: "https://www.google.com/search?q=infinitewellnessaz.com",
    medicalDirector: "Dr. Brandon S. Wood",
    clinicalFocus: ["Longevity", "Peptides"],
    category: "Wellness",
  },
  {
    slug: "optimal-health-spectrum",
    name: "Optimal Health Spectrum",
    status: "unverified",
    city: "Los Angeles",
    state: "CA",
    zip: "90404",
    website: normalizeWebsite("optimalhealthspectrums.com"),
    medicalDirector: "Dr. Lynette Louise",
    clinicalFocus: ["Functional Medicine"],
    category: "Wellness",
  },
  {
    slug: "revitalize-health-charlotte",
    name: "Revitalize Health",
    status: "unverified",
    city: "Charlotte",
    state: "NC",
    zip: "28202",
    website: "https://www.google.com/search?q=revitalizeclt.com",
    medicalDirector: "Dr. Kevin M. Hogan",
    clinicalFocus: ["Medical Weight Loss"],
    category: "Wellness",
  },
];

// ---------- Helpers ----------

export const getVendor = (slug: string): Vendor | undefined =>
  vendors.find((v) => v.slug === slug);

export const getVendorStates = (): string[] =>
  Array.from(
    new Set(vendors.map((v) => v.state).filter((s): s is string => Boolean(s))),
  ).sort();

export const getVendorCities = (): string[] =>
  Array.from(
    new Set(
      vendors
        .map((v) => (v.city && v.state ? `${v.city}, ${v.state}` : v.city))
        .filter((c): c is string => Boolean(c)),
    ),
  ).sort();

export const getClinicalFocusOptions = (): string[] =>
  Array.from(new Set(vendors.flatMap((v) => v.clinicalFocus ?? []))).sort();

// ---------- Back-compat (legacy) ----------
// Older components may still reference VerificationStatus. Map it to the
// new public status type.
export type VerificationStatus =
  | "verified"
  | "pending"
  | "unverified"
  | "expired";
