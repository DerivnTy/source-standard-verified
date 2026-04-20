import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

const steps = [
  {
    n: "01",
    t: "Application",
    d: "A vendor submits a documentation package through the Source Standard intake portal. Required materials include business licensing, supplier documentation, and applicable certificates of analysis.",
  },
  {
    n: "02",
    t: "Intake review",
    d: "Submitted records are organized, indexed, and checked for completeness. Vendors are notified of any missing materials before substantive review begins.",
  },
  {
    n: "03",
    t: "Greenlist mapping",
    d: "Each record is mapped against recognized upstream sources on the public greenlist. Mapping is documentation-based; no investigative work is performed.",
  },
  {
    n: "04",
    t: "Verification decision",
    d: "A determination is recorded with documented rationale. Each decision is assigned a public review identifier that can be cited by the vendor and confirmed by consumers.",
  },
  {
    n: "05",
    t: "Public profile",
    d: "Verified vendors receive a public profile and badge reflecting the documentation reviewed. Profiles list the records evaluated and the date of verification.",
  },
  {
    n: "06",
    t: "Renewal",
    d: "Verifications are time-bound. Vendors resubmit current documentation at scheduled intervals to maintain active status in the public registry.",
  },
];

const HowItWorks = () => {
  return (
    <>
      <PageHeader
        eyebrow="The Verification Lifecycle"
        title="How a Source Standard verification is issued."
        description="A six-step process, applied uniformly to every applicant. Documentation-first, neutral, and recorded in the public registry."
      />

      <section className="container-wide py-16 md:py-24">
        <ol className="border border-border divide-y divide-border bg-background">
          {steps.map((s) => (
            <li key={s.n} className="grid md:grid-cols-12 gap-6 px-6 md:px-10 py-10">
              <div className="md:col-span-3">
                <p className="text-[11px] font-mono text-primary tabular-nums">{s.n}</p>
                <h3 className="mt-2 text-xl font-semibold text-foreground tracking-tight">{s.t}</h3>
              </div>
              <div className="md:col-span-9">
                <p className="text-[15px] text-muted-foreground leading-relaxed max-w-2xl">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-border bg-surface-muted">
        <div className="container-wide py-20 md:py-24">
          <div className="grid md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-8">
              <p className="eyebrow mb-5">Ready to begin</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15] max-w-2xl">
                If your documentation is current, the process is straightforward.
              </h2>
            </div>
            <div className="md:col-span-4 flex md:justify-end">
              <Button asChild size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground">
                <Link to="/apply">Apply for Verification</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
