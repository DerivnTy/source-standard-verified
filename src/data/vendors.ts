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
  // ---------- Batch 02 ----------
  {
    slug: "nuimage-medical",
    name: "NuImage Medical",
    status: "unverified",
    city: "Tampa",
    state: "FL",
    zip: "33606",
    website: normalizeWebsite("nuimagemedical.com"),
    medicalDirector: "Dr. Stephen Sisskind",
    clinicalFocus: ["Weight Loss"],
    category: "Wellness",
  },
  {
    slug: "biostation",
    name: "Biostation",
    status: "unverified",
    city: "Miami",
    state: "FL",
    zip: "33131",
    website: normalizeWebsite("thebiostation.com"),
    medicalDirector: "Dr. Martin G. Bloom",
    clinicalFocus: ["HRT"],
    category: "Hormone Optimization",
  },
  {
    slug: "reviv",
    name: "Reviv",
    status: "unverified",
    city: "Miami",
    state: "FL",
    zip: "33139",
    website: normalizeWebsite("revivme.com"),
    medicalDirector: "Dr. Andrew Cohen",
    clinicalFocus: ["IV Therapy", "Peptides"],
    category: "Wellness",
  },
  {
    slug: "ways2well",
    name: "Ways2Well",
    status: "unverified",
    city: "Austin",
    state: "TX",
    zip: "78701",
    website: normalizeWebsite("ways2well.com"),
    medicalDirector: "Dr. Brigham Buhler",
    clinicalFocus: ["Functional Medicine"],
    category: "Wellness",
  },
  {
    slug: "peak-performance-austin",
    name: "Peak Performance",
    status: "unverified",
    city: "Austin",
    state: "TX",
    zip: "78746",
    website: normalizeWebsite("peakperformance.com"),
    medicalDirector: "Dr. John Day",
    clinicalFocus: ["Sports Medicine"],
    category: "Wellness",
  },
  {
    slug: "next-health",
    name: "Next Health",
    status: "unverified",
    city: "Los Angeles",
    state: "CA",
    zip: "90048",
    website: normalizeWebsite("next-health.com"),
    medicalDirector: "Dr. Darshan Shah",
    clinicalFocus: ["Longevity"],
    category: "Wellness",
  },
  {
    slug: "craft-medical",
    name: "Craft Medical",
    status: "unverified",
    city: "Los Angeles",
    state: "CA",
    zip: "90067",
    website: normalizeWebsite("craftmedical.com"),
    medicalDirector: "Dr. James Staheli",
    clinicalFocus: ["TRT"],
    category: "TRT Clinic",
  },
  {
    slug: "ironwood-health",
    name: "Ironwood Health",
    status: "unverified",
    city: "Scottsdale",
    state: "AZ",
    zip: "85258",
    website: normalizeWebsite("ironwoodhealth.com"),
    medicalDirector: "Dr. Amy Marat",
    clinicalFocus: ["Wellness"],
    category: "Wellness",
  },
  {
    slug: "viking-alternative",
    name: "Viking Alternative",
    status: "unverified",
    city: "Scottsdale",
    state: "AZ",
    zip: "85254",
    website: normalizeWebsite("vikingalternative.com"),
    medicalDirector: "Dr. Samer Samman",
    clinicalFocus: ["HRT"],
    category: "Hormone Optimization",
  },
  {
    slug: "hallewell-health",
    name: "Hallewell Health",
    status: "unverified",
    city: "Nashville",
    state: "TN",
    zip: "37212",
    website: "https://www.google.com/search?q=hallewellhealth.com",
    medicalDirector: "Dr. Sarah Halle",
    clinicalFocus: ["Integrative Medicine"],
    category: "Wellness",
  },
  {
    slug: "rejuvenation-nyc",
    name: "Rejuvenation NYC",
    status: "unverified",
    city: "New York",
    state: "NY",
    zip: "10016",
    website: "https://www.google.com/search?q=rejuvenationnyc.com",
    medicalDirector: "Dr. Paul Jarrod Frank",
    clinicalFocus: ["Longevity"],
    category: "Wellness",
  },
  {
    slug: "elysium-health",
    name: "Elysium Health",
    status: "unverified",
    city: "New York",
    state: "NY",
    zip: "10013",
    website: normalizeWebsite("elysiumhealth.com"),
    medicalDirector: "Dr. Leonard Guarente",
    clinicalFocus: ["Aging"],
    category: "Wellness",
  },
  {
    slug: "vitality-medical-chicago",
    name: "Vitality Medical",
    status: "unverified",
    city: "Chicago",
    state: "IL",
    zip: "60611",
    website: "https://www.google.com/search?q=vitalitychicagoland.com",
    medicalDirector: "Dr. Neil Spiegel",
    clinicalFocus: ["HRT"],
    category: "Hormone Optimization",
  },
  {
    slug: "renew-vitality-houston",
    name: "Renew Vitality",
    status: "unverified",
    city: "Houston",
    state: "TX",
    zip: "77056",
    website: "https://www.google.com/search?q=hrtmd.com",
    medicalDirector: "Dr. Thomas O’Connor",
    clinicalFocus: ["TRT"],
    category: "TRT Clinic",
  },
  {
    slug: "apollo-health-sf",
    name: "Apollo Health",
    status: "unverified",
    city: "San Francisco",
    state: "CA",
    zip: "94104",
    website: "https://www.google.com/search?q=apollohealth.com",
    medicalDirector: "Dr. Dale Bredesen",
    clinicalFocus: ["Neurology"],
    category: "Wellness",
  },
  {
    slug: "optimized-wellness-denver",
    name: "Optimized Wellness",
    status: "unverified",
    city: "Denver",
    state: "CO",
    zip: "80202",
    website: "https://www.google.com/search?q=optimizedwellness.com",
    medicalDirector: "Dr. Jennifer Scanlon",
    clinicalFocus: ["Peptides"],
    category: "Peptides",
  },
  {
    slug: "regenics",
    name: "Regenics",
    status: "unverified",
    city: "Tarzana",
    state: "CA",
    zip: "91356",
    website: normalizeWebsite("regenics.com"),
    medicalDirector: "Dr. Michael Ghen",
    clinicalFocus: ["TRT"],
    category: "TRT Clinic",
  },
  {
    slug: "fountain-trt",
    name: "Fountain TRT",
    status: "unverified",
    city: "Miami",
    state: "FL",
    zip: "33137",
    website: normalizeWebsite("fountaintrt.com"),
    medicalDirector: "Dr. Doron Stember",
    clinicalFocus: ["TRT"],
    category: "TRT Clinic",
  },
  {
    slug: "biote-medical",
    name: "BioTE Medical",
    status: "unverified",
    city: "Irving",
    state: "TX",
    zip: "75038",
    website: normalizeWebsite("biotemedical.com"),
    medicalDirector: "Dr. Gary Donovitz",
    clinicalFocus: ["Hormone Pellets"],
    category: "Hormone Optimization",
  },
  {
    slug: "thrive-lab",
    name: "Thrive Lab",
    status: "unverified",
    city: "Seattle",
    state: "WA",
    zip: "98101",
    website: normalizeWebsite("thrivelab.com"),
    medicalDirector: "Dr. Gregory Brannon",
    clinicalFocus: ["Menopause"],
    category: "Hormone Optimization",
  },
  // ---------- Batch 03 ----------
  {
    slug: "hebe-aesthetics-vitality",
    name: "Hebe Aesthetics & Vitality",
    status: "unverified",
    city: "Atlanta",
    state: "GA",
    zip: "30342",
    website: normalizeWebsite("hebeaestheticsandvitality.com"),
    medicalDirector: "Dr. Nicholas Jones",
    clinicalFocus: ["Peptides"],
    category: "Wellness",
  },
  {
    slug: "progressive-medical-center",
    name: "Progressive Medical Center",
    status: "unverified",
    city: "Atlanta",
    state: "GA",
    zip: "30338",
    website: normalizeWebsite("progressivemedicalcenter.com"),
    medicalDirector: "Dr. Agnieszka Sliwinski",
    clinicalFocus: ["Integrative Medicine"],
    category: "Wellness",
  },
  {
    slug: "taylor-medical-wellness",
    name: "Taylor Medical Wellness",
    status: "unverified",
    city: "Atlanta",
    state: "GA",
    zip: "30328",
    website: normalizeWebsite("taylormedicalgroup.net"),
    medicalDirector: "Dr. Eldred Taylor",
    clinicalFocus: ["HRT", "Peptides"],
    category: "Hormone Optimization",
  },
  {
    slug: "jefferson-health-hormone-div",
    name: "Jefferson Health (Hormone Div)",
    status: "unverified",
    city: "Philadelphia",
    state: "PA",
    zip: "19107",
    website: normalizeWebsite("jeffersonhealth.org"),
    medicalDirector: "Clinical Staff",
    clinicalFocus: ["HRT"],
    category: "Hormone Optimization",
  },
  {
    slug: "bella-glow-med-spa",
    name: "Bella Glow Med Spa",
    status: "unverified",
    city: "Montoursville",
    state: "PA",
    zip: "17754",
    website: normalizeWebsite("bellaglowmedspa.com"),
    medicalDirector: "Allyson Quigley, PA-C",
    clinicalFocus: ["Wellness"],
    category: "Wellness",
  },
  {
    slug: "game-day-mens-health",
    name: "Game Day Men’s Health",
    status: "unverified",
    city: "San Diego",
    state: "CA",
    zip: "92123",
    website: normalizeWebsite("gamedaymenshealth.com"),
    medicalDirector: "Clinical Director",
    clinicalFocus: ["TRT"],
    category: "TRT Clinic",
  },
  {
    slug: "mauka-aesthetics-wellness",
    name: "Mauka Aesthetics & Wellness",
    status: "unverified",
    city: "Camas",
    state: "WA",
    zip: "98607",
    website: "https://www.google.com/search?q=maukapnw.com",
    medicalDirector: "Alexandra Farnsworth",
    clinicalFocus: ["Wellness"],
    category: "Wellness",
  },
  {
    slug: "inner-vitality-bellevue",
    name: "Inner Vitality",
    status: "unverified",
    city: "Bellevue",
    state: "WA",
    zip: "98005",
    website: normalizeWebsite("innervitalitybellevue.com"),
    medicalDirector: "Dr. Alice Lee Kuntz",
    clinicalFocus: ["Longevity"],
    category: "Wellness",
  },
  {
    slug: "sue-decotiis-md",
    name: "Sue Decotiis, MD",
    status: "unverified",
    city: "New York",
    state: "NY",
    zip: "10017",
    website: normalizeWebsite("drdecotiis.com"),
    medicalDirector: "Dr. Sue Decotiis",
    clinicalFocus: ["Obesity Medicine", "HRT"],
    category: "Hormone Optimization",
  },
  {
    slug: "medical-health-institute",
    name: "Medical Health Institute",
    status: "unverified",
    city: "Miami",
    state: "FL",
    zip: "33180",
    website: normalizeWebsite("medicalhealthinstitute.com"),
    medicalDirector: "Internal Staff",
    clinicalFocus: ["Longevity"],
    category: "Wellness",
  },
  {
    slug: "rebalanced-wellness",
    name: "ReBalanced Wellness",
    status: "unverified",
    city: "Sandy Springs",
    state: "GA",
    zip: "30328",
    website: normalizeWebsite("rebalancedwellnessclinic.com"),
    medicalDirector: "Clinical Staff",
    clinicalFocus: ["Tissue Repair"],
    category: "Wellness",
  },
  {
    slug: "elevate-wellness-clinic",
    name: "Elevate Wellness Clinic",
    status: "unverified",
    city: "Atlanta",
    state: "GA",
    zip: "30345",
    website: normalizeWebsite("elevateatl.com"),
    medicalDirector: "Internal Staff",
    clinicalFocus: ["Immune Peptides"],
    category: "Peptides",
  },
  {
    slug: "revitalyzemd",
    name: "RevitalyzeMD",
    status: "unverified",
    city: "Knoxville",
    state: "TN",
    zip: "37919",
    website: normalizeWebsite("revitalyzemd.com"),
    medicalDirector: "Dr. Debra Durst",
    clinicalFocus: ["Regenerative Medicine"],
    category: "Wellness",
  },
  {
    slug: "timeless-wellness-clinic",
    name: "Timeless Wellness Clinic",
    status: "unverified",
    city: "Pleasanton",
    state: "CA",
    zip: "94566",
    website: normalizeWebsite("timelesswellnessclinic.com"),
    medicalDirector: "Amber Ross, PA-C",
    clinicalFocus: ["BHRT"],
    category: "Hormone Optimization",
  },
  {
    slug: "best-life-hrt",
    name: "Best Life HRT",
    status: "unverified",
    city: "Southern Pines",
    state: "NC",
    zip: "28387",
    website: normalizeWebsite("bestlifepinehurst.com"),
    medicalDirector: "Dr. Amie Collins",
    clinicalFocus: ["HRT"],
    category: "Hormone Optimization",
  },
  {
    slug: "no-limits-medical",
    name: "No Limits Medical",
    status: "unverified",
    city: "Sarasota",
    state: "FL",
    zip: "34243",
    website: normalizeWebsite("nolimitsmedical.com"),
    medicalDirector: "Dr. Amy Roden",
    clinicalFocus: ["BHRT"],
    category: "Hormone Optimization",
  },
  {
    slug: "carolina-health-collective",
    name: "Carolina Health Collective",
    status: "unverified",
    city: "Fort Mill",
    state: "SC",
    zip: "29715",
    website: normalizeWebsite("carolinahealthcollective.com"),
    medicalDirector: "Dr. Ada Okwara",
    clinicalFocus: ["Wellness"],
    category: "Wellness",
  },
  {
    slug: "vibrance-medspa",
    name: "Vibrance Medspa",
    status: "unverified",
    city: "Show Low",
    state: "AZ",
    zip: "85901",
    website: normalizeWebsite("vibrancemedspaaz.com"),
    medicalDirector: "Amber Luna, FNP-C",
    clinicalFocus: ["Wellness"],
    category: "Wellness",
  },
  {
    slug: "grace-optimal-wellness",
    name: "Grace Optimal Wellness",
    status: "unverified",
    city: "Mt. Juliet",
    state: "TN",
    zip: "37122",
    website: normalizeWebsite("graceoptimalwellness.com"),
    medicalDirector: "Andrea Weddle Knight",
    clinicalFocus: ["BHRT"],
    category: "Hormone Optimization",
  },
  {
    slug: "feminist-center-for-repro",
    name: "Feminist Center for Repro",
    status: "unverified",
    city: "Atlanta",
    state: "GA",
    zip: "30329",
    website: normalizeWebsite("feministcenter.org"),
    medicalDirector: "Clinical Staff",
    clinicalFocus: ["HRT"],
    category: "Hormone Optimization",
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
