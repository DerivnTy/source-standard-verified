import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";

const docs = [
  { t: "Business licensing", d: "Active state and federal registrations applicable to the operating model." },
  { t: "Supplier documentation", d: "Records identifying upstream sources for materials, ingredients, or compounds handled." },
  { t: "Certificates of analysis", d: "Independent third-party testing for relevant lots or batches, where applicable." },
  { t: "Prescriber credentials", d: "For clinical operators, current credentials for prescribing practitioners." },
  { t: "Pharmacy partnerships", d: "Documentation of relationships with 503A or 503B partners, if applicable." },
];

const issued = [
  "A public verified profile in the Source Standard registry",
  "A unique review identifier that can be cited and independently confirmed",
  "A verification badge for use on vendor-controlled surfaces",
  "An itemized record of documentation reviewed at the time of verification",
];

const ForVendors = () => {
  return (
    <>
      <RecordHeader
        metadata={[
          { label: "Doc", value: "SS-VENDOR-GUIDE-2026.01" },
          { label: "Version", value: "2026.01" },
          { label: "Status", value: "Active" },
          { label: "Updated", value: "04 / 20 / 2026" },
        ]}
        eyebrow="Reference"
        title="Vendor reference."
        lead="Submission requirements, evidence categories, and review timeline for vendors seeking verification."
      />

      {/* §1 Documentation required */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-8">
              <p className="meta mb-3">§1 — Documentation Required</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight max-w-2xl mb-8">
                Records reviewed during intake.
              </h2>
              <div className="border border-border bg-background">
                <div className="grid grid-cols-12 px-4 py-2.5 bg-surface-muted border-b border-border">
                  <div className="col-span-2 meta-label">Ref</div>
                  <div className="col-span-4 meta-label">Document</div>
                  <div className="col-span-6 meta-label">Description</div>
                </div>
                <ul className="divide-y divide-border">
                  {docs.map((d, i) => (
                    <li key={d.t} className="grid grid-cols-12 px-4 py-4">
                      <div className="col-span-2 meta">§1.{i + 1}</div>
                      <div className="col-span-4">
                        <p className="text-[13px] font-semibold text-foreground">{d.t}</p>
                      </div>
                      <div className="col-span-6">
                        <p className="text-[13px] text-muted-foreground leading-relaxed">{d.d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-5 meta-label">
                Required documentation varies by vendor category. Reviewers identify additional materials during intake.
              </p>
            </div>

            <aside className="md:col-span-4">
              <div className="md:sticky md:top-28 border border-border bg-background">
                <div className="px-4 py-2.5 border-b border-border bg-surface-muted">
                  <p className="meta-label text-foreground">Submission Checklist</p>
                </div>
                <ul className="divide-y divide-border">
                  {docs.map((d, i) => (
                    <li key={d.t} className="flex items-start gap-3 px-4 py-3">
                      <span className="meta mt-0.5">§1.{i + 1}</span>
                      <span className="text-[13px] text-foreground">{d.t}</span>
                    </li>
                  ))}
                </ul>
                <div className="px-4 py-3 border-t border-border bg-surface-muted">
                  <Link
                    to="/apply"
                    className="text-[12px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover"
                  >
                    Begin application →
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* §2 Issued upon verification */}
      <section className="border-b border-border">
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <p className="meta mb-3">§2 — Issued Upon Verification</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                A complete public record of the verification.
              </h2>
            </div>
            <div className="md:col-span-7 border-t border-border">
              {issued.map((r, i) => (
                <div key={r} className="grid grid-cols-12 gap-4 py-4 border-b border-border">
                  <span className="col-span-2 md:col-span-1 meta">§2.{i + 1}</span>
                  <span className="col-span-10 md:col-span-11 text-[14px] text-foreground leading-relaxed">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hairline submission strip */}
      <section className="border-b border-border">
        <div className="container-wide py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <p className="meta">§ Submission · Initial intake takes approximately fifteen minutes.</p>
            <Link
              to="/apply"
              className="text-[12px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover border-b border-primary pb-0.5"
            >
              Begin application →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForVendors;
