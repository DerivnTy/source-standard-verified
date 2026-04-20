import { Link } from "react-router-dom";
import { ArrowRight, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { greenlist } from "@/data/greenlist";

const philosophy = [
  {
    title: "Documentation-first",
    body: "We verify against records vendors already maintain — licensing, supplier documentation, certificates of analysis. We do not investigate. We organize and validate.",
  },
  {
    title: "Neutral by design",
    body: "We are not a clinic, pharmacy, lab, or enforcement agency. We are a standards organization. Our role is to make existing proof visible and comparable.",
  },
  {
    title: "Upstream-anchored",
    body: "Verification is anchored to a public greenlist of recognized upstream sources — 503B facilities, 503A pharmacies, and credentialed standards.",
  },
];

const lifecycle = [
  { n: "01", t: "Application", d: "A vendor submits a documentation package through the Source Standard intake portal." },
  { n: "02", t: "Intake review", d: "Submitted records are organized, indexed, and checked for completeness." },
  { n: "03", t: "Greenlist mapping", d: "Each record is mapped against recognized upstream standards on the public greenlist." },
  { n: "04", t: "Verification decision", d: "A determination is recorded, with documented rationale and a public review identifier." },
  { n: "05", t: "Public profile", d: "Verified vendors receive a public profile and badge reflecting documentation reviewed." },
  { n: "06", t: "Renewal", d: "Verifications are time-bound. Vendors resubmit current documentation at scheduled intervals." },
];

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="container-wide pt-24 pb-24 md:pt-32 md:pb-32 text-center">
          <p className="eyebrow mb-7">Source Standard</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.02] text-foreground max-w-5xl mx-auto">
            The verification standard for vendors who can already prove it.
          </h1>
          <p className="mt-8 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
            We are not building a surveillance system. We are building the proof of legitimacy that good operators
            already deserve but have never had a way to show.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground h-11 px-6 text-sm font-medium">
              <Link to="/greenlist">Browse the Greenlist</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-11 px-6 text-sm font-medium border-border-strong">
              <Link to="/apply">Apply for Verification</Link>
            </Button>
          </div>
          <p className="mt-8 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Florida Launch 2026 &nbsp;·&nbsp; Documentation-First Model
          </p>
        </div>
      </section>

      {/* Operating philosophy */}
      <section className="border-b border-border">
        <div className="container-wide py-20 md:py-28">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <p className="eyebrow mb-5">01 — Operating Philosophy</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15]">
                Good operators already have the proof. We make it visible.
              </h2>
            </div>
            <div className="md:col-span-8 grid sm:grid-cols-1 divide-y divide-border border-t border-border">
              {philosophy.map((p) => (
                <div key={p.title} className="py-7 first:pt-7">
                  <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed max-w-2xl">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How the model works */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-20 md:py-28">
          <div className="max-w-3xl mb-14">
            <p className="eyebrow mb-5">02 — How the Model Works</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15]">
              A six-step lifecycle, from application to public record.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {lifecycle.map((s) => (
              <div key={s.n} className="bg-background p-7">
                <p className="text-[11px] font-mono text-primary tabular-nums">{s.n}</p>
                <h3 className="mt-3 text-base font-semibold text-foreground">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/how-it-works" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover">
              Read the full process <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Greenlist preview */}
      <section className="border-b border-border">
        <div className="container-wide py-20 md:py-28">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <p className="eyebrow mb-5">03 — The Upstream Greenlist</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15]">
                The foundation of every verification.
              </h2>
              <p className="mt-5 text-[15px] text-muted-foreground leading-relaxed">
                Every Source Standard verification is anchored to a public list of recognized upstream sources. The
                greenlist is published openly so that any consumer, vendor, or partner can review the standard against
                which a vendor was measured.
              </p>
              <div className="mt-8">
                <Button asChild variant="outline" className="border-border-strong">
                  <Link to="/greenlist">View the Greenlist</Link>
                </Button>
              </div>
            </div>
            <div className="md:col-span-7">
              <div className="border border-border">
                <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-surface-muted">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground">Greenlist Categories</p>
                  <p className="text-[11px] font-mono text-muted-foreground">v.2026.01</p>
                </div>
                <ul className="divide-y divide-border">
                  {greenlist.map((g) => (
                    <li key={g.category} className="px-5 py-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{g.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{g.criteria[0]}</p>
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary border border-primary/30 bg-verified-soft px-2 py-1">
                        {g.category}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified vendors preview */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-20 md:py-28">
          <div className="max-w-3xl mb-12">
            <p className="eyebrow mb-5">04 — Verified Vendors</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15]">
              The public registry opens with the Tampa launch.
            </h2>
            <p className="mt-5 text-[15px] text-muted-foreground leading-relaxed">
              The first verified clinics will be listed in early 2026. Until then, the directory is intentionally
              empty — verifications are only published once documentation has been fully reviewed.
            </p>
          </div>
          <div className="border border-border bg-background p-10 md:p-14 text-center">
            <Database className="mx-auto h-8 w-8 text-muted-foreground" strokeWidth={1.5} />
            <p className="mt-5 text-sm font-semibold text-foreground">Registry not yet live</p>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
              The verified vendors directory will publish its first entries in Q1 2026.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="outline" className="border-border-strong">
                <Link to="/verified-vendors">View Directory</Link>
              </Button>
              <Button asChild className="bg-primary hover:bg-primary-hover text-primary-foreground">
                <Link to="/apply">Become one of the first listed</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div className="container-wide py-20 md:py-28">
          <div className="grid md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-8">
              <p className="eyebrow mb-5">05 — For Vendors</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15] max-w-2xl">
                If your records are in order, verification is straightforward.
              </h2>
              <p className="mt-5 text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
                Submit the documentation you already maintain. Source Standard organizes, validates, and publishes a
                public profile reflecting what was reviewed.
              </p>
            </div>
            <div className="md:col-span-4 flex md:justify-end">
              <Button asChild size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground h-11 px-6">
                <Link to="/apply">Apply for Verification</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
