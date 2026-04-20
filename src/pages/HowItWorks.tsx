import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Application",
    body: "The vendor submits an application identifying their operating scope, category, and the jurisdictions in which they operate.",
  },
  {
    n: "02",
    title: "Documentation Submission",
    body: "The vendor uploads records they already maintain — business licensing, supplier and sourcing documentation, certificates of analysis, and any relevant credentials.",
  },
  {
    n: "03",
    title: "Validation",
    body: "Records are reviewed against authoritative upstream sources and licensing databases. Validation is documentation-based, not investigative.",
  },
  {
    n: "04",
    title: "Verification Decision",
    body: "If documentation is complete and validates against approved upstream standards, the vendor is verified. If not, the gaps are documented and the vendor may resubmit.",
  },
  {
    n: "05",
    title: "Public Profile",
    body: "Verified vendors receive a public profile, a Source Standard review ID, and the right to display the verification badge for the duration of their active status.",
  },
  {
    n: "06",
    title: "Periodic Review",
    body: "Verification is reviewed on a recurring basis. Licensing changes, lapses, or material updates trigger reassessment.",
  },
];

const HowItWorks = () => {
  return (
    <>
      <PageHeader
        eyebrow="How Verification Works"
        title="Documentation in. Verification out."
        description="A structured, repeatable process built on records, not opinion. Source Standard reviews documentation against recognized upstream sources and publishes the result."
      />

      <section className="container-tight py-20 md:py-24">
        <ol className="border-y border-border divide-y divide-border">
          {steps.map((s) => (
            <li key={s.n} className="grid md:grid-cols-12 gap-6 py-8 md:py-10">
              <div className="md:col-span-2">
                <span className="font-mono text-sm text-muted-foreground tabular-nums">{s.n}</span>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-serif text-2xl font-medium tracking-tight">{s.title}</h3>
              </div>
              <p className="md:col-span-6 text-muted-foreground leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 border border-border bg-surface-muted p-8 md:p-12">
          <p className="eyebrow mb-4">Important</p>
          <p className="text-foreground text-lg leading-relaxed max-w-3xl">
            Verification reflects documentation reviewed at the time of assessment. Source Standard does not
            guarantee medical outcomes, product safety, or treatment efficacy.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button asChild size="lg" className="rounded-sm h-12 px-6">
            <Link to="/apply">Apply for Verification <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-sm h-12 px-6 border-border-strong">
            <Link to="/directory">View Verified Vendors</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
