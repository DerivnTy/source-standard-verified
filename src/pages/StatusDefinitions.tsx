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
      "A completed review is on file. The entity has undergone a documented examination against the Source Standard framework, and the published listing reflects the records reviewed at the time of publication.",
    meaning:
      "Records, regulatory credentials, and sourcing documentation have been reconciled with the entity's public claims within the reviewed scope.",
    notImply:
      "It does not constitute an endorsement of clinical outcomes, individual prescriptions, or product safety guarantees.",
    issued:
      "Issued after successful completion of intake, evidentiary review, supply-chain reconciliation, and scope confirmation.",
    revised:
      "Revised upon lapse of renewal, a material disclosure event, or the reopening of the file for further review.",
  },
  {
    n: "02",
    title: "Pending Review",
    definition:
      "An application has been received and the audit file has been opened, but substantive examination has not yet begun.",
    meaning: "The entity has formally entered the verification pipeline.",
    notImply: "It does not imply that any part of the evidentiary review has already been completed.",
    issued: "Issued when the application package is received and acknowledged.",
    revised: "Revised when examination begins or when the application is withdrawn.",
  },
  {
    n: "03",
    title: "Under Review",
    definition:
      "An active examination is in progress. Records, regulatory credentials, and sourcing documentation are currently being assessed against the framework.",
    meaning: "The audit file is open and undergoing active review.",
    notImply: "It does not imply any conclusion regarding the entity's sourcing, documentation, or compliance posture.",
    issued: "Issued at the start of evidentiary review or upon reopening of a previously published file.",
    revised: "Revised to Verified, Suspended, or Removed when the current review cycle concludes.",
  },
  {
    n: "04",
    title: "Suspended",
    definition:
      "A previously published status is temporarily paused pending evidentiary clarification or unresolved record issues.",
    meaning: "The record cannot currently support continuation of the prior published status.",
    notImply:
      "It does not constitute a finding of misconduct, fraud, or regulatory enforcement action by any governmental body.",
    issued:
      "Issued upon failure to renew, failure to respond to clarification requests, or the surfacing of material discrepancies.",
    revised: "Revised back to Verified upon resolution, or to Removed if the matter remains unresolved.",
  },
  {
    n: "05",
    title: "Removed",
    definition:
      "The entity has been withdrawn from the public registry and the file is no longer maintained as an active public record.",
    meaning: "The entity is no longer represented in the registry under the Source Standard framework.",
    notImply:
      "It does not constitute a specific finding of misconduct unless a public note explicitly states otherwise.",
    issued:
      "Issued where the entity has defaulted on compliance obligations through sustained non-response, voluntary withdrawal, material misrepresentation, or loss of a remediable sourcing basis.",
    revised: "Reinstatement requires a new application and a new review cycle.",
  },
  {
    n: "06",
    title: "Greenlisted",
    definition:
      "An upstream source, 503A pharmacy, 503B outsourcing facility, or other qualified supplier recognized as a documented and traceable manufacturing or sourcing anchor within the framework.",
    meaning:
      "The upstream source operates within a recognized regulatory category and may appear as a documented source within verified vendor records.",
    notImply:
      "It does not imply endorsement, affiliation, or blanket certification of every product associated with that source.",
    issued: "Issued upon confirmation of registration, licensing category, and operating record.",
    revised: "Revised upon lapse of registration, withdrawal of licensure, or removal by the relevant authority.",
  },
  {
    n: "07",
    title: "Not Listed",
    definition: "No public record exists for the entity under the Source Standard framework.",
    meaning:
      "The entity has not entered the registry, has not been examined, or is not currently maintained as a public record within the system.",
    notImply:
      "It does not imply that the entity is illegitimate, unsafe, or non-compliant under any external regulatory regime. It reflects only the absence of a Source Standard record.",
    issued: "This is the default condition for any entity that has not entered the registry.",
    revised: "Revised only when the entity enters the verification or Greenlist review process.",
  },
];

const LIFECYCLE = [
  { n: "01", t: "Application received → Pending Review" },
  { n: "02", t: "Examination begins → Under Review" },
  { n: "03", t: "Review concludes → Verified or Removed" },
  { n: "04", t: "Renewal interval reached → Under Review" },
  { n: "05", t: "Disclosure event or material change → Under Review or Suspended" },
  { n: "06", t: "Resolution → Verified, Suspended, or Removed" },
];

const RELATED = [
  { to: "/how-it-works", label: "Verification Protocol & Audit Methodology" },
  { to: "/accountability", label: "Accountability & Enforcement" },
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
              <p className="t-eyebrow-sm text-muted-foreground">Purpose</p>
              <h2 className="mt-4 t-section-title-sm text-foreground">Why these statuses exist</h2>
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
                <p className="t-eyebrow-sm text-muted-foreground">Conclusion</p>
                <h2 className="mt-4 t-section-title-sm text-foreground">
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
