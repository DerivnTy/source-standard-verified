import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";
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

const CATEGORIES: {
  key: CategoryKey;
  label: string;
  description: string;
  groupAnchor: string;
}[] = [
  {
    key: "legal",
    label: "Legal",
    description: "Statutory framework, federal scheduling, and lawful access.",
    groupAnchor: "legality",
  },
  {
    key: "clinical",
    label: "Safety",
    description: "Sterility, handling integrity, and clinical-use scope.",
    groupAnchor: "methodology",
  },
  {
    key: "verification",
    label: "Verification",
    description: "How clinics and upstream pharmacies are audited and confirmed.",
    groupAnchor: "verification",
  },
  {
    key: "diligence",
    label: "Diligence",
    description: "Public-facing checks before engaging any compounded source.",
    groupAnchor: "due-diligence",
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

// Board-style flat tile (no shadow, hairline border, mono ref + uppercase link)
const LibraryTile = ({ entry, index }: { entry: LibraryEntry; index: number }) => {
  const ref = (index + 1).toString().padStart(2, "0");
  return (
    <Link
      to={routeFor(entry.slug)}
      className="group bg-background p-6 flex flex-col h-full transition-colors hover:bg-surface-muted"
    >
      <p className="text-[10.5px] font-mono uppercase tracking-[0.1em] text-muted-foreground mb-3">
        ENTRY · {ref}
      </p>
      <h3 className="text-[18px] font-semibold leading-snug text-foreground tracking-tight">
        {displayTitle(entry)}
      </h3>
      <p className="mt-2 text-[13.5px] text-muted-foreground leading-[1.65]">
        {entry.summary}
      </p>
      <div className="mt-auto pt-5 flex items-center justify-end border-t border-border mt-5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground group-hover:text-primary transition-colors">
          Read article →
        </span>
      </div>
    </Link>
  );
};

// Section header: 12-col left rail (Board pattern)
const SectionRail = ({
  ref,
  label,
  title,
  body,
}: {
  ref: string;
  label: string;
  title: string;
  body?: string;
}) => (
  <div className="md:col-span-4">
    <p className="meta mb-3">
      {ref} · {label}
    </p>
    <h2 className="h-section">{title}</h2>
    {body && (
      <p className="mt-4 text-[14px] text-muted-foreground leading-relaxed">{body}</p>
    )}
  </div>
);

const Education = () => {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Resource Library" },
        ]}
      />

      <PageMeta
        title="Resource Library"
        description="Technical documentation, regulatory references, and foundational analysis regarding the industry."
      />
      <BriefingHero
        category="RESOURCE LIBRARY · SS-EDU"
        docId="SS-LIB-2026.01"
        title="Resource Library."
        statement="Technical documentation, regulatory references, and foundational analysis regarding the industry."
        metadata={[
          { label: "Doc", value: "SS-LIB-2026.01" },
          { label: "Status", value: "Active" },
          { label: "Jurisdiction", value: "United States" },
          { label: "Updated", value: "04 / 21 / 2026" },
        ]}
        verifiedOn="04 / 21 / 2026"
      />

      {/* §1 Start here — 12-col split, flat Board tiles */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <SectionRail
              ref="§1"
              label="Highly recommended"
              title="Start here."
              body="Three short reads that frame everything else in the library."
            />
            <div className="md:col-span-8">
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
                {featuredEntries.map((entry, i) => {
                  const ov = FEATURED_OVERRIDES[entry.slug];
                  const ref = String(i + 1).padStart(2, "0");
                  return (
                    <li key={entry.slug} className="bg-background">
                      <Link
                        to={routeFor(entry.slug)}
                        className="group flex flex-col h-full p-6 transition-colors hover:bg-surface-muted"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10.5px] font-mono uppercase tracking-[0.1em] text-primary">
                            START · {ref}
                          </span>
                          <span className="text-[10.5px] font-mono uppercase tracking-[0.1em] text-muted-foreground">
                            SS-LIB
                          </span>
                        </div>
                        <h3 className="text-[18px] font-semibold leading-snug tracking-tight text-foreground">
                          {ov?.title ?? displayTitle(entry)}
                        </h3>
                        <p className="mt-2 text-[13.5px] text-muted-foreground leading-[1.65]">
                          {ov?.blurb ?? entry.summary}
                        </p>
                        <div className="mt-auto pt-5 mt-5 border-t border-border flex items-center justify-end">
                          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground group-hover:text-primary transition-colors">
                            View →
                          </span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* §2 Foundational sourcing standards */}
      <section className="border-b border-border bg-background" id="basics">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <SectionRail
              ref="§2"
              label="Foundational sourcing standards"
              title="Reference foundations."
              body="Foundational reference material on compounded medications, sourcing chains, and the documentation that distinguishes a regulated source from an unregulated one."
            />
            <div className="md:col-span-8">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
                {basics.map((e, i) => (
                  <li key={e.id} className="bg-background">
                    <LibraryTile entry={e} index={i} />
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                <Link
                  to="/education/basics"
                  className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary"
                >
                  View full foundational index →
                </Link>
                <a
                  href="#questions"
                  className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
                >
                  Have a specific question? Regulatory FAQ →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §3 Clinical handling & aseptic protocols */}
      <section className="border-b border-border bg-surface-muted" id="guides">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <SectionRail
              ref="§3"
              label="Clinical handling & aseptic protocols"
              title="Technical reference."
              body="Sterile preparation integrity, aseptic technique, storage and stability, and endocrinological context. Reviewed by the Medical Advisory Board. Not a substitute for individualized clinical advice."
            />
            <div className="md:col-span-8">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
                {guidesPreview.map((e, i) => (
                  <li key={e.id} className="bg-background">
                    <LibraryTile entry={e} index={i} />
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex justify-end border-t border-border pt-4">
                <Link
                  to="/education/guides"
                  className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary"
                >
                  View full clinical protocol index →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §4 Public Inquiry — flat FAQ grid (no icons) */}
      <section className="border-b border-border bg-background" id="questions">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <SectionRail
              ref="§4"
              label="Public inquiry & regulatory FAQ"
              title="Plain-record answers."
              body="Organized by inquiry category. Select a category to review its questions, or browse the full archive."
            />
            <div className="md:col-span-8">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border">
                {CATEGORIES.map((c, i) => {
                  const ref = String(i + 1).padStart(2, "0");
                  const route =
                    CATEGORY_ROUTE_OVERRIDES[c.key] ?? `/education/questions#${c.groupAnchor}`;
                  return (
                    <li key={c.key} className="bg-background">
                      <Link
                        to={route}
                        className="group flex flex-col h-full p-6 transition-colors hover:bg-surface-muted"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10.5px] font-mono uppercase tracking-[0.1em] text-primary">
                            CAT · {ref}
                          </span>
                          <span className="text-[10.5px] font-mono uppercase tracking-[0.1em] text-muted-foreground">
                            FAQ
                          </span>
                        </div>
                        <h3 className="text-[17px] font-semibold text-foreground leading-snug tracking-tight">
                          {c.label}
                        </h3>
                        <p className="mt-2 text-[13.5px] text-muted-foreground leading-[1.65]">
                          {c.description}
                        </p>
                        <div className="mt-auto pt-5 mt-5 border-t border-border flex items-center justify-end">
                          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground group-hover:text-primary transition-colors">
                            Browse →
                          </span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6 flex justify-end border-t border-border pt-4">
                <Link
                  to="/education/questions"
                  className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary"
                >
                  Browse the full Regulatory FAQ archive →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §5 Latest clinical analysis */}
      <section className="border-b border-border bg-surface-muted" id="analysis">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <SectionRail
              ref="§5"
              label="Latest clinical analysis"
              title="Newest entries."
              body="Newest entries from the Source Standard analysis series. Reviewed under the Medical Advisory framework."
            />
            <div className="md:col-span-8">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
                {analysisCards.map((entry, i) => (
                  <li key={entry.id} className="bg-background">
                    <LibraryTile entry={entry} index={i} />
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex justify-end border-t border-border pt-4">
                <a
                  href="#archive"
                  className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary"
                >
                  View the full standards archive →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §6 Archive + About */}
      <section className="border-b border-border bg-background" id="archive">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <SectionRail
              ref="§6"
              label="Archive · SS-LIB-2026.01"
              title="Library archive."
              body="Forthcoming reference formats and publication notes."
            />
            <div className="md:col-span-8">
              <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
                <div className="bg-background p-6">
                  <p className="meta-label text-foreground mb-4">Forthcoming reference formats</p>
                  <ul className="divide-y divide-border border-t border-border">
                    {librarySupplementary.map((m, i) => {
                      const ov = SUPPLEMENT_OVERRIDES[m.id] ?? {};
                      const ref = String(i + 1).padStart(2, "0");
                      return (
                        <li key={m.id} className="grid grid-cols-12 gap-3 py-3 items-baseline">
                          <span className="col-span-2 text-[10.5px] font-mono uppercase tracking-[0.1em] text-primary">
                            {ref}
                          </span>
                          <span className="col-span-10 text-[13.5px] text-muted-foreground leading-relaxed">
                            <span className="text-foreground font-semibold">
                              {ov.title ?? m.title}
                            </span>{" "}
                            — {ov.description ?? m.description}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="bg-background p-6">
                  <p className="meta-label text-foreground mb-4">About this library</p>
                  <p className="text-[13.5px] text-muted-foreground leading-relaxed">
                    Reviewed under our{" "}
                    <Link
                      to="/medical-advisory"
                      className="text-primary hover:text-primary-hover underline-offset-2 hover:underline"
                    >
                      Medical Advisory Board
                    </Link>{" "}
                    and maintained alongside our{" "}
                    <Link
                      to="/governance"
                      className="text-primary hover:text-primary-hover underline-offset-2 hover:underline"
                    >
                      governance framework
                    </Link>
                    . Updated continuously.
                  </p>
                  <div className="mt-5 border-l-2 border-primary/40 bg-surface-muted px-4 py-3">
                    <p className="meta-label text-foreground mb-1.5">
                      Notice · Informational use only
                    </p>
                    <p className="text-[12.5px] text-foreground/85 leading-relaxed">
                      The materials in this library are published for public reference and
                      educational purposes only. They do not constitute medical advice,
                      diagnosis, prescription, or treatment, and do not establish a
                      clinician–patient relationship. Clinical decisions regarding compounded
                      medications must be made in consultation with a qualified, licensed
                      healthcare provider.
                    </p>
                  </div>
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
