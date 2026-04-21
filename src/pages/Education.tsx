import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";

const categories = [
  { ref: "REF-100", t: "Understanding 503B Facilities", d: "FDA-registered outsourcing facilities and what their oversight means for sourcing integrity." },
  { ref: "REF-200", t: "How to Read a Certificate of Analysis", d: "Reading CoAs critically: assay results, identity testing, and lot traceability." },
  { ref: "REF-300", t: "Licensing & Registration Basics", d: "State and federal licensing structures relevant to peptide, TRT, and compounding operators." },
  { ref: "REF-400", t: "Vendor Verification Standards", d: "How the Source Standard framework evaluates documentation and what each verification represents." },
  { ref: "REF-500", t: "Sourcing Documentation", d: "Chain-of-custody records, supplier disclosures, and what good sourcing documentation looks like." },
  { ref: "REF-600", t: "Consumer Due Diligence", d: "Practical guidance for consumers evaluating vendor claims of legitimacy." },
  { ref: "REF-700", t: "Storage, Stability & Shelf Life", d: "Reconstitution, refrigeration, light exposure, and degradation timelines for common compounds." },
  { ref: "REF-800", t: "Risks of Unverified Sources", d: "Documented risks associated with unverified suppliers, gray-market products, and undocumented sourcing." },
];

const articles = [
  { ref: "REF-101", c: "503B Facilities", t: "What 503B registration actually verifies — and what it does not.", cite: "SS-EDU-101.2026" },
  { ref: "REF-201", c: "Certificates of Analysis", t: "A structured guide to reading a peptide CoA without a chemistry background.", cite: "SS-EDU-201.2026" },
  { ref: "REF-301", c: "Licensing", t: "State pharmacy licensing for compounding operators: a working overview.", cite: "SS-EDU-301.2026" },
  { ref: "REF-401", c: "Verification", t: "Documentation-first verification: what the framework reviews and what it does not.", cite: "SS-EDU-401.2026" },
  { ref: "REF-501", c: "Sourcing", t: "Upstream sourcing in the peptide market: where records typically break down.", cite: "SS-EDU-501.2026" },
  { ref: "REF-601", c: "Due Diligence", t: "Five questions every consumer should ask a vendor before purchase.", cite: "SS-EDU-601.2026" },
  { ref: "REF-701", c: "Storage", t: "Reconstitution and refrigeration: practical handling of injectable peptides.", cite: "SS-EDU-701.2026" },
  { ref: "REF-801", c: "Risk", t: "Unverified sources: documented risks and consumer-side warning signs.", cite: "SS-EDU-801.2026" },
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
        eyebrow="Education · Public Reference Library"
        title="Public reference material on peptide therapy, TRT, hormone optimization, sourcing, storage, and consumer due diligence."
        lead="The reference library documents the standards, documentation, and licensing frameworks that govern legitimate operators. Material is published in versioned reference format and citable by ID."
        summary={[
          { label: "Categories", value: categories.length.toString().padStart(2, "0") },
          { label: "Forthcoming refs", value: articles.length.toString().padStart(2, "0") },
          { label: "Publication", value: "Rolling 2026" },
          { label: "Format", value: "Reference notes" },
        ]}
      />

      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-4">
          <p className="meta">
            Note · Educational material is informational only and is not medical advice.
          </p>
        </div>
      </section>

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
                  {categories.map((c) => (
                    <li key={c.ref} className="px-4 py-3">
                      <div className="flex items-baseline gap-3">
                        <span className="meta">{c.ref}</span>
                        <span className="text-[13px] font-semibold text-foreground leading-snug">{c.t}</span>
                      </div>
                      <p className="mt-1 ml-[5.25rem] text-[12px] text-muted-foreground leading-relaxed">{c.d}</p>
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
                  <div className="col-span-2 meta-label">Category</div>
                  <div className="col-span-5 meta-label">Title</div>
                  <div className="col-span-2 meta-label">Citation</div>
                  <div className="col-span-1 meta-label text-right">Status</div>
                </div>
                <ul className="divide-y divide-border">
                  {articles.map((a) => (
                    <li key={a.ref} className="grid grid-cols-12 gap-3 px-4 py-4 items-baseline">
                      <div className="col-span-2 meta">{a.ref}</div>
                      <div className="col-span-2 meta-label text-foreground">{a.c}</div>
                      <div className="col-span-5">
                        <h3 className="text-[13px] font-semibold text-foreground leading-snug">{a.t}</h3>
                      </div>
                      <div className="col-span-2 meta">{a.cite}</div>
                      <div className="col-span-1 text-right meta">Forthcoming</div>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-6 text-[12px] text-muted-foreground max-w-2xl leading-relaxed">
                <span className="meta-label text-foreground mr-2">Cite as ·</span>
                Source Standard Education, SS-EDU-2026.01, with the per-entry citation ID shown above.
              </p>
            </div>
          </div>

          {/* Read deeper */}
          <div className="mt-10 border border-border bg-surface-muted">
            <div className="px-4 py-2.5 border-b border-border bg-background">
              <p className="meta-label text-foreground">Read deeper</p>
            </div>
            <ul className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
              {[
                { to: "/medical-advisory", l: "Medical Advisory Board" },
                { to: "/governance", l: "Governance & oversight" },
              ].map((r) => (
                <li key={r.to} className="px-4 py-3">
                  <Link
                    to={r.to}
                    className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary"
                  >
                    {r.l} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Education;
