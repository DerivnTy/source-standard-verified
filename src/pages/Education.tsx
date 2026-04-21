import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const featuredArticles = [
  {
    category: "Sourcing",
    title: "What 503B registration actually means",
    description:
      "A plain-language guide to FDA-registered outsourcing facilities, what registration proves, and what it does not.",
    status: "Coming soon",
  },
  {
    category: "Certificates of Analysis",
    title: "How to read a peptide CoA",
    description:
      "Walk through identity tests, assay results, lot numbers, and the gaps that should make you ask more questions.",
    status: "Coming soon",
  },
  {
    category: "Verification",
    title: "What Source Standard verification means",
    description:
      "What our review actually checks, what it does not, and how to interpret a vendor's public verification status.",
    status: "Coming soon",
  },
  {
    category: "Consumer Safety",
    title: "Five questions to ask before buying",
    description:
      "A short, practical checklist for evaluating any clinic or vendor before you place an order.",
    status: "Coming soon",
  },
  {
    category: "Consumer Safety",
    title: "Warning signs of undocumented sourcing",
    description:
      "How to spot vague supplier language, missing records, and claims that cannot be independently verified.",
    status: "Coming soon",
  },
  {
    category: "Storage and Handling",
    title: "Storage and reconstitution basics",
    description:
      "Temperature, light exposure, reconstitution, and shelf life — the handling fundamentals consumers should know.",
    status: "Coming soon",
  },
];

const categories = [
  { name: "Sourcing", desc: "Where products originate and how that's documented.", count: 4 },
  { name: "Verification", desc: "What review and verification actually involve.", count: 3 },
  { name: "Certificates of Analysis", desc: "Reading lab results and assay reports.", count: 2 },
  { name: "Licensing", desc: "Pharmacy, medical, and facility licensing basics.", count: 3 },
  { name: "Consumer Safety", desc: "Practical due diligence before buying.", count: 5 },
  { name: "Storage and Handling", desc: "Temperature, reconstitution, shelf life.", count: 2 },
  { name: "TRT and Hormone Optimization", desc: "What consumers should understand first.", count: 3 },
  { name: "Peptide Basics", desc: "Foundational concepts, terminology, and categories.", count: 4 },
];

const faqs = [
  {
    q: 'What does "verified" mean?',
    a: "A verified listing means Source Standard has reviewed the vendor's submitted documentation — including licensing, sourcing records, and supplier disclosures — and found it consistent with our published standards at the time of review. Verification is documentation-based and does not guarantee clinical outcomes.",
  },
  {
    q: 'What does "unverified" mean?',
    a: "Unverified means a vendor has not completed the Source Standard review process, or that submitted records were incomplete or inconsistent. It is not in itself an accusation — only a statement that no public verification exists.",
  },
  {
    q: "What is a 503B facility?",
    a: "A 503B outsourcing facility is a compounding pharmacy that has registered with the FDA under Section 503B of the Federal Food, Drug, and Cosmetic Act. Registration carries specific manufacturing and reporting obligations, but registration alone does not certify any individual product.",
  },
  {
    q: "What is a certificate of analysis?",
    a: "A certificate of analysis (CoA) is a lab document reporting identity, purity, and assay results for a specific lot of product. A useful CoA is tied to a traceable lot number and issued by an independent laboratory.",
  },
  {
    q: "Does Source Standard verify safety?",
    a: "No. Source Standard reviews documentation, sourcing records, and public claims. We do not test products, conduct clinical trials, or issue safety guarantees. Verification is a transparency layer, not a safety endorsement.",
  },
  {
    q: "How should peptides be stored?",
    a: "Most peptides require refrigeration, protection from light, and careful handling after reconstitution. Specific storage instructions vary by product — always follow the vendor's documented guidance and any clinical instructions you receive.",
  },
  {
    q: "What should I ask before buying from a clinic?",
    a: "Ask where products are sourced, whether the upstream pharmacy is licensed and registered, whether CoAs are available, and how the clinic handles storage and shipping. A serious vendor should be able to answer these directly.",
  },
  {
    q: "Does a professional website mean a clinic is legitimate?",
    a: "No. A polished website is a marketing artifact, not a regulatory record. Legitimacy is established through licensing, documentation, and verifiable sourcing — none of which can be inferred from design quality alone.",
  },
  {
    q: "What records actually matter when evaluating a vendor?",
    a: "The records that matter most are pharmacy and facility licenses, supplier invoices, chain-of-custody documentation, certificates of analysis tied to specific lots, and consistency between public claims and submitted records.",
  },
];

