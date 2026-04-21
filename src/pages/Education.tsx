import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { Section, SectionLabel } from "@/components/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ENTRY_STATUS_LABEL,
  EntryStatus,
  FAQ_GROUP_LABEL,
  FAQGroup,
  LibraryEntry,
  libraryFaqs,
  libraryGuides,
  librarySeries,
  librarySupplementary,
} from "@/data/library";

const StatusChip = ({ status }: { status: EntryStatus }) => (
  <span className="inline-flex items-center gap-1.5 border border-border/70 px-2 py-0.5 text-[10.5px] font-mono uppercase tracking-[0.1em] text-muted-foreground">
    <span aria-hidden className="inline-block w-1.5 h-1.5 rounded-full bg-current" />
    {ENTRY_STATUS_LABEL[status]}
  </span>
);

const EntryRow = ({ entry }: { entry: LibraryEntry }) => (
  <Link
    to={`/education/${entry.slug}`}
    className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-border/60 last:border-b-0 hover:bg-surface-muted/40 transition-colors group"
  >
    <div className="col-span-12 md:col-span-2 flex items-start">
      <span className="text-[11.5px] font-mono uppercase tracking-[0.08em] text-muted-foreground tabular-nums">
        {entry.id}
      </span>
    </div>
    <div className="col-span-12 md:col-span-7">
      <h3 className="text-[15px] font-medium text-foreground leading-snug group-hover:underline underline-offset-4 decoration-border">
        {entry.title}
      </h3>
      <p className="mt-1 text-[13.5px] text-muted-foreground leading-relaxed">
        {entry.summary}
      </p>
      {entry.reviewedBy && (
        <p className="mt-2 text-[11.5px] text-muted-foreground/80">
          Reviewed by · <span className="text-foreground/80">{entry.reviewedBy}</span>
        </p>
      )}
    </div>
    <div className="col-span-12 md:col-span-3 flex md:justify-end items-start">
      <StatusChip status={entry.status} />
    </div>
  </Link>
);

const groupedFaqs = (Object.keys(FAQ_GROUP_LABEL) as FAQGroup[]).map((g) => ({
  group: g,
  label: FAQ_GROUP_LABEL[g],
  items: libraryFaqs.filter((f) => f.group === g),
}));

