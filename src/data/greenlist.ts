export type GreenlistCategory = "503B" | "503A" | "Other";

export type GreenlistEntry = {
  name: string;
  jurisdiction: string;
  registration: string;
  status: "Listed" | "Example listing";
  notes?: string;
};

export type GreenlistSection = {
  category: GreenlistCategory;
  title: string;
  description: string;
  criteria: string[];
  entries: GreenlistEntry[];
};

export const greenlist: GreenlistSection[] = [
  {
    category: "503B",
    title: "503B Outsourcing Facilities",
    description:
      "FDA-registered outsourcing facilities operating under Section 503B of the Federal Food, Drug, and Cosmetic Act. Subject to current good manufacturing practice (cGMP) standards and ongoing FDA inspection.",
    criteria: [
      "Active FDA 503B registration",
      "Current good manufacturing practice (cGMP) compliance",
      "Documented batch records and stability data",
      "No outstanding FDA Form 483 observations of material concern",
    ],
    entries: [
      {
        name: "Example Outsourcing Facility, LLC",
        jurisdiction: "FL",
        registration: "FDA 503B",
        status: "Example listing",
        notes: "Live Database • Last Updated April 20, 2026",
      },
    ],
  },
  {
    category: "503A",
    title: "503A Compounding Pharmacies",
    description:
      "State-licensed compounding pharmacies operating under Section 503A. Compounding occurs pursuant to a valid prescription for an individually identified patient.",
    criteria: [
      "Active state pharmacy license in good standing",
      "Patient-specific prescription requirement on file",
      "Documented sourcing for active pharmaceutical ingredients",
      "Adherence to USP <795> and <797> standards",
    ],
    entries: [
      {
        name: "Example Compounding Pharmacy",
        jurisdiction: "FL",
        registration: "State Board of Pharmacy",
        status: "Example listing",
        notes: "Live Database • Last Updated April 20, 2026",
      },
    ],
  },
  {
    category: "Other",
    title: "Other Greenlit Standards",
    description:
      "Additional upstream sources recognized under the Source Standard framework, including licensed clinical practices and credentialed laboratories.",
    criteria: [
      "Verifiable state or federal licensing",
      "Documented chain-of-custody for materials handled",
      "Independent third-party testing where applicable",
    ],
    entries: [],
  },
];
