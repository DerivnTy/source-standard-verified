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
    q: "Is it legal to purchase compounded peptides in the United States?",
    a: "Yes, provided they are obtained through a licensed medical provider and filled by a regulated 503A or 503B pharmacy. Compounding is a legal practice protected under sections 503A and 503B of the Federal Food, Drug, and Cosmetic Act. Purchasing substances labeled 'Research Use Only' or 'Not for Human Consumption' from non-pharmacy sources falls outside this legal framework and carries significant regulatory and personal health risks.",
  },
  {
    id: "Q2",
    q: "What is the significance of the 2026 Compounding Reclassification?",
    a: "The reclassification has tightened the oversight on which specific substances can be prepared in batch-scale (503B) versus patient-specific (503A). Source Standard monitors these shifts in real-time to ensure that verified clinics are utilizing pharmacies that remain in strict compliance with the latest FDA 'Desk References' and 'Demonstrably Difficult to Compound' lists.",
  },
  {
    id: "Q3",
    q: "Does the FDA 'approve' compounded medications?",
    a: "Technically, no. The FDA approves mass-produced brand-name drugs. Compounded medications are 'exempt' from the FDA approval process to allow for patient customization. However, the facilities (503B) and the active ingredients (API) are subject to FDA oversight and must meet USP or cGMP standards. Source Standard verifies that these exemptions are being used lawfully.",
  },
];

const FaqLegalRegulatory = () => {
  return (
    <>
      <RecordHeader
        eyebrow="Source Standard · Regulatory FAQ"
        title="FAQ: Legal & Regulatory"
        lead="Statutory framework, federal scheduling, and the lawful access parameters for compounded medications in the United States."
        metadata={[
          { label: "Doc", value: "FAQ-CAT-01" },
          { label: "Status", value: "Public Record" },
          { label: "Jurisdiction", value: "United States (Federal)" },
          { label: "Updated", value: "April 21, 2026" },
        ]}
      />

      <Section>
        <SectionLabel
          number="§1"
          title="Category Overview"
          description="Three high-frequency questions covering federal authority, the 2026 reclassification, and the FDA's role in compounded medications."
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
            to="/library/faq/clinical-safety"
            className="text-[13px] text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border"
          >
            Next Category: Clinical Safety (FAQ-CAT-02) →
          </Link>
        </div>
      </Section>
    </>
  );
};

export default FaqLegalRegulatory;