const Education = () => {
  const counts = {
    series: librarySeries.length,
    guides: libraryGuides.length,
    faqs: libraryFaqs.length,
    supplementary: librarySupplementary.length,
  };

  return (
    <>
      <RecordHeader
        metadata={[
          { label: "Document", value: "SS-LIBRARY-2026.01" },
          { label: "Status", value: "Active" },
          { label: "Reviewed under", value: "Medical Advisory Board" },
          { label: "Updated", value: "Continuously" },
        ]}
        eyebrow="Clinical Reference Library"
        title="Clinical Reference Library"
        lead="A neutral, structured reference resource for consumers and clinicians. The library documents the framework behind Source Standard, provides physician-reviewed clinical guides, and addresses common questions about verification, methodology, and consumer due diligence. It is not editorial content and is not personalized medical advice."
        summary={[
          { label: "Source Standard Series", value: counts.series },
          { label: "Clinical Guides", value: counts.guides },
          { label: "FAQ entries", value: counts.faqs },
          { label: "Supplementary formats", value: counts.supplementary },
        ]}
      />

      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border/60">
        <div className="container-wide flex flex-wrap items-center gap-x-8 gap-y-2 py-3 text-[12.5px]">
          <span className="text-muted-foreground/80 font-mono uppercase tracking-[0.08em] text-[11px]">
            Index
          </span>
          <a href="#series" className="text-foreground hover:underline underline-offset-4">
            I · Source Standard Series
          </a>
          <a href="#guides" className="text-foreground hover:underline underline-offset-4">
            II · Clinical Guides
          </a>
          <a href="#faq" className="text-foreground hover:underline underline-offset-4">
            III · FAQ
          </a>
          <a href="#supplementary" className="text-foreground hover:underline underline-offset-4">
            IV · Supplementary
          </a>
        </div>
      </div>

      <Section>
        <div id="series" className="scroll-mt-20">
          <SectionLabel
            number="I"
            eyebrow="Lane I"
            title="The Source Standard Series"
            description="Framework and landscape pieces authored by Source Standard. These entries explain the regulatory context, the verification framework, and the reasoning behind directory methodology."
          />
          <div className="border border-border/70 rounded-[2px] bg-background">
            {librarySeries.map((e) => (
              <EntryRow key={e.id} entry={e} />
            ))}
          </div>
        </div>
      </Section>

      <Section muted>
        <div id="guides" className="scroll-mt-20">
          <SectionLabel
            number="II"
            eyebrow="Lane II"
            title="Clinical & Practical Guides"
            description="Reviewed under the Medical Advisory Board. These guides are intended as practical clinical reference material. They are not personalized medical advice and do not establish a clinician–patient relationship."
          />
          <div className="border border-border/70 rounded-[2px] bg-background">
            {libraryGuides.map((e) => (
              <EntryRow key={e.id} entry={e} />
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div id="faq" className="scroll-mt-20">
          <SectionLabel
            number="III"
            eyebrow="Lane III"
            title="Unbiased FAQ"
            description="Direct answers to common questions about legality, verification status, registry methodology, and consumer due diligence."
          />
          <div className="space-y-10">
            {groupedFaqs.map((g) => (
              <div key={g.group}>
                <p className="eyebrow mb-4">{g.label}</p>
                <Accordion type="single" collapsible className="border-t border-border/60">
                  {g.items.map((item) => (
                    <AccordionItem key={item.id} value={item.id} className="border-b border-border/60">
                      <AccordionTrigger className="text-[14.5px] font-medium text-foreground hover:no-underline text-left">
                        <span className="flex items-baseline gap-3">
                          <span className="text-[11px] font-mono uppercase tracking-[0.08em] text-muted-foreground tabular-nums">
                            {item.id}
                          </span>
                          <span>{item.q}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-[14px] text-muted-foreground leading-relaxed">
                        <p>{item.a}</p>
                        {item.relatedSlug && (
                          <p className="mt-3">
                            <Link
                              to={`/education/${item.relatedSlug}`}
                              className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground"
                            >
                              Read deeper →
                            </Link>
                          </p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section muted>
        <div id="supplementary" className="scroll-mt-20">
          <SectionLabel
            number="IV"
            eyebrow="Lane IV"
            title="Supplementary Infrastructure"
            description="Additional reference formats currently being built out. Each module is scaffolded for future content and will become active as it is reviewed and released."
          />
          <div className="grid md:grid-cols-3 gap-px bg-border/60 border border-border/70">
            {librarySupplementary.map((m) => (
              <div key={m.id} className="bg-background p-6 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono uppercase tracking-[0.08em] text-muted-foreground">
                    {m.id}
                  </span>
                  <span className="inline-flex items-center gap-1.5 border border-border/70 px-2 py-0.5 text-[10.5px] font-mono uppercase tracking-[0.1em] text-muted-foreground">
                    <span aria-hidden className="inline-block w-1.5 h-1.5 rounded-full bg-current" />
                    {m.status === "forthcoming" ? "Forthcoming" : "Active"}
                  </span>
                </div>
                <h3 className="text-[16px] font-medium text-foreground">{m.title}</h3>
                <p className="mt-2 text-[13.5px] text-muted-foreground leading-relaxed flex-1">
                  {m.description}
                </p>
                {m.cta && (
                  <Link
                    to={m.cta.to}
                    className="mt-4 inline-flex items-center text-[13px] text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground"
                  >
                    {m.cta.label} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section bordered={false}>
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <p className="eyebrow mb-3">Cite as</p>
            <p className="text-[13.5px] text-muted-foreground leading-relaxed font-mono">
              Source Standard. <span className="text-foreground">Clinical Reference Library</span>{" "}
              (SS-LIBRARY-2026.01). sourcestandard.org/education.
            </p>
            <p className="mt-6 text-[12.5px] text-muted-foreground leading-relaxed max-w-2xl">
              All material in the Clinical Reference Library is informational only and is not a
              substitute for professional medical advice, diagnosis, or treatment. Always seek the
              advice of a qualified health provider with any questions regarding a medical condition.
            </p>
          </div>
          <div className="md:col-span-5">
            <p className="eyebrow mb-3">Read deeper</p>
            <ul className="border-t border-border/60 divide-y divide-border/60">
              {[
                { to: "/governance", label: "Governance" },
                { to: "/medical-advisory", label: "Medical Advisory Board" },
                { to: "/status-definitions", label: "Status Definitions" },
                { to: "/how-to-read-the-directory", label: "How to Read the Directory" },
              ].map((l) => (
                <li key={l.to} className="py-3">
                  <Link
                    to={l.to}
                    className="text-[14px] text-foreground hover:underline underline-offset-4 decoration-border"
                  >
                    {l.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Education;
