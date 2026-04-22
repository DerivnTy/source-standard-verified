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
          { label: "Doc", value: "FAQ-CAT-03" },
          { label: "Status", value: "Public Record" },
          { label: "Jurisdiction", value: "United States" },
          { label: "Updated", value: "April 21, 2026" },
        ]}
      />

      <Section>
        <SectionLabel
          number="§1"
          title="Category Overview"
          description="Four high-frequency questions on the Source Standard verification stages, the scope of our audits, the criteria for status revocation, and the cadence of re-verification."
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
            to="/library/faq/consumer-diligence"
            className="text-[13px] text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border"
          >
            Next Category: Consumer Diligence (FAQ-CAT-04) →
          </Link>
        </div>
      </Section>
    </>
  );
};

export default FaqVerificationProcess;
