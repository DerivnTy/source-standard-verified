import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SectionAnchorNav } from "@/components/registry/SectionAnchorNav";
import { BriefingHero } from "@/components/BriefingHero";

const WAYPOINTS = [
  { id: "purpose", number: "01", label: "Purpose" },
  { id: "statuses", number: "02", label: "Statuses" },
  { id: "lifecycle", number: "03", label: "Lifecycle" },
  { id: "related", number: "04", label: "Related Documents" },
];

const SectionIndex = ({ n }: { n: string }) => (
  <p className="font-mono text-[12px] text-muted-foreground/50 mb-1 tabular-nums">{n}</p>
);

type Status = {
  n: string;
  title: string;
  definition: string;
  meaning: string;
  notImply: string;
  issued: string;
  revised: string;
};

const STATUSES: Status[] = [
  {
    n: "01",
    title: "Verified",
    definition:
      "Documentation review is complete for the defined scope. The published record reflects the documentation, public records, and pharmacy relationship evidence reviewed at the time of publication.",
    meaning:
      "Submitted documentation, public records, and sourcing evidence supported the stated vendor claim within the reviewed scope.",
    notImply:
      "It does not imply vendor approval, product approval, clinical recommendation, treatment effectiveness, product safety, or outcome guarantee.",
    issued:
      "Assigned after completion of documentation review, pharmacy relationship review, chain-of-custody review, and scope confirmation.",
    revised:
      "Revised after renewal lapse, material disclosure event, documentation expiration, unresolved discrepancy, or reopening of the review file.",
  },
  {
    n: "02",
    title: "Pending Review",
    definition:
      "An application or review request has been received, but documentation review has not yet begun.",
    meaning: "The entity has entered the Source Standard review pipeline.",
    notImply:
      "It does not imply that documentation has been reviewed or that any sourcing claim has been supported.",
    issued: "Assigned when an application, request, or submission package is received and acknowledged.",
    revised: "Revised when documentation review begins, the request is withdrawn, or the submission is closed.",
  },
  {
    n: "03",
    title: "Under Review",
    definition:
      "An active documentation review is in progress. Records, public data, sourcing claims, and submitted materials are being evaluated against the Source Standard framework.",
    meaning: "The review file is open and being evaluated.",
    notImply:
      "It does not imply any conclusion about the vendor, sourcing claim, documentation quality, or compliance posture.",
    issued: "Assigned at the start of documentation review or when a previously published record is reopened.",
    revised: "Revised to Verified, Unverified, Suspended, or Removed when the current review cycle concludes.",
  },
  {
    n: "04",
    title: "Unverified",
    definition:
      "No sufficient documentation has been reviewed to support the stated sourcing claim within the Source Standard framework.",
    meaning:
      "The registry does not currently contain sufficient reviewed documentation to support the vendor's stated sourcing claim.",
    notImply:
      "It does not imply that the vendor is unsafe, unlawful, fraudulent, or clinically inappropriate.",
    issued: "Assigned when a vendor record exists but no sufficient documentation review is on file.",
    revised: "Revised when the vendor enters review, submits documentation, withdraws, or a status update is required.",
  },
  {
    n: "05",
    title: "Suspended",
    definition:
      "A previously published status is temporarily inactive pending additional documentation, renewal, or review of an unresolved record issue.",
    meaning: "The record cannot currently support continuation of the prior published status.",
    notImply:
      "It does not constitute a finding of misconduct, fraud, medical risk, or regulatory enforcement action.",
    issued:
      "Assigned after missed renewal, non-response to documentation requests, expired documentation, or unresolved material discrepancy.",
    revised:
      "Revised back to Verified if resolved, to Unverified if documentation no longer supports verification, or to Removed if the record is closed.",
  },
  {
    n: "06",
    title: "Removed",
    definition:
      "The record has been removed from active registry display or active verification status due to failed review, expired documentation, unresolved discrepancy, voluntary withdrawal, or closure of the review file.",
    meaning:
      "The entity is no longer maintained as an active verified or reviewable record under the Source Standard framework.",
    notImply:
      "It does not imply a specific finding of misconduct unless a public note states a documented record basis.",
    issued:
      "Assigned when the review file is closed, the entity withdraws, documentation cannot be reconciled, renewal remains unresolved, or a material discrepancy is not resolved.",
    revised: "Reinstatement requires a new submission and a new review cycle.",
  },
  {
    n: "07",
    title: "Recognized Upstream Record",
    definition:
      "An upstream 503A pharmacy, 503B outsourcing facility, or other facility record used as a reference point during vendor sourcing review.",
    meaning:
      "The upstream record may be used as a reference point when reviewing vendor sourcing documentation.",
    notImply:
      "It does not imply endorsement, affiliation, vendor verification, product approval, product safety, or certification of every product associated with that facility.",
    issued:
      "Assigned when facility identity, public registration category, license status, or review relevance is recorded within the Upstream Registry.",
    revised:
      "Revised when public registration status, license status, review relevance, or Source Standard classification changes.",
  },
  {
    n: "08",
    title: "Not Listed",
    definition: "No public Source Standard record exists for the entity.",
    meaning:
      "The entity is not currently maintained as a public record within the Source Standard registry.",
    notImply:
      "It does not imply that the entity is unsafe, unlawful, illegitimate, non-compliant, or clinically inappropriate. It reflects only the absence of a Source Standard record.",
    issued: "This is the default condition for any entity that does not have a registry record.",
    revised: "Revised only if the entity enters the registry, submits documentation, or is added as a public-reference record.",
  },
];

