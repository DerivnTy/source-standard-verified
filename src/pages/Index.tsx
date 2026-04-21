import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { greenlist } from "@/data/greenlist";
import { MetadataBar } from "@/components/MetadataBar";

const pillars = [
  {
    n: "01",
    title: "Medical Oversight",
    body: "Framework criteria are set and reviewed by the Medical Advisory Board. Clinical scope, evidence standards, and renewal intervals are maintained under physician review.",
    to: "/medical-advisory",
    cta: "Medical Advisory Board",
  },
  {
    n: "02",
    title: "Public Standards",
    body: "Every standard references a publicly citable upstream record — FDA, PCAB, NSF, USP, and state boards of pharmacy. Governance and conflict-of-interest policy are published.",
    to: "/governance",
    cta: "Governance & oversight",
  },
  {
    n: "03",
    title: "Independent Testing",
    body: "Verifications are supported by independent laboratory testing and documented enforcement procedures. Spot testing and review flags are part of the public accountability layer.",
    to: "/accountability#testing",
    cta: "Accountability & enforcement",
  },
];

const dualLayer = [
  {
    n: "A",
    t: "Greenlist",
    sub: "Recognized upstream sources",
    d: "The greenlist documents the upstream sources Source Standard recognizes — 503B outsourcing facilities, 503A pharmacies, and credentialed standards. Inclusion is based on public licensing, registration, and documentation criteria.",
    to: "/greenlist",
    cta: "View the Greenlist",
  },
  {
    n: "B",
    t: "Verified Vendors",
    sub: "Sourcing verified against the greenlist",
    d: "Vendors are verified against the greenlist. A verification reflects the documentation reviewed at the time of assessment, the categories evaluated, and the public review identifier issued.",
    to: "/verified-vendors",
    cta: "View the registry",
  },
];

