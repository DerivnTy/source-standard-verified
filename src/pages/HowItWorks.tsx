import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";
import { DocJumpBar } from "@/components/DocJumpBar";

// ---------- Protocol data (Clinical Standard — Accredited Revision) ----------

type Bullet = { label: string; text: string };
type Row = {
  id: string;
  n: string;
  title: string;
  intro?: string;
  bullets?: Bullet[];
};

const rows: Row[] = [
  {
    id: "primary-source",
    n: "01",
    title: "Primary Source Auditing",
    bullets: [
      {
        label: "Upstream Substantiation",
        text: "Verification of the vendor's primary supply chain. We validate that every listed product is attributed to an appropriately licensed 503A or 503B facility before registry inclusion.",
      },
      {
        label: "Credential Authentication",
        text: "Cross-referencing of state-level pharmacy registrations and DEA certifications against live regulatory databases to confirm standing.",
      },
      {
        label: "Chain of Custody",
        text: "Forensic review of Wholesale Distribution Records to ensure a documented, unbroken link from the manufacturer to the vendor.",
      },
    ],
  },
  {
    id: "surveillance",
    n: "02",
    title: "Analytical Surveillance",
    bullets: [
      {
        label: "Unannounced Sampling",
        text: "To maintain registry integrity, we execute randomized, anonymous purchase protocols from active listings. These samples are acquired without vendor notification to ensure a representative baseline.",
      },
      {
        label: "Independent Laboratory Analysis",
        text: "All acquired samples are submitted to third-party, ISO-accredited facilities for quantitative analysis.",
      },
      {
        label: "Quantitative Metrics",
        text: "Our focus is narrowed to the three primary safety pillars: Molecular Identity, Concentration Accuracy (Potency), and Microbiological Sterility.",
      },
    ],
  },
  {
    id: "monitoring",
    n: "03",
    title: "Disclosure Obligations",
    bullets: [
      {
        label: "Material Change Protocol",
        text: "Verified status requires the immediate disclosure of changes in sourcing partners, facility affiliations, or entity ownership within 72 hours.",
      },
      {
        label: "Administrative Tracking",
        text: "Continuous monitoring of federal FDA 483s and State Board disciplinary actions. Status is subject to immediate suspension upon evidence of regulatory deficiency.",
      },
    ],
  },
  {
    id: "boundaries",
    n: "04",
    title: "Operational Boundaries",
    intro:
      "Source Standard operates as an independent documentation and testing authority. We do not provide medical advice, certify clinical outcomes, or substitute for federal regulatory oversight. Our function is the public disclosure of substantiated supply-chain data.",
  },
];

const navLabels: Record<string, string> = {
  "primary-source": "AUDIT",
  surveillance: "SURVEILLANCE",
  monitoring: "DISCLOSURE",
  boundaries: "BOUNDARIES",
};

const waypoints = rows.map((r) => ({
  id: r.id,
  number: r.n,
  label: navLabels[r.id] ?? r.title.toUpperCase(),
}));

// ---------- Page ----------

const HowItWorks = () => {
  return (
    <div className="bg-background">
      <PageMeta
        title="The Verification Standard"
        description="An independent oversight framework designed to substantiate supply-chain integrity and ensure regulatory alignment across the compounded medicine landscape."
      />
      <Breadcrumb items={[{ label: "About", to: "/about" }, { label: "Verification Standard" }]} />
      <BriefingHero
        tone="navy"
        category="The Verification Standard"
        docId=""
        title="The Verification Standard"
        statement="An independent oversight framework designed to substantiate supply-chain integrity and ensure regulatory alignment across the compounded medicine landscape."
      />
      <DocJumpBar waypoints={waypoints} />

      {/* Clinical ledger — dual-font system, soft 1px dividers, generous breathing room */}
      <div className="bg-background">
        <div className="page-shell pt-0">
          <div className="mx-auto w-wide">
            <div className="border border-border/60 border-b-0">
              {rows.map((r) => (
                <section
                  key={r.id}
                  id={r.id}
                  className="scroll-mt-36 grid grid-cols-12 border-b border-border/60"
                >
                  {/* § number — narrow, vertically centered, mono */}
                  <div className="col-span-12 md:col-span-2 px-5 py-7 border-b md:border-b-0 md:border-r border-border/60 bg-background flex md:items-center">
                    <div>
                      <div className="font-mono text-[20px] leading-none font-semibold tabular-nums tracking-[0.05em] text-foreground">
                        §{r.n}
                      </div>
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        Section {r.n}
                      </p>
                    </div>
                  </div>

                  {/* Title — mono, uppercase */}
                  <div className="col-span-12 md:col-span-3 px-5 py-7 border-b md:border-b-0 md:border-r border-border/60 bg-background flex md:items-center">
                    <p className="font-mono text-[12px] uppercase tracking-[0.05em] font-semibold text-foreground leading-[1.5]">
                      {r.n} // {r.title.toUpperCase()}
                    </p>
                  </div>

                  {/* Body — sans, clinical readability */}
                  <div className="col-span-12 md:col-span-7 px-6 py-7 bg-background">
                    {r.intro && (
                      <p className="font-sans text-[15px] leading-[1.6] font-normal text-foreground/85">
                        {r.intro}
                      </p>
                    )}
                    {r.bullets && r.bullets.length > 0 && (
                      <ul className="space-y-3">
                        {r.bullets.map((b) => (
                          <li key={b.label} className="font-sans text-[15px] leading-[1.6] text-foreground/85">
                            <span className="font-mono text-[11px] uppercase tracking-[0.05em] font-medium text-foreground mr-2">
                              {b.label}:
                            </span>
                            <span className="font-normal">{b.text}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
