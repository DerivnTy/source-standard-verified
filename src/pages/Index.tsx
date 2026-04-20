import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { greenlist } from "@/data/greenlist";
import { MetadataBar } from "@/components/MetadataBar";

const philosophy = [
  {
    n: "01",
    title: "Documentation-first",
    body: "Verification is conducted against records vendors already maintain — licensing, supplier documentation, certificates of analysis. No investigation is performed.",
  },
  {
    n: "02",
    title: "Neutral by design",
    body: "Source Standard is not a clinic, pharmacy, laboratory, or enforcement agency. It is a standards organization that organizes and validates existing proof.",
  },
  {
    n: "03",
    title: "Upstream-anchored",
    body: "Every verification is anchored to a public greenlist of recognized upstream sources — 503B facilities, 503A pharmacies, and credentialed standards.",
  },
];

const lifecycle = [
  { n: "01", t: "Application", d: "Vendor submits a documentation package through the Source Standard intake portal." },
  { n: "02", t: "Intake review", d: "Submitted records are organized, indexed, and checked for completeness." },
  { n: "03", t: "Greenlist mapping", d: "Each record is mapped against recognized upstream standards on the public greenlist." },
  { n: "04", t: "Verification decision", d: "A determination is recorded with documented rationale and a public review identifier." },
  { n: "05", t: "Public profile", d: "Verified vendors receive a public profile and badge reflecting documentation reviewed." },
  { n: "06", t: "Renewal", d: "Verifications are time-bound. Vendors resubmit current documentation at scheduled intervals." },
];

