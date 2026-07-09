import { RecordHeader } from "@/components/RecordHeader";
import { EditorialBackLink } from "@/components/EditorialBackLink";
import { BoardSection, BoardCiteFooter } from "@/components/BoardSection";
import { DocJumpBar } from "@/components/DocJumpBar";
import { Callout } from "@/components/Callout";
import { authorities } from "@/data/authorities";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { NavCard } from "@/components/system";


const DOC_ID = "SS-GOV-2026.01";
const VERIFIED_ON = "04/20/2026";

const AUTHORITY_REFERENCE_OVERRIDES: Record<string, string> = {
  FDA: "Section 501(a)(2)(B) of the FD&C Act (21 U.S.C. § 351(a)(2)(B)); 503A/503B registration and establishment records; recall and warning-letter history.",
  PCAB: "Accreditation status of compounding pharmacies operating under recognized USP compendial standards.",
  NSF: "Independent product testing and facility certification issued under publicly recognized consensus standards.",
  USP: "Compendial standards, General Chapters <795> (non-sterile compounding), <797> (sterile compounding), and <800> (hazardous drugs).",
  STATE: "State-level pharmacy and prescriber licensure records, cited per the applicable jurisdiction of practice.",
};

const deeper = [
  { to: "/accountability", label: "Accountability & Enforcement", desc: "How Source Standard responds when integrity is questioned." },
  { to: "/medical-advisory", label: "Medical Advisory Board", desc: "Independent clinical oversight of the framework." },
  { to: "/how-it-works", label: "Verification Protocol", desc: "The process behind each verification decision." },
  { to: "/status-definitions", label: "Status Definitions", desc: "What each public verification status means." },
  { to: "/greenlist", label: "Facility Records", desc: "Documented sourcing and standing of upstream facilities." },
];

const ecosystemCategories = [
  {
    t: "Independent laboratories",
    d: "Independent laboratory testing, including quality and potency analysis where applicable. Results, when provided, inform Source Standard's review of sourcing claims and facility standing.",
  },
  {
    t: "Healthcare organizations",
    d: "Organizations that contribute professional expertise and promote transparent healthcare practices.",
  },
  {
    t: "Research partners",
    d: "Organizations that contribute research, evidence, and industry knowledge supporting transparency.",
  },
];

const waypoints = [
  { id: "advisory", number: "1", label: "Advisory" },
  { id: "anchors", number: "2", label: "Anchors" },
  { id: "neutrality", number: "3", label: "Neutrality" },
  { id: "ecosystem", number: "4", label: "Ecosystem" },
  { id: "deeper", number: "5", label: "Read deeper" },
];

