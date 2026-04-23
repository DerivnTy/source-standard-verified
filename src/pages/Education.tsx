import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";

// ---------- Three-column knowledge base ----------
// Slugs map to existing routes via SLUG_ROUTE_OVERRIDES below. Order, copy,
// and grouping are authored here — the underlying article pages are unchanged.

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

const routeFor = (slug: string) =>
  SLUG_ROUTE_OVERRIDES[slug] ?? `/education/${slug}`;

type ArticleLink = { slug: string; title: string; blurb: string };

const COLUMN_A: ArticleLink[] = [
  {
    slug: "what-is-compounding",
    title: "What is Compounding?",
    blurb: "Understanding the critical difference between 503A and 503B facilities.",
  },
  {
    slug: "the-2026-compounding-reclassification",
    title: "The 2026 Regulatory Shift",
    blurb: "Implications of the recent compounding reclassifications.",
  },
  {
    slug: "how-to-read-a-certificate-of-analysis",
    title: "Interpreting CoAs",
    blurb: "A guide to reading lab reports and detecting sourcing discrepancies.",
  },
  {
    slug: "the-dual-layer-difference",
    title: "The Dual-Layer Audit",
    blurb: "Why we verify both the clinic and the manufacturer.",
  },
];

const COLUMN_B: ArticleLink[] = [
  {
    slug: "safe-peptide-handling-and-reconstitution",
    title: "Sterile Handling Protocol",
    blurb: "Best practices for reconstitution and aseptic storage.",
  },
  {
    slug: "sanitization-and-aseptic-technique-fundamentals",
    title: "Stability Fundamentals",
    blurb: "How temperature, light, and time affect peptide integrity.",
  },
  {
    slug: "the-science-of-aging-and-trt",
    title: "Endocrinological Context",
    blurb: "Understanding age-related change and TRT mechanisms.",
  },
  {
    slug: "dosing-guidance-summaries-for-common-compounds",
    title: "Dosing Reference",
    blurb: "High-level summaries of commonly cited clinical dosing ranges.",
  },
];

const COLUMN_C: ArticleLink[] = [
  {
    slug: "questions-to-ask-your-clinic",
    title: "The Clinic Checklist",
    blurb: "5 essential questions to ask your doctor about their sourcing.",
  },
  {
    slug: "warning-signs-of-undocumented-sourcing",
    title: "Warning Signs",
    blurb: "How to identify \u201CGrey Market\u201D vendors and undocumented sources.",
  },
  {
    slug: "what-source-standard-verification-actually-means",
    title: "Verification Scope",
    blurb: "What our \u201CVerified\u201D badge actually establishes (and what it doesn't).",
  },
  {
    slug: "what-are-peptides",
    title: "Sterile Injection Guide",
    blurb: "Safe handling and disposal for injectable preparations.",
  },
];

// ---------- FAQ buttons ----------

const FAQ_BUTTONS: { label: string; to: string }[] = [
  { label: "Legal", to: "/library/faq/legal-regulatory" },
  { label: "Safety", to: "/library/faq/clinical-safety" },
  { label: "Verification", to: "/library/faq/verification-process" },
  { label: "Diligence", to: "/education/questions#due-diligence" },
];

// ---------- Components ----------

const ArticleCell = ({ entry }: { entry: ArticleLink }) => (
  <Link
    to={routeFor(entry.slug)}
    className="group block px-5 py-4 transition-colors hover:bg-surface-muted"
  >
    <h3 className="t-body-md font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
      {entry.title}
    </h3>
    <p className="mt-1.5 t-body-sm text-muted-foreground leading-[1.55]">
      {entry.blurb}
    </p>
  </Link>
);

const Column = ({
  title,
  entries,
}: {
  title: string;
  entries: ArticleLink[];
}) => (
  <div className="rounded-md border border-border bg-card shadow-sm overflow-hidden flex flex-col">
    <div className="px-5 py-3.5 border-b border-border bg-surface-muted/50">
      <h2 className="t-body-md font-semibold text-foreground tracking-tight">
        {title}
      </h2>
    </div>
    <div className="divide-y divide-border flex-1">
      {entries.map((e) => (
        <ArticleCell key={e.slug} entry={e} />
      ))}
    </div>
  </div>
);

// ---------- Page ----------

const Education = () => {
  return (
    <>
      <Breadcrumb items={[{ label: "Resource Library" }]} />

      <PageMeta
        title="Resource Library · Source Standard"
        description="Clinical and regulatory reference for peptide sourcing, pharmacy standards, and patient due diligence. All materials are reviewed by the Medical Advisory Board."
      />

      <BriefingHero
        tone="navy"
        category="Resource Library"
        docId=""
        title="Resource Library"
        statement="Clinical and regulatory reference for peptide sourcing, pharmacy standards, and patient due diligence. All materials are reviewed by the Medical Advisory Board."
      />

      {/* Three-column knowledge base — docked under hero, table-aligned width */}
      <div className="bg-background">
        <div className="page-shell">
          <div className="mx-auto w-wide">
            {/* Global peer-review badge — top-right of grid */}
            <div className="-mt-5 md:-mt-6 relative z-10 mb-4 flex justify-end">
              <span className="inline-flex items-center gap-2 rounded-md border border-border bg-card shadow-sm px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <ShieldCheck
                  className="h-3.5 w-3.5 text-verified"
                  strokeWidth={2.25}
                  aria-hidden
                />
                All content peer-reviewed by the Medical Advisory Board
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pb-12 md:pb-14">
              <Column title="Sourcing & Regulation" entries={COLUMN_A} />
              <Column title="Clinical Handling" entries={COLUMN_B} />
              <Column title="Consumer Due Diligence" entries={COLUMN_C} />
            </div>
          </div>
        </div>
      </div>

      {/* Common Inquiries */}
      <section className="bg-surface-muted/60 border-y border-border" id="questions">
        <div className="page-shell py-12 md:py-14">
          <div className="mx-auto w-wide">
            <div className="mb-8 max-w-[60ch]">
              <h2 className="t-section-title-sm text-foreground">
                Common Inquiries
              </h2>
              <p className="mt-3 t-body-md text-muted-foreground">
                Recorded answers to recurring questions, organized by category.
              </p>
            </div>
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {FAQ_BUTTONS.map((b) => (
                <li key={b.label}>
                  <Link
                    to={b.to}
                    className="group flex items-center justify-between rounded-md border border-border bg-card shadow-sm px-5 py-4 transition-colors hover:bg-surface-muted"
                  >
                    <span className="t-body-md font-semibold text-foreground group-hover:text-primary transition-colors">
                      {b.label}
                    </span>
                    <span
                      aria-hidden
                      className="t-utility-xs text-muted-foreground group-hover:text-foreground transition-colors"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Coming Soon footer */}
      <section className="bg-background">
        <div className="page-shell py-10">
          <div className="mx-auto w-wide">
            <p className="t-utility-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
              Coming soon
            </p>
            <p className="t-body-md text-foreground/85 max-w-[68ch]">
              Video Explainers, Board Webinars, and the 2026 Integrity Ledger.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Education;
