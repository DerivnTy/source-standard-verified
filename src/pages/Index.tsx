import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { greenlist } from "@/data/greenlist";
import { MetadataBar } from "@/components/MetadataBar";

const anchors = [
  {
    n: "01",
    title: "Medical Oversight",
    body: "Framework criteria are reviewed by licensed physicians and clinicians. Scope, evidence standards, and renewal intervals are set under medical advisory review.",
  },
  {
    n: "02",
    title: "Public Source Anchoring",
    body: "Every standard references a publicly citable upstream record — FDA, PCAB, NSF, USP, and state boards of pharmacy. No proprietary criteria.",
  },
  {
    n: "03",
    title: "Documentation Custody",
    body: "Verifications reference records vendors already maintain. No investigative claims. No proprietary scoring. No surveillance.",
  },
];

const philosophy = [
  {
    n: "01",
    title: "Documentation-first",
    body: "Verification is conducted against records vendors already maintain — licensing, supplier documentation, certificates of analysis.",
  },
  {
    n: "02",
    title: "Neutral by design",
    body: "Source Standard is not a clinic, pharmacy, laboratory, or enforcement agency. It organizes and validates existing proof.",
  },
  {
    n: "03",
    title: "Upstream-anchored",
    body: "Every verification maps to a public greenlist of recognized upstream sources — 503B facilities, 503A pharmacies, and credentialed standards.",
  },
];

const lifecycle = [
  { n: "01", t: "Application", d: "Vendor submits a documentation package through the Source Standard intake portal." },
  { n: "02", t: "Intake review", d: "Submitted records are organized, indexed, and checked for completeness." },
  { n: "03", t: "Greenlist mapping", d: "Each record is mapped against recognized upstream standards on the public greenlist." },
  { n: "04", t: "Verification decision", d: "A determination is recorded with documented rationale and a public review identifier." },
  { n: "05", t: "Public profile", d: "Verified vendors receive a public profile reflecting documentation reviewed." },
  { n: "06", t: "Renewal", d: "Verifications are time-bound. Vendors resubmit current documentation at scheduled intervals." },
];

