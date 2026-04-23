import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";
import { DocJumpBar } from "@/components/DocJumpBar";

// ---------- Protocol data (Clinical Standard) ----------

type Bullet = { label?: string; text: string };
type Row = {
  id: string;
  n: string;
  title: string;
  intro: string;
  bullets?: Bullet[];
};

const rows: Row[] = [
  {
    id: "primary-source",
    n: "01",
    title: "Primary Source Auditing",
    intro:
      "Verification begins with a forensic review of the vendor's upstream supply chain. We verify that every product is tied to a documented, licensed source before it is eligible for entry into the registry.",
    bullets: [
      {
        label: "Upstream Verification",
        text: "Direct cross-referencing with 503A and 503B pharmacy registrations and state-level licensing.",
      },
      {
        label: "Document Authentication",
        text: "Validation of Wholesale Distribution Records and Certificates of Analysis (CoA) to ensure a closed-loop chain of custody.",
      },
      {
        label: "Forensic Intake",
        text: 'A comprehensive review of entity ownership and legal standing to eliminate "Ghost Supply" risks.',
      },
    ],
  },
  {
    id: "surveillance",
    n: "02",
    title: "Randomized Surveillance & Testing",
    intro:
      "To ensure ongoing compliance, Source Standard maintains a rigorous surveillance protocol that extends beyond initial documentation.",
    bullets: [
      {
        label: "Unannounced Sampling",
        text: "We utilize anonymous purchase protocols to acquire products directly from active registry listings.",
      },
      {
        label: "ISO-Accredited Analytics",
        text: "Acquired samples are submitted to independent, third-party laboratories for comprehensive analysis.",
      },
      {
        label: "Quantitative Testing",
        text: "Analytical focus is placed on Identity (molecular confirmation), Potency (concentration accuracy), and Sterility (microbiological safety).",
      },
      {
        label: "Protocol Enforcement",
        text: "Any deviation from the established clinical standard results in immediate status revocation and a public record of the deficiency.",
      },
    ],
  },
  {
    id: "monitoring",
    n: "03",
    title: "Active Monitoring & Disclosure",
    intro:
      "Verification is a dynamic status, requiring perpetual compliance with disclosure obligations.",
    bullets: [
      {
        label: "Material Change Reporting",
        text: "Vendors are contractually required to disclose changes in sourcing, pharmacy partnerships, or ownership within a 72-hour window.",
      },
      {
        label: "Regulatory Tracking",
        text: "Our oversight includes real-time monitoring of FDA 483s, Warning Letters, and state-level administrative actions.",
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
  monitoring: "MONITORING",
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

      {/* Clinical ledger — full-width rows, 1px borders, no shadows */}
      <div className="bg-background">
        <div className="page-shell pt-0">
          <div className="mx-auto w-wide">
            <div className="border border-border border-b-0">
              {rows.map((r) => (
                <section
                  key={r.id}
                  id={r.id}
                  className="scroll-mt-36 grid grid-cols-12 border-b border-border"
                >
                  {/* § number */}
                  <div className="col-span-12 md:col-span-2 px-5 py-6 border-b md:border-b-0 md:border-r border-border bg-background">
                    <div className="font-mono text-[20px] leading-none font-semibold tabular-nums text-foreground">
                      §{r.n}
                    </div>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      Section {r.n}
                    </p>
                  </div>

                  {/* Title */}
                  <div className="col-span-12 md:col-span-3 px-5 py-6 border-b md:border-b-0 md:border-r border-border bg-background">
                    <p className="font-mono text-[12px] uppercase tracking-[0.16em] font-semibold text-foreground">
                      {r.n} // {r.title.toUpperCase()}
                    </p>
                  </div>

                  {/* Body */}
                  <div className="col-span-12 md:col-span-7 px-5 py-6 bg-background">
                    <p className="text-[14.5px] leading-[1.65] text-foreground/85">
                      {r.intro}
                    </p>
                    {r.bullets && r.bullets.length > 0 && (
                      <ul className="mt-4 divide-y divide-border border-t border-border">
                        {r.bullets.map((b) => (
                          <li
                            key={b.text}
                            className="grid grid-cols-12 gap-4 py-3"
                          >
                            {b.label && (
                              <span className="col-span-12 md:col-span-4 font-mono text-[11px] uppercase tracking-[0.14em] font-semibold text-foreground">
                                {b.label}
                              </span>
                            )}
                            <span
                              className={`${
                                b.label ? "col-span-12 md:col-span-8" : "col-span-12"
                              } text-[14px] leading-[1.6] text-foreground/85`}
                            >
                              {b.text}
                            </span>
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
