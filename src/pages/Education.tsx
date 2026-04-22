import { Link } from "react-router-dom";
import { ChevronRight, Scale, ShieldCheck, BadgeCheck, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SourceCheck } from "@/components/SourceCheck";
import {
  EntryStatus,
  LibraryEntry,
  libraryGuides,
  librarySeries,
  librarySupplementary,
} from "@/data/library";

const isReadable = (s: EntryStatus) => s === "published";

// Slug-keyed display title overrides (data file unchanged)
const TITLE_OVERRIDES: Record<string, string> = {
  "how-to-read-a-certificate-of-analysis":
    "Audit Protocols: Interpreting CoAs and Detecting Discrepancies",
  "safe-peptide-handling-and-reconstitution":
    "Sterile Preparation Integrity: Handling & Reconstitution Protocol",
  "sanitization-and-aseptic-technique-fundamentals":
    "Aseptic Technique: Sanitization Fundamentals",
  "the-science-of-aging-and-trt":
    "Endocrinological Context: Age-Related Hormonal Change & TRT",
  "dosing-guidance-summaries-for-common-compounds":
    "Reference Dosing Ranges: Selected Compounds",
};

const SUPPLEMENT_OVERRIDES: Record<string, { title?: string; description?: string }> = {
  "SS-SUP-003": {
    title: "Annual Integrity Ledger",
    description:
      "Annual published summary of audit findings, status changes, and methodological revisions across the directory.",
  },
};

const displayTitle = (e: LibraryEntry) => TITLE_OVERRIDES[e.slug] ?? e.title;

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

const routeFor = (slug: string) => SLUG_ROUTE_OVERRIDES[slug] ?? `/education/${slug}`;

// FAQ category mapping
type CategoryKey = "legal" | "clinical" | "verification" | "diligence";

const CATEGORY_ROUTE_OVERRIDES: Partial<Record<CategoryKey, string>> = {
  legal: "/library/faq/legal-regulatory",
  clinical: "/library/faq/clinical-safety",
  verification: "/library/faq/verification-process",
};

const LibraryTile = ({ entry }: { entry: LibraryEntry }) => (
  <Link
    to={routeFor(entry.slug)}
    className="group flex flex-col min-h-[260px] card-elevated p-6"
  >
    <h3 className="text-[17px] font-semibold leading-snug text-foreground group-hover:text-foreground">
      {displayTitle(entry)}
    </h3>
    <p className="mt-3 text-[13.5px] text-muted-foreground leading-[1.7]">
      {entry.summary}
    </p>
    {entry.reviewedBy && (
      <p className="mt-3 inline-flex items-center gap-1.5 text-[11.5px] text-muted-foreground/90">
        <SourceCheck size="xs" aria-label="Reviewed" />
        Reviewed by {entry.reviewedBy}
      </p>
    )}
    <span className="mt-auto pt-5 inline-flex items-center gap-1 text-[13px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">
      Read article
      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </span>
  </Link>
);

const CATEGORIES: {
  key: CategoryKey;
  label: string;
  description: string;
  groupAnchor: string;
  Icon: typeof Scale;
}[] = [
  {
    key: "legal",
    label: "Legal",
    description: "Statutory framework, federal scheduling, and lawful access.",
    groupAnchor: "legality",
    Icon: Scale,
  },
  {
    key: "clinical",
    label: "Safety",
    description: "Sterility, handling integrity, and clinical-use scope.",
    groupAnchor: "methodology",
    Icon: ShieldCheck,
  },
  {
    key: "verification",
    label: "Verification",
    description: "How clinics and upstream pharmacies are audited and confirmed.",
    groupAnchor: "verification",
    Icon: BadgeCheck,
  },
  {
    key: "diligence",
    label: "Diligence",
    description: "Public-facing checks before engaging any compounded source.",
    groupAnchor: "due-diligence",
    Icon: Compass,
  },
];

// Foundational basics: intro-level series
const basics: LibraryEntry[] = librarySeries.filter((e) => e.level === "intro");
const basicSlugs = new Set(basics.map((b) => b.slug));

// Trim guides preview
const guidesPreview = libraryGuides.slice(0, 6);

// Latest analysis: non-intro series
const analysisCards: LibraryEntry[] = librarySeries.filter((e) => !basicSlugs.has(e.slug));

// Featured "Start Here" trio — hardcoded by slug
const FEATURED_SLUGS = [
  "what-are-peptides",
  "what-is-compounding",
  "questions-to-ask-your-clinic",
] as const;

