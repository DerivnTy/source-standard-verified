import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SectionAnchorNav } from "@/components/registry/SectionAnchorNav";
import { BriefingHero } from "@/components/BriefingHero";

const WAYPOINTS = [
  { id: "attestations", number: "01", label: "Attestations" },
  { id: "disclosure", number: "02", label: "Disclosure" },
  { id: "triggers", number: "03", label: "Triggers" },
  { id: "actions", number: "04", label: "Actions" },
  { id: "reentry", number: "05", label: "Re-entry" },
  { id: "related", number: "06", label: "Related Documents" },
];

const SectionIndex = ({ n }: { n: string }) => (
  <p className="font-mono text-[12px] text-muted-foreground/50 mb-1 tabular-nums">{n}</p>
);

type Clause = { n: string; t: string; d: string };

const ATTESTATIONS: Clause[] = [
  {
    n: "01",
    t: "Integrity of submission",
    d: "All records, claims, and category descriptions submitted at intake must remain accurate throughout the verification term. Material inaccuracies discovered after issuance are treated as a disclosure event and may reopen review.",
  },
  {
    n: "02",
    t: "Supply-chain transparency",
    d: "All upstream pharmacies, outsourcing facilities, and qualified suppliers used to fulfill reviewed categories must be disclosed in full and supported by documentation retained in the audit file.",
  },
  {
    n: "03",
    t: "Renewal and review cooperation",
    d: "The entity is expected to respond to renewal requests, clarification requests, and re-examination notices within the published response windows and provide updated records when requested.",
  },
  {
    n: "04",
    t: "Public-claims alignment",
    d: "Public-facing representations, including websites, advertising, intake materials, and third-party listings, must remain consistent with the records reviewed during the verification term.",
  },
];

const DISCLOSURE: Clause[] = [
  {
    n: "01",
    t: "Change in supplier or upstream source",
    d: "Any substitution, addition, or termination of a disclosed pharmacy, outsourcing facility, or other manufacturing anchor tied to a reviewed category.",
  },
  {
    n: "02",
    t: "Change in licensure status",
    d: "Any suspension, lapse, voluntary surrender, or jurisdictional change affecting the entity or a disclosed upstream source.",
  },
  {
    n: "03",
    t: "Change in ownership or operating control",
    d: "Any material change in ownership, controlling interest, operating entity, or registered legal identity.",
  },
  {
    n: "04",
    t: "Change in reviewed category scope",
    d: "Any addition, removal, or material change affecting the categories represented in the verified record.",
  },
  {
    n: "05",
    t: "Change in public-facing claims",
    d: "Any material change to public claims regarding sourcing, credentials, accreditation, or verified scope.",
  },
  {
    n: "06",
    t: "Regulatory action",
    d: "Any notice of action by the FDA, a State Board of Pharmacy, a State Medical Board, or another authority of competent jurisdiction.",
  },
];

const TRIGGERS: Clause[] = [
  {
    n: "01",
    t: "Consumer and clinician reports",
    d: "Submissions received through the public reporting channel and screened as in scope under the reporting protocol.",
  },
  {
    n: "02",
    t: "Upstream-source removal or suspension",
    d: "Delisting, suspension, voluntary surrender, or removal of a disclosed upstream source or manufacturing anchor.",
  },
  {
    n: "03",
    t: "Regulatory action",
    d: "Public action against the entity or a disclosed supplier by an authority of competent jurisdiction.",
  },
  {
    n: "04",
    t: "Claims divergence",
    d: "A material difference between public-facing claims and the records currently on file.",
  },
  {
    n: "05",
    t: "Non-response",
    d: "Failure to respond to a renewal notice, clarification request, or disclosure acknowledgment within the published response window.",
  },
  {
    n: "06",
    t: "Credential lapse",
    d: "Lapse of any required licensure, registration, or accreditation held by the entity or a disclosed upstream source.",
  },
];

const ACTIONS: Clause[] = [
  {
    n: "01",
    t: "Administrative inquiry",
    d: "A formal written request for documentation, records, or explanation. The listing remains in its current standing during the response window unless other action is required.",
  },
  {
    n: "02",
    t: "Scope reduction",
    d: "The verified scope is narrowed to the categories that remain supported by current records. Unsupported categories are withdrawn from the public listing.",
  },
  {
    n: "03",
    t: "Suspension",
    d: "The Verified standing is temporarily withdrawn pending evidentiary clarification. The entity remains in the registry but no longer carries an affirmative verified status.",
  },
  {
    n: "04",
    t: "Removal",
    d: "The listing is withdrawn from the registry under a Removed standing. Re-entry requires a new application and a fresh examination cycle.",
  },
  {
    n: "05",
    t: "Public note",
    d: "A short factual notation may be attached to a listing where clarification is warranted and the supporting record is verifiable and non-speculative.",
  },
];

const RELATED = [
  { to: "/how-it-works", label: "Verification Protocol & Audit Methodology" },
  { to: "/status-definitions", label: "Status Definitions" },
  { to: "/report-a-concern", label: "Reporting & Market Intelligence" },
  { to: "/governance", label: "Regulatory Alignment & Oversight" },
];

const ClauseList = ({ clauses }: { clauses: Clause[] }) => (
  <ol className="divide-y divide-border/60 border-y border-border/60">
    {clauses.map((c) => (
      <li key={c.n} className="grid grid-cols-12 gap-4 py-6">
        <div className="col-span-2 md:col-span-1 font-mono text-[12px] tabular-nums text-muted-foreground/70 pt-1">
          {c.n}
        </div>
        <div className="col-span-10 md:col-span-11">
          <h3 className="t-body-md font-semibold text-foreground mb-2">{c.t}</h3>
          <p className="t-body-md text-muted-foreground leading-relaxed">{c.d}</p>
        </div>
      </li>
    ))}
  </ol>
);

