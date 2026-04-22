import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { BoardSection, BoardCiteFooter } from "@/components/BoardSection";
import { DocJumpBar } from "@/components/DocJumpBar";
import { Callout } from "@/components/Callout";
import { authorities } from "@/data/authorities";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";

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
  { to: "/accountability", label: "Accountability & Enforcement" },
  { to: "/medical-advisory", label: "Medical Advisory Board" },
  { to: "/how-it-works", label: "Verification Protocol" },
  { to: "/status-definitions", label: "Status Definitions" },
];

const waypoints = [
  { id: "advisory", number: "1", label: "Advisory" },
  { id: "anchors", number: "2", label: "Anchors" },
  { id: "neutrality", number: "3", label: "Neutrality" },
  { id: "deeper", number: "4", label: "Read deeper" },
];

const Governance = () => (
  <>
    <PageMeta
      title="Regulatory Alignment & Oversight"
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
      eyebrow="Regulatory alignment"
      title="Regulatory Alignment & Oversight."
      lead="Institutional framework anchored to publicly citable statutory and compendial authorities, maintained under licensed clinical oversight and a posture of organizational neutrality."
      summary={[
        { label: "Advisory body of record", value: "Clinical" },
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
      title="Framework criteria maintained under licensed clinical oversight."
      rationale="Licensed clinicians review scope definitions, evidentiary standards, and renewal intervals applied by the framework. The advisory body does not evaluate, diagnose, or treat patients through Source Standard."
    >
      <div className="border border-border bg-background">
        <div className="grid grid-cols-12 px-5 py-2.5 bg-surface-muted border-b border-border">
          <div className="col-span-4 meta-mono text-foreground/70">NAME</div>
          <div className="col-span-3 meta-mono text-foreground/70">CREDENTIAL</div>
          <div className="col-span-3 meta-mono text-foreground/70">ROLE</div>
          <div className="col-span-2 meta-mono text-foreground/70 text-right">JURISDICTION</div>
        </div>
        <div className="p-5">
          <Callout tone="info" eyebrow={`Administrative notice · ${DOC_ID} · §1.A`}>
            <p className="text-[14.5px] text-foreground leading-relaxed">
              Initial advisory roster pending publication.
            </p>
            <p className="meta-mono text-foreground/70 mt-1.5">FILING WINDOW, Q1 2026.</p>
          </Callout>
        </div>
        <div className="px-5 py-3 border-t border-border">
          <p className="meta-mono text-foreground/70">
            ROSTER UPDATES ARE ISSUED UNDER CONTROLLED REVISION AND RECORDED IN THIS DOCUMENT.
          </p>
        </div>
      </div>
    </BoardSection>

    <BoardSection
      id="anchors"
      n="2"
      category="Anchors"
      title="Statutory & compendial anchors."
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
                <p className="text-[14.5px] font-semibold text-foreground">{a.full}</p>
                <a
                  href={a.url}
                  target="_blank"
                  rel="noreferrer"
                  className="meta-mono text-foreground/70 hover:text-primary transition-colors"
                >
                  {a.url.replace(/^https?:\/\//, "")} ↗
                </a>
              </div>
              <p className="col-span-6 text-[14.5px] text-muted-foreground leading-relaxed">
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
      title="Organizational neutrality & ethical boundaries."
      rationale="Strict separation of interests."
    >
      <p className="text-[14.5px] text-muted-foreground leading-relaxed">
        Source Standard does not manufacture, distribute, prescribe, dispense, or sell products in the categories it
        evaluates, and holds no equity, royalty, or revenue-share interest in any vendor or upstream source under
        review. The organization is structured to remain immune to commercial influence from the entities it
        examines.
      </p>
      <p className="text-[14.5px] text-muted-foreground leading-relaxed">
        Verification fees, where applicable, are uniform, disclosed at intake, and do not vary based on outcome,
        category, or reviewer determination. All reviewer determinations are recorded with written rationale and
        remain subject to internal audit.
      </p>
    </BoardSection>

    <BoardSection id="deeper" n="4" category="Read deeper" title="Cross-references." muted>
      <ul className="grid sm:grid-cols-2 gap-px bg-border border border-border">
        {deeper.map((d, i) => (
          <li key={d.to} className="bg-background">
            <Link to={d.to} className="group flex items-start justify-between gap-3 p-5 hover:bg-surface-muted transition-colors">
              <div>
                <p className="meta text-primary mb-1">REF · {String(i + 1).padStart(2, "0")}</p>
                <p className="text-[14.5px] font-semibold text-foreground leading-snug">{d.label}</p>
              </div>
              <span className="text-primary text-[14px] shrink-0 group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </BoardSection>

    <BoardCiteFooter
      citation={`Source Standard. Regulatory Alignment & Oversight. Document ${DOC_ID}. Issued ${VERIFIED_ON}. Controlled copy on file with the issuing organization.`}
    />
  </>
);

export default Governance;
