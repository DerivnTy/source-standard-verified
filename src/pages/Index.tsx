import { useMemo } from "react";
import { Link } from "react-router-dom";

import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { DocJumpBar } from "@/components/DocJumpBar";
import { vendors } from "@/data/vendors";

const homeWaypoints = [
  { id: "trust-problem", number: "1", label: "Problem" },
  { id: "how-it-works", number: "2", label: "How it works" },
  { id: "live-registry", number: "3", label: "Registry" },
  { id: "registry-shows", number: "4", label: "Fields" },
  { id: "why-matters", number: "5", label: "Function" },
  { id: "basics", number: "6", label: "Reference" },
  { id: "governance", number: "7", label: "Governance" },
];

/* ───────────────── Hero Metrics ─────────────────
   Two-cell live tracking module embedded in the navy hero. White-on-navy
   adaptive typography, vibrant colored pulse dots, hairline vertical
   separator. */
const HeroMetrics = () => {
  const stats = useMemo(() => {
    const total = vendors.length;
    const verified = vendors.filter((v) => v.status === "verified").length;
    return { total, verified };
  }, []);

  const Unit = ({
    value,
    label,
    dotColor,
  }: {
    value: number;
    label: string;
    dotColor: string;
  }) => (
    <div className="flex flex-col items-center text-center">
      <div className="flex items-center justify-center" style={{ gap: "8px" }}>
        <span aria-hidden className="relative inline-flex" style={{ width: "6px", height: "6px" }}>
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{ backgroundColor: dotColor, opacity: 0.6 }}
          />
          <span
            className="relative inline-block rounded-full"
            style={{
              width: "6px",
              height: "6px",
              backgroundColor: dotColor,
              boxShadow: `0 0 6px ${dotColor}`,
            }}
          />
        </span>
        <span
          className="font-sans text-white tabular-nums"
          style={{
            fontSize: "28px",
            lineHeight: "1",
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          {value.toLocaleString("en-US")}
        </span>
      </div>
      <span
        className="font-mono uppercase text-white/65"
        style={{
          fontSize: "10px",
          lineHeight: "12px",
          letterSpacing: "0.18em",
          fontWeight: 500,
          marginTop: "8px",
        }}
      >
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col items-center w-full" style={{ maxWidth: "360px" }}>
      <span
        className="font-sans text-white text-center"
        style={{
          fontSize: "15px",
          lineHeight: "1.5",
          fontWeight: 400,
          letterSpacing: "0",
        }}
      >
        Live Registry
      </span>
      <span
        aria-hidden
        className="block bg-white/25"
        style={{ height: "1px", width: "75%", marginTop: "12px", marginBottom: "20px" }}
      />
      <div
        role="group"
        aria-label="Live registry metrics"
        className="flex items-start justify-center w-full"
        style={{ gap: "48px" }}
      >
        <Unit value={stats.total} label="Identified Vendors" dotColor="#FF3B30" />
        <Unit value={stats.verified} label="Verified Records" dotColor="#22C55E" />
      </div>
    </div>
  );
};

/* ───────────────── Pill buttons (unified) ─────────────────
   Single pill style — 32px height, 20px radius, 1px hairline.
   Variants: navy primary / white secondary. Mirrors filter-pill geometry. */
const pillBase =
  "inline-flex items-center justify-center font-sans font-semibold uppercase transition-all active:scale-[0.97]";
const pillStyle = {
  height: "32px",
  padding: "0 14px",
  borderRadius: "20px",
  fontSize: "11px",
  letterSpacing: "0.06em",
  borderWidth: "1px",
  borderStyle: "solid" as const,
};

const PillPrimary = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className={`${pillBase} bg-primary text-primary-foreground hover:opacity-90`}
    style={{ ...pillStyle, borderColor: "hsl(var(--primary))" }}
  >
    {children}
  </Link>
);

