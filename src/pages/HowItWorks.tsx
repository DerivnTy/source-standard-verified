import { Shield, Search, FileCheck, Link2, AlertTriangle } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";
import { DocJumpBar } from "@/components/DocJumpBar";

// ---------- Data ----------

const definitionPoints: string[] = [
  "Verified means documented sourcing was substantiated at the time of review.",
  "It is a record of consistency, not a clinical endorsement or safety guarantee.",
];

const principles: { t: string; d: string }[] = [
  { t: "Source First", d: "We audit the pharmacy, not the storefront." },
  { t: "Evidence Only", d: "Status requires records, not marketing claims." },
  { t: "Snapshot Logic", d: "Verification is a time-bounded audit, not a permanent seal." },
];

const inScope: string[] = ["Licenses", "Entity Identity", "Pharmacy Records", "Invoices", "CoAs"];
const outOfScope: string[] = ["Pricing", "Clinical Outcomes", "Patient Experience"];

const examination: { t: string; d: string; Icon: typeof Shield }[] = [
  { t: "Identity", d: "Legal entity & registration check.", Icon: Search },
  { t: "Credentials", d: "State & DEA license verification.", Icon: Shield },
  { t: "Chain of Custody", d: "Pharmacy sourcing substantiation.", Icon: Link2 },
  { t: "Batch Records", d: "CoA & Lot documentation forensic review.", Icon: FileCheck },
];

const limits: string[] = [
  "No Medical Advice — we do not provide clinical recommendations.",
  "No Safety Guarantee — we do not certify biological efficacy.",
  "No Regulatory Power — Source Standard is a private registry, not a government body.",
];

const waypoints = [
  { id: "definition", number: "1", label: "Definition" },
  { id: "principles", number: "2", label: "Principles" },
  { id: "scope", number: "3", label: "Scope" },
  { id: "surveillance", number: "4", label: "Surveillance" },
  { id: "examination", number: "5", label: "Examination" },
  { id: "limits", number: "6", label: "Limits" },
];

// ---------- Building blocks ----------

/**
 * LedgerRow — Registry-style row: 20% mono number rail, 80% data column.
 * Sharp 90deg edges, 1px border-bottom, no whitespace bloat.
 */
