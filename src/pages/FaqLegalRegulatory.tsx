import { RecordHeader } from "@/components/RecordHeader";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  BoardSection,
  BoardFooterNav,
  BoardCiteFooter,
} from "@/components/BoardSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const DOC_ID = "SS-FAQ-CAT-01";

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
      <PageMeta title="Legal & Regulatory FAQ" description="Plain-language answers to legal and regulatory questions about compounded peptides." />
      <Breadcrumb items={[
          { label: "Resource Library", to: "/education" },
          { label: "FAQ" },
        ]} />
      <RecordHeader
        eyebrow="Source Standard · Regulatory FAQ"
        title="FAQ: Legal & Regulatory"
        lead="Statutory framework, federal scheduling, and the lawful access parameters for compounded medications in the United States."
        metadata={[
          { label: "Doc", value: DOC_ID },
          { label: "Status", value: "Public Record" },
          { label: "Jurisdiction", value: "United States (Federal)" },
          { label: "Updated", value: "04 / 21 / 2026" },
        ]}
        verifiedOn="04 / 21 / 2026"
      />

      <BoardSection
        n={1}
        category="Category overview"
        title="Statutory framework & federal authority."
        rationale="Three high-frequency questions covering federal authority, the 2026 reclassification, and the FDA's role in compounded medications."
      >
        <Accordion
          type="single"
          collapsible
          defaultValue="Q1"
          className="border border-border bg-background divide-y divide-border"
        >
          {QA.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border-0">
              <AccordionTrigger className="px-5 py-4 hover:no-underline group">
                <div className="flex items-baseline gap-4 text-left">
                  <span className="meta text-primary pt-[2px]">{item.id}</span>
                  <span className="text-[14.5px] font-semibold text-foreground leading-snug">
                    {item.q}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 pl-[calc(1.25rem+1.75rem)]">
                <p className="text-[14.5px] leading-relaxed text-muted-foreground m-0">
                  {item.a}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </BoardSection>

      <BoardFooterNav
        back={{ to: "/education#questions", label: "Back to FAQ Index" }}
        next={{ to: "/library/faq/clinical-safety", label: "Next Category · Clinical Safety (SS-FAQ-CAT-02)" }}
      />

      <BoardCiteFooter citation={`Source Standard, Regulatory FAQ — Legal & Regulatory, ${DOC_ID}. Last updated 04 / 21 / 2026.`} />
    </>
  );
};

export default FaqLegalRegulatory;