const LIFECYCLE = [
  { n: "01", t: "Application received → Pending Review" },
  { n: "02", t: "Documentation review begins → Under Review" },
  { n: "03", t: "Review concludes → Verified or Unverified" },
  { n: "04", t: "Renewal interval reached → Under Review" },
  { n: "05", t: "Disclosure event or material change → Under Review or Suspended" },
  { n: "06", t: "Resolution → Verified, Unverified, Suspended, or Removed" },
];

const RELATED = [
  { to: "/how-it-works", label: "Verification Protocol" },
  { to: "/accountability", label: "Compliance & Operating Boundaries" },
  { to: "/verification-disclaimer", label: "Verification Disclaimer" },
];

const FieldRow = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-12 gap-4 py-3.5">
    <dt className="col-span-12 md:col-span-3 t-utility-xs font-mono uppercase tracking-[0.1em] text-muted-foreground/70">
      {label}
    </dt>
    <dd className="col-span-12 md:col-span-9 t-body-md text-muted-foreground leading-relaxed m-0">
      {value}
    </dd>
  </div>
);

const StatusDefinitions = () => {
  const heroDescription =
    "Public statuses assigned to entities under the Source Standard framework. Each standing reflects the state of the record at the time of last update and may change through review, renewal, or disclosure events.";

  return (
    <>
      <Breadcrumb items={[{ label: "About", to: "/about" }, { label: "Status Definitions" }]} />

      <PageMeta title="Status Definitions" description={heroDescription} />

      {/* §1 Hero */}
      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Registry Standards"
        title="Glossary of Regulatory Standings"
        statement={heroDescription}
        docId=""
      />

      {/* §2 Statement of purpose */}
      <section id="purpose" className="scroll-mt-24 bg-background border-b border-border/40">
        <div className="page-shell">
          <div className="mx-auto w-standard section-pad">
            <div className="max-w-2xl">
              <h2 className="t-section-title-sm text-foreground">Why these statuses exist</h2>
              <div className="mt-6 space-y-5">
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  Status labels are used so consumers, clinicians, and listed entities can interpret the registry consistently without needing to read an underlying audit file.
                </p>
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  Each status reflects a defined public meaning. It is assigned against reviewed records and revised when the state of the file changes.
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
            {/* §4 Statuses */}
            <section
              id="statuses"
              className="scroll-mt-24 pt-14 md:pt-20 lg:pt-24 pb-16 md:pb-20 lg:pb-24 border-b border-border/40"
            >
              <div className="grid md:grid-cols-12 md:gap-12 lg:gap-16">
                <div className="md:col-span-4">
                  <div className="md:sticky md:top-32">
                    <SectionIndex n="02" />
                    <h2 className="t-section-title-sm text-foreground">Controlled standings</h2>
                    <p className="mt-4 t-body-sm text-muted-foreground max-w-[36ch]">
                      Each standing has a public meaning, a limit, and a defined path of issuance or revision.
                    </p>
                  </div>
                </div>
                <div className="md:col-span-8 mt-8 md:mt-0">
                  <ol className="divide-y divide-border/60">
                    {STATUSES.map((s) => (
                      <li key={s.n} className="py-8 first:pt-0 last:pb-0">
                        <div className="flex items-baseline gap-4 mb-5">
                          <span className="font-mono text-[12px] tabular-nums text-muted-foreground/70">
                            {s.n}
                          </span>
                          <h3 className="t-section-title-sm text-foreground">{s.title}</h3>
                        </div>
                        <p className="t-body-md text-foreground leading-relaxed mb-6">
                          {s.definition}
                        </p>
                        <dl className="divide-y divide-border/40 border-t border-border/40">
                          <FieldRow label="Public meaning" value={s.meaning} />
                          <FieldRow label="Does not imply" value={s.notImply} />
                          <FieldRow label="Issued when" value={s.issued} />
                          <FieldRow label="Revised when" value={s.revised} />
                        </dl>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </section>

            {/* §5 Lifecycle */}
            <section id="lifecycle" className="scroll-mt-24 section-pad border-b border-border/40">
              <div className="grid md:grid-cols-12 md:gap-12 lg:gap-16">
                <div className="md:col-span-4">
                  <div className="md:sticky md:top-32">
                    <SectionIndex n="03" />
                    <h2 className="t-section-title-sm text-foreground">Lifecycle</h2>
                    <p className="mt-4 t-body-sm text-muted-foreground max-w-[36ch]">
                      No standing is permanent. Every public record moves through review, renewal, and possible revision over time.
                    </p>
                  </div>
                </div>
                <div className="md:col-span-8 mt-8 md:mt-0">
                  <ol className="divide-y divide-border/60 border-y border-border/60">
                    {LIFECYCLE.map((step) => (
                      <li key={step.n} className="grid grid-cols-12 gap-4 py-5 items-baseline">
                        <div className="col-span-2 md:col-span-1 font-mono text-[12px] tabular-nums text-muted-foreground/70">
                          {step.n}
                        </div>
                        <div className="col-span-10 md:col-span-11 t-body-md text-foreground leading-relaxed">
                          {step.t}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </section>

            {/* §6 Related documents */}
            <section id="related" className="scroll-mt-24 section-pad border-b border-border/40">
              <div className="grid md:grid-cols-12 md:gap-12 lg:gap-16">
                <div className="md:col-span-4">
                  <div className="md:sticky md:top-32">
                    <SectionIndex n="04" />
                    <h2 className="t-section-title-sm text-foreground">Related Documents</h2>
                    <p className="mt-4 t-body-sm text-muted-foreground max-w-[36ch]">
                      Further reading on the framework, review process, and disclosure boundaries.
                    </p>
                  </div>
                </div>
                <div className="md:col-span-8 mt-8 md:mt-0">
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
                </div>
              </div>
            </section>

            {/* §7 Closing statement */}
            <section className="section-pad border-t border-border/40">
              <div className="max-w-2xl">
                <h2 className="t-section-title-sm text-foreground">
                  A shared public language for the registry.
                </h2>
                <p className="mt-6 t-body-md text-muted-foreground leading-relaxed">
                  The purpose of these status definitions is to ensure that public listings can be interpreted consistently, without overstatement and without requiring users to infer more than the record actually supports.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatusDefinitions;
