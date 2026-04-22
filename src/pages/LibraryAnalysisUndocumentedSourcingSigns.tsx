import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { Section, SectionLabel } from "@/components/Section";
import { Button } from "@/components/ui/button";

const DefList = ({ items }: { items: { term: string; description: string }[] }) => (
  <dl className="mt-4 divide-y divide-border/60 border-y border-border/60">
    {items.map((it) => (
      <div
        key={it.term}
        className="grid grid-cols-1 md:grid-cols-[14rem_1fr] gap-2 md:gap-6 py-4"
      >
        <dt className="text-[13.5px] font-semibold text-foreground leading-snug">
          {it.term}
        </dt>
        <dd className="text-[15px] leading-[1.75] text-foreground/90 m-0">
          {it.description}
        </dd>
      </div>
    ))}
  </dl>
);

const LibraryAnalysisUndocumentedSourcingSigns = () => {
  return (
    <>
      <RecordHeader
        eyebrow="Source Standard · Clinical Analysis"
        title="Warning Signs of Undocumented Sourcing"
        lead="Identifying the patterns, disclosures, and behaviors that indicate a clinic may be operating outside of regulated sourcing channels."
        metadata={[
          { label: "Doc", value: "SS-SERIES-006" },
          { label: "Status", value: "Analysis / Public Record" },
          { label: "Jurisdiction", value: "United States" },
          { label: "Updated", value: "April 21, 2026" },
        ]}
      />

      <Section>
        <SectionLabel number="§1" title='The "Grey Market" Incursion' />
        <p className="text-[15px] leading-[1.75] text-foreground/90">
          As demand for therapeutic peptides and hormones increases, a &lsquo;grey market&rsquo; of undocumented substances has emerged. These are often &lsquo;research-grade&rsquo; chemicals repackaged as clinical-grade medications. For a clinic, using these sources is significantly cheaper but carries catastrophic risks for the patient. Spotting these sources requires looking for specific &lsquo;evasive&rsquo; behaviors.
        </p>

        <div className="mt-12">
          <SectionLabel
            number="§2"
            title="Red Flag: Label Anonymity"
            description="The most glaring sign of undocumented sourcing is a medication vial that lacks a specific pharmacy's credentials."
          />
          <DefList
            items={[
              {
                term: "Generic Branding",
                description:
                  "If the vial only features the clinic's logo and does not list the compounding pharmacy's name, address, and license number, the source is likely undocumented.",
              },
              {
                term: "Handwritten Details",
                description:
                  "While some small-batch pharmacies use hand-filled dates, a lack of professional, thermal-printed Lot Numbers and Expiration Dates is a major compliance failure.",
              },
            ]}
          />
        </div>

        <div className="mt-12">
          <SectionLabel
            number="§3"
            title='Red Flag: The "Proprietary Blend" Defense'
            description="When asked about their source, some clinics will claim their pharmacy is a 'trade secret' or a 'proprietary partnership.'"
          />
          <DefList
            items={[
              {
                term: "The Truth",
                description:
                  "There is no such thing as a proprietary pharmacy in the US regulatory framework. Every pharmacy must be licensed and every medication must be traceable. 'Proprietary' is almost always code for 'Undocumented.'",
              },
            ]}
          />
        </div>

        <div className="mt-12">
          <SectionLabel
            number="§4"
            title="Red Flag: Payment and Shipping Anomalies"
            description="High-integrity clinical sourcing follows traditional medical billing and shipping paths."
          />
          <DefList
            items={[
              {
                term: "Non-Traditional Payments",
                description:
                  "Clinics that insist on Zelle, Cryptocurrency, or 'Friends and Family' PayPal payments are often bypassing the financial audits that traditional merchant banks require for medical services.",
              },
              {
                term: "Residential Return Addresses",
                description:
                  "If a medication arrives with a return address that is a residential home or a generic PO Box rather than a licensed pharmacy facility, the supply chain has been compromised.",
              },
            ]}
          />
        </div>

        <div className="mt-12">
          <SectionLabel number="§5" title="Conclusion: The Cost of Low Transparency" />
          <p className="text-[15px] leading-[1.75] text-foreground/90">
            Undocumented sourcing isn&rsquo;t just a legal technicality; it&rsquo;s a safety vacuum. Without a documented pharmacy, there is no one to hold accountable for sterility failures, incorrect potencies, or heavy metal contamination. If a clinic cannot&mdash;or will not&mdash;prove their source, they have failed the primary duty of patient care.
          </p>
        </div>

        <div className="mt-16 pt-6 border-t border-border/70 flex items-center justify-between gap-6">
          <Button asChild variant="outline">
            <Link to="/education">← Back to Education Hub</Link>
          </Button>
          <Link
            to="/directory"
            className="text-[13px] text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border"
          >
            Search the Verified Registry →
          </Link>
        </div>
      </Section>
    </>
  );
};

export default LibraryAnalysisUndocumentedSourcingSigns;