const referenceNotes = [
  { id: "SS-EDU-101.2026", topic: "503B registration" },
  { id: "SS-EDU-201.2026", topic: "Reading a certificate of analysis" },
  { id: "SS-EDU-301.2026", topic: "Licensing basics" },
  { id: "SS-EDU-401.2026", topic: "Verification scope" },
  { id: "SS-EDU-501.2026", topic: "Sourcing documentation" },
  { id: "SS-EDU-601.2026", topic: "Consumer due diligence" },
  { id: "SS-EDU-701.2026", topic: "Storage and stability" },
  { id: "SS-EDU-801.2026", topic: "Risks of unverified sources" },
];

const Education = () => {
  return (
    <>
      {/* Hero */}
      <header className="bg-background border-b border-border">
        <div className="container-wide py-14 md:py-20">
          <p className="eyebrow mb-4">Education</p>
          <h1 className="text-[1.875rem] md:text-[2.25rem] font-semibold tracking-tight text-foreground leading-[1.15] max-w-3xl">
            Education
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] text-muted-foreground leading-relaxed">
            Learn more about peptide sourcing, TRT, hormone optimization, verification, storage,
            and what consumers should understand before buying from any clinic or vendor.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="meta text-muted-foreground">Updated · Regularly</span>
            <span className="meta text-muted-foreground">Informational only</span>
          </div>
          <p className="mt-6 text-[13px] text-muted-foreground leading-relaxed max-w-2xl">
            Educational material is informational only and is not medical advice.
          </p>
        </div>
      </header>

      {/* Featured Articles */}
      <section className="border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <div className="flex items-end justify-between gap-6 flex-wrap mb-8">
            <div>
              <p className="meta mb-3">Start here</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
                Featured Articles
              </h2>
            </div>
            <p className="text-[13px] text-muted-foreground max-w-md leading-relaxed">
              Short, plain-language guides to the topics consumers ask about most.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredArticles.map((a) => (
              <li
                key={a.title}
                className="group border border-border bg-background p-6 flex flex-col hover:border-foreground/30 transition-colors"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="meta-label text-primary">{a.category}</span>
                  <span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground border border-border px-2 py-0.5">
                    {a.status}
                  </span>
                </div>
                <h3 className="text-[17px] font-semibold tracking-tight text-foreground leading-snug">
                  {a.title}
                </h3>
                <p className="mt-3 text-[14px] text-muted-foreground leading-relaxed flex-1">
                  {a.description}
                </p>
                <Link
                  to="#"
                  className="mt-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary self-start"
                >
                  Read more →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Browse by Topic */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-12 md:py-16">
          <div className="mb-8">
            <p className="meta mb-3">Topics</p>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
              Browse by Topic
            </h2>
            <p className="mt-3 text-[14px] text-muted-foreground max-w-2xl leading-relaxed">
              The areas covered across our guides and reference material.
            </p>
          </div>
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {categories.map((c) => (
              <li key={c.name} className="bg-background p-5 min-h-32 flex flex-col justify-between">
                <div>
                  <h3 className="text-[14.5px] font-semibold text-foreground leading-snug">
                    {c.name}
                  </h3>
                  <p className="mt-2 text-[12.5px] text-muted-foreground leading-relaxed">
                    {c.desc}
                  </p>
                </div>
                <p className="mt-4 meta text-muted-foreground">
                  {c.count.toString().padStart(2, "0")} articles
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">Common questions</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground leading-tight">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-[14px] text-muted-foreground leading-relaxed">
                Quick answers to the questions consumers ask most often. Each item links to a
                fuller explanation when one is available.
              </p>
            </div>
            <div className="md:col-span-8">
              <Accordion type="single" collapsible className="border-t border-border">
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border">
                    <AccordionTrigger className="text-[15px] font-semibold text-foreground text-left hover:no-underline hover:text-primary">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-[14px] text-muted-foreground leading-relaxed">{f.a}</p>
                      <Link
                        to="#"
                        className="mt-4 inline-block text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary"
                      >
                        Read more →
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Reference Notes */}
      <section className="border-b border-border">
        <div className="container-wide py-10 md:py-12">
          <div className="mb-5">
            <p className="meta-label text-foreground">Reference Notes</p>
            <p className="mt-2 text-[12.5px] text-muted-foreground max-w-2xl leading-relaxed">
              Internal citation identifiers for the educational material referenced above.
            </p>
          </div>
          <ul className="divide-y divide-border border-t border-border">
            {referenceNotes.map((r) => (
              <li
                key={r.id}
                className="flex items-baseline justify-between gap-4 py-2.5 text-[12.5px]"
              >
                <span className="meta-mono text-muted-foreground">{r.id}</span>
                <span className="text-muted-foreground">{r.topic}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Read deeper */}
      <section>
        <div className="container-wide py-10 md:py-12">
          <div className="border border-border bg-surface-muted">
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
