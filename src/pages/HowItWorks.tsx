import { Check, X } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";
import { DocJumpBar } from "@/components/DocJumpBar";

// ---------- Data (chainsawed copy per spec) ----------

const definition: { t: string; d: string }[] = [
  {
    t: "Verified",
    d: "Records reviewed and substantiated at the time of publication.",
  },
  {
    t: "Scope",
    d: "Documentation consistency only. Not a medical endorsement or safety guarantee.",
  },
];

const principles: { t: string; d: string }[] = [
  { t: "Source over Storefront", d: "We audit the pharmacy, not the marketing." },
  { t: "Evidence over Claims", d: "Status requires records, not adjectives." },
  { t: "Snapshot in Time", d: "Verification is a fixed-interval audit, not a permanent seal." },
];

const inScope: string[] = [
  "Licenses",
  "Ownership",
  "Pharmacy Records",
  "CoAs",
  "Sourcing Invoices",
];

const outOfScope: string[] = [
  "Clinical Outcomes",
  "Pricing",
  "Patient Experience",
  "Marketing",
];

const examination: { t: string; d: string }[] = [
  { t: "Entity", d: "Legal name & ownership check." },
  { t: "Credentials", d: "State & DEA registration status." },
  { t: "Chain of Custody", d: "503A/B sourcing substantiation." },
  { t: "Batch Records", d: "CoA & Lot documentation review." },
  { t: "Integrity", d: "Website claims vs. audit evidence." },
];

const limits: { t: string; d: string }[] = [
  { t: "No Medical Advice", d: "We do not provide clinical recommendations." },
  { t: "No Safety Guarantee", d: "We do not certify biological efficacy." },
  { t: "No Regulatory Power", d: "We are a private registry, not a government body." },
];

const waypoints = [
  { id: "definition", number: "1", label: "DEF" },
  { id: "principles", number: "2", label: "PRIN" },
  { id: "scope", number: "3", label: "SCOPE" },
  { id: "examination", number: "5", label: "EXAM" },
  { id: "limits", number: "10", label: "LIMITS" },
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
        <div className="rounded-md border border-border bg-card shadow-sm overflow-hidden">
          <ul className="divide-y divide-border">
            {definition.map((d) => (
              <li
                key={d.t}
                className="grid grid-cols-12 gap-4 px-5 py-4 items-baseline"
              >
                <div className="col-span-3 md:col-span-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground">
                  {d.t}
                </div>
                <div className="col-span-9 md:col-span-10 t-body-sm text-foreground/85 leading-[1.6]">
                  {d.d}
                </div>
              </li>
            ))}
          </ul>
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
                In-Scope
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
                Out-of-Scope
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

      {/* §5 Examination Areas */}
      <SectionShell
        id="examination"
        n="5"
        category="Examination Areas"
        title="The audit checklist"
        muted
      >
        <ol className="flex flex-col gap-3">
          {examination.map((e, i) => (
            <NumberedCell key={e.t} n={String(i + 1).padStart(2, "0")} title={e.t}>
              <p>{e.d}</p>
            </NumberedCell>
          ))}
        </ol>
      </SectionShell>

      {/* §10 Limits — jurisdictional ledger */}
      <SectionShell
        id="limits"
        n="10"
        category="Limits"
        title="Jurisdictional limitations"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
          // Jurisdictional Boundaries &amp; Limitations
        </p>
        <div className="rounded-md border border-border bg-card shadow-sm overflow-hidden">
          <ul className="divide-y divide-border">
            {limits.map((l, i) => (
              <li
                key={l.t}
                className="grid grid-cols-12 gap-4 px-5 py-4 items-baseline"
              >
                <div className="col-span-2 md:col-span-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground tabular-nums">
                  L{i + 1}
                </div>
                <div className="col-span-10 md:col-span-4 t-body-sm font-semibold text-foreground">
                  {l.t}
                </div>
                <div className="col-span-12 md:col-span-7 t-body-sm text-muted-foreground leading-[1.6]">
                  {l.d}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </SectionShell>
    </div>
  );
};

export default HowItWorks;
