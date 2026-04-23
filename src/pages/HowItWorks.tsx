import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";
import { DocJumpBar } from "@/components/DocJumpBar";

// ---------- Protocol data (zero-fluff) ----------

const rows: { id: string; n: string; title: string; body: string }[] = [
  {
    id: "definition",
    n: "01",
    title: "Definition",
    body:
      "Substantiation of sourcing records at time of review. Documentation consistency only.",
  },
  {
    id: "principles",
    n: "02",
    title: "Principles",
    body:
      "Pharmacy-first auditing. Evidence over marketing claims. Time-bounded validity.",
  },
  {
    id: "scope",
    n: "03",
    title: "Scope",
    body:
      "Includes: Licenses, Entity ID, Pharmacy Invoices, CoAs. Excludes: Pricing, Outcomes.",
  },
  {
    id: "surveillance",
    n: "04",
    title: "Surveillance",
    body:
      "Includes unannounced “Blind Buy” purchase testing and ISO-accredited lab verification (Identity, Potency, Sterility).",
  },
  {
    id: "examination",
    n: "05",
    title: "Examination",
    body:
      "Legal registration check. State/DEA credentialing. 503A/B chain of custody forensic review.",
  },
  {
    id: "limits",
    n: "06",
    title: "Limits",
    body:
      "Private registry. Not a government agency. Not medical advice. No safety guarantee.",
  },
];

const waypoints = rows.map((r) => ({ id: r.id, number: r.n, label: r.title.slice(0, 4).toUpperCase() }));
// Override labels to canonical short codes
const navLabels: Record<string, string> = {
  definition: "DEF",
  principles: "PRIN",
  scope: "SCOPE",
  surveillance: "SURVEILLANCE",
  examination: "EXAM",
  limits: "LIMITS",
};
waypoints.forEach((w) => {
  w.label = navLabels[w.id] ?? w.label;
});

// ---------- Page ----------

const HowItWorks = () => {
  return (
    <div className="bg-background">
      <PageMeta
        title="Verification Protocol (v2.0 / April 2026)"
        description="The evidentiary standard for supply-chain substantiation and random surveillance."
      />
      <Breadcrumb items={[{ label: "About", to: "/about" }, { label: "Verification Protocol" }]} />
      <BriefingHero
        tone="navy"
        category="Verification Protocol (v2.0 / April 2026)"
        docId=""
        title="Verification Protocol"
        statement="The evidentiary standard for supply-chain substantiation and random surveillance."
      />
      <DocJumpBar waypoints={waypoints} />

      {/* Data ledger — continuous vertical grid, no cards, no shadows */}
      <div className="border-t border-border bg-background">
        <div className="page-shell">
          <div className="mx-auto w-wide">
            {rows.map((r, i) => (
              <section
                key={r.id}
                id={r.id}
                className={`scroll-mt-36 grid grid-cols-12 gap-6 py-8 md:py-10 border-b border-border ${
                  i === 0 ? "border-t border-border" : ""
                }`}
              >
                {/* Number — 15% */}
                <div className="col-span-2 md:col-span-2">
                  <div className="font-mono text-[28px] md:text-[34px] leading-none font-semibold tabular-nums text-foreground">
                    §{r.n}
                  </div>
                </div>

                {/* Title — 25% */}
                <div className="col-span-10 md:col-span-3">
                  <p className="font-mono text-[12px] uppercase tracking-[0.16em] font-semibold text-foreground">
                    {r.title}
                  </p>
                </div>

                {/* Body — 60% */}
                <div className="col-span-12 md:col-span-7">
                  <p className="text-[14.5px] leading-[1.65] text-foreground/85">
                    {r.body}
                  </p>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
