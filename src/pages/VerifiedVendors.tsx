import { Link } from "react-router-dom";
import { Search, Database } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

const VerifiedVendors = () => {
  return (
    <>
      <PageHeader
        eyebrow="Verified Vendors Directory"
        title="The public registry of verified vendors."
        description="Once the registry is live, this page will list every vendor whose documentation has been reviewed and verified under the Source Standard framework."
      />

      <section className="container-wide py-14 md:py-20">
        <div className="border border-border bg-surface-muted p-5 md:p-6">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              disabled
              placeholder="Search by vendor name, category, or location"
              className="w-full pl-10 pr-4 h-12 bg-background border border-border text-sm placeholder:text-muted-foreground cursor-not-allowed"
              aria-label="Search verified vendors (registry not yet live)"
            />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Search will activate when the registry publishes its first entries.
          </p>
        </div>

        <div className="mt-10 border border-border bg-background">
          <div className="grid grid-cols-12 px-5 py-3 border-b border-border bg-surface-muted text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            <div className="col-span-5">Vendor</div>
            <div className="col-span-3">Location</div>
            <div className="col-span-2">Review ID</div>
            <div className="col-span-2 text-right">Status</div>
          </div>
          <div className="px-6 py-20 md:py-28 text-center">
            <Database className="mx-auto h-8 w-8 text-muted-foreground" strokeWidth={1.5} />
            <p className="mt-6 text-base font-semibold text-foreground">No verified vendors listed yet.</p>
            <p className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
              This is intentional. Source Standard publishes a vendor only after documentation has been fully reviewed
              and a verification record has been issued. The first verified clinics in Tampa will appear here.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="bg-primary hover:bg-primary-hover text-primary-foreground">
                <Link to="/apply">Apply to be one of the first listed</Link>
              </Button>
              <Button asChild variant="outline" className="border-border-strong">
                <Link to="/how-it-works">Read how verification works</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {[
            { t: "Documentation-first", d: "Listings reflect records reviewed at the time of verification." },
            { t: "Time-bound", d: "Each verification carries a review identifier and renewal interval." },
            { t: "Public by default", d: "Once issued, every verification is published openly for consumer review." },
          ].map((c) => (
            <div key={c.t} className="border border-border p-6 bg-background">
              <p className="text-sm font-semibold text-foreground">{c.t}</p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default VerifiedVendors;
