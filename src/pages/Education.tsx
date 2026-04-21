import { Link } from "react-router-dom";
import { AnchorHeader } from "@/components/AnchorHeader";
import { Section } from "@/components/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ENTRY_STATUS_LABEL,
  EntryStatus,
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

const SoftStatus = ({ status }: { status: EntryStatus }) =>
  isReadable(status) ? null : (
    <span className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted-foreground/70">
      {ENTRY_STATUS_LABEL[status]}
    </span>
  );

const SimpleRow = ({ entry }: { entry: LibraryEntry }) => (
  <Link
    to={`/education/${entry.slug}`}
    className="block px-5 py-4 border-b border-border/60 last:border-b-0 hover:bg-surface-muted/40 transition-colors group"
  >
    <div className="flex items-start gap-5">
      <span className="w-28 shrink-0 pt-0.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted-foreground tabular-nums">
        {entry.id}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-[16px] font-medium text-foreground leading-snug group-hover:underline underline-offset-4 decoration-border">
            {TITLE_OVERRIDES[entry.slug] ?? entry.title}
          </h3>
          <SoftStatus status={entry.status} />
        </div>
        <p className="mt-1 text-[13.5px] text-muted-foreground leading-relaxed">
          {entry.summary}
        </p>
        {entry.reviewedBy && (
          <p className="mt-2 text-[11.5px] text-muted-foreground/80">
            Reviewed by {entry.reviewedBy}
          </p>
        )}
      </div>
    </div>
  </Link>
);

const SeeMore = ({ to, label }: { to: string; label: string }) => (
  <div className="mt-5 flex justify-end">
    <Link
      to={to}
      className="text-[13px] text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border"
    >
      {label} →
    </Link>
  </div>
);

// Plain-language FAQ regrouping
const FAQ_BUCKETS: { label: string; ids: string[] }[] = [
  {
    label: "Legal Distinction & Access",
    ids: ["SS-FAQ-001", "SS-FAQ-002"],
  },
  {
    label: "Regulatory Status & Safety Scope",
    ids: ["SS-FAQ-004", "SS-FAQ-007"],
  },
  {
    label: "Verification Methodology",
    ids: ["SS-FAQ-003", "SS-FAQ-005", "SS-FAQ-006", "SS-FAQ-008"],
  },
  {
    label: "Consumer Due Diligence",
    ids: ["SS-FAQ-009", "SS-FAQ-010"],
  },
];

const faqById = (id: string) => libraryFaqs.find((f) => f.id === id)!;

// Pick basics: intro-level series
const basics: LibraryEntry[] = [
  ...librarySeries.filter((e) => e.level === "intro"),
];

// Trim guides to first 4 on landing
const guidesPreview = libraryGuides.slice(0, 4);

const Education = () => {
  return (
    <>
      <AnchorHeader
        eyebrow="Public education & standards"
        title="Clinical Reference & Standards Library."
        lead="Reference materials covering the administrative and clinical protocols that govern compounded medication sourcing, handling, and verification under the Source Standard framework."
      />

      {/* Quiet anchor row */}
      <div className="border-y border-border/40 bg-background">
        <div className="container-wide flex flex-wrap items-center gap-x-6 gap-y-2 py-2.5 text-[12px] text-muted-foreground">
          <span className="text-muted-foreground/60">Jump to:</span>
          <a href="#basics" className="text-foreground/80 hover:text-foreground hover:underline underline-offset-4">Foundational Standards</a>
          <a href="#guides" className="text-foreground/80 hover:text-foreground hover:underline underline-offset-4">Clinical Protocols</a>
          <a href="#questions" className="text-foreground/80 hover:text-foreground hover:underline underline-offset-4">Regulatory FAQ</a>
          <a href="#archive" className="text-foreground/80 hover:text-foreground hover:underline underline-offset-4">Archive index</a>
        </div>
      </div>

      {/* Archive index strip */}
      <div className="border-b border-border/40 bg-surface-muted/30">
        <div className="container-wide flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          <span>Archive index · SS-LIB-2026.01</span>
          <span>Maintained · Active</span>
        </div>
      </div>

      {/* Foundational Sourcing Standards */}
      <Section>
        <div id="basics" className="scroll-mt-20">
          <h2 className="h-section">Foundational Sourcing Standards</h2>
          <p className="mt-3 max-w-xl text-[14px] text-muted-foreground leading-relaxed">
            Foundational reference material on compounded medications, sourcing chains, and the documentation that distinguishes a regulated source from an unregulated one.
          </p>
          <div className="mt-6 border border-border/70 rounded-[2px] bg-background">
            {basics.map((e) => (
              <SimpleRow key={e.id} entry={e} />
            ))}
          </div>
          <SeeMore to="/education/basics" label="View full foundational index" />
        </div>
      </Section>

      {/* Clinical Handling & Aseptic Protocols */}
      <Section muted>
        <div id="guides" className="scroll-mt-20">
          <h2 className="h-section">Clinical Handling & Aseptic Protocols</h2>
          <p className="mt-3 max-w-xl text-[14px] text-muted-foreground leading-relaxed">
            Technical reference for sterile preparation integrity, aseptic technique, storage and stability, and endocrinological context. Reviewed by the Medical Advisory Board. Not a substitute for individualized clinical advice.
          </p>
          <div className="mt-6 border border-border/70 rounded-[2px] bg-background">
            {guidesPreview.map((e) => (
              <SimpleRow key={e.id} entry={e} />
            ))}
          </div>
          <SeeMore to="/education/guides" label="View full clinical protocol index" />
        </div>
      </Section>

      {/* Public Inquiry & Regulatory FAQ */}
      <Section>
        <div id="questions" className="scroll-mt-20">
          <h2 className="h-section">Public Inquiry & Regulatory FAQ</h2>
          <p className="mt-3 max-w-xl text-[14px] text-muted-foreground leading-relaxed">
            Plain-record answers on legal distinction, regulatory status, verification methodology, and consumer due diligence.
          </p>
          <div className="mt-6 space-y-8">
            {FAQ_BUCKETS.map((bucket) => (
              <div key={bucket.label}>
                <h3 className="text-[14px] font-medium text-foreground mb-2">{bucket.label}</h3>
                <Accordion type="single" collapsible className="border-t border-border/60">
                  {bucket.ids.slice(0, 2).map((id) => {
                    const item = faqById(id);
                    return (
                      <AccordionItem key={id} value={id} className="border-b border-border/60">
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
                    );
                  })}
                </Accordion>
              </div>
            ))}
          </div>
          <SeeMore to="/education/questions" label="View full regulatory FAQ" />
        </div>
      </Section>

      {/* Forthcoming + About — collapsed footer */}
      <Section bordered={false}>
        <div id="archive" className="scroll-mt-20 grid md:grid-cols-2 gap-10">
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
      </Section>
    </>
  );
};

export default Education;
