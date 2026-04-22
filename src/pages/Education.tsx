import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";
import {
  LibraryEntry,
  libraryGuides,
  librarySeries,
  librarySupplementary,
} from "@/data/library";

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

// Foundational sourcing entries (intro-level series, plus CoA primer)
const foundationalEntries: LibraryEntry[] = basics;

// Clinical handling guides
const clinicalEntries: LibraryEntry[] = libraryGuides.slice(0, 6);

// Verification & due diligence: non-intro series
const verificationEntries: LibraryEntry[] = librarySeries.filter(
  (e) => !basicSlugs.has(e.slug),
);

// Latest analysis (same source, lighter treatment)
const analysisEntries: LibraryEntry[] = verificationEntries;

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
      "A clinical primer on peptide therapeutics, what they are, how they work, and why sourcing integrity matters.",
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

// ---------- Shared editorial helpers ----------

const FeatureCard = ({
  entry,
  index,
}: {
  entry: LibraryEntry;
  index: number;
}) => {
  const ov = FEATURED_OVERRIDES[entry.slug];
  const ref = String(index + 1).padStart(2, "0");
  return (
    <Link
      to={routeFor(entry.slug)}
      className="group bg-background p-7 flex flex-col h-full transition-colors hover:bg-surface-muted"
    >
      <p className="text-[11px] font-mono text-muted-foreground mb-5">{ref}</p>
      <h3 className="text-[19px] font-semibold leading-snug tracking-tight text-foreground">
        {ov?.title ?? displayTitle(entry)}
      </h3>
      <p className="mt-2.5 text-[13.5px] text-muted-foreground leading-[1.65]">
        {ov?.blurb ?? entry.summary}
      </p>
      <span className="mt-5 text-[13px] font-medium text-foreground/80 group-hover:text-foreground transition-colors">
        Read article →
      </span>
    </Link>
  );
};

const EntryRow = ({ entry }: { entry: LibraryEntry }) => {
  const reviewed = entry.lane === "guide";
  return (
    <li>
      <Link
        to={routeFor(entry.slug)}
        className="group block px-1 py-5 transition-colors hover:bg-surface-muted/60"
      >
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
            <h3 className="text-[16px] font-semibold leading-snug text-foreground tracking-tight group-hover:text-primary transition-colors">
              {displayTitle(entry)}
            </h3>
            <p className="mt-1.5 text-[13.5px] text-muted-foreground leading-[1.6]">
              {entry.summary}
            </p>
            {reviewed && (
              <p className="mt-2 text-[12px] text-muted-foreground/80">
                Reviewed by Medical Advisory Board
              </p>
            )}
          </div>
          <span className="text-[12.5px] text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap shrink-0 mt-0.5">
            Read →
          </span>
        </div>
      </Link>
    </li>
  );
};

