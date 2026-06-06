// Shared resource-library content model. Used by both the main library hub
// (`/education`) and the dedicated section sub-pages (`/library/core`,
// `/library/latest`).

export type CategoryId = "core" | "latest";

export type Article = {
  slug: string;
  title: string;
  blurb: string;
  meta: string; // display label, e.g. "Updated Apr 2026"
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
    id: "core",
    label: "Core Reference Library",
    short: "Core Reference",
    description:
      "Permanent resources explaining vendor verification, facility relationships, sourcing claims, documentation review, and public registry status.",
    path: "/library/core",
  },
  {
    id: "latest",
    label: "Latest Publications",
    short: "Latest",
    description:
      "Recent articles, industry updates, educational commentary, and emerging topics related to compounded therapy sourcing and transparency.",
    path: "/library/latest",
  },
];

export const findCategory = (id: CategoryId) =>
  CATEGORIES.find((c) => c.id === id);

export const ARTICLES: Article[] = [
  // ─── Core Reference Library ──────────────────────────────────────────
  {
    slug: "what-is-compounding",
    title: "What Is Compounding?",
    blurb:
      "An introduction to pharmacy compounding and why facility type matters when evaluating a sourcing claim.",
    meta: "Updated Apr 2026",
    publishedAt: "2026-04-21",
    category: "core",
  },
  {
    slug: "safe-peptide-handling-and-reconstitution",
    title: "Why Supply Chains Matter in Compounded Therapy",
    blurb:
      "How compounded medications move through facilities, vendors, and consumers — and why sourcing transparency matters.",
    meta: "Updated Apr 2026",
    publishedAt: "2026-04-21",
    category: "core",
  },
  {
    slug: "the-dual-layer-difference",
    title: "Understanding Vendor Verification and Facility Transparency",
    blurb:
      "Why both vendor records and facility records matter when evaluating compounded therapy sourcing claims.",
    meta: "Updated Apr 2026",
    publishedAt: "2026-04-21",
    category: "core",
  },
  {
    slug: "how-to-read-a-certificate-of-analysis",
    title: "Understanding Certificates of Analysis",
    blurb:
      "How laboratory reports are used, what information they contain, and why documentation should always be reviewed carefully.",
    meta: "Updated Apr 2026",
    publishedAt: "2026-04-21",
    category: "core",
  },
  {
    slug: "what-are-peptides",
    title: "Claims vs. Documentation",
    blurb:
      "How to distinguish general product claims from reviewable sourcing documentation.",
    meta: "Updated Apr 2026",
    publishedAt: "2026-04-21",
    category: "core",
  },
  {
    slug: "what-source-standard-verification-actually-means",
    title: "Understanding Verification Scope",
    blurb:
      "What a Verified listing establishes and what it does not establish.",
    meta: "Updated Apr 2026",
    publishedAt: "2026-04-21",
    category: "core",
  },
  {
    slug: "questions-to-ask-your-clinic",
    title: "Vendor Evaluation Checklist",
    blurb:
      "Questions consumers can ask about sourcing, pharmacy relationships, documentation, and review status.",
    meta: "Updated Apr 2026",
    publishedAt: "2026-04-21",
    category: "core",
  },
  {
    slug: "warning-signs-of-undocumented-sourcing",
    title: "Warning Signs and Red Flags",
    blurb:
      "Common patterns in unsupported sourcing claims and undocumented vendor presentations.",
    meta: "Updated Apr 2026",
    publishedAt: "2026-04-21",
    category: "core",
  },

  // ─── Latest Publications ─────────────────────────────────────────────
  {
    slug: "the-2026-compounding-reclassification",
    title: "Understanding Regulatory Changes in Compounding",
    blurb:
      "How regulatory updates can affect compounded medications, sourcing pathways, and supply-chain transparency.",
    meta: "Updated Apr 2026",
    publishedAt: "2026-04-21",
    category: "latest",
  },
  {
    slug: "sanitization-and-aseptic-technique-fundamentals",
    title: "Stability Fundamentals",
    blurb:
      "How temperature, light, time, and storage records can affect review context for compounded products.",
    meta: "Updated Mar 2026",
    publishedAt: "2026-03-19",
    category: "latest",
  },
  {
    slug: "the-science-of-aging-and-trt",
    title: "Hormone Therapy Context",
    blurb:
      "Reference terminology for TRT, HRT, and related compounded therapy categories.",
    meta: "Updated Feb 2026",
    publishedAt: "2026-02-24",
    category: "latest",
  },
  {
    slug: "dosing-guidance-summaries-for-common-compounds",
    title: "Scope of Clinical References",
    blurb:
      "How Source Standard separates public education from individualized medical advice or treatment guidance.",
    meta: "Updated Feb 2026",
    publishedAt: "2026-02-10",
    category: "latest",
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
