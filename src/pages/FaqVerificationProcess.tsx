import { RecordHeader } from "@/components/RecordHeader";
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

const DOC_ID = "SS-FAQ-CAT-03";

const QA = [
  {
    id: "Q1",
    q: "How does a clinic become 'Source Standard Verified'?",
    a: "Verification is a three-stage process. First, the clinic must submit a full disclosure of their upstream pharmacy partners. Second, Source Standard performs a 'Licensure Reconciliation' to ensure those pharmacies are in good standing with both the FDA and state boards. Third, the clinic must provide 'Evidence of Procurement' (redacted invoices) to prove they are actually sourcing from the regulated facilities they claim to use.",
  },
  {
    id: "Q2",
    q: "Does Source Standard test the medications themselves?",
    a: "Source Standard is an auditing body, not a primary testing lab. We verify the validity of the laboratory reports (CoAs) provided by the pharmacies. We contact the issuing labs to confirm that the reports are authentic and have not been altered. This 'Closed-Loop' audit ensures that the pharmacy's own rigorous testing is legitimate.",
  },
  {
    id: "Q3",
    q: "What causes a clinic to lose its 'Verified' status?",
    a: "A 'Verified' status is revoked if a clinic fails a periodic audit, fails to disclose a change in their pharmacy source, or if their primary pharmacy partner receives a significant FDA warning letter or suspension. We also investigate credible consumer reports of undocumented sourcing.",
  },
  {
    id: "Q4",
    q: "How often are clinics re-audited?",
    a: "Verified listings are subject to quarterly 'Administrative Checks' and full 'Institutional Re-Verification' every 12 months. This ensures that the clinical oversight and sourcing channels remain consistent with our safety framework.",
  },
];

const FaqVerificationProcess = () => {
  return (
    <>
      <RecordHeader
        eyebrow="Source Standard · Regulatory FAQ"
        title="FAQ: Verification Process"
        lead="Details on the Source Standard auditing protocol, facility reconciliation, and the criteria for institutional verification."
        metadata={[
          { label: "Doc", value: DOC_ID },
          { label: "Status", value: "Public Record" },
          { label: "Jurisdiction", value: "United States" },
          { label: "Updated", value: "04 / 21 / 2026" },
        ]}
      />

      <BoardSection
        n={1}
        category="Category overview"
        title="The auditing protocol & re-verification cadence."
        rationale="Four high-frequency questions on the Source Standard verification stages, the scope of our audits, the criteria for status revocation, and the cadence of re-verification."
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
        next={{ to: "/library/faq/consumer-diligence", label: "Next Category · Consumer Diligence (SS-FAQ-CAT-04)" }}
      />

      <BoardCiteFooter citation={`Source Standard, Regulatory FAQ — Verification Process, ${DOC_ID}. Last updated 04 / 21 / 2026.`} />
    </>
  );
};

export default FaqVerificationProcess;
