import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { Button } from "@/components/ui/button";

const reasons = [
  {
    t: "Independent credibility",
    d: "A Source Standard verification is a third-party record of the documentation you already maintain. It gives consumers, partners, and platforms a neutral reference point.",
  },
  {
    t: "Differentiation",
    d: "The peptide, TRT, and hormone optimization markets are crowded with claims. Verification establishes a clear, documented separation between operators who can prove their sourcing and those who cannot.",
  },
  {
    t: "Downstream reduction of friction",
    d: "Payment processors, advertising platforms, and clinical referral networks increasingly require documented legitimacy. A Source Standard profile consolidates that documentation in one citable record.",
  },
];

const docs = [
  { t: "Business licensing", d: "Active state and federal registrations applicable to the operating model." },
  { t: "Supplier documentation", d: "Records identifying upstream sources for materials, ingredients, or compounds handled." },
  { t: "Certificates of analysis", d: "Independent third-party testing for relevant lots or batches, where applicable." },
  { t: "Prescriber credentials", d: "For clinical operators, current credentials for prescribing practitioners." },
  { t: "Pharmacy partnerships", d: "Documentation of relationships with 503A or 503B partners, if applicable." },
];

const receive = [
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
        eyebrow="For Vendors · Documentation Standard"
        title="Verification, structured for operators who already do the work."
        lead="Source Standard organizes the records you already maintain into a citable, public verification. Practical, document-based, and built to be defensible."
        summary={[
          { label: "Required docs", value: "05" },
          { label: "Intake time", value: "≈15 min" },
          { label: "Cycle", value: "10–14 days" },
          { label: "Cost", value: "Disclosed at intake" },
        ]}
      />

      {/* Why */}
      <section className="border-b border-border">
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§1 — Why verification matters</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                A neutral record carries weight that self-claimed legitimacy cannot.
              </h2>
            </div>
            <div className="md:col-span-8 border-t border-border">
              {reasons.map((r, i) => (
                <div key={r.t} className="grid grid-cols-12 gap-4 py-5 border-b border-border">
                  <div className="col-span-2 md:col-span-1 meta">§1.{i + 1}</div>
                  <div className="col-span-4 md:col-span-3">
                    <h3 className="text-[14px] font-semibold text-foreground">{r.t}</h3>
                  </div>
                  <div className="col-span-12 md:col-span-8">
                    <p className="text-[14px] text-muted-foreground leading-relaxed">{r.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Documents — two col layout w/ sticky checklist */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-8">
              <p className="meta mb-3">§2 — Documentation required</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight max-w-2xl mb-8">
                What to prepare before applying.
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
                      <div className="col-span-2 meta">§2.{i + 1}</div>
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
                      <span className="meta mt-0.5">§2.{i + 1}</span>
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

      {/* Receive */}
      <section className="border-b border-border">
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <p className="meta mb-3">§3 — What is issued upon verification</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                A complete, public record of the verification.
              </h2>
            </div>
            <div className="md:col-span-7 border-t border-border">
              {receive.map((r, i) => (
                <div key={r} className="grid grid-cols-12 gap-4 py-4 border-b border-border">
                  <span className="col-span-2 md:col-span-1 meta">§3.{i + 1}</span>
                  <span className="col-span-10 md:col-span-11 text-[14px] text-foreground leading-relaxed">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-muted border-b border-border">
        <div className="container-wide py-10 md:py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="meta mb-1">§ Submission</p>
              <p className="text-[15px] text-foreground font-medium max-w-xl">
                Begin a Source Standard application. Initial intake takes approximately fifteen minutes.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/how-it-works"
                className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary border-b border-foreground hover:border-primary pb-1"
              >
                How It Works
              </Link>
              <Button
                asChild
                className="bg-primary hover:bg-primary-hover text-primary-foreground h-11 px-6 text-[12px] font-semibold uppercase tracking-[0.14em] rounded-none"
              >
                <Link to="/apply">Apply</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForVendors;