const LedgerRow = ({
  id,
  n,
  category,
  title,
  children,
}: {
  id: string;
  n: string;
  category: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section
    id={id}
    className="scroll-mt-36 border-b border-border bg-background"
  >
    <div className="page-shell">
      <div className="mx-auto w-wide grid grid-cols-12 gap-6 py-10 md:py-12">
        {/* Number rail */}
        <div className="col-span-12 md:col-span-3 lg:col-span-3">
          <div className="font-mono text-[44px] md:text-[56px] leading-none font-medium tabular-nums text-foreground/85">
            {n.padStart(2, "0")}
          </div>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            § {category}
          </p>
        </div>
        {/* Data column */}
        <div className="col-span-12 md:col-span-9 lg:col-span-9 md:border-l md:border-border md:pl-8">
          <h2 className="font-mono text-[13px] uppercase tracking-[0.14em] font-semibold text-foreground">
            {title}
          </h2>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  </section>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="divide-y divide-border border-y border-border">
    {items.map((s) => (
      <li
        key={s}
        className="flex gap-3 py-3 text-[14px] leading-[1.55] text-foreground/85"
      >
        <span className="font-mono text-foreground/50 shrink-0">›</span>
        <span>{s}</span>
      </li>
    ))}
  </ul>
);

// ---------- Page ----------

const HowItWorks = () => {
  return (
    <div className="bg-background">
      <PageMeta
        title="How Verification Works"
        description="The Source Standard verification protocol: definition, principles, scope, sovereign audit, examination, and jurisdictional limits."
      />
      <Breadcrumb items={[{ label: "About", to: "/about" }, { label: "How Verification Works" }]} />
      <BriefingHero
        tone="navy"
        category="Verification Protocol"
        docId=""
        title="How Verification Works"
        statement="The review standard, the sovereign audit, and the boundaries of a determination."
      />
      <DocJumpBar waypoints={waypoints} tone="navy" />

      {/* §1 Definition */}
      <LedgerRow id="definition" n="1" category="Definition" title="What “Verified” Means">
        <BulletList items={definitionPoints} />
      </LedgerRow>

      {/* §2 Principles */}
      <LedgerRow id="principles" n="2" category="Principles" title="Operating Principles">
        <ul className="divide-y divide-border border-y border-border">
          {principles.map((p, i) => (
            <li key={p.t} className="grid grid-cols-12 gap-4 py-3.5">
              <div className="col-span-2 md:col-span-1 font-mono text-[12px] tabular-nums text-foreground/60 pt-0.5">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="col-span-10 md:col-span-11">
                <p className="font-mono text-[12px] uppercase tracking-[0.1em] font-semibold text-foreground">
                  {p.t}
                </p>
                <p className="mt-1 text-[14px] leading-[1.55] text-muted-foreground">{p.d}</p>
              </div>
            </li>
          ))}
        </ul>
      </LedgerRow>

      {/* §3 Scope */}
      <LedgerRow id="scope" n="3" category="Scope" title="Inside / Outside the Audit">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border">
          <div className="border-b md:border-b-0 md:border-r border-border">
            <header className="px-4 py-2.5 border-b border-border bg-surface-muted/60">
              <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-foreground">
                // Inside
              </p>
            </header>
            <ul className="divide-y divide-border">
              {inScope.map((s) => (
                <li
                  key={s}
                  className="px-4 py-2.5 text-[13.5px] text-foreground font-mono uppercase tracking-[0.04em]"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <header className="px-4 py-2.5 border-b border-border bg-surface-muted/60">
              <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-foreground">
                // Outside
              </p>
            </header>
            <ul className="divide-y divide-border">
              {outOfScope.map((s) => (
                <li
                  key={s}
                  className="px-4 py-2.5 text-[13.5px] text-muted-foreground font-mono uppercase tracking-[0.04em]"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </LedgerRow>

      {/* §4 Sovereign Surveillance — featured "teeth" zone */}
      <section
        id="surveillance"
        className="scroll-mt-36 border-b border-border bg-surface-muted/60"
      >
        <div className="page-shell">
          <div className="mx-auto w-wide grid grid-cols-12 gap-6 py-12 md:py-14">
            <div className="col-span-12 md:col-span-3">
              <div className="font-mono text-[44px] md:text-[56px] leading-none font-medium tabular-nums text-foreground">
                04
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/70">
                § Surveillance
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-destructive">
                Enforcement Zone
              </p>
            </div>
            <div className="col-span-12 md:col-span-9 md:border-l md:border-border md:pl-8">
              <h2 className="font-mono text-[13px] uppercase tracking-[0.14em] font-semibold text-foreground">
                Sovereign Surveillance &amp; Random Audit
              </h2>
              <p className="mt-3 text-[14px] leading-[1.6] text-foreground/80 max-w-[68ch]">
                Verification is enforced through unannounced testing of active registry listings.
                Failure results in immediate Removal and administrative penalties.
              </p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-0 border border-border bg-card">
                <div className="border-b md:border-b-0 md:border-r border-border p-5">
                  <div className="flex items-center gap-2">
                    <Search className="h-3.5 w-3.5 text-foreground" strokeWidth={2} aria-hidden />
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] font-semibold text-foreground">
                      // Blind Purchase Testing
                    </p>
                  </div>
                  <p className="mt-3 text-[14px] leading-[1.55] text-foreground/80">
                    We conduct unannounced “Silent Buys” from active listings to ensure product
                    integrity matches documented sourcing on file.
                  </p>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2">
                    <Shield className="h-3.5 w-3.5 text-foreground" strokeWidth={2} aria-hidden />
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] font-semibold text-foreground">
                      // Independent Lab Verification
                    </p>
                  </div>
                  <p className="mt-3 text-[14px] leading-[1.55] text-foreground/80">
                    Samples are sent to ISO-accredited facilities for Potency, Sterility, and
                    Identity testing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §5 Examination */}
      <LedgerRow id="examination" n="5" category="Examination" title="Audit Checklist">
        <ul className="divide-y divide-border border-y border-border">
          {examination.map((e, i) => (
            <li key={e.t} className="grid grid-cols-12 gap-4 py-3.5 items-start">
              <div className="col-span-2 md:col-span-1 font-mono text-[12px] tabular-nums text-foreground/60 pt-0.5">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="col-span-1 pt-1">
                <e.Icon className="h-3.5 w-3.5 text-foreground" strokeWidth={2} aria-hidden />
              </div>
              <div className="col-span-9 md:col-span-10">
                <p className="font-mono text-[12px] uppercase tracking-[0.1em] font-semibold text-foreground">
                  {e.t}
                </p>
                <p className="mt-1 text-[14px] leading-[1.55] text-muted-foreground">{e.d}</p>
              </div>
            </li>
          ))}
        </ul>
      </LedgerRow>

      {/* §6 Limits */}
      <LedgerRow id="limits" n="6" category="Limits" title="Jurisdictional Boundaries">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-destructive bg-background">
            <AlertTriangle className="h-3 w-3 text-destructive" strokeWidth={2.5} aria-hidden />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] font-semibold text-destructive">
              [!] Jurisdictional Limitations
            </span>
          </span>
        </div>
        <ul className="divide-y divide-border border-y border-border">
          {limits.map((l) => (
            <li
              key={l}
              className="flex gap-3 py-3 text-[14px] leading-[1.55] text-foreground/85"
            >
              <span className="font-mono text-foreground/50 shrink-0">›</span>
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </LedgerRow>
    </div>
  );
};

export default HowItWorks;
