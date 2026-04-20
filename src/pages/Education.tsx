import { PageHeader } from "@/components/PageHeader";

const categories = [
  { t: "Understanding 503B Facilities", d: "FDA-registered outsourcing facilities and what their oversight means for sourcing integrity." },
  { t: "How to Read a Certificate of Analysis", d: "Reading CoAs critically: assay results, identity testing, and lot traceability." },
  { t: "Licensing and Registration Basics", d: "State and federal licensing structures relevant to peptide, TRT, and compounding operators." },
  { t: "Vendor Verification Standards", d: "How Source Standard evaluates documentation and what each verification represents." },
  { t: "Sourcing Documentation", d: "Chain-of-custody records, supplier disclosures, and what good sourcing documentation looks like." },
  { t: "Consumer Due Diligence", d: "Practical guidance for consumers evaluating vendor claims of legitimacy." },
];

const articles = [
  { c: "503B Facilities", t: "What 503B registration actually verifies — and what it does not." },
  { c: "Certificates of Analysis", t: "A structured guide to reading a peptide CoA without a chemistry background." },
  { c: "Licensing", t: "State pharmacy licensing for compounding operators: a working overview." },
  { c: "Verification", t: "Documentation-first verification: why neutrality matters more than enforcement." },
  { c: "Sourcing", t: "Upstream sourcing in the peptide market: where records typically break down." },
  { c: "Due Diligence", t: "Five questions every consumer should ask a vendor before purchase." },
];

const Education = () => {
  return (
    <>
      <PageHeader
        eyebrow="Education"
        title="A reference library for vendors, clinicians, and consumers."
        description="Structured, neutral material on the standards, documentation, and licensing frameworks that govern legitimate operators in the peptide, TRT, and hormone optimization space."
      />

      {/* Categories */}
      <section className="border-b border-border">
        <div className="container-wide py-14 md:py-20">
          <div className="flex items-baseline justify-between mb-8">
            <p className="eyebrow">Categories</p>
            <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Publishing 2026</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {categories.map((c, i) => (
              <div key={c.t} className="bg-background p-6">
                <p className="text-[11px] font-mono text-muted-foreground tabular-nums mb-3">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-base font-semibold text-foreground leading-snug">{c.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Forthcoming articles */}
      <section className="bg-surface-muted">
        <div className="container-wide py-14 md:py-20">
          <div className="flex items-baseline justify-between mb-8">
            <p className="eyebrow">Forthcoming Reference Material</p>
            <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Publishing 2026</p>
          </div>
          <div className="border border-border bg-background divide-y divide-border">
            {articles.map((a, i) => (
              <article key={a.t} className="grid md:grid-cols-12 gap-6 px-6 py-6 items-center">
                <div className="md:col-span-2 text-[11px] font-mono text-muted-foreground tabular-nums">
                  REF-{String(i + 1).padStart(3, "0")}
                </div>
                <div className="md:col-span-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary border border-primary/30 bg-verified-soft px-2 py-1">
                    {a.c}
                  </span>
                </div>
                <div className="md:col-span-6">
                  <h3 className="text-[15px] font-semibold text-foreground leading-snug">{a.t}</h3>
                </div>
                <div className="md:col-span-2 md:text-right text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  Forthcoming
                </div>
              </article>
            ))}
          </div>
          <p className="mt-8 text-xs text-muted-foreground max-w-3xl">
            Reference material is published as part of the Source Standard educational program and is intended for
            informational purposes. It does not constitute medical, legal, or regulatory advice.
          </p>
        </div>
      </section>
    </>
  );
};

export default Education;
