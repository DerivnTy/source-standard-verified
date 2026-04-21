import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";

const categories = [
  {
    ref: "REF-100",
    t: "Understanding 503B Facilities",
    d: "What FDA-registered outsourcing facilities are, why they matter, and what registration does — and does not — prove.",
  },
  {
    ref: "REF-200",
    t: "Reading a Certificate of Analysis",
    d: "How to look at a CoA without a chemistry background: identity, assay results, lot numbers, and warning signs.",
  },
  {
    ref: "REF-300",
    t: "Licensing & Registration Basics",
    d: "The basic state and federal licenses consumers may see when researching clinics, pharmacies, and sourcing claims.",
  },
  {
    ref: "REF-400",
    t: "What Verification Means",
    d: "How Source Standard reviews documentation and what a public verification status can and cannot tell you.",
  },
  {
    ref: "REF-500",
    t: "Sourcing Documentation",
    d: "What good sourcing records look like, where chain-of-custody can break down, and what questions to ask.",
  },
  {
    ref: "REF-600",
    t: "Consumer Due Diligence",
    d: "Practical steps for comparing vendors, reading claims carefully, and avoiding unsupported safety language.",
  },
  {
    ref: "REF-700",
    t: "Storage, Stability & Shelf Life",
    d: "Plain-language handling basics for temperature, light exposure, reconstitution, and product degradation.",
  },
  {
    ref: "REF-800",
    t: "Risks of Unverified Sources",
    d: "Common risks tied to undocumented suppliers, gray-market products, and claims that cannot be independently checked.",
  },
];

const popularQuestions = [
  "What does verified mean?",
  "What is a 503B facility?",
  "How do I read a CoA?",
  "What questions should I ask before buying?",
  "How should peptides be stored?",
];

const guides = [
  {
    ref: "REF-101",
    c: "503B Facilities",
    t: "What 503B registration actually means",
    d: "A plain-language guide to FDA-registered outsourcing facilities, the records consumers can check, and the limits of registration.",
    cite: "SS-EDU-101.2026",
  },
  {
    ref: "REF-201",
    c: "Certificates of Analysis",
    t: "How to read a peptide CoA",
    d: "A practical walkthrough of assay results, identity testing, lot traceability, and common gaps that should raise questions.",
    cite: "SS-EDU-201.2026",
  },
  {
    ref: "REF-301",
    c: "Licensing",
    t: "Which licenses matter?",
    d: "A consumer overview of pharmacy licensing, medical licensing, and why a website claim is not the same as a public record.",
    cite: "SS-EDU-301.2026",
  },
  {
    ref: "REF-401",
    c: "Verification",
    t: "What Source Standard reviews",
    d: "What documentation-first verification checks, what it does not check, and how to interpret a vendor's public status.",
    cite: "SS-EDU-401.2026",
  },
  {
    ref: "REF-501",
    c: "Sourcing",
    t: "Where sourcing records break down",
    d: "How upstream pharmacy records, invoices, lot documentation, and supplier claims connect — and where they often do not.",
    cite: "SS-EDU-501.2026",
  },
  {
    ref: "REF-601",
    c: "Due Diligence",
    t: "Five questions to ask before buying",
    d: "A simple checklist consumers can use before purchasing from a clinic, vendor, or online source making safety claims.",
    cite: "SS-EDU-601.2026",
  },
  {
    ref: "REF-701",
    c: "Storage",
    t: "Storage, reconstitution, and refrigeration basics",
    d: "What consumers should understand about handling, temperature exposure, and why storage instructions matter.",
    cite: "SS-EDU-701.2026",
  },
  {
    ref: "REF-801",
    c: "Risk",
    t: "Warning signs of unverified sources",
    d: "How undocumented sourcing, missing records, and vague supplier language can create avoidable consumer risk.",
    cite: "SS-EDU-801.2026",
  },
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
        eyebrow="Education · Consumer Learning Center"
        title="Education and Consumer Guidance"
        lead="Clear guidance for understanding sourcing, verification, storage, due diligence, and the risks of buying from unverified sources — written for consumers, grounded in public records and clinical review."
        summary={[
          { label: "Topics covered", value: categories.length.toString().padStart(2, "0") },
          { label: "Guides coming soon", value: guides.length.toString().padStart(2, "0") },
          { label: "Updated", value: "Regularly" },
          { label: "Use", value: "Informational only" },
        ]}
      />

      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-4">
          <p className="text-[13px] text-muted-foreground leading-relaxed">
            Educational material on this page is informational only and is not medical advice.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-wide py-10 md:py-14">
          <div className="flex items-end justify-between gap-6 flex-wrap mb-6">
            <div>
              <p className="meta mb-3">Start here</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight text-foreground">
                Popular questions from consumers.
              </h2>
            </div>
            <p className="text-[13px] text-muted-foreground leading-relaxed max-w-md">
              Quick entry points for people trying to understand vendors, sourcing claims, and safety documentation.
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-border border border-border">
            {popularQuestions.map((q, i) => (
              <li key={q} className="bg-background p-4 min-h-28 flex flex-col justify-between">
                <span className="meta text-primary">{(i + 1).toString().padStart(2, "0")}</span>
                <h3 className="mt-4 text-[14px] font-semibold text-foreground leading-snug">{q}</h3>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <aside className="md:col-span-4">
              <div className="md:sticky md:top-28 border border-border bg-background">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface-muted">
                  <p className="meta-label text-foreground">Learning topics</p>
                  <p className="meta-label">{categories.length.toString().padStart(2, "0")}</p>
                </div>
                <ul className="divide-y divide-border">
                  {categories.map((c) => (
                    <li key={c.ref} className="px-4 py-4">
                      <h3 className="text-[13.5px] font-semibold text-foreground leading-snug">{c.t}</h3>
                      <p className="mt-1.5 text-[12.5px] text-muted-foreground leading-relaxed">{c.d}</p>
                      <p className="mt-3 meta text-muted-foreground">{c.ref}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="md:col-span-8">
              <div className="flex items-baseline justify-between mb-4">
                <p className="meta text-foreground">Upcoming Guides</p>
                <p className="meta-label">Publishing 2026</p>
              </div>
              <ul className="grid md:grid-cols-2 gap-px bg-border border border-border">
                {guides.map((g) => (
                  <li key={g.ref} className="bg-background p-5 flex flex-col min-h-56">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="meta-label text-primary">{g.c}</span>
                      <span className="meta text-muted-foreground">Forthcoming</span>
                    </div>
                    <h3 className="text-[16px] font-semibold tracking-tight text-foreground leading-snug">{g.t}</h3>
                    <p className="mt-3 text-[13.5px] text-muted-foreground leading-relaxed flex-1">{g.d}</p>
                    <div className="mt-5 pt-4 border-t border-border flex items-center justify-between gap-3">
                      <span className="meta text-muted-foreground">{g.ref}</span>
                      <span className="meta text-muted-foreground">{g.cite}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[12px] text-muted-foreground max-w-2xl leading-relaxed">
                <span className="meta-label text-foreground mr-2">Cite as ·</span>
                Source Standard Education, SS-EDU-2026.01. Individual guide IDs are shown as secondary metadata.
              </p>
            </div>
          </div>

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
