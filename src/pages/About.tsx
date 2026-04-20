import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { Button } from "@/components/ui/button";

const principles = [
  { t: "Neutral", d: "Source Standard does not manufacture, dispense, prescribe, or sell. It organizes and verifies documentation." },
  { t: "Documentation-first", d: "Evaluation is based on records vendors already maintain. No investigation, surveillance, or enforcement is conducted." },
  { t: "Public by default", d: "Every verification is published with a citable identifier so claims of legitimacy can be independently confirmed." },
  { t: "Time-bound", d: "Verifications expire. Active status requires resubmission of current documentation at scheduled intervals." },
];

const notWhat = [
  "A clinic, pharmacy, or laboratory",
  "A manufacturer or distributor",
  "A regulator or enforcement agency",
  "A surveillance or investigative body",
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
        title="Source Standard. Record keepers of credibility."
        lead="A neutral verification and standards organization for the peptide, TRT, hormone optimization, and wellness vendor space."
        summary={[
          { label: "Founded", value: "2026" },
          { label: "Headquarters", value: "Tampa, FL" },
          { label: "Jurisdiction", value: "FL · US" },
          { label: "Model", value: "Documentation-first" },
        ]}
      />

      <section className="border-b border-border">
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§1 — Operating Philosophy</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                Good operators already have the proof. The role of Source Standard is to make it visible.
              </h2>
            </div>
            <div className="md:col-span-8 text-[14px] text-muted-foreground leading-relaxed space-y-4 border-t border-border pt-6">
              <p>
                The peptide, TRT, and hormone optimization markets are full of claims about
                sourcing, licensing, and quality. Consumers have no neutral standard to verify
                those claims. Legitimate vendors have no consistent way to prove what separates
                them from operators who cannot.
              </p>
              <p>
                Source Standard exists to close that gap. The organization does not investigate,
                enforce, or police. It organizes and validates the documentation that legitimate
                operators already maintain — licensing records, supplier documentation,
                certificates of analysis — and publishes a citable record of what was reviewed.
              </p>
              <p className="text-foreground font-medium">
                Source Standard is the record keeper of credibility. The proof exists. The framework makes it legible.
              </p>
            </div>
          </div>
        </div>
      </section>

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

      <section className="border-b border-border">
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <p className="meta mb-3">§3 — Scope</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                What Source Standard is not.
              </h2>
              <p className="mt-4 text-[14px] text-muted-foreground leading-relaxed">
                Defining scope clearly is part of being credible. The following is outside the framework.
              </p>
            </div>
            <div className="md:col-span-7 border-t border-border">
              {notWhat.map((n, i) => (
                <div key={n} className="grid grid-cols-12 gap-4 py-4 border-b border-border">
                  <span className="col-span-2 md:col-span-1 meta">§3.{i + 1}</span>
                  <span className="col-span-10 md:col-span-11 text-[14px] text-foreground leading-relaxed">{n}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-muted border-b border-border">
        <div className="container-wide py-10 md:py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="meta mb-1">§ Reference</p>
              <p className="text-[15px] text-foreground font-medium max-w-xl">
                A neutral standard, built openly, anchored to documentation.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                asChild
                className="bg-primary hover:bg-primary-hover text-primary-foreground h-11 px-6 text-[12px] font-semibold uppercase tracking-[0.14em] rounded-none"
              >
                <Link to="/greenlist">Browse the Greenlist</Link>
              </Button>
              <Link
                to="/contact"
                className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary border-b border-foreground hover:border-primary pb-1"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