const SplitSection = ({
  id,
  n,
  title,
  intro,
  children,
}: {
  id: string;
  n: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="scroll-mt-24 section-pad border-b border-border/40">
    <div className="grid md:grid-cols-12 md:gap-12 lg:gap-16">
      <div className="md:col-span-4">
        <div className="md:sticky md:top-32">
          <SectionIndex n={n} />
          <h2 className="t-section-title-sm text-foreground">{title}</h2>
          <p className="mt-4 t-body-sm text-muted-foreground max-w-[36ch]">{intro}</p>
        </div>
      </div>
      <div className="md:col-span-8 mt-8 md:mt-0">{children}</div>
    </div>
  </section>
);

const Accountability = () => {
  const heroDescription =
    "Attestations accepted by Verified entities, mandatory disclosure events, audit re-opening triggers, and the graduated actions available to the framework when compliance obligations are not met.";

  return (
    <>
      <Breadcrumb items={[{ label: "About", to: "/about" }, { label: "Enforcement" }]} />

      <PageMeta title="Enforcement" description={heroDescription} />

      {/* §1 Hero */}
      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Governance & Oversight"
        title="Compliance Monitoring & Enforcement Protocols"
        statement={heroDescription}
        docId=""
      />

      {/* §2 Statement of purpose */}
      <section className="bg-background border-b border-border/40">
        <div className="page-shell">
          <div className="mx-auto w-standard section-pad">
            <div className="max-w-2xl">
              <p className="t-eyebrow-sm text-muted-foreground">Purpose</p>
              <h2 className="mt-4 t-section-title-sm text-foreground">
                How compliance is maintained after verification
              </h2>
              <div className="mt-6 space-y-5">
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  A Verified listing is not permanent. It remains in effect only while the underlying records, sourcing relationships, and public claims continue to support the published scope.
                </p>
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  This page defines the continuing obligations attached to a Verified standing, the events that must be disclosed, the conditions that may reopen review, and the actions the framework may take when the record no longer supports the listing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §3 Contents nav */}
      <SectionAnchorNav waypoints={WAYPOINTS} />

      <div className="bg-background">
        <div className="page-shell">
          <div className="mx-auto w-standard">
            {/* §4 Attestations */}
            <SplitSection
              id="attestations"
              n="01"
              title="Attestations"
              intro="The continuing representations accepted when a Verified standing is issued."
            >
              <ClauseList clauses={ATTESTATIONS} />
            </SplitSection>

            {/* §5 Disclosure */}
            <SplitSection
              id="disclosure"
              n="02"
              title="Disclosure"
              intro="Events that must be reported to the framework when they materially affect the published record."
            >
              <p className="t-body-md text-muted-foreground leading-relaxed mb-8">
                The following events are designated Mandatory Disclosure Events and are expected to be reported within seventy-two hours of occurrence. Failure to report within that window does not negate the underlying event and may itself trigger review.
              </p>
              <ClauseList clauses={DISCLOSURE} />
            </SplitSection>

            {/* §6 Triggers */}
            <SplitSection
              id="triggers"
              n="03"
              title="Triggers"
              intro="Events that may reopen review of an existing listing, regardless of its renewal cycle."
            >
              <ClauseList clauses={TRIGGERS} />
            </SplitSection>

            {/* §7 Actions */}
            <SplitSection
              id="actions"
              n="04"
              title="Actions"
              intro="How the framework responds when a reviewed record no longer supports the published status."
            >
              <ClauseList clauses={ACTIONS} />
            </SplitSection>

            {/* §8 Re-entry */}
            <SplitSection
              id="reentry"
              n="05"
              title="Re-entry"
              intro="How a listing may return after suspension or removal."
            >
              <div className="space-y-5">
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  An entity under Suspension may return to Verified once the underlying matter is resolved and documented in the audit file.
                </p>
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  An entity under Removal may apply for re-entry only through a new application and a new examination cycle. Prior audit history, including the original determination, the triggering events, and the disposition, remains part of the permanent record and may be referenced in any future review.
                </p>
              </div>
            </SplitSection>

            {/* §9 Related documents */}
            <SplitSection
              id="related"
              n="06"
              title="Related Documents"
              intro="Further reading on the framework, public statuses, and reporting logic."
            >
              <ul className="divide-y divide-border/60 border-y border-border/60">
                {RELATED.map((r) => (
                  <li key={r.to}>
                    <Link
                      to={r.to}
                      className="group grid grid-cols-12 gap-4 py-5 items-baseline hover:bg-surface-muted/40 transition-colors -mx-4 px-4"
                    >
                      <div className="col-span-9 md:col-span-10">
                        <p className="t-body-md font-semibold text-foreground group-hover:text-primary transition-colors">
                          {r.label}
                        </p>
                      </div>
                      <div className="col-span-3 md:col-span-2 text-right">
                        <span className="t-utility-xs text-muted-foreground group-hover:text-primary transition-colors">
                          View
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </SplitSection>

            {/* §10 Closing statement */}
            <section className="section-pad border-t border-border/40">
              <div className="max-w-2xl">
                <p className="t-eyebrow-sm text-muted-foreground">Conclusion</p>
                <h2 className="mt-4 t-section-title-sm text-foreground">
                  Verification requires continuing record support.
                </h2>
                <p className="mt-6 t-body-md text-muted-foreground leading-relaxed">
                  The purpose of this protocol is to preserve the integrity of the registry after a listing is published. Verification remains meaningful only when the record continues to support the claim, the underlying sourcing remains transparent, and material changes are disclosed in time.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accountability;