const publicUse = [
  {
    label: "For consumers",
    body: "Look up a vendor. Read the criteria the vendor was verified against.",
    to: "/verified-vendors",
    cta: "View the registry",
  },
  {
    label: "For vendors",
    body: "Submission requirements, evidence categories, and review timeline.",
    to: "/for-vendors",
    cta: "Vendor reference",
  },
  {
    label: "For clinicians & partners",
    body: "Framework documentation, governance, and citation guidelines.",
    to: "/governance",
    cta: "Governance & oversight",
  },
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
              <p className="eyebrow mb-5">Public Reference · Verification Framework</p>
              <h1 className="text-[2rem] md:text-[2.5rem] lg:text-[2.75rem] font-semibold tracking-tight leading-[1.1] text-foreground">
                Source Standard. The public reference for vendor documentation in peptide, TRT, and hormone optimization.
              </h1>
              <p className="mt-6 max-w-2xl text-[15px] text-muted-foreground leading-relaxed">
                The registry records vendors whose documentation has been reviewed under SS-FRAMEWORK-2026.01.
                Framework criteria are maintained under medical advisory review and anchored to public FDA, PCAB, NSF, USP,
                and state pharmacy board records.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button
                  asChild
                  className="bg-primary hover:bg-primary-hover text-primary-foreground h-11 px-6 text-[13px] font-semibold uppercase tracking-[0.12em] rounded-none"
                >
                  <Link to="/verified-vendors">View the Registry</Link>
                </Button>
                <Link
                  to="/how-it-works"
                  className="text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground border-b-2 border-foreground pb-1 hover:text-primary hover:border-primary transition-colors"
                >
                  Verification Process
                </Link>
              </div>
              <p className="mt-8 meta-label">
                Maintained in Tampa, FL · Anchored to public FDA, PCAB, NSF, and USP records
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

      {/* §1 Authority Anchors */}
      <section className="border-b border-border">
        <div className="container-wide py-14 md:py-20">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§1 — Authority Anchors</p>
              <h2 className="text-2xl md:text-[1.75rem] font-semibold tracking-tight leading-[1.2]">
                Where the framework derives its weight.
              </h2>
              <Link
                to="/governance"
                className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover"
              >
                Governance & oversight <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="md:col-span-8">
              <div className="border-t border-border">
                {anchors.map((a) => (
                  <div key={a.n} className="grid grid-cols-12 gap-4 py-5 border-b border-border">
                    <div className="col-span-2 md:col-span-1">
                      <span className="meta text-primary">{a.n}</span>
                    </div>
                    <div className="col-span-4 md:col-span-3">
                      <h3 className="text-[14px] font-semibold text-foreground">{a.title}</h3>
                    </div>
                    <div className="col-span-12 md:col-span-8">
                      <p className="text-[14px] text-muted-foreground leading-relaxed">{a.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §2 Framework principles */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-14 md:py-20">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§2 — Framework Principles</p>
              <h2 className="text-2xl md:text-[1.75rem] font-semibold tracking-tight leading-[1.2]">
                Framework principles.
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

      {/* §3 Lifecycle */}
      <section className="border-b border-border">
        <div className="container-wide py-14 md:py-20">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§3 — Verification Lifecycle</p>
              <h2 className="text-2xl md:text-[1.75rem] font-semibold tracking-tight leading-[1.2]">
                Six procedural steps, applied uniformly.
              </h2>
              <Link
                to="/how-it-works"
                className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover"
              >
                Procedural reference <ArrowRight className="h-3.5 w-3.5" />
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

      {/* §4 Greenlist preview */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-14 md:py-20">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <p className="meta mb-3">§4 — Upstream Greenlist</p>
              <h2 className="text-2xl md:text-[1.75rem] font-semibold tracking-tight leading-[1.2]">
                Recognized upstream sources, published openly.
              </h2>
              <p className="mt-4 text-[14px] text-muted-foreground leading-relaxed">
                Each verification anchors to the public greenlist. The list documents the standard against which a
                vendor's records were measured.
              </p>
              <Link
                to="/greenlist"
                className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover"
              >
                View the Greenlist <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="md:col-span-7">
              <div className="border border-border bg-background">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface-muted">
                  <p className="meta-label text-foreground">Greenlist Categories</p>
                  <p className="meta-label">Status: Active · v.2026.01</p>
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

      {/* §5 Verified vendors registry stub */}
      <section className="border-b border-border">
        <div className="container-wide py-14 md:py-20">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <p className="meta mb-3">§5 — Verified Vendors Registry</p>
              <h2 className="text-2xl md:text-[1.75rem] font-semibold tracking-tight leading-[1.2]">
                Public registry. First entries publish Q1 2026.
              </h2>
              <p className="mt-4 text-[14px] text-muted-foreground leading-relaxed">
                The directory is intentionally empty. Vendors are listed only after documentation has been reviewed and a
                public review identifier issued.
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
                    to="/how-it-works"
                    className="text-[12px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover"
                  >
                    Verification process →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §6 Public Use */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-14 md:py-20">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§6 — Public Use</p>
              <h2 className="text-2xl md:text-[1.75rem] font-semibold tracking-tight leading-[1.2]">
                How the registry is used.
              </h2>
            </div>
            <div className="md:col-span-8">
              <div className="border-t border-border">
                {publicUse.map((u, i) => (
                  <div key={u.label} className="grid grid-cols-12 gap-4 py-5 border-b border-border items-baseline">
                    <div className="col-span-2 md:col-span-1">
                      <span className="meta">0{i + 1}</span>
                    </div>
                    <div className="col-span-4 md:col-span-3">
                      <h3 className="text-[14px] font-semibold text-foreground">{u.label}</h3>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <p className="text-[14px] text-muted-foreground leading-relaxed">{u.body}</p>
                    </div>
                    <div className="col-span-12 md:col-span-2 md:text-right">
                      <Link
                        to={u.to}
                        className="text-[12px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover"
                      >
                        {u.cta} →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