const Index = () => {
  return (
    <>
      <MetadataBar
        items={[
          { label: "Doc", value: "SS-FRAMEWORK-2026.01" },
          { label: "Status", value: "Active" },
          { label: "Updated", value: "04 / 20 / 2026" },
          { label: "Jurisdiction", value: "FL · US" },
        ]}
        className="border-t-0"
      />

      {/* Hero */}
      <section className="border-b border-border">
        <div className="container-wide py-14 md:py-20">
          <div className="grid md:grid-cols-12 gap-10 lg:gap-14">
            <div className="md:col-span-7">
              <p className="eyebrow mb-5">Public Verification Framework</p>
              <h1 className="text-[2rem] md:text-[2.5rem] lg:text-[2.75rem] font-semibold tracking-tight leading-[1.1] text-foreground">
                Source Standard. A documentation-first verification standard for peptide, TRT, and hormone optimization vendors.
              </h1>
              <p className="mt-6 max-w-2xl text-[15px] text-muted-foreground leading-relaxed">
                The Source Standard framework establishes a neutral, public reference for
                vendor legitimacy. Verifications are issued against documentation vendors
                already maintain and recorded in the public registry with a citable identifier.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button
                  asChild
                  className="bg-primary hover:bg-primary-hover text-primary-foreground h-11 px-6 text-[13px] font-semibold uppercase tracking-[0.12em] rounded-none"
                >
                  <Link to="/greenlist">Browse the Greenlist</Link>
                </Button>
                <Link
                  to="/apply"
                  className="text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground border-b-2 border-foreground pb-1 hover:text-primary hover:border-primary transition-colors"
                >
                  Apply for Verification
                </Link>
              </div>
              <p className="mt-8 meta-label">
                Florida launch 2026 · Documentation-first model · Built from public FDA, PCAB, NSF, and USP records
              </p>
            </div>

            <div className="md:col-span-5">
              <div className="border border-border bg-surface-muted">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-background">
                  <p className="meta-label text-foreground">Framework Snapshot</p>
                  <p className="meta-label">v.2026.01</p>
                </div>
                <dl className="divide-y divide-border">
                  {[
                    { l: "Greenlist categories", v: "03" },
                    { l: "Verified vendors", v: "00" },
                    { l: "Pending review", v: "00" },
                    { l: "Jurisdiction", v: "FL / US" },
                    { l: "Launch", v: "Q1 2026" },
                    { l: "Verification model", v: "Documentation-first" },
                  ].map((r) => (
                    <div key={r.l} className="flex items-baseline justify-between px-4 py-3">
                      <dt className="text-[12px] text-muted-foreground">{r.l}</dt>
                      <dd className="text-[12px] font-medium text-foreground tabular-nums">{r.v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="px-4 py-3 border-t border-border bg-background">
                  <p className="meta-label">Source: FDA · PCAB · NSF · USP</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operating philosophy */}
      <section className="border-b border-border">
        <div className="container-wide py-14 md:py-20">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§1 — Operating Philosophy</p>
              <h2 className="text-2xl md:text-[1.75rem] font-semibold tracking-tight leading-[1.2]">
                Authority is expressed through documentation, not assertion.
              </h2>
            </div>
            <div className="md:col-span-8">
              <div className="border-t border-border">
                {philosophy.map((p) => (
                  <div key={p.n} className="grid grid-cols-12 gap-4 py-5 border-b border-border">
                    <div className="col-span-2 md:col-span-1">
                      <span className="meta">{p.n}</span>
                    </div>
                    <div className="col-span-4 md:col-span-3">
                      <h3 className="text-[14px] font-semibold text-foreground">{p.title}</h3>
                    </div>
                    <div className="col-span-12 md:col-span-8">
                      <p className="text-[14px] text-muted-foreground leading-relaxed">{p.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lifecycle */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-14 md:py-20">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§2 — Verification Lifecycle</p>
              <h2 className="text-2xl md:text-[1.75rem] font-semibold tracking-tight leading-[1.2]">
                A six-step procedural sequence, applied uniformly to every applicant.
              </h2>
              <Link
                to="/how-it-works"
                className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover"
              >
                Read full process <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="md:col-span-8">
              <ol className="border-t border-border bg-background">
                {lifecycle.map((s) => (
                  <li key={s.n} className="grid grid-cols-12 gap-4 px-5 py-5 border-b border-border">
                    <div className="col-span-2 md:col-span-1">
                      <span className="meta text-primary">{s.n}</span>
                    </div>
                    <div className="col-span-10 md:col-span-3">
                      <p className="text-[14px] font-semibold text-foreground">{s.t}</p>
                    </div>
                    <div className="col-span-12 md:col-span-8">
                      <p className="text-[14px] text-muted-foreground leading-relaxed">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Greenlist preview */}
      <section className="border-b border-border">
        <div className="container-wide py-14 md:py-20">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <p className="meta mb-3">§3 — Upstream Greenlist</p>
              <h2 className="text-2xl md:text-[1.75rem] font-semibold tracking-tight leading-[1.2]">
                Recognized upstream sources, published openly.
              </h2>
              <p className="mt-4 text-[14px] text-muted-foreground leading-relaxed">
                Every Source Standard verification is anchored to a public list of recognized
                upstream sources. The greenlist is published openly so that any consumer,
                vendor, or partner can review the standard against which a vendor was measured.
              </p>
              <Link
                to="/greenlist"
                className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover"
              >
                View the Greenlist <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="md:col-span-7">
              <div className="border border-border">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface-muted">
                  <p className="meta-label text-foreground">Greenlist Categories</p>
                  <p className="meta-label">v.2026.01 · Active</p>
                </div>
                <div className="grid grid-cols-12 px-4 py-2 bg-background border-b border-border">
                  <div className="col-span-2 meta-label">Ref</div>
                  <div className="col-span-4 meta-label">Category</div>
                  <div className="col-span-4 meta-label">Scope</div>
                  <div className="col-span-2 meta-label text-right">Status</div>
                </div>
                <ul className="divide-y divide-border">
                  {greenlist.map((g, i) => (
                    <li key={g.category} className="grid grid-cols-12 px-4 py-4 items-center">
                      <div className="col-span-2 meta">§{i + 1}</div>
                      <div className="col-span-4">
                        <p className="text-[13px] font-semibold text-foreground">{g.category}</p>
                      </div>
                      <div className="col-span-4">
                        <p className="text-[12px] text-muted-foreground leading-snug">{g.title}</p>
                      </div>
                      <div className="col-span-2 text-right meta text-primary">■ Active</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified vendors registry stub */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-14 md:py-20">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <p className="meta mb-3">§4 — Verified Vendors Registry</p>
              <h2 className="text-2xl md:text-[1.75rem] font-semibold tracking-tight leading-[1.2]">
                Public registry. First entries publish Q1 2026.
              </h2>
              <p className="mt-4 text-[14px] text-muted-foreground leading-relaxed">
                The directory is intentionally empty. Vendors are listed only after
                documentation has been fully reviewed and a public review identifier issued.
              </p>
            </div>
            <div className="md:col-span-7">
              <div className="border border-border bg-background">
                <div className="grid grid-cols-12 px-4 py-2 border-b border-border bg-surface-muted">
                  <div className="col-span-5 meta-label">Vendor</div>
                  <div className="col-span-3 meta-label">Jurisdiction</div>
                  <div className="col-span-2 meta-label">Review ID</div>
                  <div className="col-span-2 meta-label text-right">Status</div>
                </div>
                <div className="px-4 py-6 border-b border-border">
                  <p className="meta">— No published records. First entries: Q1 2026.</p>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <Link
                    to="/verified-vendors"
                    className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary"
                  >
                    View Directory →
                  </Link>
                  <Link
                    to="/apply"
                    className="text-[12px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover"
                  >
                    Apply to be listed →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA strip */}
      <section className="border-b border-border">
        <div className="container-wide py-10 md:py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="meta mb-1">§5 — For Vendors</p>
              <p className="text-[15px] text-foreground font-medium">
                If your records are in order, verification is straightforward.
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

export default Index;
