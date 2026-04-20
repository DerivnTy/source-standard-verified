import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

const reasons = [
  {
    t: "Establish independent credibility",
    d: "A Source Standard verification is a third-party record of the documentation you already maintain. It gives consumers, partners, and platforms a neutral reference point.",
  },
  {
    t: "Differentiate from unverified operators",
    d: "The peptide, TRT, and hormone optimization markets are crowded with claims. Verification establishes a clear, documented separation between operators who can prove their sourcing and those who cannot.",
  },
  {
    t: "Reduce friction with downstream partners",
    d: "Payment processors, advertising platforms, and clinical referral networks increasingly require documented legitimacy. A Source Standard profile consolidates that documentation in one citable record.",
  },
];

const docs = [
  { t: "Business licensing", d: "Active state and federal registrations applicable to your operating model." },
  { t: "Supplier documentation", d: "Records identifying upstream sources for materials, ingredients, or compounds you handle." },
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
      <PageHeader
        eyebrow="For Vendors"
        title="Verification, structured for operators who already do the work."
        description="Source Standard organizes the records you already maintain into a citable, public verification. Practical, document-based, and built to be defensible."
      />

      {/* Why */}
      <section className="border-b border-border">
        <div className="container-wide py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="eyebrow mb-5">Why verification matters</p>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
                A neutral record carries weight that self-claimed legitimacy cannot.
              </h2>
            </div>
            <div className="md:col-span-8 divide-y divide-border border-t border-border">
              {reasons.map((r) => (
                <div key={r.t} className="py-7 first:pt-7">
                  <h3 className="text-lg font-semibold text-foreground">{r.t}</h3>
                  <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed">{r.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-16 md:py-24">
          <p className="eyebrow mb-5">Documentation required</p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight max-w-3xl">
            What to prepare before applying.
          </h2>
          <div className="mt-10 border border-border bg-background divide-y divide-border">
            {docs.map((d, i) => (
              <div key={d.t} className="grid md:grid-cols-12 gap-6 px-6 py-6">
                <div className="md:col-span-1 text-[11px] font-mono text-muted-foreground tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="md:col-span-4">
                  <p className="font-semibold text-foreground">{d.t}</p>
                </div>
                <div className="md:col-span-7">
                  <p className="text-sm text-muted-foreground leading-relaxed">{d.d}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground max-w-3xl">
            Required documentation varies by vendor category. Source Standard reviewers will identify any additional
            materials needed during the intake phase.
          </p>
        </div>
      </section>

      {/* Receive */}
      <section className="border-b border-border">
        <div className="container-wide py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <p className="eyebrow mb-5">What you receive</p>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
                A complete, public record of your verification.
              </h2>
            </div>
            <div className="md:col-span-7">
              <ul className="border border-border divide-y divide-border bg-background">
                {receive.map((r, i) => (
                  <li key={r} className="flex gap-4 px-5 py-4">
                    <span className="text-[11px] font-mono text-muted-foreground tabular-nums pt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] text-foreground leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-muted">
        <div className="container-wide py-20 md:py-24">
          <div className="grid md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-8">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15] max-w-2xl">
                Begin a Source Standard application.
              </h2>
              <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
                Initial intake takes approximately fifteen minutes. A reviewer will follow up to confirm receipt and
                outline any additional documentation requirements.
              </p>
            </div>
            <div className="md:col-span-4 flex md:justify-end gap-3">
              <Button asChild variant="outline" className="border-border-strong">
                <Link to="/how-it-works">How It Works</Link>
              </Button>
              <Button asChild size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground">
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
