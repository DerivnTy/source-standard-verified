import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { greenlist } from "@/data/greenlist";
import { MetadataBar } from "@/components/MetadataBar";

const pillars = [
  {
    n: "01",
    title: "Medical oversight",
    body: "Framework criteria are set and reviewed by the Medical Advisory Board. Clinical scope, evidence standards, and renewal intervals are maintained under physician review.",
    to: "/medical-advisory",
    cta: "Medical Advisory Board",
  },
  {
    n: "02",
    title: "Public standards",
    body: "Every standard references a publicly citable upstream record — FDA, PCAB, NSF, USP, and state boards of pharmacy. Governance and conflict-of-interest policy are published.",
    to: "/governance",
    cta: "Governance & oversight",
  },
  {
    n: "03",
    title: "Independent testing",
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
    cta: "View the greenlist",
  },
  {
    n: "B",
    t: "Verified vendors",
    sub: "Sourcing verified against the greenlist",
    d: "Vendors are verified against the greenlist. A verification reflects the documentation reviewed at the time of assessment, the categories evaluated, and the public review identifier issued.",
    to: "/verified-vendors",
    cta: "View the registry",
  },
];

const eduPreview = [
  { ref: "REF-101", c: "503B facilities", t: "What 503B registration actually verifies — and what it does not." },
  { ref: "REF-201", c: "Certificates of analysis", t: "A structured guide to reading a peptide CoA without a chemistry background." },
  { ref: "REF-601", c: "Due diligence", t: "Five questions every consumer should ask a vendor before purchase." },
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
          { label: "Doc", value: <span className="font-mono text-[12px]">SS-FRAMEWORK-2026.01</span> },
          { label: "Status", value: "Active" },
          { label: "Updated", value: "April 20, 2026" },
          { label: "Jurisdiction", value: "FL · US" },
        ]}
      />

      {/* §0 Hero */}
      <section className="border-b border-border">
        <div className="container-wide py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-10 lg:gap-16">
            <div className="md:col-span-7">
              <p className="eyebrow mb-5">Public verification reference</p>
              <h1 className="text-[2rem] md:text-[2.5rem] font-semibold tracking-[-0.015em] leading-[1.1] text-foreground">
                The public reference for verifying vendors in peptide, TRT, and hormone optimization.
              </h1>
              <p className="mt-6 max-w-xl text-[17px] text-muted-foreground leading-[1.6]">
                Look up a vendor. Read what they were verified against. Maintained under medical advisory review and anchored to public FDA, PCAB, NSF, and USP records.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="h-11">
                  <Link to="/verified-vendors">Look up a vendor</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-11">
                  <Link to="/how-it-works">How verification works</Link>
                </Button>
              </div>
              <p className="mt-9 text-[13px] text-muted-foreground">
                Maintained in Tampa, FL · Anchored to public FDA, PCAB, NSF, and USP records
              </p>
            </div>

            <div className="md:col-span-5">
              <div className="border border-border/70 rounded-[2px] bg-surface-muted/50">
                <div className="flex items-center justify-between px-5 py-3 border-b border-border/70 bg-background">
                  <p className="text-[13px] font-semibold text-foreground">Framework snapshot</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.04em] text-muted-foreground">v.2026.01</p>
                </div>
                <dl className="divide-y divide-border/70">
                  {[
                    { l: "Greenlist categories", v: "03" },
                    { l: "Verified vendors", v: "00" },
                    { l: "Pending review", v: "00" },
                    { l: "Jurisdiction", v: "FL / US" },
                    { l: "Launch", v: "Q1 2026" },
                    { l: "Verification model", v: "Documentation-first" },
                  ].map((r) => (
                    <div key={r.l} className="flex items-baseline justify-between px-5 py-3.5">
                      <dt className="text-[13.5px] text-muted-foreground">{r.l}</dt>
                      <dd className="text-[13px] font-medium text-foreground tabular-nums">{r.v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="px-5 py-3 border-t border-border/70 bg-background">
                  <p className="text-[12.5px] text-muted-foreground">Sources: FDA · PCAB · NSF · USP</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §1 Authority Pillars */}
      <section className="border-b border-border">
        <div className="container-wide py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <p className="eyebrow mb-4">§1 — Authority</p>
              <h2 className="text-[1.5rem] md:text-[1.75rem] font-semibold tracking-[-0.01em] leading-[1.2]">
                How Source Standard is anchored.
              </h2>
              <p className="mt-4 text-[15.5px] text-muted-foreground leading-relaxed max-w-md">
                Three independent layers support every verification on the public registry.
              </p>
            </div>
            <div className="md:col-span-8">
              <div className="grid sm:grid-cols-3 gap-6">
                {pillars.map((a) => (
                  <div key={a.n} className="border border-border/70 rounded-[2px] bg-background p-7 flex flex-col">
                    <p className="font-mono text-[11px] uppercase tracking-[0.04em] text-primary mb-4">{a.n}</p>
                    <h3 className="text-[18px] font-semibold text-foreground mb-3">{a.title}</h3>
                    <p className="text-[14.5px] text-muted-foreground leading-relaxed mb-5 flex-1">{a.body}</p>
                    <Link
                      to={a.to}
                      className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-primary hover:text-primary-hover"
                    >
                      Read more <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §2 Consumer Entry Point */}
      <section className="border-b border-border bg-surface-muted/60">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <p className="eyebrow mb-3">Check a vendor</p>
              <h2 className="text-[1.375rem] md:text-[1.5rem] font-semibold tracking-[-0.01em] leading-[1.25] text-foreground">
                Did a vendor tell you they're verified by Source Standard?
              </h2>
              <p className="mt-3 text-[16px] text-muted-foreground leading-relaxed max-w-2xl">
                The public registry is where you confirm it. Every verified listing carries a citable review identifier, the categories reviewed, and the date of assessment.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Button asChild size="lg" className="h-11">
                <Link to="/verified-vendors">Look up a vendor</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* §3 Dual-Layer Model */}
      <section className="border-b border-border">
        <div className="container-wide py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <p className="eyebrow mb-4">§3 — The model</p>
              <h2 className="text-[1.5rem] md:text-[1.75rem] font-semibold tracking-[-0.01em] leading-[1.2]">
                Upstream sources first. Vendors verified against them.
              </h2>
              <Link
                to="/how-it-works"
                className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-primary hover:text-primary-hover"
              >
                How it works <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="md:col-span-8 space-y-5">
              {dualLayer.map((l) => (
                <div key={l.n} className="border border-border/70 rounded-[2px] bg-background p-7">
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-primary">Layer {l.n}</span>
                    <h3 className="text-[18px] font-semibold text-foreground">{l.t}</h3>
                  </div>
                  <p className="text-[13px] text-muted-foreground mb-3">{l.sub}</p>
                  <p className="text-[15px] text-muted-foreground leading-relaxed mb-5">{l.d}</p>
                  <Link
                    to={l.to}
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-primary hover:text-primary-hover"
                  >
                    {l.cta} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* §4 Greenlist preview */}
      <section className="border-b border-border bg-surface-muted/60">
        <div className="container-wide py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <p className="eyebrow mb-4">§4 — Greenlist</p>
              <h2 className="text-[1.5rem] md:text-[1.75rem] font-semibold tracking-[-0.01em] leading-[1.2]">
                Recognized upstream sources, published openly.
              </h2>
              <p className="mt-4 text-[15.5px] text-muted-foreground leading-relaxed">
                Each verification anchors to the public greenlist. The list documents the standard against which a vendor's records were measured.
              </p>
              <Link
                to="/greenlist"
                className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-primary hover:text-primary-hover"
              >
                View the greenlist <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="md:col-span-7">
              <div className="border border-border/70 rounded-[2px] bg-background">
                <div className="flex items-center justify-between px-5 py-3 border-b border-border/70 bg-surface-muted/60">
                  <p className="text-[13px] font-semibold text-foreground">Greenlist categories</p>
                  <p className="text-[12.5px] text-muted-foreground">Active · v.2026.01</p>
                </div>
                <ul className="divide-y divide-border/70">
                  {greenlist.map((g, i) => (
                    <li key={g.category} className="grid grid-cols-12 px-5 py-4 items-center gap-3">
                      <div className="col-span-1 font-mono text-[11px] text-muted-foreground">§{i + 1}</div>
                      <div className="col-span-5">
                        <p className="text-[14.5px] font-semibold text-foreground">{g.category}</p>
                      </div>
                      <div className="col-span-4">
                        <p className="text-[13.5px] text-muted-foreground leading-snug">{g.title}</p>
                      </div>
                      <div className="col-span-2 text-right text-[12.5px] text-primary font-medium">● Active</div>
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
        <div className="container-wide py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <p className="eyebrow mb-4">§5 — Registry</p>
              <h2 className="text-[1.5rem] md:text-[1.75rem] font-semibold tracking-[-0.01em] leading-[1.2]">
                Public registry. First entries publish Q1 2026.
              </h2>
              <p className="mt-4 text-[15.5px] text-muted-foreground leading-relaxed">
                The directory is intentionally empty. Vendors are listed only after documentation has been reviewed and a public review identifier issued.
              </p>
            </div>
            <div className="md:col-span-7">
              <div className="border border-border/70 rounded-[2px] bg-background">
                <div className="grid grid-cols-12 px-5 py-3 border-b border-border/70 bg-surface-muted/60 text-[12.5px] font-medium text-muted-foreground">
                  <div className="col-span-5">Vendor</div>
                  <div className="col-span-3">Jurisdiction</div>
                  <div className="col-span-2">Review ID</div>
                  <div className="col-span-2 text-right">Status</div>
                </div>
                <div className="px-5 py-8 border-b border-border/70">
                  <p className="text-[14px] text-muted-foreground">— No published records. First entries: Q1 2026.</p>
                </div>
                <div className="flex items-center justify-between px-5 py-4">
                  <Link
                    to="/verified-vendors"
                    className="text-[13.5px] font-medium text-foreground hover:text-primary"
                  >
                    View directory →
                  </Link>
                  <Link
                    to="/status-definitions"
                    className="text-[13.5px] font-medium text-primary hover:text-primary-hover"
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
      <section className="border-b border-border bg-surface-muted/60">
        <div className="container-wide py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <p className="eyebrow mb-4">§6 — Education</p>
              <h2 className="text-[1.5rem] md:text-[1.75rem] font-semibold tracking-[-0.01em] leading-[1.2]">
                Neutral, physician-reviewed reference material.
              </h2>
              <p className="mt-4 text-[15.5px] text-muted-foreground leading-relaxed">
                Reference notes on peptide therapy, TRT, sourcing, storage, and the documented risks of unverified supply. Material is informational only and is not medical advice.
              </p>
              <Link
                to="/education"
                className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-primary hover:text-primary-hover"
              >
                Open the library <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="md:col-span-7">
              <div className="border border-border/70 rounded-[2px] bg-background">
                <ul className="divide-y divide-border/70">
                  {eduPreview.map((e) => (
                    <li key={e.ref} className="grid grid-cols-12 px-5 py-4 items-baseline gap-3">
                      <div className="col-span-3 font-mono text-[11px] text-muted-foreground">{e.ref}</div>
                      <div className="col-span-3 text-[13px] text-muted-foreground">{e.c}</div>
                      <div className="col-span-6">
                        <p className="text-[14.5px] font-medium text-foreground leading-snug">{e.t}</p>
                      </div>
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
        <div className="container-wide py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <p className="eyebrow mb-4">§7 — Public use</p>
              <h2 className="text-[1.5rem] md:text-[1.75rem] font-semibold tracking-[-0.01em] leading-[1.2]">
                How the registry is used.
              </h2>
            </div>
            <div className="md:col-span-8 grid sm:grid-cols-3 gap-6">
              {publicUse.map((u) => (
                <div key={u.label} className="border border-border/70 rounded-[2px] bg-background p-7 flex flex-col">
                  <h3 className="text-[16px] font-semibold text-foreground mb-3">{u.label}</h3>
                  <p className="text-[14.5px] text-muted-foreground leading-relaxed mb-5 flex-1">{u.body}</p>
                  <Link
                    to={u.to}
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-primary hover:text-primary-hover"
                  >
                    {u.cta} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
