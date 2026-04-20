import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";

const principles = [
  { t: "Neutral", d: "Source Standard does not manufacture, dispense, prescribe, or sell. It organizes and verifies documentation." },
  { t: "Documentation-first", d: "Evaluation references records vendors already maintain. No investigation, surveillance, or enforcement is conducted." },
  { t: "Public by default", d: "Every verification is published with a citable identifier so claims of legitimacy can be independently confirmed." },
  { t: "Time-bound", d: "Verifications expire. Active status requires resubmission of current documentation at scheduled intervals." },
];

const roles = [
  { is: "A documentation-first verification framework", isnot: "A clinic, pharmacy, or laboratory" },
  { is: "A public registry of vendor verifications", isnot: "A manufacturer, distributor, or reseller" },
  { is: "A reference standard maintained under medical advisory review", isnot: "A regulator or enforcement agency" },
  { is: "An information layer for consumers, vendors, and clinicians", isnot: "A surveillance or investigative body" },
];

const About = () => {
  return (
    <>
      <RecordHeader
        metadata={[
          { label: "Doc", value: "SS-ORG-2026.01" },
          { label: "Version", value: "2026.01" },
          { label: "Status", value: "Active" },
          { label: "Updated", value: "04 / 20 / 2026" },
        ]}
        eyebrow="About · Organization Reference"
        title="Source Standard."
        lead="A documentation-first verification framework for the peptide, TRT, hormone optimization, and wellness vendor space. Maintained in Tampa, FL."
        summary={[
          { label: "Founded", value: "2026" },
          { label: "Headquarters", value: "Tampa, FL" },
          { label: "Jurisdiction", value: "FL · US" },
          { label: "Model", value: "Documentation-first" },
        ]}
      />

      {/* §1 Role */}
      <section className="border-b border-border">
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§1 — Role</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                Source Standard is a record keeper of credibility.
              </h2>
            </div>
            <div className="md:col-span-8 text-[14px] text-muted-foreground leading-relaxed space-y-4 border-t border-border pt-6">
              <p>
                Source Standard is a documentation-first verification framework. It is maintained in Tampa, FL. It is not a
                clinic, pharmacy, laboratory, regulator, or enforcement body.
              </p>
              <p>
                The framework organizes records that legitimate operators already maintain — licensing, supplier
                documentation, certificates of analysis — and publishes a citable record of what was reviewed.
              </p>
              <p className="text-foreground">
                Medical advisory oversight and the standards authorities the framework references are documented in{" "}
                <Link to="/governance" className="text-primary hover:text-primary-hover underline-offset-4 hover:underline">
                  Governance & Oversight
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* §2 Principles */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§2 — Principles</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                Four standards held internally.
              </h2>
            </div>
            <div className="md:col-span-8 border-t border-border">
              {principles.map((p, i) => (
                <div key={p.t} className="grid grid-cols-12 gap-4 py-5 border-b border-border">
                  <div className="col-span-2 md:col-span-1 meta">§2.{i + 1}</div>
                  <div className="col-span-4 md:col-span-3">
                    <h3 className="text-[14px] font-semibold text-foreground">{p.t}</h3>
                  </div>
                  <div className="col-span-12 md:col-span-8">
                    <p className="text-[14px] text-muted-foreground leading-relaxed">{p.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* §3 Role boundaries */}
      <section className="border-b border-border">
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§3 — Role Boundaries</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                What the framework is, and is not.
              </h2>
            </div>
            <div className="md:col-span-8">
              <div className="border border-border bg-background">
                <div className="grid grid-cols-12 px-4 py-2.5 bg-surface-muted border-b border-border">
                  <div className="col-span-1 meta-label">Ref</div>
                  <div className="col-span-5 meta-label">Is</div>
                  <div className="col-span-6 meta-label">Is not</div>
                </div>
                <ul className="divide-y divide-border">
                  {roles.map((r, i) => (
                    <li key={r.is} className="grid grid-cols-12 gap-3 px-4 py-4 items-baseline">
                      <div className="col-span-1 meta">§3.{i + 1}</div>
                      <div className="col-span-5 text-[13px] text-foreground leading-relaxed">{r.is}</div>
                      <div className="col-span-6 text-[13px] text-muted-foreground leading-relaxed">{r.isnot}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-muted">
        <div className="container-wide py-8">
          <p className="text-[12px] text-muted-foreground leading-relaxed max-w-4xl">
            <span className="meta-label text-foreground mr-2">Cite as ·</span>
            Source Standard, Organization Reference, SS-ORG-2026.01. Last updated 04 / 20 / 2026.
          </p>
        </div>
      </section>
    </>
  );
};

export default About;