const Governance = () => (
  <>
    <PageMeta
      title="Who Oversees Source Standard?"
      description="Source Standard governance: statutory anchors, clinical advisory oversight, and the institutional posture of organizational neutrality."
    />
    <Breadcrumb items={[{ label: "About", to: "/about" }, { label: "Governance" }]} />

    <RecordHeader
      metadata={[
        { label: "Doc", value: DOC_ID },
        { label: "Version", value: "2026.01" },
        { label: "Status", value: "Active" },
        { label: "Updated", value: "04/20/26" },
      ]}
      verifiedOn={VERIFIED_ON}
      eyebrow="Governance & oversight"
      title="Who Oversees Source Standard?"
      lead="How Source Standard stays independent, objective, and accountable."
      summary={[
        { label: "Advisory body of record", value: "Medical Advisory Board" },
        { label: "Anchored authorities", value: authorities.length.toString().padStart(2, "0") },
        { label: "Initial roster filing", value: "Q1 2026" },
        { label: "Neutrality posture", value: "Affirmed" },
      ]}
    />

    <DocJumpBar waypoints={waypoints} />

    <BoardSection
      id="advisory"
      n="1"
      category="Advisory"
      title="Framework criteria maintained under licensed clinical oversight"
      rationale="Licensed clinicians review scope definitions, evidentiary standards, and renewal intervals applied by the framework. The advisory body does not evaluate, diagnose, or treat patients through Source Standard."
    >
      <Callout tone="info" eyebrow={`Administrative notice · ${DOC_ID} · §1.A`}>
        <p className="t-body-sm text-foreground leading-relaxed">
          Initial advisory roster pending publication.
        </p>
        <p className="meta-mono text-foreground/70 mt-1.5">FILING WINDOW, Q1 2026.</p>
      </Callout>
      <p className="meta-mono text-foreground/70">
        ROSTER UPDATES ARE ISSUED UNDER CONTROLLED REVISION AND RECORDED IN THIS DOCUMENT.
      </p>
    </BoardSection>

    <BoardSection
      id="anchors"
      n="2"
      category="Anchors"
      title="Statutory & compendial anchors"
      rationale="Source Standard does not originate criteria. Each framework requirement is anchored to a statutory provision or compendial standard issued by the public authorities listed below."
      muted
    >
      <div className="border border-border bg-background">
        <div className="grid grid-cols-12 px-5 py-2.5 bg-surface-muted border-b border-border">
          <div className="col-span-2 meta-mono text-foreground/70">ANCHOR</div>
          <div className="col-span-4 meta-mono text-foreground/70">ISSUING AUTHORITY</div>
          <div className="col-span-6 meta-mono text-foreground/70">STATUTORY / COMPENDIAL REFERENCE</div>
        </div>
        <ul className="divide-y divide-border">
          {authorities.map((a) => (
            <li key={a.code} className="grid grid-cols-12 gap-3 px-5 py-4 items-baseline">
              <div className="col-span-2 meta text-primary font-semibold">{a.code}</div>
              <div className="col-span-4">
                <p className="t-body-sm font-semibold text-foreground">{a.full}</p>
                <a
                  href={a.url}
                  target="_blank"
                  rel="noreferrer"
                  className="meta-mono text-foreground/70 hover:text-primary transition-colors"
                >
                  {a.url.replace(/^https?:\/\//, "")} ↗
                </a>
              </div>
              <p className="col-span-6 t-body-sm text-muted-foreground leading-relaxed">
                {AUTHORITY_REFERENCE_OVERRIDES[a.code] ?? a.references}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </BoardSection>

    <BoardSection
      id="neutrality"
      n="3"
      category="Neutrality"
      title="Organizational neutrality & ethical boundaries"
      rationale="Strict separation of interests."
    >
      <p className="t-body-sm text-muted-foreground leading-relaxed">
        Source Standard does not manufacture, distribute, prescribe, dispense, or sell products in the categories it
        evaluates, and holds no equity, royalty, or revenue-share interest in any vendor or upstream source under
        review. The organization is structured to remain immune to commercial influence from the entities it
        examines.
      </p>
      <p className="t-body-sm text-muted-foreground leading-relaxed">
        Verification fees, where applicable, are uniform, disclosed at intake, and do not vary based on outcome,
        category, or reviewer determination. All reviewer determinations are recorded with written rationale and
        remain subject to internal audit.
      </p>
    </BoardSection>

    <BoardSection
      id="ecosystem"
      n="4"
      category="Ecosystem"
      title="Independent organizations supporting the framework"
      rationale="Source Standard operates within a broader ecosystem of independent organizations while remaining operationally independent."
      muted
    >
      <dl className="divide-y divide-border/60 border-t border-b border-border/60">
        {ecosystemCategories.map((c) => (
          <div
            key={c.t}
            className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-x-8 gap-y-1 py-3.5"
          >
            <dt className="font-sans text-foreground" style={{ fontSize: "14px", fontWeight: 600, margin: 0 }}>
              {c.t}
            </dt>
            <dd className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
              {c.d}
            </dd>
          </div>
        ))}
      </dl>
    </BoardSection>

    <BoardSection id="deeper" n="5" category="Read deeper" title="Cross-references" muted={false}>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {deeper.map((d) => (
          <NavCard key={d.to} to={d.to} title={d.label} desc={d.desc} />
        ))}
      </div>
    </BoardSection>


    <BoardCiteFooter
      citation={`Source Standard. Regulatory Alignment & Oversight. Document ${DOC_ID}. Issued ${VERIFIED_ON}. Controlled copy on file with the issuing organization.`}
    />
  <EditorialBackLink to="/" label="Back to Home" />
    </>
);

export default Governance;