const PillSecondary = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className={`${pillBase} bg-card text-foreground hover:bg-muted`}
    style={{ ...pillStyle, borderColor: "hsl(var(--border))" }}
  >
    {children}
  </Link>
);

const PillPrimaryWhite = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className={`${pillBase} bg-white text-[hsl(var(--navy-surface))] hover:bg-white/90`}
    style={{ ...pillStyle, borderColor: "white" }}
  >
    {children}
  </Link>
);

const PillSecondaryWhite = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className={`${pillBase} bg-transparent text-white hover:bg-white/10`}
    style={{ ...pillStyle, borderColor: "white" }}
  >
    {children}
  </Link>
);

const HeroActions = () => (
  <>
    <PillPrimaryWhite to="/verified-vendors">Search the Registry</PillPrimaryWhite>
    <PillSecondaryWhite to="/protocol">View Verification Protocol</PillSecondaryWhite>
  </>
);

/* ───────────────── Hero Meta Strip ─────────────────
   Compact 3-column institutional readout anchoring the bottom of the navy hero. */
const HeroMeta = () => {
  const total = vendors.length;
  const items: { label: string; value: string }[] = [
    { label: "Private Standard", value: "Documentation-first review" },
    { label: "Public Registry", value: "Searchable vendor status" },
    { label: "Live Data", value: `${total.toLocaleString("en-US")} vendors indexed` },
  ];
  return (
    <div
      role="group"
      aria-label="Source Standard verification metadata"
      className="grid"
      style={{
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: "20px",
      }}
    >
      {items.map((it) => (
        <div key={it.label} className="flex flex-col">
          <span
            className="font-mono uppercase"
            style={{
              fontSize: "10px",
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.55)",
              fontWeight: 500,
            }}
          >
            {it.label}
          </span>
          <span
            className="font-sans"
            style={{
              marginTop: "6px",
              fontSize: "12px",
              lineHeight: 1.35,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            {it.value}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ───────────────── Static section data ───────────────── */

const howItWorks = [
  {
    h: "Map the vendors.",
    b: "Index vendors across peptides, TRT, HRT, GLP-1, longevity compounds, and other compounded therapy categories.",
  },
  {
    h: "Review the documentation.",
    b: "Evaluate sourcing claims, pharmacy relationships, chain-of-custody records, and submitted evidence within a defined review scope.",
  },
  {
    h: "Publish the status.",
    b: "Vendor records display the current documentation status. Claims without sufficient reviewed documentation remain Unverified.",
  },
];

const registryFields = [
  {
    h: "Verification status",
    b: "Whether documentation review is published, in progress, suspended, removed, or not on file.",
  },
  {
    h: "Vendor type",
    b: "Whether the vendor operates as a telehealth platform, physical clinic, hybrid provider, or online vendor.",
  },
  {
    h: "Therapy category",
    b: "The compounded therapy categories associated with the vendor record.",
  },
  {
    h: "Sourcing evidence",
    b: "The pharmacy relationships, documentation trails, and chain-of-custody records reviewed within the defined scope.",
  },
];

const whyMatters = [
  {
    h: "For consumers",
    b: "A public record showing what has been reviewed, what remains unverified, and when the status was last updated.",
  },
  {
    h: "For vendors",
    b: "A documentation-based verification pathway tied to sourcing claims, pharmacy relationships, and status history.",
  },
  {
    h: "For clinicians",
    b: "A structured reference for reviewing whether a vendor's sourcing claims are supported by documentation.",
  },
];

const basics = [
  {
    t: "What \"Verified\" means",
    s: "The documentation standard a vendor record must meet to display Verified status.",
    to: "/library/what-source-standard-verification-actually-means",
  },
  {
    t: "503A and 503B sourcing",
    s: "The licensed compounding pharmacy categories used in sourcing documentation review.",
    to: "/library/what-is-compounding",
  },
  {
    t: "Consumer review checklist",
    s: "The sourcing and documentation questions consumers should know before evaluating a vendor.",
    to: "/library/questions-to-ask-your-clinic",
  },
];

const governanceLinks = [
  { k: "Advisory Board", to: "/medical-advisory", s: "Medical and procedural oversight for education, standards, and review boundaries." },
  { k: "Verification Protocol", to: "/governance", s: "How vendor documentation review is conducted, scoped, and recorded." },
  { k: "Status Definitions", to: "/status-definitions", s: "Definitions for every public vendor status displayed in the registry." },
];

/* ───────────────── Data Strip primitive ───────────────── */

const DataStrip = ({
  index,
  total,
  title,
  desc,
  to,
}: {
  index: number;
  total: number;
  title: string;
  desc: string;
  to?: string;
}) => {
  const indexLabel = `${(index + 1).toString().padStart(2, "0")} / ${total
    .toString()
    .padStart(2, "0")}`;
  const Inner = (
    <>
      <div className="flex items-center justify-between gap-x-3">
        <h3
          className="truncate font-sans font-semibold text-foreground"
          style={{ fontSize: "14px" }}
        >
          {title}
        </h3>
        <span
          className="font-mono text-muted-foreground tabular-nums shrink-0"
          style={{ fontSize: "10px", letterSpacing: "0.06em" }}
        >
          {indexLabel}
        </span>
      </div>
      <div className="flex items-center justify-between gap-x-3 mt-0.5">
        <p
          className="truncate text-muted-foreground"
          style={{ fontSize: "12px" }}
        >
          {desc}
        </p>
        {to && (
          <span
            className="font-sans font-bold uppercase text-primary shrink-0"
            style={{ fontSize: "10px", letterSpacing: "0.06em" }}
          >
            View ›
          </span>
        )}
      </div>
    </>
  );
  const baseStyle = {
    border: "0.5px solid hsl(var(--border))",
    borderRadius: "20px",
    padding: "10px 12px",
  };
  return to ? (
    <Link
      to={to}
      className="group block bg-card transition-all active:scale-[0.97] hover:bg-muted"
      style={baseStyle}
    >
      {Inner}
    </Link>
  ) : (
    <div className="bg-card" style={baseStyle}>
      {Inner}
    </div>
  );
};

/* ───────────────── Page ───────────────── */

const Index = () => {
  return (
    <>
      <PageMeta
        title="Source Standard · Independent Verification for Compounded Therapy Vendors"
        description="Source Standard reviews vendor sourcing claims, pharmacy relationships, and documentation trails across peptides, TRT, HRT, GLP-1, longevity compounds, and other compounded therapies."
      />

      {/* §1 — Hero */}
      <BriefingHero
        variant="cover"
        category="Public Reference System · United States"
        docId=""
        title="Independent Verification for Compounded Therapy Vendors"
        statement="Source Standard reviews vendor sourcing claims, pharmacy relationships, and documentation trails across peptides, TRT, HRT, GLP-1, longevity compounds, and other compounded therapies."
        tone="navy"
        actions={<HeroActions />}
        heroMetrics={<HeroMetrics />}
        
      />

      <DocJumpBar waypoints={homeWaypoints} />

      {/* §2 — The trust problem */}
      <section
        aria-labelledby="trust-problem"
        className="bg-background border-b border-border"
        style={{ paddingTop: "36px", paddingBottom: "36px" }}
      >
        <div className="page-shell">
          <div className="mx-auto w-standard">
            <p
              className="font-mono uppercase text-muted-foreground"
              style={{ fontSize: "10px", letterSpacing: "0.08em" }}
            >
              01 · Problem
            </p>
            <h2
              id="trust-problem"
              className="mt-3 font-sans font-semibold text-foreground"
              style={{ fontSize: "22px", lineHeight: "1.25", letterSpacing: "-0.01em" }}
            >
              Claims are not documentation.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-[64ch]" style={{ fontSize: "13px", lineHeight: "1.65" }}>
              Vendors make public sourcing claims across compounded therapy categories. Source Standard reviews those claims against submitted documentation, public records, and pharmacy relationship evidence.
            </p>
            <div className="mt-3">
              <PillPrimary to="/how-it-works">View Verification Protocol</PillPrimary>
            </div>
          </div>
        </div>
      </section>

      {/* §3 — How it works */}
      <section
        aria-labelledby="how-it-works"
        className="border-b border-border bg-background"
        style={{ paddingTop: "36px", paddingBottom: "36px" }}
      >
        <div className="page-shell">
          <div className="mx-auto w-standard">
            <p
              className="font-mono uppercase text-muted-foreground"
              style={{ fontSize: "10px", letterSpacing: "0.08em" }}
            >
              02 · Methodology
            </p>
            <h2
              id="how-it-works"
              className="mt-3 font-sans font-semibold text-foreground"
              style={{ fontSize: "22px", lineHeight: "1.25", letterSpacing: "-0.01em" }}
            >
              How Source Standard Works
            </h2>

            <div className="mt-5 flex flex-col gap-2">
              {howItWorks.map((s, i) => (
                <DataStrip
                  key={s.h}
                  index={i}
                  total={howItWorks.length}
                  title={s.h}
                  desc={s.b}
                />
              ))}
            </div>

            <div className="mt-3">
              <PillPrimary to="/verified-vendors">Access the Registry</PillPrimary>
            </div>
          </div>
        </div>
      </section>

      {/* §4 — Live registry */}
      <section
        aria-labelledby="live-registry"
        className="border-b border-border bg-background"
        style={{ paddingTop: "36px", paddingBottom: "36px" }}
      >
        <div className="page-shell">
          <div className="mx-auto w-standard">
            <p
              className="font-mono uppercase text-muted-foreground"
              style={{ fontSize: "10px", letterSpacing: "0.08em" }}
            >
              03 · Registry
            </p>
            <h2
              id="live-registry"
              className="mt-3 font-sans font-semibold text-foreground"
              style={{ fontSize: "22px", lineHeight: "1.25", letterSpacing: "-0.01em" }}
            >
              Unified market visibility.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-[64ch]" style={{ fontSize: "13px", lineHeight: "1.65" }}>
              The Source Standard registry tracks compounded therapy vendors in one public-reference system. Therapy category is metadata. Verification status is assigned through the same documentation framework.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <PillPrimary to="/verified-vendors">Search the Registry</PillPrimary>
              <PillSecondary to="/greenlist">Explore Upstream Registry</PillSecondary>
            </div>
          </div>
        </div>
      </section>

      {/* §5 — Registry fields */}
      <section
        aria-labelledby="registry-shows"
        className="border-b border-border bg-background"
        style={{ paddingTop: "36px", paddingBottom: "36px" }}
      >
        <div className="page-shell">
          <div className="mx-auto w-standard">
            <p
              className="font-mono uppercase text-muted-foreground"
              style={{ fontSize: "10px", letterSpacing: "0.08em" }}
            >
              04 · Fields
            </p>
            <h2
              id="registry-shows"
              className="mt-3 font-sans font-semibold text-foreground"
              style={{ fontSize: "22px", lineHeight: "1.25", letterSpacing: "-0.01em" }}
            >
              Search. Review. Verify status.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-[64ch]" style={{ fontSize: "13px", lineHeight: "1.65" }}>
              Each listing provides a structured snapshot of vendor documentation status and sourcing review scope.
            </p>

            <div className="mt-5 flex flex-col gap-2">
              {registryFields.map((f, i) => (
                <DataStrip
                  key={f.h}
                  index={i}
                  total={registryFields.length}
                  title={f.h}
                  desc={f.b}
                />
              ))}
            </div>

            <div className="mt-3">
              <PillSecondary to="/verified-vendors">Open the Registry</PillSecondary>
            </div>
          </div>
        </div>
      </section>

      {/* §6 — Function of the framework */}
      <section
        aria-labelledby="why-matters"
        className="border-b border-border bg-background"
        style={{ paddingTop: "36px", paddingBottom: "36px" }}
      >
        <div className="page-shell">
          <div className="mx-auto w-standard">
            <p
              className="font-mono uppercase text-muted-foreground"
              style={{ fontSize: "10px", letterSpacing: "0.08em" }}
            >
              05 · Function
            </p>
            <h2
              id="why-matters"
              className="mt-3 font-sans font-semibold text-foreground"
              style={{ fontSize: "22px", lineHeight: "1.25", letterSpacing: "-0.01em" }}
            >
              Function of the framework
            </h2>

            <div className="mt-5 flex flex-col gap-2">
              {whyMatters.map((w, i) => (
                <DataStrip
                  key={w.h}
                  index={i}
                  total={whyMatters.length}
                  title={w.h}
                  desc={w.b}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* §7 — Foundational reference */}
      <section
        aria-labelledby="basics"
        className="border-b border-border bg-background"
        style={{ paddingTop: "36px", paddingBottom: "36px" }}
      >
        <div className="page-shell">
          <div className="mx-auto w-standard">
            <p
              className="font-mono uppercase text-muted-foreground"
              style={{ fontSize: "10px", letterSpacing: "0.08em" }}
            >
              06 · Reference
            </p>
            <h2
              id="basics"
              className="mt-3 font-sans font-semibold text-foreground"
              style={{ fontSize: "22px", lineHeight: "1.25", letterSpacing: "-0.01em" }}
            >
              Foundational reference
            </h2>

            <div className="mt-5 flex flex-col gap-2">
              {basics.map((b, i) => (
                <DataStrip
                  key={b.t}
                  index={i}
                  total={basics.length}
                  title={b.t}
                  desc={b.s}
                  to={b.to}
                />
              ))}
            </div>

            <div className="mt-3">
              <PillSecondary to="/education">Browse Resource Library</PillSecondary>
            </div>
          </div>
        </div>
      </section>

      {/* §8 — Governance & standards */}
      <section
        aria-labelledby="governance"
        className="border-b border-border bg-background"
        style={{ paddingTop: "36px", paddingBottom: "36px" }}
      >
        <div className="page-shell">
          <div className="mx-auto w-standard">
            <p
              className="font-mono uppercase text-muted-foreground"
              style={{ fontSize: "10px", letterSpacing: "0.08em" }}
            >
              07 · Governance
            </p>
            <h2
              id="governance"
              className="mt-3 font-sans font-semibold text-foreground"
              style={{ fontSize: "22px", lineHeight: "1.25", letterSpacing: "-0.01em" }}
            >
              Governance and standards
            </h2>

            <div className="mt-5 flex flex-col gap-2">
              {governanceLinks.map((g, i) => (
                <DataStrip
                  key={g.k}
                  index={i}
                  total={governanceLinks.length}
                  title={g.k}
                  desc={g.s}
                  to={g.to}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* §9 — Final CTA */}
      <section
        aria-labelledby="enter-registry"
        className="bg-[hsl(var(--navy-surface))]"
        style={{ paddingTop: "36px", paddingBottom: "36px" }}
      >
        <div className="page-shell">
          <div className="mx-auto w-standard">
            <p
              className="font-mono uppercase text-white/60"
              style={{ fontSize: "10px", letterSpacing: "0.08em" }}
            >
              08 · Access
            </p>
            <h2
              id="enter-registry"
              className="mt-3 font-sans font-semibold text-white"
              style={{ fontSize: "22px", lineHeight: "1.25", letterSpacing: "-0.01em" }}
            >
              Access the Vendor Registry.
            </h2>
            <div className="mt-3">
              <PillPrimaryWhite to="/verified-vendors">Enter Registry</PillPrimaryWhite>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