const SectionHeader = ({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) => (
  <div className="mb-8 max-w-2xl">
    <p className="text-[11.5px] font-mono uppercase tracking-[0.14em] text-muted-foreground mb-3">
      {eyebrow}
    </p>
    <h2 className="text-[24px] md:text-[26px] font-semibold tracking-tight text-foreground">
      {title}
    </h2>
    {lede && (
      <p className="mt-3 text-[14px] text-muted-foreground leading-relaxed">{lede}</p>
    )}
  </div>
);

const CategorySection = ({
  eyebrow,
  title,
  lede,
  entries,
  footerLabel,
  footerTo,
  surface,
  id,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  entries: LibraryEntry[];
  footerLabel: string;
  footerTo: string;
  surface: "background" | "muted";
  id?: string;
}) => (
  <section
    id={id}
    className={`border-b border-border ${surface === "muted" ? "bg-surface-muted" : "bg-background"}`}
  >
    <div className="container-wide py-12 md:py-16">
      <SectionHeader eyebrow={eyebrow} title={title} lede={lede} />
      <ul className="divide-y divide-border border-t border-b border-border">
        {entries.map((e) => (
          <EntryRow key={e.id} entry={e} />
        ))}
      </ul>
      <div className="mt-6 flex justify-end">
        <Link
          to={footerTo}
          className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
        >
          {footerLabel} →
        </Link>
      </div>
    </div>
  </section>
);

// ---------- Page ----------

const Education = () => {
  return (
    <>
      <Breadcrumb items={[{ label: "Resource Library" }]} />

      <PageMeta
        title="Resource Library"
        description="A curated reference library for sourcing, compounding, verification, and public due diligence."
      />

      <BriefingHero
        tone="navy"
        category="Resource Library"
        docId=""
        title="Resource Library"
        statement="A curated reference library for sourcing, compounding, verification, and public due diligence. Reviewed under independent medical oversight."
      />

      {/* Start here — featured trio */}
      <section className="border-b border-border bg-background">
        <div className="container-wide py-12 md:py-16">
          <SectionHeader
            eyebrow="Start here"
            title="Start here."
            lede="Three short reads that frame everything else in the library."
          />
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
            {featuredEntries.map((entry, i) => (
              <li key={entry.slug} className="bg-background">
                <FeatureCard entry={entry} index={i} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Foundational sourcing */}
      <CategorySection
        id="basics"
        eyebrow="Foundational sourcing"
        title="Foundational sourcing."
        lede="Reference material on compounded medications, sourcing chains, and the documentation that distinguishes a regulated source from an unregulated one."
        entries={foundationalEntries}
        footerLabel="View full foundational index"
        footerTo="/education/basics"
        surface="muted"
      />

      {/* Clinical handling & sterile reference */}
      <CategorySection
        id="guides"
        eyebrow="Clinical handling & sterile reference"
        title="Clinical handling & sterile reference."
        lede="Sterile preparation integrity, aseptic technique, storage and stability, and endocrinological context. Reviewed by the Medical Advisory Board. Not a substitute for individualized clinical advice."
        entries={clinicalEntries}
        footerLabel="View full clinical protocol index"
        footerTo="/education/guides"
        surface="background"
      />

      {/* Verification & due diligence */}
      <CategorySection
        id="verification"
        eyebrow="Verification & due diligence"
        title="Verification & due diligence."
        lede="What verification actually means, what it does not, and how to read sourcing disclosures from clinics and pharmacies."
        entries={verificationEntries}
        footerLabel="View the verification archive"
        footerTo="/education/questions"
        surface="muted"
      />

      {/* Regulatory FAQ — navigational utility row */}
      <section className="border-b border-border bg-background" id="questions">
        <div className="container-wide py-12 md:py-16">
          <SectionHeader
            eyebrow="Regulatory FAQ"
            title="Regulatory FAQ."
            lede="Plain-record answers, organized by inquiry category."
          />
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-b border-border lg:divide-x divide-y lg:divide-y-0 divide-border">
            {CATEGORIES.map((c) => {
              const route =
                CATEGORY_ROUTE_OVERRIDES[c.key] ?? `/education/questions#${c.groupAnchor}`;
              return (
                <li key={c.key}>
                  <Link
                    to={route}
                    className="group block px-5 py-6 h-full transition-colors hover:bg-surface-muted"
                  >
                    <p className="text-[15px] font-semibold text-foreground group-hover:text-primary transition-colors">
                      {c.label}
                    </p>
                    <p className="mt-1.5 text-[13px] text-muted-foreground leading-[1.6]">
                      {c.description}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 flex justify-end">
            <Link
              to="/education/questions"
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              Browse the full FAQ archive →
            </Link>
          </div>
        </div>
      </section>

      {/* Latest analysis — smaller strip */}
      <section className="border-b border-border bg-surface-muted" id="analysis">
        <div className="container-wide py-12 md:py-16">
          <SectionHeader
            eyebrow="Latest analysis"
            title="Latest analysis."
            lede="Recent additions to the analysis series."
          />
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 border-t border-border">
            {analysisEntries.map((e) => (
              <li key={e.id} className="border-b border-border py-5">
                <Link
                  to={routeFor(e.slug)}
                  className="group block transition-colors"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15.5px] font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                        {displayTitle(e)}
                      </h3>
                      <p className="mt-1.5 text-[13px] text-muted-foreground leading-[1.6]">
                        {e.summary}
                      </p>
                    </div>
                    <span className="text-[12.5px] text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap shrink-0 mt-0.5">
                      Read →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-end">
            <a
              href="#archive"
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              View archive →
            </a>
          </div>
        </div>
      </section>

      {/* Forthcoming formats — de-emphasized */}
      <section className="border-b border-border bg-background" id="archive">
        <div className="container-wide py-10 md:py-12">
          <SectionHeader
            eyebrow="Forthcoming formats"
            title="Forthcoming formats."
            lede="Future extensions of the library."
          />
          <ul className="divide-y divide-border border-t border-b border-border max-w-3xl">
            {librarySupplementary.map((m) => {
              const ov = SUPPLEMENT_OVERRIDES[m.id] ?? {};
              return (
                <li key={m.id} className="py-3.5 text-[13.5px] leading-relaxed">
                  <span className="text-foreground font-semibold">
                    {ov.title ?? m.title}
                  </span>{" "}
                  <span className="text-muted-foreground">
                   {ov.description ?? m.description}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

    </>
  );
};

export default Education;
