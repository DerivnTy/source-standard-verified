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

/* ───────────────── Live Dashboard ─────────────────
   Surgical 3-cell strip. 14px Inter Semi-bold value, 10px Geist Mono caps
   label, 0.5px hairline divisions, no shadows, no chunky borders. */
const LiveDashboard = () => {
  const stats = useMemo(() => {
    const total = vendors.length;
    const states = new Set(
      vendors.map((v) => (v as { state?: string }).state).filter(Boolean)
    ).size;
    const verified = vendors.filter((v) => v.status === "verified").length;
    return { total, states, verified };
  }, []);

  const Cell = ({
    value,
    label,
    live = false,
  }: {
    value: number | string;
    label: string;
    live?: boolean;
  }) => (
    <div className="flex flex-col items-center justify-center text-center px-4 py-5">
      {/* Label on top — small, muted, mono */}
      <span
        className="font-mono uppercase text-muted-foreground"
        style={{ fontSize: "10px", letterSpacing: "0.08em", fontWeight: 500 }}
      >
        {label}
      </span>
      {/* Number below — heavier weight, optional red live dot to its left */}
      <div className="mt-2 flex items-center justify-center gap-2">
        {live && (
          <span
            aria-hidden
            className="relative inline-flex h-1.5 w-1.5"
          >
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{ backgroundColor: "#FF3B30", opacity: 0.55 }}
            />
            <span
              className="relative inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: "#FF3B30" }}
            />
          </span>
        )}
        <span
          className="font-sans text-foreground tabular-nums"
          style={{ fontSize: "20px", lineHeight: "1.1", fontWeight: 600, letterSpacing: "-0.01em" }}
        >
          {typeof value === "number" ? value.toLocaleString("en-US") : value}
        </span>
      </div>
    </div>
  );

  return (
    <section
      aria-label="Live registry dashboard"
      className="bg-background"
      style={{ paddingTop: "20px", paddingBottom: "24px" }}
    >
      <div className="page-shell">
        <div className="mx-auto w-standard">
          {/* Section header — matches "CONTENTS" label cadence */}
          <div className="mb-3 flex items-center gap-2">
            <span
              className="font-mono uppercase text-muted-foreground"
              style={{ fontSize: "10px", letterSpacing: "0.12em", fontWeight: 500 }}
            >
              Live Tracking
            </span>
            <span
              aria-hidden
              className="h-px flex-1 bg-border"
            />
          </div>

          <div
            className="grid grid-cols-3 bg-card"
            style={{
              border: "0.5px solid hsl(var(--border))",
              borderRadius: "10px",
            }}
          >
            <div style={{ borderRight: "0.5px solid hsl(var(--border))" }}>
              <Cell value={stats.total} label="Total Sources" />
            </div>
            <div style={{ borderRight: "0.5px solid hsl(var(--border))" }}>
              <Cell value={stats.states} label="States Covered" />
            </div>
            <div>
              <Cell value={stats.verified} label="Verified" live />
            </div>
          </div>
        </div>
      </div>
    </section>
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
    <PillPrimaryWhite to="/directory">Search the Registry</PillPrimaryWhite>
    <PillSecondaryWhite to="/apply">For Vendors</PillSecondaryWhite>
  </>
);

/* ───────────────── Static section data ───────────────── */

const howItWorks = [
  {
    h: "Map the facilities.",
    b: "Track licensed 503A and 503B compounding pharmacies as an upstream reference layer.",
  },
  {
    h: "Audit the vendors.",
    b: "Clinics substantiate sourcing with documentation tied to those pharmacy relationships.",
  },
  {
    h: "Publish the record.",
    b: "Outcomes are published publicly. Unsubstantiated claims remain Unverified.",
  },
];

const registryFields = [
  {
    h: "Verification status",
    b: "Whether documented sourcing verification is published, under review, or not on file.",
  },
  {
    h: "Fulfillment model",
    b: "Whether the vendor operates as a local clinic, an online platform, or hybrid.",
  },
  {
    h: "Clinical focus",
    b: "The therapeutic categories the vendor publicly operates within.",
  },
  {
    h: "Upstream sources",
    b: "The licensed pharmacies the vendor is documented to source from.",
  },
];

const whyMatters = [
  {
    h: "For consumers",
    b: "Instant clarity on whether a clinic's sourcing is documented against licensed records.",
  },
  {
    h: "For vendors",
    b: "A public trust standard tied to substantiated sourcing, not presentation alone.",
  },
  {
    h: "For doctors",
    b: "A structured reference for evaluating whether a vendor operates with documented sources.",
  },
];

