import { Check, X } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";
import { DocJumpBar } from "@/components/DocJumpBar";

// ---------- Data (chainsawed copy per spec) ----------

const definition: string =
  "Verified means documented sourcing was substantiated at the time of review. It is a record of consistency, not a clinical endorsement.";

const principles: { t: string; d: string }[] = [
  { t: "Source First", d: "We audit the pharmacy, not the storefront." },
  { t: "Evidence Only", d: "Status requires records, not marketing claims." },
  { t: "Snapshot Logic", d: "Verification is a time-bounded audit, not a permanent seal." },
];

const inScope: string[] = [
  "Licenses",
  "Entity Identity",
  "Pharmacy Records",
  "Invoices",
  "CoAs",
];

const outOfScope: string[] = [
  "Pricing",
  "Clinical Outcomes",
  "Patient Experience",
];

const surveillance: { t: string; d: string }[] = [
  {
    t: "Random Sampling",
    d: "We conduct unannounced \u201CBlind Buys\u201D from active registry listings.",
  },
  {
    t: "Blind Testing",
    d: "Samples are sent to ISO-accredited labs for identity, potency, and sterility testing.",
  },
  {
    t: "Failure Protocol",
    d: "Failure to pass a Random Audit results in immediate Removal and administrative penalties.",
  },
];

const examination: { t: string; d: string }[] = [
  { t: "Identity", d: "Legal entity & registration check." },
  { t: "Credentials", d: "State/DEA license verification." },
  { t: "Chain of Custody", d: "Pharmacy sourcing substantiation." },
  { t: "Batch Records", d: "CoA & Lot documentation forensic review." },
];

const limits: string =
  "Source Standard is a private registry. We do not provide medical advice, certify safety, or act as a government regulator.";

const waypoints = [
  { id: "definition", number: "1", label: "DEF" },
  { id: "principles", number: "2", label: "PRIN" },
  { id: "scope", number: "3", label: "SCOPE" },
  { id: "surveillance", number: "4", label: "SURVEILLANCE" },
  { id: "examination", number: "5", label: "EXAM" },
  { id: "limits", number: "6", label: "LIMITS" },
];

// ---------- Building blocks ----------

const SectionShell = ({
  id,
  n,
  category,
  title,
  description,
  muted = false,
  first = false,
  children,
}: {
  id: string;
  n: string;
  category: string;
  title: string;
  description?: string;
  muted?: boolean;
  first?: boolean;
  children: React.ReactNode;
}) => (
  <section
    id={id}
    className={`scroll-mt-36 border-b border-border ${muted ? "bg-surface-muted/40" : "bg-background"}`}
  >
    <div className={`page-shell ${first ? "pt-10 md:pt-12" : "pt-12 md:pt-14"} pb-12 md:pb-14`}>
      <div className="mx-auto w-wide">
        <div className="mb-7 flex items-baseline justify-between gap-4 border-b border-border pb-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              §{n} · {category}
            </p>
            <h2 className="mt-2 t-section-title-sm text-foreground">{title}</h2>
            {description && (
              <p className="mt-2 t-body-md text-muted-foreground max-w-[68ch]">{description}</p>
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  </section>
);

const NumberedCell = ({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) => (
  <li className="rounded-md border border-border bg-card shadow-sm p-5 flex gap-5">
    <div className="font-mono text-[20px] font-semibold tabular-nums text-foreground/80 leading-none pt-0.5 shrink-0">
      {n}
    </div>
    <div className="flex-1 min-w-0">
      <p className="t-body-md font-semibold text-foreground">{title}</p>
      <div className="mt-2 t-body-sm text-muted-foreground leading-[1.6] space-y-1">
        {children}
      </div>
    </div>
  </li>
);

// ---------- Page ----------

const HowItWorks = () => {
  return (
    <div className="bg-background">
      <PageMeta
        title="How Verification Works"
        description="The review standard, what the process examines, and what a determination means."
      />
      <Breadcrumb items={[{ label: "About", to: "/about" }, { label: "How Verification Works" }]} />
      <BriefingHero
        tone="navy"
        category="How Verification Works"
        docId=""
        title="How Verification Works"
        statement="The review standard, what the process examines, and what a determination means."
      />
      <DocJumpBar waypoints={waypoints} />

      {/* §1 Definition */}
      <SectionShell
        id="definition"
        n="1"
        category="Definition"
        title="What Verified means"
        first
      >
        <div className="rounded-md border border-border bg-card shadow-sm p-6 t-body-md text-foreground/85 leading-[1.65]">
          {definition}
        </div>
      </SectionShell>

      {/* §2 Principles */}
      <SectionShell
        id="principles"
        n="2"
        category="Principles"
        title="Three operating principles"
        muted
      >
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {principles.map((p, i) => (
            <NumberedCell key={p.t} n={String(i + 1).padStart(2, "0")} title={p.t}>
              <p>{p.d}</p>
            </NumberedCell>
          ))}
        </ul>
      </SectionShell>

      {/* §3 Scope */}
      <SectionShell
        id="scope"
        n="3"
        category="Scope"
        title="What is in and out of scope"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-md border border-border bg-card shadow-sm overflow-hidden">
            <header className="px-5 py-3 border-b border-border bg-surface-muted/50">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground">
                Inside
              </p>
            </header>
            <ul className="divide-y divide-border">
              {inScope.map((s) => (
                <li key={s} className="flex items-center gap-3 px-5 py-3.5 t-body-sm text-foreground">
                  <Check className="h-4 w-4 text-verified shrink-0" strokeWidth={2.5} aria-hidden />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-border bg-card shadow-sm overflow-hidden">
            <header className="px-5 py-3 border-b border-border bg-surface-muted/50">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground">
                Outside
              </p>
            </header>
            <ul className="divide-y divide-border">
              {outOfScope.map((s) => (
                <li key={s} className="flex items-center gap-3 px-5 py-3.5 t-body-sm text-muted-foreground">
                  <X className="h-4 w-4 text-muted-foreground shrink-0" strokeWidth={2.5} aria-hidden />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionShell>

      {/* §4 Surveillance — Sovereign Audit */}
      <SectionShell
        id="surveillance"
        n="4"
        category="Surveillance"
        title="The Sovereign Audit"
        description="Verification is enforced through unannounced Blind Purchase Testing of active registry listings."
        muted
      >
        <ol className="flex flex-col gap-3">
          {surveillance.map((s, i) => (
            <NumberedCell key={s.t} n={String(i + 1).padStart(2, "0")} title={s.t}>
              <p>{s.d}</p>
            </NumberedCell>
          ))}
        </ol>
      </SectionShell>

      {/* §5 Examination Checklist */}
      <SectionShell
        id="examination"
        n="5"
        category="Examination"
        title="The audit checklist"
      >
        <ol className="flex flex-col gap-3">
          {examination.map((e, i) => (
            <NumberedCell key={e.t} n={String(i + 1).padStart(2, "0")} title={e.t}>
              <p>{e.d}</p>
            </NumberedCell>
          ))}
        </ol>
      </SectionShell>

      {/* §6 Limits */}
      <SectionShell
        id="limits"
        n="6"
        category="Limits"
        title="Jurisdictional limitations"
        muted
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
          // Jurisdictional Boundaries &amp; Limitations
        </p>
        <div className="rounded-md border border-border bg-card shadow-sm p-6 t-body-md text-foreground/85 leading-[1.65]">
          {limits}
        </div>
      </SectionShell>
    </div>
  );
};

export default HowItWorks;
