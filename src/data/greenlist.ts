export type GreenlistType =
  | "503B Outsourcing Facility"
  | "503A Compounding Pharmacy"
  | "503A + 503B Brand"
  | "503B Partner / Sterile Facility"
  | "Compounding Network"
  | "Other Qualified Source";

export type GreenlistCategory = "503B" | "503A" | "Other";

export type GreenlistEntry = {
  slug: string;
  name: string;
  type: GreenlistType;
  category: GreenlistCategory;
  location: string;
  focus: string;
  website?: string;
  profile?: GreenlistProfile;
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
};

export const greenlistEntries: GreenlistEntry[] = [
  // ---------- 503B Outsourcing Facilities ----------
  {
    slug: "503b-outsourcing-facility-one-llc",
    name: "503B Outsourcing Facility One, LLC",
    type: "503B Outsourcing Facility",
    category: "503B",
    location: "West Palm Beach, FL",
    focus:
      "Sterile compounded drugs from bulk substances for office use; early-stage 503B focused on provider-office sterile products",
    profile: {
      standards: ["cGMP (503B)"],
      dosageForms: ["Sterile injectables"],
      specializations: ["Office-use sterile preparations"],
      background:
        "Florida-based 503B outsourcing facility producing sterile compounded medications from bulk substances for provider-office use. Operates as an early-stage 503B serving prescribers in the Southeast.",
    },
  },
  {
    slug: "ah-nutraceutical-compounding-inc",
    name: "AH Nutraceutical Compounding, Inc.",
    type: "503B Outsourcing Facility",
    category: "503B",
    location: "McQueeny, TX",
    focus:
      "Sterile compounded injectables and nutraceutical preparations produced under 503B for clinics needing office-use stock",
    profile: {
      standards: ["cGMP (503B)"],
      dosageForms: ["Sterile injectables", "Nutraceutical preparations"],
      specializations: ["Wellness clinic stock", "Nutraceutical injectables"],
      background:
        "Texas-based 503B outsourcing facility producing sterile injectables and nutraceutical preparations for wellness and integrative clinics that need office-use stock.",
    },
  },
  {
    slug: "ajenat-pharmaceuticals-llc",
    name: "Ajenat Pharmaceuticals, LLC",
    type: "503B Outsourcing Facility",
    category: "503B",
    location: "Largo, FL",
    focus:
      "Sterile compounded products from bulk drug substances, serving prescribers and clinics; newly registered 503B",
    profile: {
      standards: ["cGMP (503B)"],
      dosageForms: ["Sterile injectables"],
      background:
        "Newly registered FDA 503B outsourcing facility in Largo, FL, producing sterile compounded medications from bulk drug substances for prescribers and clinics.",
    },
  },
  {
    slug: "anazaohealth-corporation",
    name: "AnazaoHealth Corporation",
    type: "503B Outsourcing Facility",
    category: "503B",
    location: "Las Vegas, NV",
    focus:
      "Sterile compounded injectables for pain management, nuclear medicine, hospice, and wellness protocols; long-standing 503B",
    website: "https://anazaohealth.com",
    profile: {
      designation: "503B Outsourcing Facility",
      standards: ["cGMP (503B)"],
      dosageForms: ["Sterile injectables", "Pellets", "Topicals"],
      specializations: ["Pain management", "Nuclear medicine", "Hormone therapy", "Hospice"],
      background:
        "AnazaoHealth is a long-standing FDA-registered 503B outsourcing facility headquartered in Las Vegas, NV, serving prescribers and clinics with office-use sterile compounded preparations across pain, hospice, and specialty practices.",
    },
  },
  {
    slug: "apollo-care",
    name: "Apollo Care",
    type: "503B Outsourcing Facility",
    category: "503B",
    location: "Columbia, MO",
    focus: "Sterile compounded injectables for hospital and clinic use",
    website: "https://apollocare.com",
    profile: {
      designation: "503B Outsourcing Facility",
      standards: ["cGMP (503B)"],
      dosageForms: ["Sterile injectables"],
      background:
        "FDA-registered 503B outsourcing facility producing sterile compounded medications for hospital and clinic office-use stock.",
    },
  },
  {
    slug: "apocus-inc",
    name: "Apocus, Inc.",
    type: "503B Outsourcing Facility",
    category: "503B",
    location: "San Antonio, TX",
    focus:
      "Sterile drug compounding from bulk substances for office stock and hospital partners",
    website: "https://apocuspharma.com",
  },
  {
    slug: "assure-infusions-inc",
    name: "Assure Infusions, Inc.",
    type: "503B Outsourcing Facility",
    category: "503B",
    location: "Bartow, FL",
    focus: "Sterile IV solutions and infusions supplying hospitals and clinics",
    website: "https://assureinfusions.com",
    profile: {
      designation: "503B Outsourcing Facility",
      standards: ["cGMP (503B)"],
      dosageForms: ["IV solutions", "Sterile infusions", "Prefilled syringes"],
      specializations: ["Hospital admixtures", "Clinic infusion stock"],
      background:
        "FDA-registered 503B outsourcing facility based in Bartow, FL, producing ready-to-use sterile IV solutions and infusion products for hospital and clinic environments.",
    },
  },
  {
    slug: "farmakeio-outsourcing-llc",
    name: "Farmakeio Outsourcing LLC",
    type: "503B Outsourcing Facility",
    category: "503B",
    location: "Southlake, TX",
    focus:
      "Sterile compounded injectables for hormone therapy and clinical wellness protocols, manufacturer of office-use sterile products",
    website: "https://farmakeio.com",
  },
  {
    slug: "fagron-compounding-services-dba-fagron-sterile-services",
    name: "Fagron Compounding Services dba Fagron Sterile Services",
    type: "503B Outsourcing Facility",
    category: "503B",
    location: "Wichita, KS",
    focus: "High-volume sterile compounding for hospitals and clinics nationwide",
    website: "https://fagronsterileservices.com",
    profile: {
      designation: "503B Outsourcing Facility",
      standards: ["cGMP (503B)"],
      dosageForms: ["Sterile injectables", "IV admixtures", "Prefilled syringes", "Ophthalmics"],
      specializations: ["Hospital sterile compounding", "Drug-shortage support"],
      background:
        "Wichita, KS-based 503B outsourcing facility within the global Fagron group, producing sterile compounded medications at scale for hospitals and clinics nationwide.",
    },
  },
  {
    slug: "ourpharma-llc",
    name: "OurPharma LLC",
    type: "503B Outsourcing Facility",
    category: "503B",
    location: "Fayetteville, AR",
    focus:
      "Sterile ready-to-use medications for hospitals, ambulatory centers, and clinics",
    website: "https://ourpharma.com",
    profile: {
      designation: "503B Outsourcing Facility",
      standards: ["cGMP (503B)"],
      dosageForms: ["Sterile injectables", "Prefilled syringes", "Ready-to-use medications"],
      specializations: ["Hospital admixtures", "Ambulatory surgical center stock"],
      background:
        "FDA-registered 503B outsourcing facility in Fayetteville, AR, manufacturing ready-to-use sterile medications for hospitals, ambulatory centers, and clinics.",
    },
  },
  {
    slug: "park-avenue-compounding",
    name: "Park Avenue Compounding",
    type: "503B Outsourcing Facility",
    category: "503B",
    location: "St. Louis, MO",
    focus: "Sterile preparations including injectables for office-based practices",
    website: "https://parkavenuecompounding.com",
  },
  {
    slug: "sca-pharmaceuticals",
    name: "SCA Pharmaceuticals",
    type: "503B Outsourcing Facility",
    category: "503B",
    location: "Windsor, CT",
    focus:
      "Ready-to-use sterile admixtures, prefilled syringes, and drug-shortage medications for hospital systems",
    website: "https://scapharma.com",
    profile: {
      designation: "503B Outsourcing Facility",
      standards: ["cGMP (503B)"],
      dosageForms: ["IV admixtures", "Prefilled syringes", "IV bags", "Ready-to-use injectables"],
      specializations: ["Hospital pharmacy support", "Drug-shortage response", "Anesthesia & critical care"],
      background:
        "SCA Pharmaceuticals operates FDA-registered 503B outsourcing facilities supplying ready-to-use sterile admixtures and prefilled syringes to hospital systems nationwide, with a focus on drug-shortage and critical-care medications.",
    },
  },
  {
    slug: "sknv-formerly-sincerus-florida-llc",
    name: "SKNV (formerly Sincerus Florida, LLC)",
    type: "503B Outsourcing Facility",
    category: "503B",
    location: "Pompano Beach, FL",
    focus:
      "Dermatology-focused sterile and nonsterile compounded preparations including injectables and topicals",
    website: "https://sknvrx.com",
  },
  {
    slug: "osrx-inc",
    name: "OSRX, Inc.",
    type: "503B Outsourcing Facility",
    category: "503B",
    location: "Missoula, MT",
    focus:
      "Ophthalmology-focused sterile eye drops and injectables for ophthalmic practices",
    website: "https://osrxpharmaceutical.com",
    profile: {
      designation: "503B Outsourcing Facility",
      standards: ["cGMP (503B)"],
      dosageForms: ["Sterile ophthalmic drops", "Sterile injectables"],
      specializations: ["Ophthalmology", "Cataract & retina practice support"],
      background:
        "OSRX is an FDA-registered 503B outsourcing facility focused on ophthalmic sterile preparations, supplying eye-care practices with compounded drops and injectables.",
    },
  },
  {
    slug: "quva-pharma-inc",
    name: "QuVa Pharma, Inc.",
    type: "503B Outsourcing Facility",
    category: "503B",
    location: "Sugar Land, TX",
    focus:
      "National sterile compounding provider supplying IV admixtures, anesthesia, and critical-care medications",
    website: "https://quvapharma.com",
    profile: {
      designation: "503B Outsourcing Facility",
      standards: ["cGMP (503B)"],
      dosageForms: ["IV admixtures", "Prefilled syringes", "Sterile injectables"],
      specializations: ["Anesthesia", "Critical care", "Hospital pharmacy support"],
      background:
        "QuVa Pharma is a national 503B outsourcing facility provider headquartered in Sugar Land, TX, supplying ready-to-administer sterile compounded medications to hospitals across the United States.",
    },
  },
  {
    slug: "rc-outsourcing-llc",
    name: "RC Outsourcing, LLC",
    type: "503B Outsourcing Facility",
    category: "503B",
    location: "Houston, TX",
    focus:
      "Sterile compounded injectables under 503B for hospital and clinic office-use stock",
  },
  {
    slug: "staq-pharma-inc",
    name: "STAQ Pharma, Inc.",
    type: "503B Outsourcing Facility",
    category: "503B",
    location: "Denver, CO and Columbus, OH",
    focus:
      "Pediatric and hospital sterile injectables and oral liquids; ready-to-use compounded medications for health systems",
    website: "https://staqpharma.com",
    profile: {
      designation: "503B Outsourcing Facility",
      standards: ["cGMP (503B)"],
      dosageForms: ["Sterile injectables", "Oral liquids", "Prefilled syringes"],
      specializations: ["Pediatric formulations", "Hospital ready-to-use medications"],
      background:
        "STAQ Pharma operates FDA-registered 503B outsourcing facilities in Denver, CO and Columbus, OH, focused on ready-to-use sterile compounded medications for hospitals and health systems, including pediatric formulations.",
    },
  },
  {
    slug: "stokes-healthcare-inc",
    name: "Stokes Healthcare, Inc.",
    type: "503B Outsourcing Facility",
    category: "503B",
    location: "Mount Laurel, NJ",
    focus:
      "Sterile compounded medications for hospitals and clinics, focusing on pain, anesthesia, and critical-care support",
    website: "https://stokeshealthcare.com",
  },
  {
    slug: "tailstorm-health-inc",
    name: "Tailstorm Health, Inc.",
    type: "503B Outsourcing Facility",
    category: "503B",
    location: "US",
    focus: "Sterile compounded injectables for office-based procedures and clinics",
    website: "https://tailstormhealth.com",
  },
  {
    slug: "wedgewood-connect-llc",
    name: "Wedgewood Connect, LLC",
    type: "503B Outsourcing Facility",
    category: "503B",
    location: "Swedesboro, NJ",
    focus: "Sterile medications for hospitals and specialty practices",
    website: "https://wedgewoodconnect.com",
    profile: {
      designation: "503B Outsourcing Facility",
      standards: ["cGMP (503B)"],
      dosageForms: ["Sterile injectables"],
      specializations: ["Hospital and specialty practice sterile preparations"],
      background:
        "Wedgewood Connect is the 503B outsourcing arm associated with the broader Wedgewood compounding organization, producing sterile compounded medications for hospitals and specialty practices.",
    },
  },
  {
    slug: "wells-pharma-of-houston-llc",
    name: "Wells Pharma of Houston, LLC",
    type: "503B Outsourcing Facility",
    category: "503B",
    location: "Houston, TX",
    focus:
      "Sterile compounded IV and injectable medications for hospitals, surgery centers, and clinics",
    website: "https://wellspharma.com",
  },

  // ---------- 503A Compounding Pharmacies ----------
  {
    slug: "empower-pharmacy",
    name: "Empower Pharmacy",
    type: "503A Compounding Pharmacy",
    category: "503A",
    location: "Houston, TX",
    focus:
      "Patient-specific peptide, hormone, GLP-1 support, and wellness medications on individual prescriptions",
    website: "https://empowerpharmacy.com",
    profile: {
      designation: "503A Compounding Pharmacy",
      standards: ["USP <797>", "USP <800>", "USP <795>"],
      dosageForms: ["Sterile injectables", "Oral capsules", "Topicals"],
      specializations: ["Hormone therapy", "Peptides", "GLP-1 support", "Men's & women's health"],
      background:
        "Houston-based 503A compounding pharmacy serving patient-specific prescriptions across hormone, peptide, and wellness categories, paired operationally with a sister 503B facility.",
    },
  },
  {
    slug: "empower-pharma",
    name: "Empower Pharma",
    type: "503B Partner / Sterile Facility",
    category: "503A",
    location: "Houston, TX",
    focus:
      "Sister 503B facility manufacturing bulk sterile medications used by clinics and telehealth platforms for hormones, peptides, and wellness protocols",
    website: "https://empowerpharma.com",
    profile: {
      designation: "503B Outsourcing Facility",
      standards: ["cGMP (503B)"],
      dosageForms: ["Sterile injectables", "Office-use bulk sterile preparations"],
      specializations: ["Hormone therapy", "Peptides", "Wellness protocols"],
      background:
        "Sister 503B outsourcing facility to Empower Pharmacy, producing office-use sterile compounded preparations under cGMP for clinics and telehealth platforms operating in hormone, peptide, and wellness categories.",
    },
  },
  {
    slug: "olympia-pharmacy-olympia-pharmaceuticals",
    name: "Olympia Pharmacy / Olympia Pharmaceuticals",
    type: "503A + 503B Brand",
    category: "503A",
    location: "Orlando, FL",
    focus:
      "Compounded injectables used in weight-loss and hormone programs, plus 503B support for IV and wellness therapies",
    website: "https://olympiapharmacy.com",
  },
  {
    slug: "wells-pharmacy-network",
    name: "Wells Pharmacy Network",
    type: "503A Compounding Pharmacy",
    category: "503A",
    location: "Ocala, FL",
    focus:
      "Hormone optimization, peptides, weight-management protocols, and wellness compounding",
    website: "https://wellsrx.com",
  },
  {
    slug: "tailor-made-compounding",
    name: "Tailor Made Compounding",
    type: "503A Compounding Pharmacy",
    category: "503A",
    location: "Nicholasville, KY",
    focus:
      "Tailored formulations including peptides, hormones, and regenerative medicine preparations for wellness clinics",
    website: "https://tailormadecompounding.com",
  },
  {
    slug: "newtropin-formulation-compounding-center",
    name: "Newtropin (Formulation Compounding Center)",
    type: "503A Compounding Pharmacy",
    category: "503A",
    location: "US",
    focus:
      "Compounded peptide therapies and anti-aging protocols, including growth-hormone-related and nootropic formulations",
    website: "https://newtropin.com",
  },
  {
    slug: "triangle-compounding",
    name: "Triangle Compounding",
    type: "503A Compounding Pharmacy",
    category: "503A",
    location: "Cary, NC",
    focus: "Sterile and nonsterile compounds including hormones and specialty injectables",
    website: "https://trianglecompounding.com",
  },
  {
    slug: "pencol-specialty-pharmacy",
    name: "Pencol Specialty Pharmacy",
    type: "503A Compounding Pharmacy",
    category: "503A",
    location: "Denver, CO",
    focus: "Custom compounds in pain, hormone therapy, and wellness formulations",
    website: "https://pencolpharmacy.com",
  },
  {
    slug: "vertisis-custom-pharmacy",
    name: "Vertisis Custom Pharmacy",
    type: "503A Compounding Pharmacy",
    category: "503A",
    location: "Phoenix, AZ",
    focus:
      "Integrative and functional medicine compounds including vitamin and peptide injectables for wellness clinics",
    website: "https://vertisis.com",
  },
  {
    slug: "pavilion-compounding-pharmacy-llc",
    name: "Pavilion Compounding Pharmacy, LLC",
    type: "503A Compounding Pharmacy",
    category: "503A",
    location: "Atlanta, GA",
    focus:
      "Sterile and nonsterile compounding with strong presence in hormone replacement, wellness, and dermatology formulations",
    website: "https://pavilioncompounding.com",
  },
  {
    slug: "village-compounding-pharmacy",
    name: "Village Compounding Pharmacy",
    type: "503A Compounding Pharmacy",
    category: "503A",
    location: "Houston, TX",
    focus:
      "Hormone optimization, wellness injectables, and specialty compounded medications",
    website: "https://villagecompounding.com",
  },
  {
    slug: "mcguff-compounding-pharmacy",
    name: "McGuff Compounding Pharmacy",
    type: "503A Compounding Pharmacy",
    category: "503A",
    location: "Santa Ana, CA",
    focus:
      "Sterile injectables, vitamin and IV, and wellness products for integrative and functional medicine clinics",
    website: "https://mcguffpharmacy.com",
  },
  {
    slug: "wedgewood-pharmacy",
    name: "Wedgewood Pharmacy",
    type: "503A Compounding Pharmacy",
    category: "503A",
    location: "Swedesboro, NJ",
    focus:
      "Large compounding operation with human and veterinary presence; related 503B arm handles sterile hospital products",
    website: "https://wedgewoodpharmacy.com",
    profile: {
      designation: "503A Compounding Pharmacy",
      standards: ["USP <797>", "USP <800>", "USP <795>"],
      dosageForms: ["Sterile injectables", "Oral", "Topicals"],
      specializations: ["Human compounding", "Veterinary compounding", "Specialty practice support"],
      background:
        "One of the largest compounding pharmacies in the United States, with both human and veterinary lines and a related 503B outsourcing arm that supplies sterile hospital products.",
    },
  },
  {
    slug: "fagron",
    name: "Fagron",
    type: "Compounding Network",
    category: "503A",
    location: "Multi-location",
    focus:
      "Hormones, dermatology, and sterile injectables across compounding operations",
    website: "https://fagron.com",
  },
  {
    slug: "b-braun",
    name: "B. Braun",
    type: "Other Qualified Source",
    category: "503A",
    location: "Bethlehem, PA",
    focus:
      "Hospital-focused compounding and admixture services, including ready-to-use sterile solutions",
    website: "https://bbraunusa.com",
    profile: {
      designation: "FDA-registered drug manufacturer; hospital admixture services",
      standards: ["cGMP"],
      dosageForms: ["IV solutions", "Sterile admixtures", "Infusion therapy products"],
      specializations: ["Hospital pharmacy support", "Infusion therapy", "Critical care"],
      background:
        "Global medical and pharmaceutical company with US headquarters in Bethlehem, PA, producing IV solutions, infusion therapy products, and providing hospital-focused admixture services under cGMP.",
    },
  },
  {
    slug: "optum",
    name: "Optum",
    type: "Other Qualified Source",
    category: "503A",
    location: "US multi-state",
    focus:
      "Compounded medications integrated into specialty and PBM offerings, including sterile compounds for specific clinical programs",
    website: "https://optum.com",
  },
];

export const GREENLIST_TYPES: GreenlistType[] = [
  "503B Outsourcing Facility",
  "503A Compounding Pharmacy",
  "503A + 503B Brand",
  "503B Partner / Sterile Facility",
  "Compounding Network",
  "Other Qualified Source",
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

// Extract a sorted list of unique location values present in the data.
export function getGreenlistLocations(): string[] {
  return Array.from(new Set(greenlistEntries.map((e) => e.location))).sort();
}

export function getGreenlistCounts() {
  return {
    total: greenlistEntries.length,
    "503B": greenlistEntries.filter((e) => e.category === "503B").length,
    "503A": greenlistEntries.filter((e) => e.category === "503A").length,
    Other: greenlistEntries.filter((e) => e.category === "Other").length,
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
