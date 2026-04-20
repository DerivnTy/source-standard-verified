import { PageHeader } from "@/components/PageHeader";

const About = () => {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A neutral standard, built for a market that doesn't have one."
        description="Source Standard is an independent verification and standards organization for the peptide, TRT, hormone optimization, and wellness vendor space."
      />
      <section className="container-narrow py-20 md:py-24 space-y-12 text-foreground">
        <div className="space-y-5 text-base md:text-lg leading-relaxed text-muted-foreground">
          <p>
            The peptide, TRT, hormone optimization, and wellness markets have grown faster than the trust
            infrastructure around them. Vendors make claims. Consumers can't verify those claims. Legitimate
            operators are forced to compete on the same playing field as bad actors.
          </p>
          <p>
            Source Standard exists to change that. We are an independent verification and standards organization
            focused on documentation review. We do not manufacture, prescribe, dispense, regulate, or enforce.
            We organize and validate the records that prove a vendor is who they say they are.
          </p>
        </div>

        <div className="border-t border-border pt-12">
          <p className="eyebrow mb-5">What We Are</p>
          <ul className="space-y-3 text-base md:text-lg text-foreground">
            <li className="flex gap-4"><span className="text-muted-foreground font-mono text-sm pt-1.5">—</span>An independent verification and standards organization.</li>
            <li className="flex gap-4"><span className="text-muted-foreground font-mono text-sm pt-1.5">—</span>A documentation-first review framework.</li>
            <li className="flex gap-4"><span className="text-muted-foreground font-mono text-sm pt-1.5">—</span>A neutral, public-facing trust layer for the vendor space.</li>
          </ul>
        </div>

        <div className="border-t border-border pt-12">
          <p className="eyebrow mb-5">What We Are Not</p>
          <ul className="space-y-3 text-base md:text-lg text-muted-foreground">
            <li className="flex gap-4"><span className="font-mono text-sm pt-1.5">—</span>A manufacturer, pharmacy, clinic, or laboratory.</li>
            <li className="flex gap-4"><span className="font-mono text-sm pt-1.5">—</span>A regulator or enforcement agency.</li>
            <li className="flex gap-4"><span className="font-mono text-sm pt-1.5">—</span>A guarantor of medical outcomes, product safety, or treatment efficacy.</li>
          </ul>
        </div>

        <div className="border-t border-border pt-12">
          <p className="eyebrow mb-5">Our Position</p>
          <p className="font-serif text-2xl md:text-3xl font-medium leading-snug tracking-tight text-foreground">
            Verification reflects documentation reviewed at the time of assessment. Where the records exist
            and stand up to review, we publish them. Where they don't, we say so.
          </p>
        </div>
      </section>
    </>
  );
};

export default About;
