import { RecordHeader } from "@/components/RecordHeader";
import { authorities } from "@/data/authorities";

const AUTHORITY_REFERENCE_OVERRIDES: Record<string, string> = {
  FDA: "Section 501(a)(2)(B) of the FD&C Act (21 U.S.C. § 351(a)(2)(B)); 503A/503B registration and establishment records; recall and warning-letter history.",
  PCAB: "Accreditation status of compounding pharmacies operating under recognized USP compendial standards.",
  NSF: "Independent product testing and facility certification issued under publicly recognized consensus standards.",
  USP: "Compendial standards — General Chapters <795> (non-sterile compounding), <797> (sterile compounding), and <800> (hazardous drugs).",
  STATE: "State-level pharmacy and prescriber licensure records, cited per the applicable jurisdiction of practice.",
};

const Governance = () => {
  return (
    <>
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

      {/* §1 — Clinical Advisory of Record */}
      <section className="border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§1 — Clinical Advisory of Record</p>
              <h2 className="h-section">
                Framework criteria maintained under licensed clinical oversight.
              </h2>
              <p className="mt-4 text-[14px] text-muted-foreground leading-relaxed">
                Licensed clinicians review scope definitions, evidentiary standards, and renewal intervals applied by the
                framework. The advisory body does not evaluate, diagnose, or treat patients through Source Standard.
              </p>
            </div>
            <div className="md:col-span-8">
              <div className="border border-border bg-background">
                <div className="grid grid-cols-12 px-4 py-2.5 bg-surface-muted border-b border-border">
                  <div className="col-span-4 meta-label">Name</div>
                  <div className="col-span-3 meta-label">Credential</div>
                  <div className="col-span-3 meta-label">Role</div>
                  <div className="col-span-2 meta-label text-right">Jurisdiction</div>
                </div>
                <div className="border-l-2 border-l-foreground bg-surface-muted/40 px-5 py-5 border-b border-border">
                  <p className="meta-mono text-[11px] uppercase tracking-[0.08em] text-foreground mb-2">
                    ADMINISTRATIVE NOTICE · SS-GOV-2026.01 · §1.A
                  </p>
                  <p className="text-[13px] text-foreground leading-relaxed">
                    Initial advisory roster pending publication.
                  </p>
                  <p className="meta-mono text-[11px] text-muted-foreground mt-1.5">
                    Filing window — Q1 2026.
                  </p>
                </div>
                <div className="px-4 py-3">
                  <p className="meta-label">
                    Roster updates are issued under controlled revision and recorded in this document.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §2 — Statutory & Compendial Anchors */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§2 — Statutory & Compendial Anchors</p>
              <h2 className="h-section">
                The framework operates as an evaluative mirror of existing public authorities.
              </h2>
              <p className="mt-4 text-[14px] text-muted-foreground leading-relaxed">
                Source Standard does not originate criteria. Each framework requirement is anchored to a statutory provision
                or compendial standard issued by the public authorities listed below.
              </p>
            </div>
            <div className="md:col-span-8">
              <div className="border border-border bg-background">
                <div className="grid grid-cols-12 px-4 py-2.5 bg-surface-muted border-b border-border">
                  <div className="col-span-2 meta-label">Anchor</div>
                  <div className="col-span-4 meta-label">Issuing authority</div>
                  <div className="col-span-6 meta-label">Statutory / compendial reference</div>
                </div>
                <ul className="divide-y divide-border">
                  {authorities.map((a) => (
                    <li key={a.code} className="grid grid-cols-12 gap-3 px-4 py-4 items-baseline">
                      <div className="col-span-2 meta text-primary">{a.code}</div>
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
            </div>
          </div>
        </div>
      </section>

      {/* §3 — Organizational Neutrality & Ethical Boundaries */}
      <section className="border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§3 — Organizational Neutrality & Ethical Boundaries</p>
              <h2 className="h-section">
                Strict separation of interests.
              </h2>
            </div>
            <div className="md:col-span-8 text-[14px] text-muted-foreground leading-relaxed space-y-4 border-t border-border pt-6">
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
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-muted">
        <div className="container-wide py-10">
          <div className="border-t-2 border-t-foreground bg-background px-5 py-4 max-w-4xl">
            <p className="meta-mono text-[11px] uppercase tracking-[0.08em] text-foreground mb-2">
              OFFICIAL CITATION · SS-GOV-2026.01
            </p>
            <p className="text-[13px] text-foreground leading-relaxed">
              Source Standard, <span className="italic">Regulatory Alignment & Oversight</span>, Doc. SS-GOV-2026.01,
              Version 2026.01 (Active). Last updated 04 / 20 / 2026.
            </p>
            <p className="meta-mono text-[11px] text-muted-foreground mt-2">
              Controlled copy · Subject to versioned revision under §1.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Governance;
