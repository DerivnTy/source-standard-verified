import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
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

const SoftStatus = ({ status }: { status: EntryStatus }) =>
  isReadable(status) ? null : (
    <span className="text-[11.5px] text-muted-foreground/70 italic">
      {ENTRY_STATUS_LABEL[status]}
    </span>
  );

const SimpleRow = ({ entry }: { entry: LibraryEntry }) => (
  <Link
    to={`/education/${entry.slug}`}
    className="block px-5 py-4 border-b border-border/60 last:border-b-0 hover:bg-surface-muted/40 transition-colors group"
  >
    <div className="flex items-baseline justify-between gap-4">
      <h3 className="text-[16px] font-medium text-foreground leading-snug group-hover:underline underline-offset-4 decoration-border">
        {entry.title}
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
  </Link>
);

// Plain-language FAQ regrouping
const FAQ_BUCKETS: { label: string; ids: string[] }[] = [
  {
    label: "Is this legal?",
    ids: ["SS-FAQ-001", "SS-FAQ-002"],
  },
  {
    label: "Is it safe?",
    ids: ["SS-FAQ-004", "SS-FAQ-007"],
  },
  {
    label: "How does verification work?",
    ids: ["SS-FAQ-003", "SS-FAQ-005", "SS-FAQ-006", "SS-FAQ-008"],
  },
  {
    label: "What should I look for?",
    ids: ["SS-FAQ-009", "SS-FAQ-010"],
  },
];

const faqById = (id: string) => libraryFaqs.find((f) => f.id === id)!;

// Pick basics: intro-level series + the foundational guide
const basics: LibraryEntry[] = [
  ...librarySeries.filter((e) => e.level === "intro"),
];

const Education = () => {
  return (
    <>
      <PageHeader
        eyebrow="Learn"
        title="Learn how this actually works"
        description="A plain-language place to learn how compounded medications, peptides, and TRT actually work — and how to tell a trustworthy source from a risky one. Written for consumers, useful for clinicians."
      />

      {/* Start Here */}
      <Section>
        <p className="eyebrow mb-4">Start here</p>
        <div className="grid md:grid-cols-3 gap-px bg-border/60 border border-border/70">
          <Link
            to="/education/what-are-peptides"
            className="bg-background p-6 hover:bg-surface-muted/40 transition-colors group"
          >
            <h3 className="text-[16px] font-medium text-foreground group-hover:underline underline-offset-4 decoration-border">
              New to peptides?
            </h3>
            <p className="mt-2 text-[13.5px] text-muted-foreground leading-relaxed">
              Start with a plain-language explainer of what peptides are and how they're used.
            </p>
            <p className="mt-4 text-[13px] text-foreground">Read: What Are Peptides? →</p>
          </Link>
          <Link
            to="/education/questions-to-ask-your-clinic"
            className="bg-background p-6 hover:bg-surface-muted/40 transition-colors group"
          >
            <h3 className="text-[16px] font-medium text-foreground group-hover:underline underline-offset-4 decoration-border">
              Evaluating a clinic or vendor?
            </h3>
            <p className="mt-2 text-[13.5px] text-muted-foreground leading-relaxed">
              The questions to ask before you start, plus the directory of reviewed sources.
            </p>
            <p className="mt-4 text-[13px] text-foreground">
              Questions to ask · <Link to="/greenlist" className="underline underline-offset-4 decoration-border">Browse directory</Link>
            </p>
          </Link>
          <Link
            to="/education/the-2026-compounding-reclassification"
            className="bg-background p-6 hover:bg-surface-muted/40 transition-colors group"
          >
            <h3 className="text-[16px] font-medium text-foreground group-hover:underline underline-offset-4 decoration-border">
              Want to understand the rules?
            </h3>
            <p className="mt-2 text-[13.5px] text-muted-foreground leading-relaxed">
              How compounding is regulated, what's changing in 2026, and what it means for you.
            </p>
            <p className="mt-4 text-[13px] text-foreground">Read: The 2026 Reclassification →</p>
          </Link>
        </div>
      </Section>

      {/* Quiet anchor row */}
      <div className="border-y border-border/60 bg-background">
        <div className="container-wide flex flex-wrap items-center gap-x-6 gap-y-2 py-3 text-[12.5px] text-muted-foreground">
          <span className="text-muted-foreground/70">Jump to:</span>
          <a href="#basics" className="text-foreground hover:underline underline-offset-4">The Basics</a>
          <a href="#guides" className="text-foreground hover:underline underline-offset-4">Practical Guides</a>
          <a href="#questions" className="text-foreground hover:underline underline-offset-4">Common Questions</a>
        </div>
      </div>

      {/* The Basics */}
      <Section>
        <div id="basics" className="scroll-mt-20">
          <h2 className="text-[1.25rem] font-semibold text-foreground">The Basics</h2>
          <p className="mt-2 max-w-2xl text-[14px] text-muted-foreground leading-relaxed">
            Foundational reads. Start here if you're new — these explain what peptides and compounded medications are, and how to tell a real source from a fake one.
          </p>
          <div className="mt-6 border border-border/70 rounded-[2px] bg-background">
            {basics.map((e) => (
              <SimpleRow key={e.id} entry={e} />
            ))}
          </div>
        </div>
      </Section>

      {/* Practical Guides */}
      <Section muted>
        <div id="guides" className="scroll-mt-20">
          <h2 className="text-[1.25rem] font-semibold text-foreground">Practical Guides</h2>
          <p className="mt-2 max-w-2xl text-[14px] text-muted-foreground leading-relaxed">
            How to handle these medications safely. Reviewed by our Medical Advisory Board. Not a substitute for advice from your own clinician.
          </p>
          <div className="mt-6 border border-border/70 rounded-[2px] bg-background">
            {libraryGuides.map((e) => (
              <SimpleRow key={e.id} entry={e} />
            ))}
          </div>
        </div>
      </Section>

      {/* Common Questions */}
      <Section>
        <div id="questions" className="scroll-mt-20">
          <h2 className="text-[1.25rem] font-semibold text-foreground">Common Questions</h2>
          <p className="mt-2 max-w-2xl text-[14px] text-muted-foreground leading-relaxed">
            Direct, honest answers to the questions people most often ask.
          </p>
          <div className="mt-6 space-y-8">
            {FAQ_BUCKETS.map((bucket) => (
              <div key={bucket.label}>
                <h3 className="text-[14px] font-medium text-foreground mb-2">{bucket.label}</h3>
                <Accordion type="single" collapsible className="border-t border-border/60">
                  {bucket.ids.map((id) => {
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
        </div>
      </Section>

      {/* Coming soon strip */}
      <Section muted>
        <p className="eyebrow mb-3">Coming soon</p>
        <ul className="text-[14px] text-muted-foreground leading-relaxed space-y-1.5">
          {librarySupplementary.map((m) => (
            <li key={m.id}>
              <span className="text-foreground">{m.title}</span> — {m.description}
            </li>
          ))}
        </ul>
      </Section>

      {/* About this library */}
      <Section bordered={false}>
        <p className="eyebrow mb-3">About this library</p>
        <p className="text-[13.5px] text-muted-foreground leading-relaxed max-w-2xl">
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
        <p className="mt-4 text-[12.5px] text-muted-foreground leading-relaxed max-w-2xl">
          Everything here is informational only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always talk to a qualified health provider with questions about your own care.
        </p>
      </Section>
    </>
  );
};

export default Education;
