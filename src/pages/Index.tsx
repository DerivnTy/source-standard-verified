import { Link } from "react-router-dom";
import { ArrowRight, FileCheck2, Search, ShieldCheck, FileText, Building2, Stamp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { vendors } from "@/data/vendors";

const Index = () => {
  const featured = vendors.filter((v) => v.status === "verified").slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-registry-grid opacity-[0.35] pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background pointer-events-none" aria-hidden="true" />
        <div className="container-tight relative py-20 md:py-32">
          <div className="inline-flex items-center gap-2 border border-border bg-surface px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-verified" />
            Vendor Verification Standard
          </div>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.02] text-foreground max-w-4xl">
            The neutral verification standard for peptide, TRT, and hormone vendors.
          </h1>
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            Good operators already have the proof. Source Standard makes that proof visible —
            through documented sourcing, licensing, and supplier records reviewed against recognized upstream standards.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-sm h-12 px-6 text-sm">
              <Link to="/directory">
                Check a Vendor <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-sm h-12 px-6 text-sm border-border-strong">
              <Link to="/apply">Apply for Verification</Link>
            </Button>
          </div>

          {/* Trust strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
            {[
              { k: "Documentation-first", v: "Verification model" },
              { k: "Neutral", v: "Independent third-party" },
              { k: "Public Registry", v: "Consumer-accessible" },
              { k: "National Scope", v: "Multi-state coverage" },
            ].map((t) => (
              <div key={t.k} className="bg-background p-5">
                <p className="font-serif text-base text-foreground">{t.k}</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{t.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="border-b border-border">
        <div className="container-tight py-20 md:py-28">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-5">The Problem</p>
              <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight leading-tight text-foreground">
                The market makes claims. Consumers have no way to verify them.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>
                Across peptides, TRT, hormone optimization, and wellness, vendors routinely make claims about sourcing,
                licensing, and quality. Some are legitimate. Many are not. Until now, no neutral standard has existed
                to tell them apart.
              </p>
              <p>
                Consumers are left to guess. Legitimate operators get pulled into the same category as bad actors.
                Trust collapses for everyone.
              </p>
              <p className="text-foreground font-medium">
                Source Standard exists to fix that — by creating a verifiable, documentation-based trust layer
                the entire market can reference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE VERIFY */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-tight py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5">What We Verify</p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight leading-tight">
              Three categories of documented evidence.
            </h2>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-px bg-border border border-border">
            {[
              {
                icon: Building2,
                title: "Business & Licensing",
                body: "Active business registration, applicable state and federal licensing, and operating credentials reviewed against authoritative records.",
              },
              {
                icon: FileText,
                title: "Upstream Sourcing",
                body: "Documented supplier chains and procurement records reviewed against recognized upstream standards and industry references.",
              },
              {
                icon: Stamp,
                title: "Quality Documentation",
                body: "Certificates of analysis, lot records, and quality documentation organized and validated as part of the verification record.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-background p-8 md:p-10">
                <item.icon className="h-6 w-6 text-foreground" strokeWidth={1.5} />
                <h3 className="mt-6 font-serif text-xl font-medium tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — simplified */}
      <section className="border-b border-border">
        <div className="container-tight py-20 md:py-28">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-5">How Verification Works</p>
              <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight leading-tight">
                A documentation-first review process.
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Vendors submit records they already maintain. We organize, validate, and publish a structured verification profile — or document what's missing.
              </p>
              <Button asChild variant="link" className="mt-6 px-0 text-foreground">
                <Link to="/how-it-works">
                  Read the full process <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <ol className="lg:col-span-7 divide-y divide-border border-y border-border">
              {[
                { n: "01", t: "Application", d: "Vendor submits an application and discloses operating scope." },
                { n: "02", t: "Documentation Submission", d: "Licensing, supplier records, and quality documentation are uploaded to a structured intake." },
                { n: "03", t: "Validation", d: "Records are reviewed against approved upstream sources and authoritative references." },
                { n: "04", t: "Public Profile", d: "A verified vendor profile and badge are published to the public directory." },
              ].map((s) => (
                <li key={s.n} className="grid grid-cols-[auto_1fr] gap-6 py-6">
                  <span className="font-mono text-sm text-muted-foreground tabular-nums pt-0.5">{s.n}</span>
                  <div>
                    <p className="font-serif text-lg font-medium">{s.t}</p>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* DIRECTORY PREVIEW */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-tight py-20 md:py-28">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div className="max-w-xl">
              <p className="eyebrow mb-5">Public Vendor Directory</p>
              <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight leading-tight">
                Search and confirm verified vendors.
              </h2>
            </div>
            <Button asChild variant="outline" className="rounded-sm border-border-strong">
              <Link to="/directory">
                Open directory <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
            {featured.map((v) => (
              <Link
                key={v.slug}
                to={`/directory/${v.slug}`}
                className="group bg-background p-8 hover:bg-surface-muted transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <ShieldCheck className="h-5 w-5 text-verified" strokeWidth={1.75} />
                  <StatusBadge status={v.status} />
                </div>
                <h3 className="font-serif text-xl font-medium tracking-tight group-hover:underline underline-offset-4">
                  {v.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.category} · {v.location}</p>
                {v.reviewId && (
                  <p className="mt-6 pt-6 border-t border-border text-xs font-mono text-muted-foreground">
                    Review ID: {v.reviewId}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCES */}
      <section className="border-b border-border">
        <div className="container-tight py-20 md:py-28 grid md:grid-cols-2 gap-px bg-border border border-border">
          <div className="bg-background p-10 md:p-12">
            <Search className="h-6 w-6 text-foreground" strokeWidth={1.5} />
            <h3 className="mt-6 font-serif text-2xl font-medium tracking-tight">For Consumers</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Check whether a vendor has submitted documentation and passed verification before you trust their claims.
            </p>
            <Button asChild variant="link" className="mt-5 px-0 text-foreground">
              <Link to="/directory">
                Search the directory <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="bg-background p-10 md:p-12">
            <FileCheck2 className="h-6 w-6 text-foreground" strokeWidth={1.5} />
            <h3 className="mt-6 font-serif text-2xl font-medium tracking-tight">For Vendors</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Demonstrate the legitimacy you already have. Apply for verification and let your documentation speak for itself.
            </p>
            <Button asChild variant="link" className="mt-5 px-0 text-foreground">
              <Link to="/apply">
                Begin application <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CLOSING STATEMENT */}
      <section>
        <div className="container-narrow py-24 md:py-32 text-center">
          <p className="eyebrow mb-6">The Source Standard Position</p>
          <p className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight leading-snug text-foreground">
            "Good operators already have the proof. Source Standard makes that proof visible."
          </p>
        </div>
      </section>
    </>
  );
};

export default Index;
