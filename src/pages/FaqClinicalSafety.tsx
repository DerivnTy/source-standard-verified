import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { Section, SectionLabel } from "@/components/Section";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const QA = [
  {
    id: "Q1",
    q: "Why do some compounded medications require refrigeration while others do not?",
    a: "Stability is compound-specific. Many peptides are highly sensitive to kinetic energy (shaking) and thermal energy (heat), which can cause the delicate amino acid chains to denature or 'unravel,' rendering the medication ineffective. Source Standard verifies that clinics provide the specific 'Cold Chain' instructions required by the upstream pharmacy's stability studies.",
  },
  {
    id: "Q2",
    q: "Is it safe to use a multi-dose vial for more than 28 days?",
    a: "According to USP <797> standards, the default Beyond-Use Date (BUD) for an opened multi-dose vial is 28 days, unless the manufacturer or pharmacy has performed specific 'stability-indicating' tests to prove a longer duration. Using a vial beyond this window increases the risk of microbial growth, even if the solution looks clear.",
  },
  {
    id: "Q3",
    q: "What are 'endotoxins' and why are they tested?",
    a: "Endotoxins are toxic substances bound to the bacterial cell wall that are released when the bacteria die. Even if a solution is 'sterile' (no living bacteria), the presence of endotoxins can cause severe 'pyrogenic' reactions, including high fever and systemic inflammation. Source Standard audits verify that pharmacies perform endotoxin testing on all sterile batches.",
  },
];

const FaqClinicalSafety = () => {
  return (
    <>
      <RecordHeader
        eyebrow="Source Standard · Regulatory FAQ"
        title="FAQ: Clinical Safety"
        lead="Sterility standards, handling integrity, and the clinical scope of use for compounded preparations."
        metadata={[
          { label: "Doc", value: "FAQ-CAT-02" },
          { label: "Status", value: "Public Record" },
          { label: "Jurisdiction", value: "United States" },
          { label: "Updated", value: "April 21, 2026" },
        ]}
      />

      <Section>
        <SectionLabel
          number="§1"
          title="Category Overview"
          description="Three high-frequency questions on cold-chain stability, USP <797> beyond-use dating, and endotoxin testing in sterile compounding."
        />

        <Accordion
          type="single"
          collapsible
          defaultValue="Q1"
          className="border-t border-border/70"
        >
          {QA.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border-b border-border/60"
            >
              <AccordionTrigger className="py-5 hover:no-underline group">
                <div className="flex items-baseline gap-4 text-left">
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground pt-[3px]">
                    {item.id}
                  </span>
                  <span className="text-[15.5px] font-medium text-foreground leading-snug">
                    {item.q}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pl-[calc(2rem+1ch)] pr-2">
                <p className="text-[15px] leading-[1.75] text-foreground/90 m-0">
                  {item.a}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-16 pt-6 border-t border-border/70 flex items-center justify-between gap-6">
          <Button asChild variant="outline">
            <Link to="/education#questions">← Back to FAQ Index</Link>
          </Button>
          <Link
            to="/library/faq/verification-process"
            className="text-[13px] text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border"
          >
            Next Category: Verification Process (FAQ-CAT-03) →
          </Link>
        </div>
      </Section>
    </>
  );
};

export default FaqClinicalSafety;
