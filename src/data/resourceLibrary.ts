// Shared resource-library content model. Used by both the main library hub
// (`/education`) and the dedicated category sub-pages (`/library/sourcing`,
// `/library/clinical`, `/library/consumer`).

export type CategoryId = "regulation" | "clinical" | "consumer";

export type Article = {
  slug: string;
  title: string;
  blurb: string;
  meta: string; // display label, e.g. "6 min read · Apr 2026"
  publishedAt: string; // ISO date, used for sorting
  category: CategoryId;
};

export type Category = {
  id: CategoryId;
  label: string;
  short: string;
  description: string;
  path: string; // dedicated sub-page route
};

const SLUG_ROUTE_OVERRIDES: Record<string, string> = {
  "what-is-compounding": "/library/what-is-compounding",
  "what-are-peptides": "/library/what-are-peptides",
  "how-to-read-a-certificate-of-analysis": "/library/interpreting-coas",
  "the-dual-layer-difference": "/library/dual-layer-difference",
  "safe-peptide-handling-and-reconstitution": "/library/sterile-preparation-integrity",
  "sanitization-and-aseptic-technique-fundamentals": "/library/aseptic-technique",
  "the-science-of-aging-and-trt": "/library/endocrinological-context",
  "dosing-guidance-summaries-for-common-compounds": "/library/reference-dosing-ranges",
  "the-2026-compounding-reclassification": "/library/analysis/2026-reclassification",
  "questions-to-ask-your-clinic": "/library/analysis/questions-for-your-clinic",
  "what-source-standard-verification-actually-means": "/library/analysis/meaning-of-verification",
  "warning-signs-of-undocumented-sourcing": "/library/analysis/undocumented-sourcing-signs",
};

export const routeForArticle = (slug: string) =>
  SLUG_ROUTE_OVERRIDES[slug] ?? `/education/${slug}`;

export const CATEGORIES: Category[] = [
  {
    id: "regulation",
    label: "Sourcing & Regulation",
    short: "Regulation",
    description:
      "Statutory framework, facility classifications, and verification methodology.",
    path: "/library/sourcing",
  },
  {
    id: "clinical",
    label: "Clinical Handling",
    short: "Clinical",
    description:
      "Sterile technique, stability, and clinical context reviewed under the Medical Advisory Board.",
    path: "/library/clinical",
  },
  {
    id: "consumer",
    label: "Consumer Due Diligence",
    short: "Consumer",
    description:
      "Patient-facing checklists and signal interpretation for evaluating clinics and sources.",
    path: "/library/consumer",
  },
];

export const findCategory = (id: CategoryId) =>
  CATEGORIES.find((c) => c.id === id);

export const ARTICLES: Article[] = [
  // Regulation
  {
    slug: "what-is-compounding",
    title: "What is Compounding?",
    blurb: "The critical difference between 503A and 503B facilities.",
    meta: "6 min read · Apr 2026",
    publishedAt: "2026-04-12",
    category: "regulation",
  },
  {
    slug: "the-2026-compounding-reclassification",
    title: "The 2026 Regulatory Shift",
    blurb: "Implications of the recent compounding reclassifications.",
    meta: "8 min read · Apr 2026",
    publishedAt: "2026-04-04",
    category: "regulation",
  },
  {
    slug: "how-to-read-a-certificate-of-analysis",
    title: "Interpreting CoAs",
    blurb: "Reading lab reports and detecting sourcing discrepancies.",
    meta: "7 min read · Mar 2026",
    publishedAt: "2026-03-22",
    category: "regulation",
  },
  {
    slug: "the-dual-layer-difference",
    title: "The Dual-Layer Audit",
    blurb: "Why we verify both the clinic and the manufacturer.",
    meta: "5 min read · Mar 2026",
    publishedAt: "2026-03-08",
    category: "regulation",
  },
  // Clinical
  {
    slug: "safe-peptide-handling-and-reconstitution",
    title: "Sterile Handling Protocol",
    blurb: "Best practices for reconstitution and aseptic storage.",
    meta: "6 min read · Apr 2026",
    publishedAt: "2026-04-15",
    category: "clinical",
  },
  {
    slug: "sanitization-and-aseptic-technique-fundamentals",
    title: "Stability Fundamentals",
    blurb: "How temperature, light, and time affect peptide integrity.",
    meta: "5 min read · Mar 2026",
    publishedAt: "2026-03-19",
    category: "clinical",
  },
  {
    slug: "the-science-of-aging-and-trt",
    title: "Endocrinological Context",
    blurb: "Age-related change and TRT mechanisms.",
    meta: "9 min read · Feb 2026",
    publishedAt: "2026-02-24",
    category: "clinical",
  },
  {
    slug: "dosing-guidance-summaries-for-common-compounds",
    title: "Dosing Reference",
    blurb: "Summaries of commonly cited clinical dosing ranges.",
    meta: "10 min read · Feb 2026",
    publishedAt: "2026-02-10",
    category: "clinical",
  },
  // Consumer
  {
    slug: "questions-to-ask-your-clinic",
    title: "The Clinic Checklist",
    blurb: "Five essential questions to ask a clinic about sourcing.",
    meta: "4 min read · Apr 2026",
    publishedAt: "2026-04-09",
    category: "consumer",
  },
  {
    slug: "warning-signs-of-undocumented-sourcing",
    title: "Warning Signs",
    blurb: "Identifying undocumented vendors and unsupported sourcing claims.",
    meta: "6 min read · Mar 2026",
    publishedAt: "2026-03-27",
    category: "consumer",
  },
  {
    slug: "what-source-standard-verification-actually-means",
    title: "Verification Scope",
    blurb: "What a Verified listing establishes and what it does not establish.",
    meta: "5 min read · Mar 2026",
    publishedAt: "2026-03-14",
    category: "consumer",
  },
  {
    slug: "what-are-peptides",
    title: "Sterile Injection Guide",
    blurb: "Safe handling and disposal guidance for injectable preparations.",
    meta: "7 min read · Feb 2026",
    publishedAt: "2026-02-28",
    category: "consumer",
  },
];

export const articlesByCategory = (id: CategoryId) =>
  ARTICLES.filter((a) => a.category === id);

export const sortArticles = (
  list: Article[],
  mode: "newest" | "oldest" | "title",
): Article[] => {
  const copy = [...list];
  switch (mode) {
    case "newest":
      return copy.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    case "oldest":
      return copy.sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));
    case "title":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
  }
};
