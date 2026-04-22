import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { AnchorHeader } from "@/components/AnchorHeader";
import { Button } from "@/components/ui/button";
import {
  ENTRY_STATUS_LABEL,
  EntryStatus,
  FAQEntry,
  LibraryEntry,
  libraryFaqs,
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

const SoftStatus = ({ status }: { status: EntryStatus }) =>
  isReadable(status) ? (
    <span className="shrink-0 inline-flex items-center font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/70 border border-border/70 px-1.5 py-px rounded-[2px] bg-background">
      Published
    </span>
  ) : (
    <span className="shrink-0 inline-flex items-center font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground border border-border/70 px-1.5 py-px rounded-[2px] bg-background">
      {ENTRY_STATUS_LABEL[status]}
    </span>
  );

const SimpleRow = ({ entry }: { entry: LibraryEntry }) => (
  <Link
    to={`/education/${entry.slug}`}
    className="group block px-6 py-5 border-b border-border/60 last:border-b-0 hover:bg-surface-muted/40 hover:border-foreground/20 transition-colors"
  >
    <div className="flex items-center gap-5">
      <span className="w-28 shrink-0 self-center font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted-foreground tabular-nums">
        {entry.id}
      </span>
      <div className="flex-1 min-w-0">
        <h3 className="text-[16px] font-medium text-foreground leading-snug group-hover:underline underline-offset-4 decoration-border">
          {displayTitle(entry)}
        </h3>
        <p className="mt-1 text-[13.5px] text-muted-foreground leading-relaxed">
          {entry.summary}
        </p>
        {entry.reviewedBy && (
          <p className="mt-2 text-[11.5px] text-muted-foreground/80">
            Reviewed by {entry.reviewedBy}
          </p>
        )}
      </div>
      <div className="shrink-0 self-center">
        <SoftStatus status={entry.status} />
      </div>
      <span
        aria-hidden
        className="shrink-0 self-center pl-4 border-l border-border/40 inline-flex items-center gap-1 text-[12px] text-muted-foreground group-hover:text-foreground transition-colors pointer-events-none"
      >
        Read full article
        <ChevronRight className="h-3.5 w-3.5" />
      </span>
    </div>
  </Link>
);

// FAQ category mapping
type CategoryKey = "legal" | "clinical" | "verification" | "diligence";

const CATEGORIES: {
  key: CategoryKey;
  code: string;
  label: string;
  description: string;
  ids: string[];
  groupAnchor: string;
}[] = [
  {
    key: "legal",
    code: "FAQ-CAT-01",
    label: "Legal & Regulatory",
    description: "Statutory framework, federal scheduling, and lawful access.",
    ids: ["SS-FAQ-001", "SS-FAQ-002"],
    groupAnchor: "legality",
  },
  {
    key: "clinical",
    code: "FAQ-CAT-02",
    label: "Clinical Safety",
    description: "Sterility, handling integrity, and clinical-use scope.",
    ids: ["SS-FAQ-004", "SS-FAQ-007"],
    groupAnchor: "methodology",
  },
  {
    key: "verification",
    code: "FAQ-CAT-03",
    label: "Verification Process",
    description: "How clinics and upstream pharmacies are audited and confirmed.",
    ids: ["SS-FAQ-003", "SS-FAQ-005", "SS-FAQ-006", "SS-FAQ-008"],
    groupAnchor: "verification",
  },
  {
    key: "diligence",
    code: "FAQ-CAT-04",
    label: "Consumer Diligence",
    description: "Public-facing checks before engaging any compounded source.",
    ids: ["SS-FAQ-009", "SS-FAQ-010"],
    groupAnchor: "due-diligence",
  },
];

const faqById = (id: string) => libraryFaqs.find((f) => f.id === id);

// Foundational basics: intro-level series
const basics: LibraryEntry[] = librarySeries.filter((e) => e.level === "intro");
const basicSlugs = new Set(basics.map((b) => b.slug));

// Trim guides preview
const guidesPreview = libraryGuides.slice(0, 4);

// Latest analysis: non-intro series
const analysisCards: LibraryEntry[] = librarySeries.filter((e) => !basicSlugs.has(e.slug));

const matches = (q: string, ...fields: (string | undefined)[]) => {
  if (!q) return true;
  const needle = q.toLowerCase();
  return fields.some((f) => f && f.toLowerCase().includes(needle));
};

const Education = () => {
  const [query, setQuery] = useState("");

  const q = query.trim();

  const filteredBasics = useMemo(
    () => basics.filter((e) => matches(q, e.id, displayTitle(e), e.summary)),
    [q],
  );
  const filteredGuides = useMemo(
    () => guidesPreview.filter((e) => matches(q, e.id, displayTitle(e), e.summary)),
    [q],
  );
  const filteredAnalysis = useMemo(
    () => analysisCards.filter((e) => matches(q, e.id, displayTitle(e), e.summary)),
    [q],
  );

  // Per-category match counts (respect search)
  const categoryCounts = useMemo(() => {
    const out: Record<CategoryKey, number> = {
      legal: 0,
      clinical: 0,
      verification: 0,
      diligence: 0,
    };
    for (const c of CATEGORIES) {
      out[c.key] = c.ids
        .map(faqById)
        .filter((f): f is FAQEntry => Boolean(f))
        .filter((f) => matches(q, f.id, f.q, f.a)).length;
    }
    return out;
  }, [q]);

  const EmptyNote = () => (
    <p className="px-5 py-4 text-[13px] text-muted-foreground italic">
      No matches in this section.
    </p>
  );

  return (
    <>
      <AnchorHeader
        eyebrow="Public education & standards"
        title="Clinical Reference & Standards Library."
        lead="Reference materials covering the administrative and clinical protocols that govern compounded medication sourcing, handling, and verification under the Source Standard framework."
        reference={{ docId: "SS-LIB-2026.01", status: "Active", updated: "04/21/26" }}
      />

      {/* Library search */}
      <div className="border-t border-border/40 bg-background">
        <div className="container-wide py-5">
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              Search the library
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="FILTER BY DOC ID OR KEYWORD…"
              className="mt-1.5 w-full max-w-[640px] block rounded-[4px] border border-border bg-background px-3.5 py-2 font-mono text-[13px] text-foreground placeholder:text-muted-foreground/70 placeholder:uppercase placeholder:tracking-[0.08em] focus:outline-none focus:border-foreground/40 transition-colors"
            />
          </label>
        </div>
      </div>

      {/* Sticky jump bar */}
      <div className="sticky top-0 z-30 border-y border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container-wide flex flex-wrap items-center gap-x-6 gap-y-2 py-2.5 text-[12px] text-muted-foreground">
          <span className="text-muted-foreground/60">Jump to:</span>
          <a href="#basics" className="text-foreground/80 hover:text-foreground hover:underline underline-offset-4">Foundational Standards</a>
          <a href="#guides" className="text-foreground/80 hover:text-foreground hover:underline underline-offset-4">Clinical Protocols</a>
          <a href="#questions" className="text-foreground/80 hover:text-foreground hover:underline underline-offset-4">Regulatory FAQ</a>
          <a href="#analysis" className="text-foreground/80 hover:text-foreground hover:underline underline-offset-4">Latest Analysis</a>
          <a href="#archive" className="text-foreground/80 hover:text-foreground hover:underline underline-offset-4">Archive index</a>
        </div>
      </div>

      {/* Archive index strip */}
      <div className="border-b border-border/40 bg-surface-muted/30">
        <div className="container-wide flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          <span>Archive index · SS-LIB-2026.01 · United States</span>
          <span>Maintained · Active</span>
        </div>
      </div>

      {/* §1 Foundational Sourcing Standards */}
      <section className="border-t border-border/60">
        <div className="container-wide py-16 md:py-20">
          <div id="basics" className="scroll-mt-20">
            <h2 className="h-section">Foundational Sourcing Standards</h2>
            <p className="mt-3 max-w-[78ch] text-[14px] text-muted-foreground leading-relaxed">
              Foundational reference material on compounded medications, sourcing chains, and the documentation that distinguishes a regulated source from an unregulated one.
            </p>
            <div className="mt-6 border border-border/70 rounded-[2px] bg-background">
              {filteredBasics.length ? (
                filteredBasics.map((e) => <SimpleRow key={e.id} entry={e} />)
              ) : (
                <EmptyNote />
              )}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
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

      {/* §2 Clinical Handling & Aseptic Protocols */}
      <section className="border-t border-border/60 bg-surface-muted/40">
        <div className="container-wide py-16 md:py-20">
          <div id="guides" className="scroll-mt-20">
            <h2 className="h-section">Clinical Handling & Aseptic Protocols</h2>
            <p className="mt-3 max-w-[78ch] text-[14px] text-muted-foreground leading-relaxed">
              Technical reference for sterile preparation integrity, aseptic technique, storage and stability, and endocrinological context. Reviewed by the Medical Advisory Board. Not a substitute for individualized clinical advice.
            </p>
            <div className="mt-6 border border-border/70 rounded-[2px] bg-background">
              {filteredGuides.length ? (
                filteredGuides.map((e) => <SimpleRow key={e.id} entry={e} />)
              ) : (
                <EmptyNote />
              )}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/education/guides"
                className="text-[13px] text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border"
              >
                View full clinical protocol index →
              </Link>
              <Button asChild variant="outline" size="sm">
                <a href="#questions">Looking for safe-handling answers? Jump to FAQ →</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* §3 Public Inquiry — FAQ category grid */}
      <section className="border-t border-border/60">
        <div className="container-wide py-16 md:py-20">
          <div id="questions" className="scroll-mt-20">
            <h2 className="h-section">Public Inquiry & Regulatory FAQ</h2>
            <p className="mt-3 max-w-[78ch] text-[14px] text-muted-foreground leading-relaxed">
              Plain-record answers organized by inquiry category. Select a category to review its questions, or browse the full archive.
            </p>

            {/* Category grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {CATEGORIES.map((c) => {
                const isActive = c.key === activeCategory;
                const count = categoryCounts[c.key];
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setActiveCategory(c.key)}
                    className={[
                      "text-left rounded-[4px] border px-5 py-4 bg-background transition-colors",
                      isActive
                        ? "border-foreground/60"
                        : "border-border/70 hover:border-foreground/30",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                        {c.code}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground border border-border/70 px-1.5 py-px rounded-[2px]">
                        {count} {count === 1 ? "entry" : "entries"}
                      </span>
                    </div>
                    <h3 className="mt-2 text-[15px] font-semibold text-foreground">
                      {c.label}
                    </h3>
                    <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
                      {c.description}
                    </p>
                    <Link
                      to={`/education/questions#${c.groupAnchor}`}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-3 inline-block text-[12px] text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border"
                    >
                      View on full FAQ page →
                    </Link>
                  </button>
                );
              })}
            </div>

            {/* Active category accordion */}
            <div className="mt-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground mb-2">
                {activeCat.code} · {activeCat.label}
              </p>
              {activeFaqs.length ? (
                <Accordion type="single" collapsible className="border-t border-border/60">
                  {activeFaqs.map((item) => (
                    <AccordionItem key={item.id} value={item.id} className="border-b border-border/60">
                      <AccordionTrigger className="text-[14.5px] font-medium text-foreground hover:no-underline text-left">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-[14px] text-muted-foreground leading-relaxed">
                        <p>{item.a}</p>
                        {item.relatedSlug && (
                          <p className="mt-3">
                            <Link
                              to={`/education/${item.relatedSlug}`}
                              className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground"
                            >
                              Read more →
                            </Link>
                          </p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <p className="text-[13px] text-muted-foreground italic border-t border-border/60 py-4">
                  No matches in this category.
                </p>
              )}
            </div>

            <div className="mt-8 flex justify-end">
              <Button asChild>
                <Link to="/education/questions">Browse the full Regulatory FAQ archive →</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* §4 Latest Clinical Analysis */}
      <section className="border-t border-border/60 bg-surface-muted/40">
        <div className="container-wide py-16 md:py-20">
          <div id="analysis" className="scroll-mt-20">
            <h2 className="h-section">Latest Clinical Analysis</h2>
            <p className="mt-3 max-w-[78ch] text-[14px] text-muted-foreground leading-relaxed">
              Newest entries from the Source Standard analysis series. Reviewed under the Medical Advisory framework.
            </p>

            {filteredAnalysis.length ? (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAnalysis.map((entry) => (
                  <article
                    key={entry.id}
                    className="flex flex-col rounded-[4px] border border-border/70 bg-background p-6 transition-colors hover:border-foreground/30"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                      {entry.id} · Analysis
                    </span>
                    <h3 className="mt-2 text-[16px] font-semibold text-foreground leading-snug line-clamp-2">
                      {displayTitle(entry)}
                    </h3>
                    <p className="mt-2 text-[13.5px] text-muted-foreground leading-relaxed line-clamp-3">
                      {entry.summary}
                    </p>
                    <div className="mt-auto pt-5 flex items-center justify-between gap-3">
                      <SoftStatus status={entry.status} />
                      <Button asChild size="sm">
                        <Link to={`/education/${entry.slug}`}>Read more →</Link>
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-8 text-[13px] text-muted-foreground italic">
                No matches in this section.
              </p>
            )}

            <div className="mt-8 flex justify-end">
              <Button asChild variant="outline" size="sm">
                <a href="#archive">View the full standards archive →</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Forthcoming + About */}
      <section className="border-t border-border/60">
        <div className="container-wide py-16 md:py-20">
          <div id="archive" className="scroll-mt-20">
            <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground border-t border-b border-border/40 py-2 mb-10">
              Archive · SS-LIB-2026.01 · United States · Maintained Active · Updated 04/21/26
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <p className="eyebrow mb-3">Forthcoming reference formats</p>
                <ul className="text-[13.5px] text-muted-foreground leading-relaxed space-y-2">
                  {librarySupplementary.map((m) => {
                    const ov = SUPPLEMENT_OVERRIDES[m.id] ?? {};
                    return (
                      <li key={m.id} className="flex items-start gap-4">
                        <span className="w-24 shrink-0 pt-0.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted-foreground/80 tabular-nums">
                          {m.id}
                        </span>
                        <span className="flex-1">
                          <span className="text-foreground">{ov.title ?? m.title}</span> — {ov.description ?? m.description}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <p className="eyebrow mb-3">About this library</p>
                <p className="text-[13.5px] text-muted-foreground leading-relaxed">
                  Reviewed under our{" "}
                  <Link to="/medical-advisory" className="underline underline-offset-4 decoration-border text-foreground">
                    Medical Advisory Board
                  </Link>{" "}
                  and maintained alongside our{" "}
                  <Link to="/governance" className="underline underline-offset-4 decoration-border text-foreground">
                    governance framework
                  </Link>
                  . Updated continuously.
                </p>
                <div className="mt-6 border-l-2 border-foreground/40 bg-surface-muted/40 px-4 py-3 rounded-[2px]">
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/70 mb-1.5">
                    Notice · Informational use only
                  </p>
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
