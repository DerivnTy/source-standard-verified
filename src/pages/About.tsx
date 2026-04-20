import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

const principles = [
  { t: "Neutral", d: "We do not manufacture, dispense, prescribe, or sell. We organize and verify documentation." },
  { t: "Documentation-first", d: "We evaluate records vendors already maintain. We do not investigate, surveil, or enforce." },
  { t: "Public by default", d: "Every verification is published with a citable identifier so claims of legitimacy can be independently confirmed." },
  { t: "Time-bound", d: "Verifications expire. Active status requires resubmission of current documentation." },
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
      <PageHeader
        eyebrow="About Source Standard"
        title="We are record keepers of credibility."
        description="Source Standard is a neutral verification and standards organization for the peptide, TRT, hormone optimization, and wellness vendor space."
      />

      <section className="border-b border-border">
        <div className="container-wide py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <p className="eyebrow mb-5">Operating Philosophy</p>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
                Good operators already have the proof. Our role is to make it visible.
              </h2>
            </div>
            <div className="md:col-span-8 text-[15px] text-muted-foreground leading-relaxed space-y-5">
              <p>
                The peptide, TRT, and hormone optimization markets are full of claims about sourcing, licensing, and
                quality. Consumers have no neutral standard to verify those claims. Legitimate vendors have no
                consistent way to prove what separates them from operators who cannot.
              </p>
              <p>
                Source Standard exists to close that gap. We do not investigate, enforce, or police. We organize and
                validate the documentation that legitimate operators already maintain — licensing records, supplier
                documentation, certificates of analysis — and we publish a citable record of what was reviewed.
              </p>
              <p className="text-foreground font-medium">
                We are record keepers of credibility. The proof exists. We make it legible.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-16 md:py-24">
          <p className="eyebrow mb-5">Principles</p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight max-w-3xl mb-10">
            Four standards we hold ourselves to.
          </h2>
          <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
            {principles.map((p) => (
              <div key={p.t} className="bg-background p-7">
                <p className="text-base font-semibold text-foreground">{p.t}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-wide py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <p className="eyebrow mb-5">Scope</p>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
                What Source Standard is not.
              </h2>
              <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed">
                Defining our scope clearly is part of being credible. The following is outside what we do.
              </p>
            </div>
            <div className="md:col-span-7">
              <ul className="border border-border divide-y divide-border bg-background">
                {notWhat.map((n) => (
                  <li key={n} className="px-5 py-4 text-[15px] text-foreground">{n}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-muted">
        <div className="container-wide py-20 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15] max-w-3xl mx-auto">
            A neutral standard, built openly, anchored to documentation.
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-primary hover:bg-primary-hover text-primary-foreground">
              <Link to="/greenlist">Browse the Greenlist</Link>
            </Button>
            <Button asChild variant="outline" className="border-border-strong">
              <Link to="/contact">Contact Source Standard</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
