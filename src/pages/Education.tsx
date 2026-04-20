import { RecordHeader } from "@/components/RecordHeader";

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
      <RecordHeader
        metadata={[
          { label: "Doc", value: "SS-EDU-2026.01" },
          { label: "Version", value: "2026.01" },
          { label: "Status", value: "Forthcoming" },
          { label: "Updated", value: "04 / 20 / 2026" },
        ]}
        eyebrow="Education · Reference Library"
        title="A reference library for vendors, clinicians, and consumers."
        lead="Structured, neutral material on the standards, documentation, and licensing frameworks that govern legitimate operators in the peptide, TRT, and hormone optimization space."
        summary={[
          { label: "Categories", value: categories.length.toString().padStart(2, "0") },
          { label: "Forthcoming refs", value: articles.length.toString().padStart(2, "0") },
          { label: "Publication", value: "Rolling 2026" },
          { label: "Format", value: "Reference notes" },
        ]}
      />

      <section>
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            {/* Categories index */}
            <aside className="md:col-span-4">
              <div className="md:sticky md:top-28 border border-border bg-background">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface-muted">
                  <p className="meta-label text-foreground">Categories</p>
                  <p className="meta-label">{categories.length.toString().padStart(2, "0")}</p>
                </div>
                <ul className="divide-y divide-border">
                  {categories.map((c, i) => (
                    <li key={c.t} className="px-4 py-3">
                      <div className="flex items-baseline gap-3">
                        <span className="meta">§{String(i + 1).padStart(2, "0")}</span>
                        <span className="text-[13px] font-semibold text-foreground leading-snug">{c.t}</span>
                      </div>
                      <p className="mt-1 ml-7 text-[12px] text-muted-foreground leading-relaxed">{c.d}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Forthcoming references table */}
            <div className="md:col-span-8">
              <div className="flex items-baseline justify-between mb-4">
                <p className="meta text-foreground">Forthcoming Reference Material</p>
                <p className="meta-label">Publishing 2026</p>
              </div>
              <div className="border border-border bg-background">
                <div className="grid grid-cols-12 px-4 py-2.5 bg-surface-muted border-b border-border">
                  <div className="col-span-2 meta-label">Ref</div>
                  <div className="col-span-3 meta-label">Category</div>
                  <div className="col-span-5 meta-label">Title</div>
                  <div className="col-span-2 meta-label text-right">Status</div>
                </div>
                <ul className="divide-y divide-border">
                  {articles.map((a, i) => (
                    <li key={a.t} className="grid grid-cols-12 gap-3 px-4 py-4 items-baseline">
                      <div className="col-span-2 meta">REF-{String(i + 1).padStart(3, "0")}</div>
                      <div className="col-span-3 meta-label text-foreground">{a.c}</div>
                      <div className="col-span-5">
                        <h3 className="text-[13px] font-semibold text-foreground leading-snug">{a.t}</h3>
                      </div>
                      <div className="col-span-2 text-right meta">Forthcoming</div>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-6 text-[12px] text-muted-foreground max-w-2xl leading-relaxed">
                <span className="meta-label text-foreground mr-2">Note ·</span>
                Reference material is published as part of the Source Standard educational
                program and is intended for informational purposes. It does not constitute
                medical, legal, or regulatory advice.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Education;