const FEATURED_OVERRIDES: Record<string, { title: string; blurb: string }> = {
  "what-are-peptides": {
    title: "What Are Peptides?",
    blurb:
      "A clinical primer on peptide therapeutics — what they are, how they work, and why sourcing integrity matters.",
  },
  "what-is-compounding": {
    title: "What Is Compounding? (503A vs 503B)",
    blurb:
      "Understand the regulatory distinction between 503A and 503B compounding pharmacies and what each means for patient safety.",
  },
  "questions-to-ask-your-clinic": {
    title: "Questions to Ask Your Clinic",
    blurb:
      "A practical, five-question checklist to assess whether your clinic is operating with documented sourcing.",
  },
};

const allEntries: LibraryEntry[] = [...librarySeries, ...libraryGuides];
const featuredEntries = FEATURED_SLUGS.map((slug) =>
  allEntries.find((e) => e.slug === slug),
).filter((e): e is LibraryEntry => Boolean(e));

const Education = () => {

  return (
    <>
      {/* Hero — premium band, no reference box */}
      <section className="border-b border-border/50 bg-background">
        <div className="container-wide section-band text-center">
          <p className="eyebrow mb-4">Public education &amp; standards</p>
          <h1 className="display-2 text-foreground max-w-[22ch] mx-auto tracking-[-0.02em]">
            Clinical Reference &amp; Standards Library
          </h1>
          <p className="mt-5 max-w-[60ch] mx-auto text-[16px] text-muted-foreground leading-[1.7]">
            Your guide to the science, safety, and standards of compounded medicine. Empowering patients with clinical transparency.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 text-[12px] text-muted-foreground">
            <SourceCheck size="sm" aria-label="Reviewed by Medical Advisory Board" />
            Reviewed by the Medical Advisory Board
          </p>
        </div>
      </section>

      {/* Highly Recommended — premium Start Here trio */}
      <section className="border-b border-border/50 bg-surface-muted/40">
        <div className="container-wide section-band">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="eyebrow mb-2">Highly Recommended</p>
              <h2 className="h-section">Start here</h2>
            </div>
            <p className="max-w-[42ch] text-[13.5px] text-muted-foreground leading-relaxed">
              Three short reads that frame everything else in the library.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredEntries.map((entry, i) => {
              const ov = FEATURED_OVERRIDES[entry.slug];
              return (
                <Link
                  key={entry.slug}
                  to={routeFor(entry.slug)}
                  className="group relative flex flex-col min-h-[300px] card-elevated p-7"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-flex items-center justify-center min-w-[34px] h-[26px] px-2 rounded-md bg-primary/10 text-primary text-[12px] font-semibold tabular-nums tracking-[0.04em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="eyebrow">Start Here</span>
                  </div>
                  <h3 className="text-[22px] font-semibold leading-[1.25] tracking-[-0.012em] text-foreground">
                    {ov?.title ?? displayTitle(entry)}
                  </h3>
                  <p className="mt-3 text-[14px] text-muted-foreground leading-[1.7]">
                    {ov?.blurb ?? entry.summary}
                  </p>
                  <p className="mt-5 inline-flex items-center gap-1.5 text-[11.5px] text-muted-foreground/90">
                    <SourceCheck size="xs" aria-label="Reviewed" />
                    Reviewed by Medical Advisory
                  </p>
                  <span
                    aria-hidden
                    className="mt-auto pt-6 inline-flex items-center self-end text-foreground/60 group-hover:text-foreground transition-all group-hover:translate-x-1"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>


      {/* §1 Foundational Sourcing Standards — tile grid */}
      <section className="border-b border-border/50">
        <div className="container-wide py-20 md:py-28">
          <div id="basics" className="scroll-mt-20">
            <h2 className="h-section">Foundational Sourcing Standards</h2>
            <p className="mt-3 max-w-[78ch] text-[14px] text-muted-foreground leading-[1.7]">
              Foundational reference material on compounded medications, sourcing chains, and the documentation that distinguishes a regulated source from an unregulated one.
            </p>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {basics.map((e) => <LibraryTile key={e.id} entry={e} />)}
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/education/basics"
                className="text-[13px] text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border"
              >
                View full foundational index →
              </Link>
              <Button asChild variant="outline" size="sm">
                <a href="#questions">Have a specific question? View the Regulatory FAQ →</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* §2 Clinical Handling & Aseptic Protocols — tile grid */}
      <section className="border-b border-border/50 bg-surface-muted/40">
        <div className="container-wide py-20 md:py-28">
          <div id="guides" className="scroll-mt-20">
            <h2 className="h-section">Clinical Handling &amp; Aseptic Protocols</h2>
            <p className="mt-3 max-w-[78ch] text-[14px] text-muted-foreground leading-[1.7]">
              Technical reference for sterile preparation integrity, aseptic technique, storage and stability, and endocrinological context. Reviewed by the Medical Advisory Board. Not a substitute for individualized clinical advice.
            </p>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guidesPreview.map((e) => <LibraryTile key={e.id} entry={e} />)}
            </div>
            <div className="mt-10 flex justify-end">
              <Link
                to="/education/guides"
                className="text-[13px] text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border"
              >
                View full clinical protocol index →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* §3 Public Inquiry — FAQ category grid (simplified) */}
      <section className="border-b border-border/50">
        <div className="container-wide py-20 md:py-28">
          <div id="questions" className="scroll-mt-20">
            <h2 className="h-section">Public Inquiry &amp; Regulatory FAQ</h2>
            <p className="mt-3 max-w-[78ch] text-[14px] text-muted-foreground leading-[1.7]">
              Plain-record answers organized by inquiry category. Select a category to review its questions, or browse the full archive.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CATEGORIES.map((c) => {
                const Icon = c.Icon;
                return (
                  <div
                    key={c.key}
                    className="flex flex-col rounded-lg border border-border/50 bg-background p-6 transition-all duration-200 hover:shadow-md hover:border-foreground/30"
                  >
                    <Icon className="h-7 w-7 text-muted-foreground" strokeWidth={1.5} />
                    <h3 className="mt-5 text-[19px] font-semibold text-foreground leading-snug">
                      {c.label}
                    </h3>
                    <p className="mt-2 text-[13.5px] text-muted-foreground leading-[1.7]">
                      {c.description}
                    </p>
                    <div className="mt-auto pt-6">
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link to={CATEGORY_ROUTE_OVERRIDES[c.key] ?? `/education/questions#${c.groupAnchor}`}>
                          Browse Category →
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex justify-end">
              <Button asChild>
                <Link to="/education/questions">Browse the full Regulatory FAQ archive →</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* §4 Latest Clinical Analysis — same tile language */}
      <section className="border-b border-border/50 bg-surface-muted/40">
        <div className="container-wide py-20 md:py-28">
          <div id="analysis" className="scroll-mt-20">
            <h2 className="h-section">Latest Clinical Analysis</h2>
            <p className="mt-3 max-w-[78ch] text-[14px] text-muted-foreground leading-[1.7]">
              Newest entries from the Source Standard analysis series. Reviewed under the Medical Advisory framework.
            </p>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analysisCards.map((entry) => <LibraryTile key={entry.id} entry={entry} />)}
            </div>

            <div className="mt-10 flex justify-end">
              <Button asChild variant="outline" size="sm">
                <a href="#archive">View the full standards archive →</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Forthcoming + About */}
      <section className="border-t border-border/60">
        <div className="container-wide py-20 md:py-28">
          <div id="archive" className="scroll-mt-20">
            <p className="eyebrow mb-6">Archive · SS-LIB-2026.01</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-elevated p-7">
                <p className="eyebrow mb-3">Forthcoming reference formats</p>
                <ul className="text-[13.5px] text-muted-foreground leading-relaxed space-y-3">
                  {librarySupplementary.map((m) => {
                    const ov = SUPPLEMENT_OVERRIDES[m.id] ?? {};
                    return (
                      <li key={m.id} className="flex items-start gap-3">
                        <SourceCheck size="xs" aria-label="Forthcoming" className="mt-1.5" />
                        <span className="flex-1">
                          <span className="text-foreground font-medium">
                            {ov.title ?? m.title}
                          </span>{" "}
                          — {ov.description ?? m.description}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="card-elevated p-7">
                <p className="eyebrow mb-3">About this library</p>
                <p className="text-[13.5px] text-muted-foreground leading-relaxed">
                  Reviewed under our{" "}
                  <Link to="/medical-advisory" className="text-primary hover:text-primary-hover underline-offset-2 hover:underline">
                    Medical Advisory Board
                  </Link>{" "}
                  and maintained alongside our{" "}
                  <Link to="/governance" className="text-primary hover:text-primary-hover underline-offset-2 hover:underline">
                    governance framework
                  </Link>
                  . Updated continuously.
                </p>
                <div className="mt-5 border-l-2 border-primary/40 bg-surface-muted/50 px-4 py-3 rounded-r-md">
                  <p className="eyebrow mb-1.5">Notice · Informational use only</p>
                  <p className="text-[12.5px] text-foreground/85 leading-relaxed">
                    The materials in this library are published for public reference and educational purposes only. They do not constitute medical advice, diagnosis, prescription, or treatment, and they do not establish a clinician–patient relationship. Clinical decisions regarding compounded medications must be made in consultation with a qualified, licensed healthcare provider. Reliance on any information contained herein is solely at the reader's own risk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Education;
