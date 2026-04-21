import { Link, To } from "react-router-dom";
import { ReactNode } from "react";
import { RecordHeader } from "@/components/RecordHeader";
import { Section, SectionLabel } from "@/components/Section";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type QA = { q: string; a: ReactNode; to?: To; toLabel?: string };

const groups: { title: string; items: QA[] }[] = [
  {
    title: "About Source Standard",
    items: [
      {
        q: "What is Source Standard?",
        a: "Source Standard is a public reference framework that reviews medical and health vendors against documented sourcing, licensing, and public-claims criteria, and publishes the results as a structured registry.",
        to: "/about",
        toLabel: "About Source Standard",
      },
      {
        q: "Is Source Standard a regulator?",
        a: "No. Source Standard is not a regulator, a clinic, a manufacturer, or a pharmacy. It is a documentation and review framework that references existing regulatory authorities.",
        to: "/governance",
        toLabel: "Governance",
      },
      {
        q: "Who oversees the framework?",
        a: "The framework is overseen by an internal review function and a medical advisory body. Authority references are drawn from FDA, state boards of pharmacy, PCAB, NSF, and USP standards.",
        to: "/medical-advisory",
        toLabel: "Medical Advisory",
      },
    ],
  },
  {
    title: "Verification",
    items: [
      {
        q: "What does Verified mean?",
        a: "Verified means the vendor has completed a documented review of records, sourcing documentation, licensing, and public claims, and the listing reflects that review at the time of publication.",
        to: "/how-it-works",
        toLabel: "Verification process",
      },
      {
        q: "What is reviewed during verification?",
        a: "Business identity, licenses and registrations, pharmacy and supplier records, certificates and category records, sourcing and invoice history, public claims consistency, and renewal-related updates.",
        to: "/how-it-works",
        toLabel: "What we review",
      },
      {
        q: "How long does verification last?",
        a: "Verification is time-bound and reviewed on a defined renewal interval. Material changes can also trigger an out-of-cycle re-review at any time.",
        to: "/accountability",
        toLabel: "Accountability & Enforcement",
      },
      {
        q: "What does Verified not mean?",
        a: "Verified is not a clinical endorsement, not a guarantee of product safety, not a warranty of future conduct, and not a substitute for professional medical judgment.",
        to: "/verification-disclaimer",
        toLabel: "Verification Disclaimer",
      },
    ],
  },
  {
    title: "The Greenlist",
    items: [
      {
        q: "What is the Greenlist?",
        a: "The Greenlist is a registry of upstream sources — primarily 503A compounding pharmacies, 503B outsourcing facilities, and other qualified suppliers — that are documented as legitimate operating entities under recognized regulatory categories.",
        to: "/greenlist",
        toLabel: "Greenlist",
      },
      {
        q: "Does Greenlisted mean Source Standard endorses the supplier?",
        a: "No. Greenlisted indicates that the source is documented and registered under a recognized regulatory category. It does not imply contract, affiliation, or endorsement of any specific product.",
        to: "/status-definitions",
        toLabel: "Status Definitions",
      },
    ],
  },
  {
    title: "For Consumers",
    items: [
      {
        q: "How should I use the registry?",
        a: "Use the registry as a structured reference to check whether a vendor has been reviewed under the framework, what scope was reviewed, and what their current public status is. The registry is a reference layer — it does not replace consultation with a licensed clinician.",
      },
      {
        q: "What if a vendor is Not Listed?",
        a: "Not Listed only means that the entity does not appear in the registry. It does not imply the entity is illegitimate. It may simply not have entered the verification process.",
        to: "/status-definitions",
        toLabel: "Status Definitions",
      },
      {
        q: "I have a concern about a listed vendor — what do I do?",
        a: "Submit a report through the Report a Concern channel. Reports are reviewed under the framework's triage process and may trigger a re-review.",
        to: "/report-a-concern",
        toLabel: "Report a Concern",
      },
    ],
  },
  {
    title: "For Vendors",
    items: [
      {
        q: "How does a vendor apply?",
        a: "A vendor begins by submitting an application that includes business identity, licensing, supplier disclosure, and product category records. The review proceeds through a defined lifecycle.",
        to: "/apply",
        toLabel: "Begin a verification application",
      },
      {
        q: "What does verification cost?",
        a: "Fees are determined at the time of application based on scope and category. The application page contains current information.",
        to: "/for-vendors",
        toLabel: "For Vendors",
      },
      {
        q: "What changes must I report after verification?",
        a: "Supplier changes, license changes, ownership changes, product category additions or removals, public claim changes, and any regulatory action.",
        to: "/accountability",
        toLabel: "Reportable changes",
      },
    ],
  },
  {
    title: "Public statuses",
    items: [
      {
        q: "What statuses exist?",
        a: "Verified, Pending Review, Under Review, Suspended, Removed, Greenlisted, and Not Listed. Each is defined in the Status Definitions reference.",
        to: "/status-definitions",
        toLabel: "Status Definitions",
      },
      {
        q: "What does Suspended mean?",
        a: "A previously Verified listing has been temporarily withdrawn pending clarification. It does not imply confirmed wrongdoing.",
        to: "/status-definitions",
        toLabel: "Status Definitions",
      },
    ],
  },
  {
    title: "Limits and disclaimers",
    items: [
      {
        q: "Does verification guarantee product safety?",
        a: "No. Verification reviews documentation, sourcing, licensing, and claims. It does not test products, make clinical judgments, or guarantee outcomes.",
        to: "/verification-disclaimer",
        toLabel: "Verification Disclaimer",
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
    <RecordHeader
      metadata={[
        { label: "Doc", value: "SS-FAQ-2026.01" },
        { label: "Status", value: "Active" },
        { label: "Updated", value: "04/21/26" },
        { label: "Jurisdiction", value: "FL/US" },
      ]}
      eyebrow="Frequently Asked Questions"
      title="Common questions on verification, the greenlist, and registry use"
      lead="Reference questions and short, evidence-based answers covering how Source Standard works, what verification represents, and how consumers and vendors interact with the public registry."
    />

    {groups.map((g, gi) => (
      <Section key={g.title} muted={gi % 2 === 1}>
        <SectionLabel number={`§${gi + 1}`} title={g.title} />
        <Accordion type="single" collapsible className="max-w-3xl">
          {g.items.map((item, i) => (
            <AccordionItem key={i} value={`${gi}-${i}`} className="border-border/70">
              <AccordionTrigger className="text-left text-[15px] font-medium text-foreground">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-[14.5px] text-muted-foreground leading-relaxed">
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

    <Section>
      <SectionLabel number={`§${groups.length + 1}`} title="Read deeper" />
      <ul className="space-y-2 text-[14.5px]">
        <li><Link to="/how-it-works" className="text-foreground underline-offset-4 hover:underline">Verification →</Link></li>
        <li><Link to="/status-definitions" className="text-foreground underline-offset-4 hover:underline">Status Definitions →</Link></li>
        <li><Link to="/accountability" className="text-foreground underline-offset-4 hover:underline">Accountability & Enforcement →</Link></li>
      </ul>
      <p className="mt-10 meta-label">
        Cite as: Source Standard FAQ, SS-FAQ-2026.01.
      </p>
    </Section>
  </>
);

export default FAQ;