const basics = [
  {
    t: "What \"Verified\" means",
    s: "The audit standard a listing must meet to carry Source Standard verification.",
    to: "/library/what-source-standard-verification-actually-means",
  },
  {
    t: "503A vs. 503B",
    s: "The two regulatory categories of licensed compounding pharmacy.",
    to: "/library/what-is-compounding",
  },
  {
    t: "The patient checklist",
    s: "The sourcing questions every clinic should be able to answer directly.",
    to: "/library/questions-to-ask-your-clinic",
  },
];

const governanceLinks = [
  { k: "Advisory Board", to: "/medical-advisory", s: "Independent medical oversight panel." },
  { k: "Audit Methodology", to: "/governance", s: "How verification is conducted and scoped." },
  { k: "Status Definitions", to: "/status-definitions", s: "Definitions of every public listing status." },
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
        title="Source Standard · The United States Public Peptide Registry"
        description="We verify clinical sourcing so you don't have to. Source Standard cross-references clinics and vendors against licensed pharmacy records to separate documented medical sourcing from the grey market."
      />

      {/* §1 — Hero */}
      <BriefingHero
        variant="cover"
        category="United States Public Peptide Registry"
        docId=""
        title="The United States Public Peptide Registry"
        statement="We verify clinical sourcing so you don't have to. Source Standard cross-references clinics and vendors against licensed pharmacy records to separate documented medical sourcing from the grey market."
        tone="navy"
        actions={<HeroActions />}
      />

      <DocJumpBar waypoints={homeWaypoints} />
      <LiveDashboard />

      {/* §2 — The trust problem */}
      <section
        aria-labelledby="trust-problem"
        className="bg-background border-b border-border"
        style={{ paddingTop: "48px", paddingBottom: "48px" }}
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
              Branding is not documentation.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-[64ch]" style={{ fontSize: "13px", lineHeight: "1.65" }}>
              Marketing claims are easy to make and difficult to prove. Source Standard
              audits the supply chain so the public can verify whether what is being sold
              is supported by documented sourcing.
            </p>
            <div className="mt-5">
              <PillPrimary to="/how-it-works">View Full Report</PillPrimary>
            </div>
          </div>
        </div>
      </section>

      {/* §3 — How it works */}
      <section
        aria-labelledby="how-it-works"
        className="border-b border-border bg-background"
        style={{ paddingTop: "48px", paddingBottom: "48px" }}
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

            <div className="mt-5">
              <PillPrimary to="/verified-vendors">Access the Registry</PillPrimary>
            </div>
          </div>
        </div>
      </section>

      {/* §4 — Live registry */}
      <section
        aria-labelledby="live-registry"
        className="border-b border-border bg-background"
        style={{ paddingTop: "48px", paddingBottom: "48px" }}
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
              Total market visibility.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-[64ch]" style={{ fontSize: "13px", lineHeight: "1.65" }}>
              Our database tracks the peptide economy as a live public-reference system.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <PillPrimary to="/directory">Search Verified Vendors</PillPrimary>
              <PillSecondary to="/greenlist">Explore Greenlist</PillSecondary>
            </div>
          </div>
        </div>
      </section>

      {/* §5 — Registry fields */}
      <section
        aria-labelledby="registry-shows"
        className="border-b border-border bg-background"
        style={{ paddingTop: "48px", paddingBottom: "48px" }}
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
              Search. Verify. Proceed.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-[64ch]" style={{ fontSize: "13px", lineHeight: "1.65" }}>
              Every listing provides a structured snapshot of public sourcing status.
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

            <div className="mt-5">
              <PillSecondary to="/directory">Open the Registry</PillSecondary>
            </div>
          </div>
        </div>
      </section>

      {/* §6 — Function of the framework */}
      <section
        aria-labelledby="why-matters"
        className="border-b border-border bg-background"
        style={{ paddingTop: "48px", paddingBottom: "48px" }}
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
        style={{ paddingTop: "48px", paddingBottom: "48px" }}
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

            <div className="mt-5">
              <PillSecondary to="/education">Browse Resource Library</PillSecondary>
            </div>
          </div>
        </div>
      </section>

      {/* §8 — Governance & standards */}
      <section
        aria-labelledby="governance"
        className="border-b border-border bg-background"
        style={{ paddingTop: "48px", paddingBottom: "48px" }}
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
        style={{ paddingTop: "48px", paddingBottom: "48px" }}
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
              Access the Verified Registry.
            </h2>
            <div className="mt-5">
              <PillPrimaryWhite to="/verified-vendors">Enter Registry</PillPrimaryWhite>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
