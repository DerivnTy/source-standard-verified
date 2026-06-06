import { useMemo } from "react";
import { Link } from "react-router-dom";

import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { DocJumpBar } from "@/components/DocJumpBar";
import { vendors } from "@/data/vendors";
import lockup from "@/assets/source-standard-lockup-dark.png";

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
    dotColor?: string;
  }) => (
    <div className="flex flex-col items-center text-center">
      <div className="relative inline-flex items-center justify-center">
        {dotColor && (
          <span
            aria-hidden
            className="absolute inline-flex"
            style={{ width: "6px", height: "6px", left: "-14px", top: "50%", transform: "translateY(-50%)" }}
          >
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
                boxShadow: `0 0 8px ${dotColor}`,
              }}
            />
          </span>
        )}
        <span
          className="font-sans text-white tabular-nums"
          style={{
            fontSize: "clamp(30px, 4vw, 40px)",
            lineHeight: "1",
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          {value.toLocaleString("en-US")}
        </span>
      </div>
      <span
        className="font-mono uppercase text-white/85"
        style={{
          fontSize: "11px",
          lineHeight: "14px",
          letterSpacing: "0.16em",
          fontWeight: 500,
          marginTop: "8px",
        }}
      >
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col items-center w-full" style={{ maxWidth: "420px" }}>
      <span
        className="font-sans text-white text-center"
        style={{
          fontSize: "clamp(20px, 3vw, 28px)",
          lineHeight: 1.1,
          fontWeight: 600,
          letterSpacing: "-0.02em",
        }}
      >
        Live Registry
      </span>
      <span
        aria-hidden
        className="block bg-white/30"
        style={{ height: "1px", width: "80%", marginTop: "10px", marginBottom: "16px" }}
      />
      <div
        role="group"
        aria-label="Live registry metrics"
        className="flex items-start justify-center w-full"
        style={{ gap: "48px" }}
      >
        <Unit value={stats.total} label="Identified Vendors" dotColor="#FF3B30" />
        <Unit value={50} label="States Represented" />
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
    <PillSecondaryWhite to="/how-it-works">View Verification Framework</PillSecondaryWhite>
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
    h: "Index the market.",
    b: "Identify and maintain records for compounded therapy vendors, pharmacies, manufacturers, and supply-chain relationships.",
  },
  {
    h: "Verify the evidence.",
    b: "Review sourcing documentation, pharmacy relationships, manufacturer records, chain-of-custody evidence, and independent testing data within a defined review scope.",
  },
  {
    h: "Assign the status.",
    b: "Vendor, manufacturer, and supply-chain records receive a public status based on available evidence and ongoing verification activity.",
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
    h: "Verification scope",
    b: "The documentation, supply-chain relationships, manufacturer information, and testing activity included within the published review scope.",
  },
];

const whyMatters = [
  {
    h: "For consumers",
    b: "A public verification record showing what has been reviewed, what remains unsupported, what testing has occurred, and when status changes were issued.",
  },
  {
    h: "For vendors",
    b: "An independent verification pathway that evaluates sourcing claims, manufacturer relationships, supply-chain documentation, and testing outcomes.",
  },
  {
    h: "For clinicians",
    b: "A structured reference for evaluating sourcing transparency, verification activity, and supply-chain credibility before making referral or purchasing decisions.",
  },
];

const basics = [
  {
    t: "Verification Framework",
    s: "The standards, procedures, and evidence requirements used throughout the registry.",
    to: "/how-it-works",
  },
  {
    t: "Status Definitions",
    s: "Definitions for Verified, Identified, Under Review, Suspended, Removed, and other public statuses.",
    to: "/status-definitions",
  },
  {
    t: "Supply Chain Standards",
    s: "The verification principles applied to vendors, pharmacies, manufacturers, and related supply-chain entities.",
    to: "/governance",
  },
];

