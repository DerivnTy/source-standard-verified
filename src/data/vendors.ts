export type VerificationStatus = "verified" | "pending" | "unverified" | "expired";

export type Vendor = {
  slug: string;
  name: string;
  category: "Peptides" | "TRT Clinic" | "Hormone Optimization" | "Wellness";
  location: string;
  status: VerificationStatus;
  verifiedSince?: string;
  reviewId?: string;
  summary: string;
  documentation: {
    label: string;
    status: "On file" | "Verified" | "Not provided";
    note?: string;
  }[];
};

export const vendors: Vendor[] = [
  {
    slug: "meridian-peptide-labs",
    name: "Meridian Peptide Labs",
    category: "Peptides",
    location: "Austin, TX",
    status: "verified",
    verifiedSince: "2024-11",
    reviewId: "SS-2024-00184",
    summary:
      "Independent compounding supplier providing documented sourcing records and third-party certificates of analysis for each released lot.",
    documentation: [
      { label: "Business Licensing", status: "Verified" },
      { label: "Upstream Supplier Records", status: "Verified" },
      { label: "Certificates of Analysis (per lot)", status: "Verified" },
      { label: "Facility Registration", status: "On file" },
    ],
  },
  {
    slug: "northbridge-hormone-clinic",
    name: "Northbridge Hormone Clinic",
    category: "TRT Clinic",
    location: "Denver, CO",
    status: "verified",
    verifiedSince: "2025-01",
    reviewId: "SS-2025-00021",
    summary:
      "Licensed clinical practice with documented prescriber credentials, pharmacy partnerships, and chain-of-custody documentation.",
    documentation: [
      { label: "State Medical Licensing", status: "Verified" },
      { label: "Prescriber Credentials", status: "Verified" },
      { label: "Pharmacy Partnership Records", status: "Verified" },
      { label: "Patient Intake Compliance", status: "On file" },
    ],
  },
  {
    slug: "atlas-hormone-co",
    name: "Atlas Hormone Co.",
    category: "Hormone Optimization",
    location: "Miami, FL",
    status: "pending",
    summary:
      "Application under review. Initial documentation has been submitted and is being validated against upstream standards.",
    documentation: [
      { label: "Business Licensing", status: "On file" },
      { label: "Upstream Supplier Records", status: "On file" },
      { label: "Certificates of Analysis", status: "Not provided" },
    ],
  },
  {
    slug: "havenwood-wellness",
    name: "Havenwood Wellness",
    category: "Wellness",
    location: "Seattle, WA",
    status: "verified",
    verifiedSince: "2024-09",
    reviewId: "SS-2024-00097",
    summary:
      "Wellness practice with verified licensing and documented sourcing for all distributed compounds.",
    documentation: [
      { label: "Business Licensing", status: "Verified" },
      { label: "Supplier Documentation", status: "Verified" },
      { label: "Certificates of Analysis", status: "Verified" },
    ],
  },
  {
    slug: "ironclad-research",
    name: "Ironclad Research Supply",
    category: "Peptides",
    location: "Phoenix, AZ",
    status: "unverified",
    summary:
      "No active verification on file. This vendor has not submitted documentation to Source Standard.",
    documentation: [],
  },
  {
    slug: "summit-trt",
    name: "Summit TRT",
    category: "TRT Clinic",
    location: "Salt Lake City, UT",
    status: "verified",
    verifiedSince: "2025-02",
    reviewId: "SS-2025-00058",
    summary:
      "Telehealth-enabled clinic with documented multi-state licensing and verified pharmacy chain-of-custody.",
    documentation: [
      { label: "State Medical Licensing (multi-state)", status: "Verified" },
      { label: "Prescriber Credentials", status: "Verified" },
      { label: "Pharmacy Partnership Records", status: "Verified" },
    ],
  },
  {
    slug: "bayline-compounding",
    name: "Bayline Compounding",
    category: "Peptides",
    location: "San Diego, CA",
    status: "expired",
    verifiedSince: "2023-08",
    summary:
      "Previously verified. Verification has lapsed pending updated documentation submission.",
    documentation: [
      { label: "Business Licensing", status: "On file", note: "Renewal pending" },
      { label: "Certificates of Analysis", status: "Not provided" },
    ],
  },
];

export const getVendor = (slug: string) => vendors.find((v) => v.slug === slug);
