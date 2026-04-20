import { RecordHeader } from "@/components/RecordHeader";
import { authorities } from "@/data/authorities";

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
        eyebrow="Governance · Medical & Standards Oversight"
        title="Authority disclosure."
        lead="Source Standard framework criteria are reviewed by licensed clinicians and anchored to publicly citable upstream authorities. This page documents both layers."
        summary={[
          { label: "Advisory body", value: "Medical" },
          { label: "Authorities referenced", value: authorities.length.toString().padStart(2, "0") },
          { label: "Roster publication", value: "Q1 2026" },
          { label: "Conflicts policy", value: "Disclosed" },
        ]}
      />

      {/* Medical Advisory */}
      <section className="border-b border-border">
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§1 — Medical Advisory</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                Framework criteria reviewed by licensed clinicians.
              </h2>
              <p className="mt-4 text-[14px] text-muted-foreground leading-relaxed">
                Physician oversight applies to scope definitions, evidence standards, and renewal intervals. Reviewers do not
                evaluate or treat patients through the framework.
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
                <div className="px-4 py-6 border-b border-border">
                  <p className="meta">— Initial advisory roster published Q1 2026.</p>
                </div>
                <div className="px-4 py-3">
                  <p className="meta-label">Roster updates are versioned and recorded in this document.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Standards Authorities Referenced */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§2 — Standards Authorities Referenced</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                Every framework criterion maps to a public upstream record.
              </h2>
              <p className="mt-4 text-[14px] text-muted-foreground leading-relaxed">
                Source Standard does not originate criteria. The framework references existing public authorities listed below.
              </p>
            </div>
            <div className="md:col-span-8">
              <div className="border border-border bg-background">
                <div className="grid grid-cols-12 px-4 py-2.5 bg-surface-muted border-b border-border">
                  <div className="col-span-2 meta-label">Code</div>
                  <div className="col-span-4 meta-label">Authority</div>
                  <div className="col-span-6 meta-label">Referenced for</div>
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
                        <p className="text-[13px] text-muted-foreground leading-relaxed">{a.references}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conflict of Interest */}
      <section className="border-b border-border">
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§3 — Conflict of Interest Policy</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                Boundaries of the organization.
              </h2>
            </div>
            <div className="md:col-span-8 text-[14px] text-muted-foreground leading-relaxed space-y-4 border-t border-border pt-6">
              <p>
                Source Standard does not manufacture, distribute, prescribe, dispense, or sell products in the categories it
                evaluates. The organization holds no equity in vendors under review.
              </p>
              <p>
                Verification fees, when applicable, are disclosed at intake and do not vary based on outcome. Reviewer
                determinations are recorded with rationale and are subject to audit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-muted">
        <div className="container-wide py-8">
          <p className="text-[12px] text-muted-foreground leading-relaxed max-w-4xl">
            <span className="meta-label text-foreground mr-2">Cite as ·</span>
            Source Standard, Governance & Oversight, SS-GOV-2026.01. Last updated 04 / 20 / 2026.
          </p>
        </div>
      </section>
    </>
  );
};

export default Governance;