const governanceLinks = [
  { k: "Advisory Board", to: "/medical-advisory", s: "Independent medical, scientific, and procedural guidance supporting framework development and review standards." },
  { k: "Verification Framework", to: "/how-it-works", s: "The procedures used to evaluate documentation, supply chains, manufacturers, and testing outcomes." },
  { k: "Status Definitions", to: "/status-definitions", s: "Definitions governing every public status displayed throughout the registry." },
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
      <div className="flex items-start justify-between gap-x-3">
        <h3
          className="font-sans font-semibold text-foreground"
          style={{ fontSize: "14px", lineHeight: "1.35" }}
        >
          {title}
        </h3>
        <span
          className="font-mono text-muted-foreground tabular-nums shrink-0"
          style={{ fontSize: "10px", letterSpacing: "0.06em", marginTop: "2px" }}
        >
          {indexLabel}
        </span>
      </div>
      <p
        className="text-muted-foreground"
        style={{ fontSize: "13px", lineHeight: "1.55", marginTop: "5px" }}
      >
        {desc}
      </p>
      {to && (
        <div className="mt-2">
          <span
            className="font-sans font-bold uppercase text-primary"
            style={{ fontSize: "10px", letterSpacing: "0.06em" }}
          >
            View ›
          </span>
        </div>
      )}
    </>
  );
  const baseStyle = {
    border: "0.5px solid hsl(var(--border))",
    borderRadius: "12px",
    padding: "16px 18px",
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
        title="Source Standard · Verify the source."
        description="Source Standard reviews vendor sourcing claims, pharmacy relationships, and documentation trails across peptides, TRT, HRT, GLP-1, longevity compounds, and other compounded therapies."
        path="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Source Standard",
            url: "https://sourcestandard.org/",
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Source Standard",
            url: "https://sourcestandard.org/",
            logo: "https://sourcestandard.org/placeholder.svg",
          },
        ]}
      />

      {/* §1 — Hero */}
      <style>{`
        @keyframes scrollCue {
          0%, 100% { transform: translate(-50%, 0); opacity: 0.35; }
          50% { transform: translate(-50%, 5px); opacity: 0.7; }
        }

        /* ────────────── Desktop polish (≥1024px) ──────────────
           Mobile is locked. These overrides only kick in on lg+
           to scale type, padding, and centering for desktop. */
        @media (min-width: 1024px) {
          /* Hero — center the cover content, lift the H1, widen the lead */
          .home-hero h1#briefing-title {
            text-align: center !important;
            margin-left: auto;
            margin-right: auto;
            max-width: 14ch !important;
            font-size: clamp(64px, 6.4vw, 84px) !important;
            line-height: 1.02 !important;
            letter-spacing: -0.035em !important;
          }
          .home-hero h1#briefing-title + p {
            text-align: center !important;
            margin-left: auto !important;
            margin-right: auto !important;
            max-width: 640px !important;
            font-size: 19px !important;
            line-height: 1.55 !important;
            margin-top: 28px !important;
          }
          .home-hero h1#briefing-title ~ div.flex.justify-center {
            justify-content: center !important;
            margin-top: 44px !important;
          }
          .home-hero h1#briefing-title ~ div.flex.flex-col.sm\\:flex-row {
            justify-content: center !important;
            margin-top: 36px !important;
          }

          /* Section rhythm — bump padding and headings on every home section */
          .home-section { padding-top: 80px !important; padding-bottom: 80px !important; }
          .home-section .home-eyebrow { font-size: 11px !important; letter-spacing: 0.12em !important; }
          .home-section .home-h2 {
            font-size: 36px !important;
            line-height: 1.15 !important;
            letter-spacing: -0.018em !important;
            margin-top: 14px !important;
          }
          .home-section .home-lead {
            font-size: 16px !important;
            line-height: 1.7 !important;
            margin-top: 18px !important;
            max-width: 68ch !important;
          }
          .home-section .home-lead-pill {
            margin-top: 0 !important;
            max-width: none !important;
          }
          .home-section .home-lead-card {
            width: calc(100% + 36px) !important;
            max-width: none !important;
            margin-left: -18px !important;
            margin-right: -18px !important;
            padding: 8px 18px 12px !important;
          }
          .home-section .home-grid { margin-top: 36px !important; gap: 20px !important; }
          .home-section .home-cta { margin-top: 28px !important; }

          /* DataStrip cards — slightly larger type and padding on desktop */
          .home-section .home-grid > * { padding: 22px 24px !important; }
          .home-section .home-grid h3 { font-size: 15px !important; line-height: 1.4 !important; }
          .home-section .home-grid p { font-size: 14px !important; line-height: 1.6 !important; margin-top: 8px !important; }
        }

        @media (min-width: 1280px) {
          .home-section .home-h2 { font-size: 40px !important; }
        }
      `}</style>
      <div
        className="
          home-hero
          relative
          bg-[hsl(var(--navy-surface))]
          flex items-center
          min-h-[calc(100svh-60px)] lg:min-h-0
          overflow-hidden
          [&>section]:w-full
          [&_.page-shell]:!px-8 [&_.page-shell]:!py-0
          lg:[&_.page-shell]:!px-6
          lg:[&_.page-shell]:!pt-[clamp(72px,10vh,120px)]
          lg:[&_.page-shell]:!pb-[clamp(72px,10vh,120px)]
          [&_h1#briefing-title+p]:!mt-6
          [&_h1#briefing-title~div.flex.justify-center]:!mt-9
          [&_h1#briefing-title~div.flex.flex-col.sm\\:flex-row]:!mt-8
          [&_h1#briefing-title~div.flex.flex-col.sm\\:flex-row]:!gap-[14px]
          md:[&_h1#briefing-title+p]:!max-w-[440px]
        "
      >
        <BriefingHero
          variant="cover"
          category="Public Reference System · United States"
          docId=""
          title="Verify the source."
          statement="Independent verification of vendor sourcing claims and supporting documentation."
          tone="navy"
          heroLogo={
            <img
              src={lockup}
              alt="Source Standard"
              draggable={false}
              className="block w-auto select-none"
              style={{ height: "44px", filter: "brightness(0) invert(1)" }}
            />
          }
          actions={<HeroActions />}
          heroMetrics={<HeroMetrics />}
        />

        <div
          aria-hidden="true"
          className="lg:hidden pointer-events-none absolute bottom-7 left-1/2 flex flex-col items-center text-white/55"
          style={{ animation: "scrollCue 2.4s ease-in-out infinite", transform: "translate(-50%, 0)" }}
        >
          <span
            className="font-mono uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.18em" }}
          >
            Continue
          </span>
          <span style={{ fontSize: "12px", lineHeight: 1, marginTop: "4px" }}>↓</span>
        </div>
      </div>

      <DocJumpBar waypoints={homeWaypoints} />

      {/* §2 — The trust problem */}
      <section
        aria-labelledby="trust-problem"
        className="home-section bg-background border-b border-border text-left"
        style={{ paddingTop: "36px", paddingBottom: "36px" }}
      >
        <div className="w-full px-5 md:px-8 lg:px-12">
          <div className="w-full max-w-none">

            <p
              className="home-eyebrow font-mono uppercase text-muted-foreground"
              style={{ fontSize: "10px", letterSpacing: "0.08em" }}
            >
              01 · Problem
            </p>
            <h2
              id="trust-problem"
              className="home-h2 mt-3 font-sans font-semibold text-foreground"
              style={{ fontSize: "22px", lineHeight: "1.25", letterSpacing: "-0.01em" }}
            >
              Claims are not documentation.
            </h2>
            <div className="home-lead-card bg-card mt-4 w-full" style={{ border: "0.5px solid hsl(var(--border))", borderRadius: "12px", padding: "8px 18px 12px" }}>
              <p className="home-lead home-lead-pill text-muted-foreground" style={{ fontSize: "13px", lineHeight: "1.65", marginTop: 0, maxWidth: "none" }}>
                Vendors make public sourcing claims across compounded therapy categories. Source Standard reviews those claims against submitted documentation, public records, and pharmacy relationship evidence.
              </p>
            </div>
            <div className="home-cta mt-3">
              <PillPrimary to="/how-it-works">View Verification Protocol</PillPrimary>
            </div>
          </div>
        </div>
      </section>

      {/* §3 — How it works */}
      <section
        aria-labelledby="how-it-works"
        className="home-section border-b border-border bg-background text-left"
        style={{ paddingTop: "36px", paddingBottom: "36px" }}
      >
        <div className="page-shell">
          <div className="mx-auto w-standard">
            <p
              className="home-eyebrow font-mono uppercase text-muted-foreground"
              style={{ fontSize: "10px", letterSpacing: "0.08em" }}
            >
              02 · Methodology
            </p>
            <h2
              id="how-it-works"
              className="home-h2 mt-3 font-sans font-semibold text-foreground"
              style={{ fontSize: "22px", lineHeight: "1.25", letterSpacing: "-0.01em" }}
            >
              How Source Standard Works
            </h2>

            <div className="home-grid mt-5 flex flex-col gap-2.5">
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

            <div className="home-cta mt-3">
              <PillPrimary to="/verified-vendors">Access the Registry</PillPrimary>
            </div>
          </div>
        </div>
      </section>

      {/* §4 — Live registry */}
      <section
        aria-labelledby="live-registry"
        className="home-section border-b border-border bg-background text-left"
        style={{ paddingTop: "36px", paddingBottom: "36px" }}
      >
        <div className="w-full px-5 md:px-8 lg:px-12">
          <div className="w-full max-w-none">
            <p
              className="home-eyebrow font-mono uppercase text-muted-foreground"
              style={{ fontSize: "10px", letterSpacing: "0.08em" }}
            >
              03 · Registry
            </p>
            <h2
              id="live-registry"
              className="home-h2 mt-3 font-sans font-semibold text-foreground"
              style={{ fontSize: "22px", lineHeight: "1.25", letterSpacing: "-0.01em" }}
            >
              Unified market visibility.
            </h2>
            <div className="home-lead-card bg-card mt-4 w-full" style={{ border: "0.5px solid hsl(var(--border))", borderRadius: "12px", padding: "8px 18px 12px" }}>
              <p className="home-lead home-lead-pill text-muted-foreground" style={{ fontSize: "13px", lineHeight: "1.65", marginTop: 0, maxWidth: "none" }}>
                The Source Standard registry tracks compounded therapy vendors in one public-reference system. Therapy category is metadata. Verification status is assigned through the same documentation framework.
              </p>
            </div>

            <div className="mt-5 inline-flex flex-col gap-2 items-start [&>a]:w-[245px] [&>a]:max-w-full [&>a]:justify-center [&>a]:text-center">
              <PillPrimary to="/verified-vendors">Search the Registry</PillPrimary>
              <PillSecondary to="/greenlist">Explore Upstream Registry</PillSecondary>
            </div>
          </div>
        </div>
      </section>

      {/* §5 — Registry fields */}
      <section
        aria-labelledby="registry-shows"
        className="home-section border-b border-border bg-background text-left"
        style={{ paddingTop: "36px", paddingBottom: "36px" }}
      >
        <div className="page-shell">
          <div className="mx-auto w-standard">
            <p
              className="home-eyebrow font-mono uppercase text-muted-foreground"
              style={{ fontSize: "10px", letterSpacing: "0.08em" }}
            >
              04 · Fields
            </p>
            <h2
              id="registry-shows"
              className="home-h2 mt-3 font-sans font-semibold text-foreground"
              style={{ fontSize: "22px", lineHeight: "1.25", letterSpacing: "-0.01em" }}
            >
              Search. Review. Verify status.
            </h2>
            <p className="home-lead mt-4 text-muted-foreground max-w-[64ch]" style={{ fontSize: "13px", lineHeight: "1.65" }}>
              Each listing provides a structured snapshot of vendor documentation status and sourcing review scope.
            </p>

            <div className="home-grid mt-5 flex flex-col gap-2.5 lg:grid lg:grid-cols-2 lg:gap-3">
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

            <div className="home-cta mt-3">
              <PillSecondary to="/verified-vendors">Open the Registry</PillSecondary>
            </div>
          </div>
        </div>
      </section>

      {/* §6 — Function of the framework */}
      <section
        aria-labelledby="why-matters"
        className="home-section border-b border-border bg-background text-left"
        style={{ paddingTop: "36px", paddingBottom: "36px" }}
      >
        <div className="page-shell">
          <div className="mx-auto w-standard">
            <p
              className="home-eyebrow font-mono uppercase text-muted-foreground"
              style={{ fontSize: "10px", letterSpacing: "0.08em" }}
            >
              05 · Function
            </p>
            <h2
              id="why-matters"
              className="home-h2 mt-3 font-sans font-semibold text-foreground"
              style={{ fontSize: "22px", lineHeight: "1.25", letterSpacing: "-0.01em" }}
            >
              Function of the framework
            </h2>

            <div className="home-grid mt-5 flex flex-col gap-2.5 lg:grid lg:grid-cols-3 lg:gap-3">
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
        className="home-section border-b border-border bg-background text-left"
        style={{ paddingTop: "36px", paddingBottom: "36px" }}
      >
        <div className="page-shell">
          <div className="mx-auto w-standard">
            <p
              className="home-eyebrow font-mono uppercase text-muted-foreground"
              style={{ fontSize: "10px", letterSpacing: "0.08em" }}
            >
              06 · Reference
            </p>
            <h2
              id="basics"
              className="home-h2 mt-3 font-sans font-semibold text-foreground"
              style={{ fontSize: "22px", lineHeight: "1.25", letterSpacing: "-0.01em" }}
            >
              Foundational reference
            </h2>

            <div className="home-grid mt-5 flex flex-col gap-2.5 lg:grid lg:grid-cols-3 lg:gap-3">
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

            <div className="home-cta mt-3">
              <PillSecondary to="/education">Browse Resource Library</PillSecondary>
            </div>
          </div>
        </div>
      </section>

      {/* §8 — Governance & standards */}
      <section
        aria-labelledby="governance"
        className="home-section border-b border-border bg-background"
        style={{ paddingTop: "36px", paddingBottom: "36px" }}
      >
        <div className="page-shell">
          <div className="mx-auto w-standard">
            <p
              className="home-eyebrow font-mono uppercase text-muted-foreground"
              style={{ fontSize: "10px", letterSpacing: "0.08em" }}
            >
              07 · Governance
            </p>
            <h2
              id="governance"
              className="home-h2 mt-3 font-sans font-semibold text-foreground"
              style={{ fontSize: "22px", lineHeight: "1.25", letterSpacing: "-0.01em" }}
            >
              Governance and standards
            </h2>

            <div className="home-grid mt-5 flex flex-col gap-2.5 lg:grid lg:grid-cols-3 lg:gap-3">
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

    </>
  );
};

export default Index;
