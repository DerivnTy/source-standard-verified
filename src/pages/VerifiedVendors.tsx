import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { RecordHeader } from "@/components/RecordHeader";

const VerifiedVendors = () => {
  return (
    <>
      <RecordHeader
        metadata={[
          { label: "Doc", value: "SS-REGISTRY-2026.01" },
          { label: "Version", value: "2026.01" },
          { label: "Status", value: "Pre-launch" },
          { label: "Updated", value: "04 / 20 / 2026" },
        ]}
        eyebrow="Public Registry · Verified Vendors"
        title="The public registry of verified vendors."
        lead="Once the registry opens, this page lists every vendor whose documentation has been reviewed and verified under the Source Standard framework, together with the public review identifier issued at the time of verification."
        summary={[
          { label: "Published records", value: "00" },
          { label: "Pending review", value: "00" },
          { label: "First entries", value: "Q1 2026" },
          { label: "Jurisdiction", value: "FL · US" },
        ]}
      />

      <section>
        <div className="container-wide py-10 md:py-14">
          <div className="border border-border bg-surface-muted">
            <div className="px-4 py-2.5 border-b border-border bg-background">
              <p className="meta-label text-foreground">Registry Search</p>
            </div>
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  disabled
                  placeholder="Search by vendor name, category, jurisdiction, or review ID"
                  className="w-full pl-10 pr-4 h-11 bg-background border border-border text-[13px] placeholder:text-muted-foreground cursor-not-allowed"
                  aria-label="Search verified vendors (registry not yet live)"
                />
              </div>
              <p className="mt-3 meta-label">Search activates upon publication of first records · Q1 2026.</p>
            </div>
          </div>

          <div className="mt-8 border border-border bg-background">
            <div className="grid grid-cols-12 px-4 py-2.5 border-b border-border bg-surface-muted">
              <div className="col-span-5 meta-label">Vendor</div>
              <div className="col-span-3 meta-label">Jurisdiction</div>
              <div className="col-span-2 meta-label">Review ID</div>
              <div className="col-span-2 meta-label text-right">Status</div>
            </div>
            <div className="px-4 py-6 border-b border-border">
              <p className="meta">— No published records. First entries: Q1 2026.</p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <p className="meta-label">Showing 0 of 0 records</p>
              <div className="flex items-center gap-5">
                <Link
                  to="/how-it-works"
                  className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary"
                >
                  How verification works →
                </Link>
                <Link
                  to="/apply"
                  className="text-[12px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover"
                >
                  Apply for verification →
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-px bg-border border border-border">
            {[
              { t: "Documentation-first", d: "Listings reflect records reviewed at the time of verification." },
              { t: "Time-bound", d: "Each verification carries a review identifier and renewal interval." },
              { t: "Public by default", d: "Once issued, every verification is published openly for consumer review." },
            ].map((c, i) => (
              <div key={c.t} className="bg-background p-6">
                <p className="meta mb-3">§{i + 1}</p>
                <p className="text-[13px] font-semibold text-foreground">{c.t}</p>
                <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default VerifiedVendors;
