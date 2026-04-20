import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
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
      <RecordHeader
        metadata={[
          { label: "Doc", value: "SS-PROCESS-2026.01" },
          { label: "Version", value: "2026.01" },
          { label: "Status", value: "Active" },
          { label: "Updated", value: "04 / 20 / 2026" },
        ]}
        eyebrow="Verification Lifecycle · Procedural Reference"
        title="Procedural reference for the six-step verification lifecycle."
        lead="Applied uniformly to every applicant under SS-FRAMEWORK-2026.01. Documentation-first, neutral, and recorded in the public registry with a citable review identifier."
        summary={[
          { label: "Scope", value: "All vendors" },
          { label: "Steps", value: "06" },
          { label: "Avg. cycle time", value: "10–14 days" },
          { label: "Renewal interval", value: "12 months" },
        ]}
      />

      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-4">
          <p className="meta">Scope · Applies to all vendors under SS-FRAMEWORK-2026.01.</p>
        </div>
      </section>

      <section>
        <div className="container-wide py-10 md:py-14">
          <ol className="border-t border-border">
            {steps.map((s) => (
              <li key={s.n} className="grid grid-cols-12 gap-4 md:gap-6 py-7 border-b border-border">
                <div className="col-span-2 md:col-span-1">
                  <span className="meta text-primary">{s.n}</span>
                </div>
                <div className="col-span-10 md:col-span-3">
                  <h3 className="text-[15px] font-semibold text-foreground tracking-tight">{s.t}</h3>
                </div>
                <div className="col-span-12 md:col-span-8">
                  <p className="text-[14px] text-muted-foreground leading-relaxed max-w-2xl">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border bg-surface-muted">
        <div className="container-wide py-10 md:py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="meta mb-1">§ Submission</p>
              <p className="text-[15px] text-foreground font-medium max-w-xl">
                If your documentation is current, the application takes approximately fifteen minutes.
              </p>
            </div>
            <Button
              asChild
              className="bg-primary hover:bg-primary-hover text-primary-foreground h-11 px-6 text-[12px] font-semibold uppercase tracking-[0.14em] rounded-none self-start md:self-auto"
            >
              <Link to="/apply">Apply for Verification</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
