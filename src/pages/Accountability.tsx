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
    t: "Submission accuracy",
    d: "Records, claims, and category descriptions submitted at intake are expected to remain accurate throughout the review term. Material inaccuracies discovered after publication may trigger additional review.",
  },
  {
    n: "02",
    t: "Sourcing transparency",
    d: "Pharmacy relationships, upstream facilities, and sourcing records tied to reviewed categories are expected to remain documented and consistent with the published record.",
  },
  {
    n: "03",
    t: "Renewal and review cooperation",
    d: "The vendor is expected to respond to renewal requests, clarification requests, and review notices within the published response windows and provide updated records when requested.",
  },
  {
    n: "04",
    t: "Public-claims alignment",
    d: "Public-facing representations, including websites, advertising, intake materials, and third-party listings, are expected to remain consistent with the records reviewed during the verification term.",
  },
];

const DISCLOSURE: Clause[] = [
  {
    n: "01",
    t: "Change in pharmacy relationship or upstream source",
    d: "Any substitution, addition, or termination of a disclosed pharmacy, outsourcing facility, or upstream source tied to a reviewed category.",
  },
  {
    n: "02",
    t: "Change in licensure status",
    d: "Any suspension, lapse, voluntary surrender, or jurisdictional change affecting the vendor or a disclosed upstream facility.",
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
    t: "Regulatory or public-record action",
    d: "Any public notice, enforcement action, license change, warning letter, or administrative update affecting the vendor or a disclosed upstream facility.",
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
    t: "Upstream record change",
    d: "Status change, delisting, registration lapse, license issue, or public-record update affecting a disclosed upstream facility.",
  },
  {
    n: "03",
    t: "Regulatory or public-record action",
    d: "Public action, warning letter, licensure update, or administrative change involving the vendor or a disclosed upstream source.",
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
    d: "Lapse of any required licensure, registration, or accreditation held by the vendor or a disclosed upstream source.",
  },
];

const ACTIONS: Clause[] = [
  {
    n: "01",
    t: "Administrative inquiry",
    d: "A written request for documentation, records, or explanation. The listing may remain in its current status during the response window unless additional action is required.",
  },
  {
    n: "02",
    t: "Scope reduction",
    d: "The verified scope may be narrowed to the categories that remain supported by current records. Unsupported categories may be removed from the public listing.",
  },
  {
    n: "03",
    t: "Suspension",
    d: "Verified status may be temporarily inactive pending additional documentation or review of an unresolved record issue. The vendor may remain in the registry but no longer displays active Verified status.",
  },
  {
    n: "04",
    t: "Removal",
    d: "The record may be removed from active verification status. Re-entry requires a new submission and a new review process.",
  },
  {
    n: "05",
    t: "Public note",
    d: "A short factual notation may be attached to a listing when clarification is warranted and the supporting record is verifiable and non-speculative.",
  },
];

const RELATED = [
  { to: "/how-it-works", label: "Verification Protocol" },
  { to: "/status-definitions", label: "Status Definitions" },
  { to: "/report-a-concern", label: "Reporting & Registry Review" },
  { to: "/governance", label: "Compliance & Operating Boundaries" },
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
    "Ongoing record maintenance for Verified vendors, disclosure events, review triggers, and status actions available when documentation no longer supports the published record.";

  return (
    <>
      <Breadcrumb items={[{ label: "About", to: "/about" }, { label: "Compliance" }]} />

      <PageMeta title="Compliance" description={heroDescription} />

      {/* §1 Hero */}
      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Governance & Oversight"
        title="Compliance Monitoring & Record Maintenance"
        statement={heroDescription}
        docId=""
      />

      {/* §2 Statement of purpose */}
      <section className="bg-background border-b border-border/40">
        <div className="page-shell">
          <div className="mx-auto w-standard section-pad">
            <div className="max-w-2xl">
              <h2 className="t-section-title-sm text-foreground">
                How compliance is maintained after verification
              </h2>
              <div className="mt-6 space-y-5">
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  A Verified record is not permanent.
                </p>
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  It remains in effect only while the underlying documentation, pharmacy relationships, sourcing claims, and public records continue to support the published review scope.
                </p>
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  This page defines the continuing expectations attached to Verified status, the events vendors are expected to disclose, the conditions that may reopen review, and the status actions Source Standard may apply when a record no longer supports the listing.
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
              intro="The continuing representations accepted when Verified status is issued."
            >
              <ClauseList clauses={ATTESTATIONS} />
            </SplitSection>

            {/* §5 Disclosure */}
            <SplitSection
              id="disclosure"
              n="02"
              title="Disclosure"
              intro="Events vendors are expected to report when they materially affect the published record."
            >
              <p className="t-body-md text-muted-foreground leading-relaxed mb-8">
                The following events are expected to be reported within the stated response window. Failure to report a material change may itself trigger review or status revision.
              </p>
              <ClauseList clauses={DISCLOSURE} />
            </SplitSection>

            {/* §6 Triggers */}
            <SplitSection
              id="triggers"
              n="03"
              title="Triggers"
              intro="Events that may reopen review of an existing record, regardless of renewal timing."
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
                  A Suspended record may return to Verified status once the underlying matter is resolved and supported by documentation in the review file.
                </p>
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  A Removed record may return only through a new submission and new review process.
                </p>
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  Prior status history, including the original determination, triggering events, and disposition, may remain part of the record and may be referenced in future review.
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
                <h2 className="t-section-title-sm text-foreground">
                  Verification requires continuing record support.
                </h2>
                <p className="mt-6 t-body-md text-muted-foreground leading-relaxed">
                  The purpose of this protocol is to preserve the integrity of the registry after a record is published. Verification remains meaningful only when the documentation continues to support the claim, the underlying sourcing remains transparent, and material changes are disclosed within the stated review process.
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
