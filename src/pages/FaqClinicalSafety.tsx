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

const DOC_ID = "SS-FAQ-CAT-02";

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
      <PageMeta title="Clinical Safety FAQ" description="Plain-language answers about clinical safety, dosing, and oversight." />
      <Breadcrumb items={[
          { label: "Resource Library", to: "/education" },
          { label: "FAQ" },
        ]} />
      <RecordHeader
        eyebrow="Source Standard · Regulatory FAQ"
        title="FAQ: Clinical Safety"
        lead="Sterility standards, handling integrity, and the clinical scope of use for compounded preparations."
        metadata={[
          { label: "Doc", value: DOC_ID },
          { label: "Status", value: "Public Record" },
          { label: "Jurisdiction", value: "United States" },
          { label: "Updated", value: "04 / 21 / 2026" },
        ]}
        verifiedOn="04 / 21 / 2026"
      />

      <BoardSection
        n={1}
        category="Category overview"
        title="Sterility, handling, and beyond-use dating."
        rationale="Three high-frequency questions on cold-chain stability, USP <797> beyond-use dating, and endotoxin testing in sterile compounding."
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
        next={{ to: "/library/faq/verification-process", label: "Next Category · Verification Process (SS-FAQ-CAT-03)" }}
      />

      <BoardCiteFooter citation={`Source Standard, Regulatory FAQ — Clinical Safety, ${DOC_ID}. Last updated 04 / 21 / 2026.`} />
    </>
  );
};

export default FaqClinicalSafety;
