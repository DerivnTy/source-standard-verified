import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";
import { DocJumpBar } from "@/components/DocJumpBar";

// ---------- Protocol data (zero-fluff bullet ledger) ----------

const rows: { id: string; n: string; title: string; bullets: string[] }[] = [
  {
    id: "definition",
    n: "01",
    title: "Definition",
    bullets: [
      "Substantiation of sourcing records at time of review.",
      "Record of consistency; not a clinical endorsement.",
    ],
  },
  {
    id: "principles",
    n: "02",
    title: "Principles",
    bullets: [
      "Pharmacy-first auditing.",
      "Evidence over marketing claims.",
      "Time-bounded validity.",
    ],
  },
  {
    id: "scope",
    n: "03",
    title: "Scope",
    bullets: [
      "IN: Licenses, Entity ID, Pharmacy Invoices, CoAs.",
      "OUT: Pricing, Outcomes, Patient Experience.",
    ],
  },
  {
    id: "surveillance",
    n: "04",
    title: "Surveillance",
    bullets: [
      "BLIND BUY: Unannounced purchase testing from active listings.",
      "LAB VERIFICATION: ISO-accredited testing for Identity and Potency.",
      "ENFORCEMENT: Immediate removal for audit failure.",
    ],
  },
  {
    id: "examination",
    n: "05",
    title: "Examination",
    bullets: [
      "Legal registration & ownership verification.",
      "State/DEA credentialing check.",
      "503A/B chain of custody forensic review.",
    ],
  },
  {
    id: "limits",
    n: "06",
    title: "Limits",
    bullets: [
      "Private registry; no government affiliation.",
      "No medical advice or safety guarantee.",
    ],
  },
];

const navLabels: Record<string, string> = {
  definition: "DEF",
  principles: "PRIN",
  scope: "SCOPE",
  surveillance: "SURVEILLANCE",
  examination: "EXAM",
  limits: "LIMITS",
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
        title="Verification Protocol v2.0"
        description="Regulatory standard for supply-chain substantiation and sovereign surveillance."
      />
      <Breadcrumb items={[{ label: "About", to: "/about" }, { label: "Verification Protocol" }]} />
      <BriefingHero
        tone="navy"
        category="Verification Protocol v2.0"
        docId=""
        title="Verification Protocol v2.0"
        statement="Regulatory standard for supply-chain substantiation and sovereign surveillance."
      />
      <DocJumpBar waypoints={waypoints} />

      {/* Protocol ledger — full-width rows, 1px borders all sides, no shadows */}
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
                  {/* § number — flat mono cell */}
                  <div className="col-span-2 md:col-span-2 px-4 py-4 border-r border-border bg-background">
                    <div className="font-mono text-[18px] md:text-[20px] leading-none font-semibold tabular-nums text-foreground">
                      §{r.n}
                    </div>
                  </div>

                  {/* Title cell */}
                  <div className="col-span-3 md:col-span-3 px-4 py-4 border-r border-border bg-background">
                    <p className="font-mono text-[12px] uppercase tracking-[0.16em] font-semibold text-foreground">
                      {r.title}
                    </p>
                  </div>

                  {/* Bullets */}
                  <div className="col-span-7 md:col-span-7 px-4 py-4 bg-background">
                    <ul className="space-y-1.5">
                      {r.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex gap-2.5 text-[14px] leading-[1.55] text-foreground/85"
                        >
                          <span className="text-foreground/50 shrink-0">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
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
