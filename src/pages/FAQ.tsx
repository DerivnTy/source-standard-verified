import { Link, To } from "react-router-dom";
import { ReactNode } from "react";
import { RecordHeader } from "@/components/RecordHeader";
import { Section, SectionLabel } from "@/components/Section";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type QA = { q: string; a: ReactNode; to?: To; toLabel?: string };

const groups: { title: string; items: QA[] }[] = [
  {
    title: "The Organization",
    items: [
      {
        q: "What is Source Standard?",
        a: "Source Standard is an auditing body that maintains a public registry of medical and health vendors reviewed against documented sourcing, licensing, and public-claims criteria. The registry is a reference layer; it is not a clinic, pharmacy, or manufacturer.",
        to: "/about",
        toLabel: "About Source Standard",
      },
      {
        q: "Is Source Standard a regulator?",
        a: "No. Source Standard is not a regulator. It references existing regulatory anchors (FDA, state boards of pharmacy, PCAB, NSF, USP) and publishes time-bound determinations against those anchors.",
        to: "/governance",
        toLabel: "Governance",
      },
      {
        q: "Who oversees the framework?",
        a: "An internal review function and a medical advisory body. Authority references are drawn from FDA, state boards of pharmacy, PCAB, NSF, and USP standards.",
        to: "/medical-advisory",
        toLabel: "Medical Advisory",
      },
    ],
  },
  {
    title: "Verification Protocols",
    items: [
      {
        q: "What does \u201CVerified\u201D mean?",
        a: "A time-bound determination by the auditing body that the entity has produced records of identity, licensing, sourcing, and public claims sufficient to satisfy the verification protocol (SS-FRAMEWORK-2026.01) at the date of issue.",
        to: "/how-it-works",
        toLabel: "Verification protocol",
      },
      {
        q: "What is examined during verification?",
        a: "Business identity; jurisdictional licenses and registrations; pharmacy and supplier records; certificates of analysis and category records; procurement and invoice history; consistency of public claims; and renewal-related updates.",
        to: "/how-it-works",
        toLabel: "What we review",
      },
      {
        q: "How long does a determination last?",
        a: "Determinations are time-bound and reviewed on a defined renewal interval. Material changes can trigger an out-of-cycle re-review at any time.",
        to: "/accountability",
        toLabel: "Accountability & Enforcement",
      },
      {
        q: "What does \u201CVerified\u201D not mean?",
        a: "It is not a clinical endorsement, not a guarantee of product safety, not a warranty of future conduct, and not a substitute for professional medical judgment.",
        to: "/verification-disclaimer",
        toLabel: "Verification Disclaimer",
      },
      {
        q: "What public statuses exist?",
        a: "Verified, Pending Review, Under Review, Suspended, Removed, Greenlisted, and Not Listed. Each is defined in the controlling reference.",
        to: "/status-definitions",
        toLabel: "Status Definitions",
      },
      {
        q: "What does \u201CSuspended\u201D mean?",
        a: "A previously Verified determination has been temporarily withdrawn pending clarification. It does not constitute a finding of wrongdoing.",
        to: "/status-definitions",
        toLabel: "Status Definitions",
      },
      {
        q: "What does an audit cost?",
        a: "Audit fees are disclosed during Step 2 of the application process and vary by category.",
        to: "/for-vendors",
        toLabel: "Vendor Submission Standard",
      },
    ],
  },
  {
    title: "The Greenlist",
    items: [
      {
        q: "What is the Greenlist?",
        a: "The Greenlist is a registry of upstream sources \u2014 primarily 503A compounding pharmacies, 503B outsourcing facilities, and other qualified suppliers \u2014 documented as legitimate operating entities under recognized regulatory categories.",
        to: "/greenlist",
        toLabel: "Greenlist",
      },
      {
        q: "Does \u201CGreenlisted\u201D mean Source Standard endorses the supplier?",
        a: "No. Greenlisted indicates the source is documented and registered under a recognized regulatory category. It does not imply contract, affiliation, or endorsement of any specific product.",
        to: "/status-definitions",
        toLabel: "Status Definitions",
      },
    ],
  },
  {
    title: "Public & Consumer Use",
    items: [
      {
        q: "How should I use the registry?",
        a: "As a structured reference to check whether a vendor has been reviewed under the framework, what scope was reviewed, and the current public status. The registry does not replace consultation with a licensed clinician.",
      },
      {
        q: "What if a vendor is \u201CNot Listed\u201D?",
        a: "Not Listed means the entity does not appear in the registry. It is not a finding against the entity; the entity may simply not have entered the verification process.",
        to: "/status-definitions",
        toLabel: "Status Definitions",
      },
      {
        q: "I have a concern about a listed vendor \u2014 what do I do?",
        a: "Submit a report through the Report a Concern channel. Reports are reviewed under the framework's triage process and may trigger an out-of-cycle re-review.",
        to: "/report-a-concern",
        toLabel: "Report a Concern",
      },
      {
        q: "How does a vendor apply?",
        a: "Step 1 is a public-data registry initialization (Form SS-INTAKE-01). Step 2, issued by a Verification Officer, covers controlled document uploads and payment.",
        to: "/apply",
        toLabel: "Begin a filing",
      },
      {
        q: "What changes must a verified vendor report?",
        a: "Supplier changes, license changes, ownership changes, product category additions or removals, public claim changes, and any regulatory action.",
        to: "/accountability",
        toLabel: "Reportable changes",
      },
      {
        q: "How is my data handled?",
        a: "Vendor application materials, contact submissions, and concern reports are handled under the Privacy Policy. Public listing content is published; internal records are retained only for review purposes.",
        to: "/privacy",
        toLabel: "Privacy Policy",
      },
      {
        q: "Can I cite a Source Standard listing?",
        a: "Yes. Public registry entries may be cited and referenced. Reuse is governed by the Terms of Use.",
        to: "/terms",
        toLabel: "Terms of Use",
      },
    ],
  },
];

