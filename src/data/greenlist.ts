export type GreenlistType =
  | "503B Outsourcing Facility"
  | "503A Compounding Pharmacy"
  | "503A + 503B Brand"
  | "503B Partner / Sterile Facility"
  | "Compounding Network"
  | "Other Qualified Source"
  | "Unverified Facility";

export type GreenlistCategory = "503B" | "503A" | "Other";

export type AlertStatus =
  | "shut-down"
  | "no-longer-registered"
  | "not-on-fda-list"
  | "unverified";

export type RegulatoryAlert = {
  status: AlertStatus;
  shortLabel?: string;
  asOf: string;
  reason: string;
  proof: { label: string; url: string }[];
};

export type GreenlistEntry = {
  slug: string;
  name: string;
  type: GreenlistType;
  category: GreenlistCategory;
  location: string;
  focus: string;
  website?: string;
  profile?: GreenlistProfile;
  regulatoryAlert?: RegulatoryAlert;
  // Discrete location fields (populated at module load by the normalization
  // pass below — derived from `location`). Filters read from these.
  city?: string;
  state?: string;
  additionalLocations?: { city?: string; state?: string }[];
  serviceArea?: "Nationwide" | "Multi-state" | "Multi-location";
};

export type GreenlistProfile = {
  // Regulatory identity
  designation?: string;
  fdaRegistration?: string;
  statesServed?: string[];
  inspectionHistory?: string;
  lastInspectionDate?: string;

  // Quality systems
  standards?: string[];
  cleanroomClass?: string;
  testingProtocols?: string[];
  environmentalMonitoring?: string;

  // Product capabilities
  dosageForms?: string[];
  specializations?: string[];
  apiSourcingPolicy?: string;

  // Source Standard audit data
  ssReviewDate?: string;
  ssAuditDate?: string;
  labValidationLog?: string;
  vendorCount?: number;
  reviewNotes?: string;

  // Neutral facility background
  yearsInOperation?: string;
  facilityScale?: string;
  qaStaffing?: string;
  background?: string;

  // --- Regulatory identity (additions) ---
  feiNumber?: string;
  form483Issued?: boolean | "unknown";
  form483Date?: string;

  // --- FDA Registration History (replaces "background" semantically) ---
  initialRegistrationYear?: string;
  currentRegistrationStatus?:
    | "Active"
    | "Inactive"
    | "Lapsed"
    | "Withdrawn"
    | "Not Registered";
  mostRecentRegistrationYear?: string;
  selfReportedIntent?: string;
  registrationCategory?: string;
  registrationNotes?: string;

  // --- Compounding scope (structured capability flags) ---
  compoundingScope?: {
    sterile?: boolean;
    nonSterile?: boolean;
    bulkDrugSubstances?: boolean;
    officeUse?: boolean;
    patientSpecific?: boolean;
    hazardous?: boolean;
  };

  // --- Cross-reference (architecture seed) ---
  verifiedVendorSlugs?: string[];

  // ============================================================
  // NEW MANUFACTURER INTELLIGENCE STRUCTURE
  // Fields below support the rebuilt Manufacturer Registry profile.
  // Existing fields above are retained for type-compatibility only.
  // ============================================================

  // Facility identity
  yearFounded?: string;
  headquarters?: string;
  additionalLocationsList?: string[];
  website?: string;
  overview?: string;

  // Regulatory information
  status503A?: "Designated" | "Not Designated" | "Pending";
  status503B?: "Designated" | "Not Designated" | "Pending";
  nabpAccreditation?: boolean;
  pcabAccreditation?: boolean;

  // Manufacturing capabilities
  capabilities?: (
    | "Sterile Compounding"
    | "Non-Sterile Compounding"
    | "Injectables"
    | "Oral Medications"
    | "Topicals"
    | "Troches"
    | "Lyophilized Products"
    | "Multi-Dose Vials"
    | "Pre-Filled Syringes"
  )[];

  // Therapy categories
  therapyCategories?: (
    | "TRT"
    | "HRT"
    | "GLP-1"
    | "Peptides"
    | "Longevity"
    | "Weight Loss"
    | "Wellness"
    | "Sexual Health"
    | "Aesthetics"
    | "Functional Medicine"
  )[];

  // Public records
  publicRecords?: { label: string; url: string }[];

  // Timeline
  timeline?: { date: string; event: string }[];

  // Greenlisted / monitoring status
  greenlistedSince?: string;
  monitoringSince?: string;
};


