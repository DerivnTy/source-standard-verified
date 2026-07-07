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
        a: "Source Standard is an independent public-reference organization that maintains a registry of medical and health vendors, along with the pharmacies and facilities they rely on. The registry is a reference layer; it is not a clinic, pharmacy, or manufacturer.",
        to: "/about",
        toLabel: "About Source Standard",
      },
      {
        q: "Is Source Standard a regulator?",
        a: "No. Source Standard is not a regulator. It references existing regulatory anchors (FDA, state boards of pharmacy, PCAB, NSF, USP) and publishes public statuses against those anchors.",
        to: "/governance",
        toLabel: "Governance",
      },
      {
        q: "Who oversees the framework?",
        a: "The framework is guided by an independent Medical Advisory Board and grounded in recognized standards from FDA, state boards of pharmacy, PCAB, NSF, and USP.",
        to: "/medical-advisory",
        toLabel: "Medical Advisory",
      },
    ],
  },
  {
    title: "Verification",
    items: [
      {
        q: "What does \u201CVerified\u201D mean?",
        a: "Verified indicates that the vendor's identity, licensure, sourcing relationships, and public claims have been reviewed under the Source Standard framework and reflect the information available at the time of review.",
        to: "/how-it-works",
        toLabel: "How verification works",
      },
      {
        q: "What is reviewed under the framework?",
        a: "The framework considers business identity, licensure and registrations, pharmacy and sourcing relationships, supporting records, and the consistency of public claims.",
        to: "/how-it-works",
        toLabel: "How verification works",
      },
      {
        q: "How long does Verified status remain in effect?",
        a: "Verified status is reviewed on a defined renewal interval. Material changes to sourcing, licensure, or public claims may prompt additional review at any time.",
        to: "/accountability",
        toLabel: "Ongoing standing",
      },
      {
        q: "What does \u201CVerified\u201D not mean?",
        a: "It is not a clinical endorsement, not a guarantee of product safety, not a warranty of future conduct, and not a substitute for professional medical judgment.",
        to: "/verification-disclaimer",
        toLabel: "Verification Disclaimer",
      },
      {
        q: "What public statuses exist?",
        a: "Verified, Pending Review, Under Review, Suspended, Removed, Greenlisted, and Not Listed. Each is defined on the Status Definitions page.",
        to: "/status-definitions",
        toLabel: "Status Definitions",
      },
      {
        q: "What does \u201CSuspended\u201D mean?",
        a: "Verified status has been temporarily withdrawn while a matter is clarified. It does not constitute a finding of wrongdoing.",
        to: "/status-definitions",
        toLabel: "Status Definitions",
      },
      {
        q: "What does verification cost?",
        a: "Fees are disclosed during the application process and vary by category.",
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
        a: "Submit a report through the Report a Concern channel. Reports are reviewed against available records and may prompt additional review.",
        to: "/report-a-concern",
        toLabel: "Report a Concern",
      },
      {
        q: "How does a vendor apply?",
        a: "Vendors begin with an intake submission and, if eligible, proceed to a documentation review under the framework.",
        to: "/apply",
        toLabel: "Begin an application",
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
      { label: "Resource Library", to: "/education" },
      { label: "FAQ" },
      ]}
    />

    <RecordHeader
      metadata={[
        { label: "Status", value: "Active" },
        { label: "Updated", value: "04/21/26" },
        { label: "Jurisdiction", value: "United States" },
      ]}
      eyebrow="Public reference"
      title="Registry FAQs"
      lead="Answers to common questions about Source Standard, the verification framework, the Greenlist, and how the public registry should be used."
    />

    {groups.map((g, gi) => (
      <Section key={g.title} muted={gi % 2 === 1} density="doc" bordered={gi !== 0}>
        <SectionLabel number={`§${gi + 1}`} title={g.title} />
        <Accordion type="single" collapsible className="max-w-3xl">
          {g.items.map((item, i) => (
            <AccordionItem key={i} value={`${gi}-${i}`} className="border-border/70">
              <AccordionTrigger className="text-left t-body-sm font-medium text-foreground">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="t-body-sm text-muted-foreground leading-relaxed">
                <p>{item.a}</p>
                {item.to && (
                  <p className="mt-3">
                    <Link to={item.to} className="text-foreground underline-offset-4 hover:underline">
                      Read more: {item.toLabel} →
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
      <ul className="space-y-2 t-body-sm">
        <li><Link to="/accountability" className="text-foreground underline-offset-4 hover:underline">Accountability & Enforcement →</Link></li>
        <li><Link to="/status-definitions" className="text-foreground underline-offset-4 hover:underline">Status Definitions →</Link></li>
        <li><Link to="/how-it-works" className="text-foreground underline-offset-4 hover:underline">SOP: Verification Protocol & Audit Methodology →</Link></li>
        <li><Link to="/governance" className="text-foreground underline-offset-4 hover:underline">Governance →</Link></li>
        <li><Link to="/verification-disclaimer" className="text-foreground underline-offset-4 hover:underline">Verification Disclaimer →</Link></li>
      </ul>
    </Section>
  </>
);

export default FAQ;
