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
  "the-2026-compounding-reclassification": "/library/analysis/2026-reclassification",
  "questions-to-ask-your-clinic": "/library/analysis/questions-for-your-clinic",
  "what-source-standard-verification-actually-means": "/library/analysis/meaning-of-verification",
  "warning-signs-of-undocumented-sourcing": "/library/analysis/undocumented-sourcing-signs",
  "why-vendor-transparency-matters": "/library/why-vendor-transparency-matters",
  "what-happens-during-a-verification-review": "/library/what-happens-during-a-verification-review",
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
      "Recent articles, framework updates, industry developments, and sourcing-transparency topics relevant to consumers, vendors, and healthcare organizations.",
    path: "/library/publications",
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
      "Understanding the difference between 503A pharmacies, 503B outsourcing facilities, and how compounded medications enter the supply chain.",
    meta: "Updated Apr 2026",
    publishedAt: "2026-04-21",
    category: "core",
  },
  {
    slug: "safe-peptide-handling-and-reconstitution",
    title: "Why Supply Chains Matter in Compounded Therapy",
    blurb:
      "How medications move through facilities, vendors, and distribution channels, and why sourcing transparency matters.",
    meta: "Updated Apr 2026",
    publishedAt: "2026-04-21",
    category: "core",
  },
  {
    slug: "the-dual-layer-difference",
    title: "Understanding Vendor Verification & Facility Transparency",
    blurb:
      "Why vendor records and facility records provide different pieces of the sourcing transparency picture.",
    meta: "Updated Apr 2026",
    publishedAt: "2026-04-21",
    category: "core",
  },
  {
    slug: "how-to-read-a-certificate-of-analysis",
    title: "Understanding Certificates of Analysis",
    blurb:
      "What Certificates of Analysis show, what they do not show, and why documentation should be reviewed carefully.",
    meta: "Updated Apr 2026",
    publishedAt: "2026-04-21",
    category: "core",
  },
  {
    slug: "what-are-peptides",
    title: "Understanding Peptides",
    blurb:
      "What peptides are, how they appear in research and medicine, and why sourcing transparency and facility disclosure matter for compounded peptide products.",
    meta: "Updated Apr 2026",
    publishedAt: "2026-04-21",
    category: "core",
  },
  {
    slug: "what-source-standard-verification-actually-means",
    title: "Understanding Verification Scope",
    blurb:
      "What Source Standard verification establishes, what it does not establish, and why verification has defined limits.",
    meta: "Updated Apr 2026",
    publishedAt: "2026-04-21",
    category: "core",
  },
  {
    slug: "questions-to-ask-your-clinic",
    title: "Questions to Ask About Sourcing",
    blurb:
      "A neutral set of sourcing-transparency questions consumers can use when evaluating a compounded-medication provider.",
    meta: "Updated Apr 2026",
    publishedAt: "2026-04-21",
    category: "core",
  },
  {
    slug: "warning-signs-of-undocumented-sourcing",
    title: "Transparency Concerns & Documentation Gaps",
    blurb:
      "Common transparency concerns, unsupported sourcing claims, and documentation gaps consumers should understand.",
    meta: "Updated Apr 2026",
    publishedAt: "2026-04-21",
    category: "core",
  },

  // ─── Latest Publications ─────────────────────────────────────────────
  {
    slug: "the-2026-compounding-reclassification",
    title: "Understanding Regulatory Changes in Compounding",
    blurb:
      "How regulatory updates can affect sourcing pathways, facility operations, documentation practices, and supply-chain transparency.",
    meta: "Updated Apr 2026",
    publishedAt: "2026-04-21",
    category: "latest",
  },
  {
    slug: "sanitization-and-aseptic-technique-fundamentals",
    title: "Understanding Sterile Compounding",
    blurb:
      "What sterile compounding means, why sterile environments matter, and how it differs from non-sterile preparation pathways.",
    meta: "Updated Apr 2026",
    publishedAt: "2026-04-21",
    category: "latest",
  },
  {
    slug: "the-science-of-aging-and-trt",
    title: "Understanding Compounded Hormone Therapy",
    blurb:
      "Why hormone therapies are sometimes compounded, the role of 503A and 503B facilities, and why sourcing transparency matters.",
    meta: "Updated Apr 2026",
    publishedAt: "2026-04-21",
    category: "latest",
  },
  {
    slug: "why-vendor-transparency-matters",
    title: "Why Vendor Transparency Matters",
    blurb:
      "Why transparent sourcing relationships help consumers evaluate compounded therapy providers with greater confidence.",
    meta: "Updated Jun 2026",
    publishedAt: "2026-06-06",
    category: "latest",
  },
  {
    slug: "what-happens-during-a-verification-review",
    title: "What Happens During a Verification Review?",
    blurb:
      "A high-level overview of how documentation, sourcing claims, facility relationships, and public records are reviewed within the Source Standard framework.",
    meta: "Updated Jun 2026",
    publishedAt: "2026-06-06",
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