export const greenlistEntries: GreenlistEntry[] = [
  // Cleared — registry is being rebuilt with the new Manufacturer Intelligence structure.

export const GREENLIST_TYPES: GreenlistType[] = [
  "503B Outsourcing Facility",
  "503A Compounding Pharmacy",
  "503A + 503B Brand",
  "503B Partner / Sterile Facility",
  "Compounding Network",
  "Other Qualified Source",
  "Unverified Facility",
];

export const FOCUS_TAGS: { label: string; keywords: string[] }[] = [
  { label: "Sterile injectables", keywords: ["sterile", "injectable"] },
  { label: "Hormone / TRT", keywords: ["hormone", "trt"] },
  { label: "Peptides", keywords: ["peptide"] },
  { label: "IV / infusion", keywords: ["iv", "infusion", "admixture"] },
  { label: "GLP-1 / weight management", keywords: ["glp-1", "weight"] },
  { label: "Ophthalmology", keywords: ["ophthal", "eye"] },
  { label: "Dermatology", keywords: ["dermatology", "topical"] },
  { label: "Hospital / critical care", keywords: ["hospital", "critical", "anesthesia", "pain"] },
  { label: "Wellness", keywords: ["wellness", "nutraceutical", "vitamin", "anti-aging", "regenerative", "functional", "integrative"] },
];

// ---------- Location normalization ----------
// Parses each entry's `location` string once at module load and populates
// the discrete `city` / `state` / `additionalLocations` / `serviceArea`
// fields. Filters and sort logic read these instead of regex-on-display.

const parseLocationFragment = (frag: string): { city?: string; state?: string } => {
  const m = frag.trim().match(/^(.+?),\s*([A-Za-z]{2})\s*$/);
  if (m) return { city: m[1].trim(), state: m[2].toUpperCase() };
  return { city: frag.trim() || undefined };
};

for (const e of greenlistEntries) {
  const loc = (e.location ?? "").trim();
  if (!loc) continue;
  const lower = loc.toLowerCase();

  if (lower === "multi-location") {
    e.serviceArea = "Multi-location";
    continue;
  }
  if (lower === "us" || lower === "usa" || lower === "nationwide") {
    e.serviceArea = "Nationwide";
    continue;
  }
  if (lower.includes("multi-state") || lower.includes("multi state")) {
    e.serviceArea = "Multi-state";
    continue;
  }

  // Split combined locations on " and " or ";"
  const parts = loc.split(/\s+and\s+|;\s*/i).map((p) => p.trim()).filter(Boolean);
  if (parts.length === 0) continue;

  const [first, ...rest] = parts;
  const primary = parseLocationFragment(first);
  if (primary.city) e.city = primary.city;
  if (primary.state) e.state = primary.state;
  if (rest.length > 0) {
    e.additionalLocations = rest.map(parseLocationFragment);
  }
}

// Returns sorted unique state codes including additionalLocations.
export function getGreenlistStates(): string[] {
  const set = new Set<string>();
  for (const e of greenlistEntries) {
    if (e.state) set.add(e.state);
    e.additionalLocations?.forEach((a) => a.state && set.add(a.state));
  }
  return Array.from(set).sort();
}

// True if entry operates in the given 2-letter state code.
export function entryMatchesState(e: GreenlistEntry, state: string): boolean {
  if (e.state === state) return true;
  return Boolean(e.additionalLocations?.some((a) => a.state === state));
}

// Extract a sorted list of unique location display strings present in the data.
export function getGreenlistLocations(): string[] {
  return Array.from(new Set(greenlistEntries.map((e) => e.location))).sort();
}

export function getGreenlistCounts() {
  const recognized = greenlistEntries.filter((e) => !e.regulatoryAlert);
  return {
    total: greenlistEntries.length,
    recognized: recognized.length,
    "503B": recognized.filter((e) => e.category === "503B").length,
    "503A": recognized.filter((e) => e.category === "503A").length,
    Other: recognized.filter((e) => e.category === "Other").length,
    notRecognized: greenlistEntries.filter((e) => !!e.regulatoryAlert).length,
    statesRepresented: getGreenlistStates().length,
  };
}

export function getGreenlistEntry(slug: string | undefined): GreenlistEntry | undefined {
  if (!slug) return undefined;
  return greenlistEntries.find((e) => e.slug === slug);
}

// ----- Legacy compatibility shim (for homepage §4 panel) -----
// Earlier homepage code consumed a nested `greenlist` array of category sections.
// We expose a minimal compatible shape derived from the new flat registry.
export type LegacyGreenlistSection = {
  category: GreenlistCategory;
  title: string;
};

export const greenlist: LegacyGreenlistSection[] = [
  { category: "503B", title: "503B Outsourcing Facilities" },
  { category: "503A", title: "503A Compounding Pharmacies" },
  { category: "Other", title: "Other Recognized Source Categories" },
];