const eduPreview = [
  { ref: "REF-101", c: "503B Facilities", t: "What 503B registration actually verifies — and what it does not." },
  { ref: "REF-201", c: "Certificates of Analysis", t: "A structured guide to reading a peptide CoA without a chemistry background." },
  { ref: "REF-601", c: "Due Diligence", t: "Five questions every consumer should ask a vendor before purchase." },
  { ref: "REF-801", c: "Risk", t: "Unverified sources: documented risks and consumer-side warning signs." },
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

      {/* §0 Hero */}
      <section className="border-b border-border">
        <div className="container-wide py-14 md:py-20">
          <div className="grid md:grid-cols-12 gap-10 lg:gap-14">
            <div className="md:col-span-7">
              <p className="eyebrow mb-5">Public Reference · Verification Framework</p>
              <h1 className="text-[2rem] md:text-[2.5rem] lg:text-[2.75rem] font-semibold tracking-tight leading-[1.1] text-foreground">
                Source Standard. The public reference for vendor verification in peptide, TRT, and hormone optimization.
              </h1>
              <p className="mt-6 max-w-2xl text-[15px] text-muted-foreground leading-relaxed">
                Look up a vendor. Read what they were verified against. The registry is maintained
                under medical advisory review and anchored to public FDA, PCAB, NSF, USP, and state
                pharmacy board records.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button
                  asChild
                  className="bg-primary hover:bg-primary-hover text-primary-foreground h-11 px-6 text-[13px] font-semibold uppercase tracking-[0.12em] rounded-none"
                >
                  <Link to="/verified-vendors">Look Up a Vendor</Link>
                </Button>
                <Link
                  to="/greenlist"
                  className="text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground border-b-2 border-foreground pb-1 hover:text-primary hover:border-primary transition-colors"
                >
                  View the Greenlist
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

      {/* §1 Authority Pillars */}
      <section className="border-b border-border">
        <div className="container-wide py-14 md:py-20">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§1 — Authority Pillars</p>
              <h2 className="text-2xl md:text-[1.75rem] font-semibold tracking-tight leading-[1.2]">
                Where the standard derives its weight.
              </h2>
              <p className="mt-4 text-[14px] text-muted-foreground leading-relaxed max-w-md">
                Three independent layers support every verification on the public registry.
              </p>
            </div>
            <div className="md:col-span-8">
              <div className="border-t border-border">
                {pillars.map((a) => (
                  <div key={a.n} className="grid grid-cols-12 gap-4 py-5 border-b border-border">
                    <div className="col-span-2 md:col-span-1">
                      <span className="meta text-primary">{a.n}</span>
                    </div>
                    <div className="col-span-10 md:col-span-3">
                      <h3 className="text-[14px] font-semibold text-foreground">{a.title}</h3>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <p className="text-[14px] text-muted-foreground leading-relaxed">{a.body}</p>
                    </div>
                    <div className="col-span-12 md:col-span-2 md:text-right">
                      <Link
                        to={a.to}
                        className="text-[12px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover"
                      >
                        {a.cta} →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §2 Consumer Entry Point */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-8 md:py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="max-w-2xl">
              <p className="meta mb-2">§2 — Check a Vendor</p>
              <p className="text-[15px] text-foreground leading-relaxed">
                If a vendor told you they are verified by Source Standard, the public registry is where you confirm it.
                Every verified listing carries a citable review identifier.
              </p>
            </div>
            <Link
              to="/verified-vendors"
              className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover whitespace-nowrap"
            >
              Look up a vendor <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* §3 Dual-Layer Model */}
      <section className="border-b border-border">
        <div className="container-wide py-14 md:py-20">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§3 — The Dual-Layer Model</p>
              <h2 className="text-2xl md:text-[1.75rem] font-semibold tracking-tight leading-[1.2]">
                Upstream sources first. Vendors verified against them.
              </h2>
              <Link
                to="/how-it-works"
                className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover"
              >
                How it works <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="md:col-span-8">
              <div className="border-t border-border">
                {dualLayer.map((l) => (
                  <div key={l.n} className="grid grid-cols-12 gap-4 py-6 border-b border-border">
                    <div className="col-span-2 md:col-span-1">
                      <span className="meta text-primary">Layer {l.n}</span>
                    </div>
                    <div className="col-span-10 md:col-span-3">
                      <h3 className="text-[14px] font-semibold text-foreground">{l.t}</h3>
                      <p className="meta-label mt-1">{l.sub}</p>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <p className="text-[14px] text-muted-foreground leading-relaxed">{l.d}</p>
                    </div>
                    <div className="col-span-12 md:col-span-2 md:text-right">
                      <Link
                        to={l.to}
                        className="text-[12px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover"
                      >
                        {l.cta} →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
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
                    to="/status-definitions"
                    className="text-[12px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover"
                  >
                    Status definitions →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §6 Education preview */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-14 md:py-20">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <p className="meta mb-3">§6 — Public Reference Library</p>
              <h2 className="text-2xl md:text-[1.75rem] font-semibold tracking-tight leading-[1.2]">
                Neutral, physician-reviewed reference material.
              </h2>
              <p className="mt-4 text-[14px] text-muted-foreground leading-relaxed">
                Reference notes on peptide therapy, TRT, sourcing, storage, and the documented risks of unverified
                supply. Material is informational only and is not medical advice.
              </p>
              <Link
                to="/education"
                className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover"
              >
                Open the library <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="md:col-span-7">
              <div className="border border-border bg-background">
                <div className="grid grid-cols-12 px-4 py-2 border-b border-border bg-surface-muted">
                  <div className="col-span-2 meta-label">Ref</div>
                  <div className="col-span-3 meta-label">Category</div>
                  <div className="col-span-6 meta-label">Title</div>
                  <div className="col-span-1 meta-label text-right">Status</div>
                </div>
                <ul className="divide-y divide-border">
                  {eduPreview.map((e) => (
                    <li key={e.ref} className="grid grid-cols-12 px-4 py-4 items-baseline">
                      <div className="col-span-2 meta">{e.ref}</div>
                      <div className="col-span-3 meta-label text-foreground">{e.c}</div>
                      <div className="col-span-6">
                        <p className="text-[13px] font-semibold text-foreground leading-snug">{e.t}</p>
                      </div>
                      <div className="col-span-1 text-right meta">—</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §7 Public Use */}
      <section className="border-b border-border">
        <div className="container-wide py-14 md:py-20">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§7 — Public Use</p>
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