const FAQ = () => (
  <>
    <PageMeta
      title="Frequently Asked Questions"
      description="Answers to common questions about Source Standard, the verification framework, and how the public registry operates."
    />
    <Breadcrumb
      items={[
      { label: "Education", to: "/education" },
      { label: "FAQ" },
      ]}
    />

    <RecordHeader
      metadata={[
        { label: "Doc", value: "SS-FAQ-2026.01" },
        { label: "Status", value: "Active" },
        { label: "Updated", value: "04/21/26" },
        { label: "Jurisdiction", value: "United States" },
      ]}
      eyebrow="Reference · Administrative briefing"
      title="Registry FAQs & Interpretations."
      lead="Direct, time-bound interpretations of the registry's verification protocols, greenlist scope, and permitted public use. Issued by the auditing body for reference; not a substitute for the controlling source documents cited in each answer."
    />

    {groups.map((g, gi) => (
      <Section key={g.title} muted={gi % 2 === 1} density="doc" bordered={gi !== 0}>
        <SectionLabel number={`§${gi + 1}`} title={g.title} />
        <Accordion type="single" collapsible className="max-w-3xl">
          {g.items.map((item, i) => (
            <AccordionItem key={i} value={`${gi}-${i}`} className="border-border/70">
              <AccordionTrigger className="text-left text-[15px] font-medium text-foreground">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-[15px] text-muted-foreground leading-relaxed">
                <p>{item.a}</p>
                {item.to && (
                  <p className="mt-3">
                    <Link to={item.to} className="text-foreground underline-offset-4 hover:underline">
                      Read more — {item.toLabel} →
                    </Link>
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
    ))}

    <Section density="tight">
      <SectionLabel number={`§${groups.length + 1}`} title="Read deeper" />
      <ul className="space-y-2 text-[15px]">
        <li><Link to="/accountability" className="text-foreground underline-offset-4 hover:underline">Accountability & Enforcement →</Link></li>
        <li><Link to="/status-definitions" className="text-foreground underline-offset-4 hover:underline">Status Definitions →</Link></li>
        <li><Link to="/how-it-works" className="text-foreground underline-offset-4 hover:underline">SOP: Verification Protocol & Audit Methodology →</Link></li>
        <li><Link to="/governance" className="text-foreground underline-offset-4 hover:underline">Governance →</Link></li>
        <li><Link to="/verification-disclaimer" className="text-foreground underline-offset-4 hover:underline">Verification Disclaimer →</Link></li>
      </ul>
      <p className="mt-8 meta-label">
        Cite as: Source Standard FAQ, SS-FAQ-2026.01.
      </p>
    </Section>
  </>
);

export default FAQ;
