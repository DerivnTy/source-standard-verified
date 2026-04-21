import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MetadataBar } from "@/components/MetadataBar";

const snapshot = [
  { l: "Greenlist categories", v: "03" },
  { l: "Verified vendors", v: "00" },
  { l: "Pending review", v: "00" },
  { l: "Jurisdiction", v: "United States" },
  { l: "Launch", v: "Q1 2026" },
  { l: "Sources", v: "FDA • PCAB • NSF • USP" },
];

const HomeSection = ({
  title,
  body,
  empty,
  children,
}: {
  title: string;
  body: string;
  empty?: string;
  children?: React.ReactNode;
}) => (
  <section className="border-b border-border">
    <div className="container-wide py-14 md:py-20">
      <div className="grid md:grid-cols-12 gap-10 lg:gap-16">
        <div className="md:col-span-5">
          <h2 className="text-[1.5rem] md:text-[1.75rem] font-semibold tracking-[-0.01em] leading-[1.2] text-foreground">
            {title}
          </h2>
        </div>
        <div className="md:col-span-7">
          <p className="text-[16px] text-muted-foreground leading-[1.65]">{body}</p>
          {empty && (
            <div className="mt-5 border border-dashed border-border/70 rounded-[2px] bg-surface-muted/40 px-5 py-4">
              <p className="text-[14px] text-muted-foreground leading-relaxed">{empty}</p>
            </div>
          )}
          {children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </div>
  </section>
);

const Index = () => {
  return (
    <>
      <MetadataBar
        items={[
          { label: "Doc", value: <span className="font-mono text-[12px]">SS-FRAMEWORK-2026.01</span> },
          { label: "Status", value: "Active" },
          { label: "Updated", value: "April 20, 2026" },
          { label: "Jurisdiction", value: "United States" },
        ]}
      />

      {/* Hero */}
      <section className="border-b border-border">
        <div className="container-wide py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-10 lg:gap-16">
            <div className="md:col-span-8">
              <p className="eyebrow mb-5">Public verification reference</p>
              <h1 className="text-[2rem] md:text-[2.5rem] font-semibold tracking-[-0.015em] leading-[1.1] text-foreground">
                The public reference for verifying vendors in peptide, TRT, and hormone optimization.
              </h1>
              <p className="mt-6 max-w-2xl text-[17px] text-muted-foreground leading-[1.6]">
                Look up a vendor. See what they are verified for. Learn what standards stand behind that verification. Source Standard is maintained under medical advisory review and anchored to recognized public records. This aligns with the organization's role as a public verification standard backed by physician authority, legal accountability, and independent testing.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="h-11">
                  <Link to="/verified-vendors">Look up a vendor</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-11">
                  <Link to="/how-it-works">How verification works</Link>
                </Button>
              </div>
              <p className="mt-6 text-[13px] text-muted-foreground">
                Maintained in the United States • Anchored to public FDA, PCAB, NSF, and USP records
              </p>
            </div>
            <div className="md:col-span-4">
              <div className="border border-border/70 rounded-[2px] bg-surface-muted/50 h-full">
                <div className="px-5 py-3 border-b border-border/70 bg-background">
                  <p className="text-[13px] font-semibold text-foreground">Framework snapshot</p>
                </div>
                <dl className="divide-y divide-border/70">
                  {snapshot.map((r) => (
                    <div key={r.l} className="flex items-baseline justify-between px-5 py-3">
                      <dt className="text-[13px] text-muted-foreground">{r.l}</dt>
                      <dd className="text-[13px] font-medium text-foreground tabular-nums text-right ml-3">
                        {r.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeSection
        title="What Source Standard is"
        body="Source Standard is a public verification and reference organization for vendors in peptide, TRT, and hormone optimization. It maintains a Greenlist of recognized upstream sources, a public registry of verified vendors, and educational resources reviewed under medical oversight. The dual-layer structure is central to the current business plan: greenlist the upstream facilities first, then verify that vendors are actually buying from those greenlit sources."
      />

      <HomeSection
        title="Medical advisory oversight"
        body="Source Standard is supported by medical advisors whose role is oversight, not marketing. They review educational content, validate Greenlist criteria, and strengthen the public credibility of the standard's safety and sourcing framework. The current plan calls for founding medical advisors with real credentials to be in place before vendor outreach begins."
      >
        <Button asChild size="lg" variant="outline" className="h-11">
          <Link to="/medical-advisory">View medical advisory</Link>
        </Button>
      </HomeSection>

      <HomeSection
        title="Verified Vendors Registry"
        body="The Verified Vendors Registry is where consumers can check whether a vendor has been reviewed under the Source Standard framework. Public listings are designed to show meaningful status information, including what a vendor is verified for, where they operate, and how that listing should be understood. The internal site plan defines this registry as one of the core public products of the organization."
        empty="Verified vendor records will appear here as they are published. Each listing will show the vendor's public status, location, website, and the categories or compounds included under review."
      >
        <Button asChild size="lg" className="h-11">
          <Link to="/verified-vendors">Browse verified vendors</Link>
        </Button>
      </HomeSection>

      <HomeSection
        title="Greenlist of recognized sources"
        body="The Greenlist is the upstream reference layer used within the Source Standard system. It identifies recognized source categories against which vendor sourcing is reviewed. Consumers and vendors should be able to look up the facilities and source categories that anchor the standard itself."
      >
        <Button asChild size="lg" className="h-11">
          <Link to="/greenlist">View Greenlist</Link>
        </Button>
      </HomeSection>

      <HomeSection
        title="Education and public guidance"
        body="Source Standard also serves as a public education resource. The site is designed to house useful material on peptides, TRT, storage habits, shelf life, sourcing risk, and the risks of buying from unverified sources. The current plan specifically includes physician-reviewed education as a core part of the website, not as a side feature."
      >
        <Button asChild size="lg" variant="outline" className="h-11">
          <Link to="/education">Explore education</Link>
        </Button>
      </HomeSection>

      <HomeSection
        title="How the standard works"
        body="Source Standard maintains a structured review framework that includes recognized source categories, vendor review requirements, public status definitions, and accountability policies. Visitors who want deeper detail can review the full verification framework separately. This keeps the homepage clear while still giving access to the full depth of the standard."
      >
        <Button asChild size="lg" variant="outline" className="h-11">
          <Link to="/how-it-works">View how it works</Link>
        </Button>
      </HomeSection>

      <HomeSection
        title="Why vendors want to be associated with Source Standard"
        body="For vendors, Source Standard is not just a badge. It is a public listing, a public reference, and a trust signal customers can check directly. Verified listings are meant to be useful to the public and valuable to the operators included in them. The current plan explicitly positions the badge as a competitive advantage that shifts the conversation from price to proof."
      >
        <Button asChild size="lg" variant="outline" className="h-11">
          <Link to="/for-vendors">Learn more for vendors</Link>
        </Button>
      </HomeSection>

      <HomeSection
        title="A public place to verify, learn, and understand"
        body="Source Standard exists to give consumers a place to check vendor claims, understand what verified status means, and learn more about the standards behind legitimate sourcing. It is built to function as a public reference point first, with deeper procedural and accountability detail available for anyone who wants to inspect the standard more closely. That matches the current MVP direction: public registries, physician-backed authority, educational content, and verified vendor listings in one system."
      >
        <Button asChild size="lg" className="h-11">
          <Link to="/verified-vendors">Look up a vendor</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="h-11">
          <Link to="/education">Explore education</Link>
        </Button>
      </HomeSection>
    </>
  );
};

export default Index;
