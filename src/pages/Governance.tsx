import { RecordHeader } from "@/components/RecordHeader";
import { DocLayout, DocSection } from "@/components/DocLayout";
import { Callout } from "@/components/Callout";
import { authorities } from "@/data/authorities";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";

const AUTHORITY_REFERENCE_OVERRIDES: Record<string, string> = {
  FDA: "Section 501(a)(2)(B) of the FD&C Act (21 U.S.C. § 351(a)(2)(B)); 503A/503B registration and establishment records; recall and warning-letter history.",
  PCAB: "Accreditation status of compounding pharmacies operating under recognized USP compendial standards.",
  NSF: "Independent product testing and facility certification issued under publicly recognized consensus standards.",
  USP: "Compendial standards — General Chapters <795> (non-sterile compounding), <797> (sterile compounding), and <800> (hazardous drugs).",
  STATE: "State-level pharmacy and prescriber licensure records, cited per the applicable jurisdiction of practice.",
};

const waypoints = [
  { id: "advisory", number: "01", label: "Clinical advisory" },
  { id: "anchors", number: "02", label: "Statutory anchors" },
  { id: "neutrality", number: "03", label: "Neutrality" },
  { id: "citation", number: "04", label: "Official citation" },
];

const Governance = () => {
  return (
    <>
      <PageMeta
        title="Regulatory Alignment & Oversight"
        description="Source Standard governance: statutory anchors, clinical advisory oversight, and the institutional posture of organizational neutrality."
      />
      <Breadcrumb
        items={[
          { label: "About", to: "/about" },
          { label: "Governance" },
        ]}
      />

      <RecordHeader
        metadata={[
          { label: "Doc", value: "SS-GOV-2026.01" },
          { label: "Version", value: "2026.01" },
          { label: "Status", value: "Active" },
          { label: "Updated", value: "04 / 20 / 2026" },
        ]}
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

      <DocLayout waypoints={waypoints}>
        <DocSection
          id="advisory"
          number="§1"
          title="Framework criteria maintained under licensed clinical oversight."
          description="Licensed clinicians review scope definitions, evidentiary standards, and renewal intervals applied by the framework. The advisory body does not evaluate, diagnose, or treat patients through Source Standard."
          first
        >
          <div className="border border-border/60 rounded-lg bg-surface shadow-sm overflow-hidden not-prose">
            <div className="grid grid-cols-12 px-4 py-2.5 bg-surface-muted border-b border-border/60">
              <div className="col-span-4 meta-label">Name</div>
              <div className="col-span-3 meta-label">Credential</div>
              <div className="col-span-3 meta-label">Role</div>
              <div className="col-span-2 meta-label text-right">Jurisdiction</div>
            </div>
            <div className="p-5">
              <Callout tone="info" eyebrow="Administrative notice · SS-GOV-2026.01 · §1.A">
                <p className="text-[13.5px] text-foreground leading-relaxed">
                  Initial advisory roster pending publication.
                </p>
                <p className="meta-mono text-[11px] text-muted-foreground mt-1.5">
                  Filing window — Q1 2026.
                </p>
              </Callout>
            </div>
            <div className="px-4 py-3 border-t border-border/60">
              <p className="meta-label">
                Roster updates are issued under controlled revision and recorded in this document.
              </p>
            </div>
          </div>
        </DocSection>

        <DocSection
          id="anchors"
          number="§2"
          title="Statutory & Compendial Anchors."
          description="Source Standard does not originate criteria. Each framework requirement is anchored to a statutory provision or compendial standard issued by the public authorities listed below."
        >
          <div className="border border-border/60 rounded-lg bg-surface shadow-sm overflow-hidden not-prose">
            <div className="grid grid-cols-12 px-4 py-2.5 bg-surface-muted border-b border-border/60">
              <div className="col-span-2 meta-label">Anchor</div>
              <div className="col-span-4 meta-label">Issuing authority</div>
              <div className="col-span-6 meta-label">Statutory / compendial reference</div>
            </div>
            <ul className="divide-y divide-border/60">
              {authorities.map((a) => (
                <li key={a.code} className="grid grid-cols-12 gap-3 px-4 py-4 items-baseline">
                  <div className="col-span-2 meta text-primary font-semibold">{a.code}</div>
                  <div className="col-span-4">
                    <p className="text-[13px] font-semibold text-foreground">{a.full}</p>
                    <a
                      href={a.url}
                      target="_blank"
                      rel="noreferrer"
                      className="meta-label hover:text-primary transition-colors"
                    >
                      {a.url.replace(/^https?:\/\//, "")} ↗
                    </a>
                  </div>
                  <div className="col-span-6">
                    <p className="text-[13px] text-muted-foreground leading-relaxed">
                      {AUTHORITY_REFERENCE_OVERRIDES[a.code] ?? a.references}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </DocSection>

        <DocSection
          id="neutrality"
          number="§3"
          title="Organizational Neutrality & Ethical Boundaries."
          description="Strict separation of interests."
        >
          <p>
            Source Standard does not manufacture, distribute, prescribe, dispense, or sell products in the categories it
            evaluates, and holds no equity, royalty, or revenue-share interest in any vendor or upstream source under
            review. The organization is structured to remain immune to commercial influence from the entities it
            examines.
          </p>
          <p>
            Verification fees, where applicable, are uniform, disclosed at intake, and do not vary based on outcome,
            category, or reviewer determination. All reviewer determinations are recorded with written rationale and
            remain subject to internal audit.
          </p>
        </DocSection>

        <DocSection id="citation" number="§4" title="Official citation.">
          <div className="border-t-2 border-t-foreground bg-surface px-5 py-4 rounded-b-lg shadow-sm not-prose">
            <p className="font-mono uppercase tracking-[0.08em] text-[10.5px] text-foreground mb-2">
              OFFICIAL CITATION · SS-GOV-2026.01
            </p>
            <p className="text-[13px] text-foreground leading-relaxed">
              Source Standard, <span className="italic">Regulatory Alignment & Oversight</span>, Doc. SS-GOV-2026.01,
              Version 2026.01 (Active). Last updated 04 / 20 / 2026.
            </p>
            <p className="font-mono uppercase tracking-[0.08em] text-[11px] text-muted-foreground mt-2">
              Controlled copy · Subject to versioned revision under §1.
            </p>
          </div>
        </DocSection>
      </DocLayout>
    </>
  );
};

export default Governance;
