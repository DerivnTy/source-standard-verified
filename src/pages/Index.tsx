import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";


import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { DocJumpBar } from "@/components/DocJumpBar";
import { vendors } from "@/data/vendors";
import lockup from "@/assets/source-standard-lockup-dark.png";

const homeWaypoints = [
  { id: "mission", number: "0", label: "Mission" },
  { id: "trust-problem", number: "1", label: "Problem" },
  { id: "how-it-works", number: "2", label: "How it works" },
  { id: "live-registry", number: "3", label: "Registry" },
  { id: "registry-shows", number: "4", label: "Fields" },
  { id: "why-matters", number: "5", label: "Function" },
  { id: "basics", number: "6", label: "Reference" },
  { id: "governance", number: "7", label: "Governance" },
];

/* ───────────────── Hero Content ─────────────────
   Consumer-first hero: headline answers the visitor's question, a
   one-line definer establishes what Source Standard is, and the search
   field is the single primary action. Trust indicators reinforce
   credibility without visual dominance. */
const HeroContent = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = query.trim();
    navigate(q ? `/verified-vendors?q=${encodeURIComponent(q)}` : "/verified-vendors");
  };

  return (
    <div className="flex flex-col items-stretch w-full" style={{ maxWidth: "560px" }}>
      {/* Headline */}
      <h1
        id="briefing-title"
        className="font-sans text-white text-center !mt-0"
        style={{
          fontSize: "clamp(32px, 6.4vw, 52px)",
          lineHeight: 1.05,
          fontWeight: 600,
          letterSpacing: "-0.03em",
        }}
      >
        Is Your Provider Verified?
      </h1>

      {/* One-line definer */}
      <p
        className="text-white/70 text-center mx-auto"
        style={{
          marginTop: "10px",
          maxWidth: "520px",
          fontSize: "clamp(15px, 3.6vw, 17px)",
          lineHeight: 1.5,
        }}
      >
        Search the Source Standard Registry to better understand your provider's peptide sourcing transparency and verification status.
      </p>

      {/* Search — primary action */}
      <form
        onSubmit={onSubmit}
        role="search"
        aria-label="Search the Source Standard Registry"
        className="flex items-center w-full mx-auto"
        style={{
          marginTop: "18px",
          maxWidth: "520px",
          height: "52px",
          padding: "4px 4px 4px 18px",
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.30)",
          backgroundColor: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(12px)",
        }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          aria-label="Search by provider, clinic, or telehealth company"
          placeholder="Search by provider, clinic, or telehealth company…"
          className="font-sans flex-1 bg-transparent text-white placeholder:text-white/60 focus:outline-none focus:ring-0"
          style={{ fontSize: "14px", minWidth: 0 }}
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center font-sans font-semibold uppercase transition-all active:scale-[0.97] bg-white text-[hsl(var(--navy-surface))] hover:bg-white/90 shrink-0"
          style={{
            height: "42px",
            padding: "0 18px",
            borderRadius: "999px",
            fontSize: "11px",
            letterSpacing: "0.06em",
          }}
        >
          Search
        </button>
      </form>

      {/* Trust indicators */}
      <div
        className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mx-auto"
        style={{ marginTop: "12px" }}
      >
        {["Independent Verification", "Public Reference Registry", "Evidence-Informed"].map(
          (t) => (
            <span
              key={t}
              className="font-mono uppercase text-white/65"
              style={{ fontSize: "10px", letterSpacing: "0.12em" }}
            >
              <span aria-hidden className="text-white/80" style={{ marginRight: "6px" }}>
                ✓
              </span>
              {t}
            </span>
          ),
        )}
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
  <PillSecondaryWhite to="/how-it-works">How Verification Works</PillSecondaryWhite>
);


/* ───────────────── Hero Meta Strip ─────────────────
   Compact 3-column institutional readout anchoring the bottom of the navy hero. */
const HeroMeta = () => {
  const total = vendors.length;
  const items: { label: string; value: string }[] = [
    { label: "Providers Indexed", value: total.toLocaleString("en-US") },
    { label: "States Represented", value: "50" },
  ];
  return (
    <div
      role="group"
      aria-label="Registry summary"
      className="grid mx-auto"
      style={{
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        maxWidth: "420px",
      }}
    >
      {items.map((it, idx) => (
        <div
          key={it.label}
          className="flex flex-col items-center text-center"
          style={{
            padding: "0 12px",
            borderLeft: idx === 0 ? "none" : "1px solid rgba(255,255,255,0.16)",
          }}
        >
          <span
            className="font-sans text-white tabular-nums"
            style={{
              fontSize: "clamp(22px, 4.6vw, 28px)",
              lineHeight: 1,
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            {it.value}
          </span>
          <span
            className="font-mono uppercase"
            style={{
              marginTop: "8px",
              fontSize: "10px",
              letterSpacing: "0.14em",
              color: "rgba(255,255,255,0.6)",
              fontWeight: 500,
            }}
          >
            {it.label}
          </span>
        </div>
      ))}
    </div>
  );
};


/* ───────────────── Static section data ───────────────── */

const howItWorks = [
  {
    h: "Map the market.",
    b: "Identify and maintain records for compounded therapy vendors and compounding facilities operating throughout the supply chain.",
  },
  {
    h: "Verify sourcing claims.",
    b: "Review documentation and available evidence supporting vendor sourcing claims.",
  },
  {
    h: "Maintain the public record.",
    b: "Publish verification standing and keep records current as new information becomes available.",
  },
];

const registryFields = [
  {
    h: "Verification status",
    b: "Whether a vendor is Verified, Unverified, Under Review, Suspended, Removed, or otherwise designated within the registry.",
  },
  {
    h: "Vendor type",
    b: "Whether the vendor operates as a telehealth provider, in-person clinic, hybrid practice, or online platform.",
  },
  {
    h: "Therapy category",
    b: "The compounded therapy categories associated with the vendor record.",
  },
  {
    h: "Facility relationships",
    b: "Recognized upstream sources and current verification status.",
  },
];

const whyMatters = [
  {
    h: "For consumers",
    b: "A public-reference system designed to improve transparency around compounded therapy sourcing claims.",
  },
  {
    h: "For providers",
    b: "A verification pathway for clinics, telehealth providers, and wellness businesses seeking to demonstrate sourcing transparency.",
  },
  {
    h: "For the industry",
    b: "An independent public reference that supports greater transparency across the compounded therapy market.",
  },
];

const basics = [
  {
    t: "Verification Framework",
    s: "Learn how the Source Standard Verification Framework is structured and how verification statuses are defined.",
    to: "/how-it-works",
  },
  {
    t: "Status Definitions",
    s: "Definitions for Verified, Unverified, Under Review, Suspended, Removed, Greenlisted, Monitoring, and Status Alert.",
    to: "/status-definitions",
  },
  {
    t: "Facility Standards",
    s: "Learn how upstream sources are recognized within the Source Standard framework.",
    to: "/greenlist",
  },
];

const governanceLinks = [
  { k: "Advisory Board", to: "/medical-advisory", s: "Independent medical, scientific, and procedural guidance supporting framework development and review standards." },
  { k: "Verification Framework", to: "/how-it-works", s: "The standards that govern verification and status designations throughout the registry." },
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
          className="font-sans text-foreground"
          style={{ fontSize: "16px", lineHeight: 1.3, fontWeight: 600, letterSpacing: "-0.01em", margin: 0 }}
        >
          {title}
        </h3>
        <span
          className="font-mono tabular-nums shrink-0"
          style={{
            fontSize: "11px",
            fontWeight: 500,
            lineHeight: 1,
            letterSpacing: "0.06em",
            color: "rgba(0,0,0,0.38)",
            whiteSpace: "nowrap",
            paddingTop: "2px",
          }}
        >
          {indexLabel}
        </span>
      </div>
      <p
        className="text-muted-foreground"
        style={{ fontSize: "14px", lineHeight: 1.75, fontWeight: 400, marginTop: "8px" }}
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
        description="Source Standard is an independent public-reference organization providing verification and transparency around vendor sourcing claims and pharmacy relationships across peptides, TRT, HRT, GLP-1, longevity compounds, and other compounded therapies."
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
            margin-top: 20px !important;
          }
          .home-hero h1#briefing-title ~ div.flex.justify-center {
            justify-content: center !important;
            margin-top: 36px !important;
          }
          .home-hero h1#briefing-title ~ div.flex.flex-col.sm\\:flex-row {
            justify-content: center !important;
            margin-top: 28px !important;
          }

          /* Section rhythm — bump padding and headings on every home section */
          .home-section { padding-top: 56px !important; padding-bottom: 56px !important; }
          .home-section .home-eyebrow { font-size: 11px !important; letter-spacing: 0.12em !important; font-weight: 500 !important; }
          .home-section .home-h2 {
            font-size: 34px !important;
            line-height: 1.15 !important;
            letter-spacing: -0.02em !important;
            font-weight: 700 !important;
            margin-top: 14px !important;
          }
          .home-section .home-lead {
            font-size: 17px !important;
            line-height: 1.7 !important;
            margin-top: 20px !important;
            max-width: 68ch !important;
          }
          .home-section .home-lead-pill {
            margin-top: 0 !important;
            max-width: none !important;
          }
          .home-section .home-lead-card {
            margin-top: 16px !important;
            padding: 12px 22px 16px !important;
          }
          .home-section .home-grid { margin-top: 36px !important; gap: 20px !important; }
          .home-section .home-cta { margin-top: 28px !important; }

          /* DataStrip cards — larger institutional type on desktop */
          .home-section .home-grid > * { padding: 24px 26px !important; }
          .home-section .home-grid h3 { font-size: 20px !important; line-height: 1.3 !important; }
          .home-section .home-grid p { font-size: 16px !important; line-height: 1.75 !important; margin-top: 10px !important; }
        }

        @media (min-width: 1280px) {
          .home-section .home-h2 { font-size: 36px !important; }
        }
      `}</style>
      <div
        className="
          home-hero
          relative
          bg-[hsl(var(--navy-surface))]
          flex items-center
          min-h-[calc(100svh-63px)] lg:min-h-0
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
          title="Is Your Provider Verified?"
          statement=""
          tone="navy"
          heroLogo={
            <img
              src={lockup}
              alt="Source Standard"
              draggable={false}
              className="block w-auto select-none"
              style={{ height: "38px", filter: "brightness(0) invert(1)" }}
            />
          }
          actions={<HeroActions />}
          heroMetrics={<HeroContent />}
          heroMeta={<HeroMeta />}
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
          <span style={{ fontSize: "10px", lineHeight: 1, marginTop: "4px" }}>↓</span>
        </div>
      </div>

      <DocJumpBar waypoints={homeWaypoints} />

      {/* §1 — Mission */}
      <section
        aria-labelledby="mission"
        className="home-section bg-background border-b border-border text-left"
        style={{ paddingTop: "24px", paddingBottom: "24px" }}
      >
        <div className="page-shell">
          <div className="mx-auto w-standard">
            <p
              className="home-eyebrow font-mono uppercase text-muted-foreground"
              style={{ fontSize: "11px", letterSpacing: "0.12em", fontWeight: 500 }}
            >
              00 · Mission
            </p>
            <h2
              id="mission"
              className="home-h2 mt-3 font-sans text-foreground"
              style={{ fontSize: "24px", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 700 }}
            >
              Why Source Standard Exists
            </h2>
            <div className="home-lead-card bg-card mt-4 w-full" style={{ border: "0.5px solid hsl(var(--border))", borderRadius: "12px", padding: "8px 18px 12px" }}>
              <p className="home-lead home-lead-pill text-muted-foreground" style={{ fontSize: "15px", lineHeight: 1.7, fontWeight: 400, marginTop: 0, maxWidth: "64ch" }}>
                Consumers increasingly rely on sourcing claims they cannot independently verify. Source Standard exists to improve transparency by providing independent verification and factual public-reference records that help make those claims more transparent.
              </p>
              <p className="home-lead home-lead-pill text-muted-foreground" style={{ fontSize: "15px", lineHeight: 1.7, fontWeight: 400, marginTop: "16px", maxWidth: "64ch" }}>
                Source Standard is an independent verification organization. We do not manufacture, prescribe, or sell therapies. Our role is to provide objective, documentation-based verification through a public reference system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* §2 — The trust problem */}
      <section
        aria-labelledby="trust-problem"
        className="home-section bg-background border-b border-border text-left"
        style={{ paddingTop: "24px", paddingBottom: "24px" }}
      >
        <div className="page-shell">
          <div className="mx-auto w-standard">


            <p
              className="home-eyebrow font-mono uppercase text-muted-foreground"
              style={{ fontSize: "11px", letterSpacing: "0.12em", fontWeight: 500 }}
            >
              01 · Problem
            </p>
            <h2
              id="trust-problem"
              className="home-h2 mt-3 font-sans text-foreground"
              style={{ fontSize: "24px", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 700 }}
            >
              Claims are not verification
            </h2>
            <div className="home-lead-card bg-card mt-4 w-full" style={{ border: "0.5px solid hsl(var(--border))", borderRadius: "12px", padding: "8px 18px 12px" }}>
              <p className="home-lead home-lead-pill text-muted-foreground" style={{ fontSize: "15px", lineHeight: 1.7, fontWeight: 400, marginTop: 0, maxWidth: "none" }}>
                Compounded therapy vendors make sourcing and quality claims every day. Source Standard evaluates those claims through a structured verification framework and publishes factual verification records designed to distinguish supported claims from unsupported claims.
              </p>
            </div>
            <div className="home-cta mt-3">
              <PillPrimary to="/how-it-works">View Verification Framework</PillPrimary>
            </div>
          </div>
        </div>
      </section>

      {/* §3 — How it works */}
      <section
        aria-labelledby="how-it-works"
        className="home-section border-b border-border bg-background text-left"
        style={{ paddingTop: "24px", paddingBottom: "24px" }}
      >
        <div className="page-shell">
          <div className="mx-auto w-standard">
            <p
              className="home-eyebrow font-mono uppercase text-muted-foreground"
              style={{ fontSize: "11px", letterSpacing: "0.12em", fontWeight: 500 }}
            >
              02 · Methodology
            </p>
            <h2
              id="how-it-works"
              className="home-h2 mt-3 font-sans text-foreground"
              style={{ fontSize: "24px", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 700 }}
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
        style={{ paddingTop: "24px", paddingBottom: "24px" }}
      >
        <div className="page-shell">
          <div className="mx-auto w-standard">

            <p
              className="home-eyebrow font-mono uppercase text-muted-foreground"
              style={{ fontSize: "11px", letterSpacing: "0.12em", fontWeight: 500 }}
            >
              03 · Registry
            </p>
            <h2
              id="live-registry"
              className="home-h2 mt-3 font-sans text-foreground"
              style={{ fontSize: "24px", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 700 }}
            >
              Visibility across the supply chain
            </h2>
            <div className="home-lead-card bg-card mt-4 w-full" style={{ border: "0.5px solid hsl(var(--border))", borderRadius: "12px", padding: "8px 18px 12px" }}>
              <p className="home-lead home-lead-pill text-muted-foreground" style={{ fontSize: "15px", lineHeight: 1.7, fontWeight: 400, marginTop: 0, maxWidth: "none" }}>
                The Source Standard registry tracks vendors and compounding facilities within a unified public-reference system. Vendor records focus on sourcing transparency and facility relationships. Facility records reflect current verification status and recognized upstream sources within the Source Standard framework.
              </p>
            </div>

            <div className="mt-5 inline-flex flex-col gap-2 items-start [&>a]:w-[245px] [&>a]:max-w-full [&>a]:justify-center [&>a]:text-center">
              <PillPrimary to="/verified-vendors">Search the Registry</PillPrimary>
              <PillSecondary to="/greenlist">Explore Facility Records</PillSecondary>
            </div>
          </div>
        </div>
      </section>

      {/* §5 — Registry fields */}
      <section
        aria-labelledby="registry-shows"
        className="home-section border-b border-border bg-background text-left"
        style={{ paddingTop: "24px", paddingBottom: "24px" }}
      >
        <div className="page-shell">
          <div className="mx-auto w-standard">
            <p
              className="home-eyebrow font-mono uppercase text-muted-foreground"
              style={{ fontSize: "11px", letterSpacing: "0.12em", fontWeight: 500 }}
            >
              04 · Fields
            </p>
            <h2
              id="registry-shows"
              className="home-h2 mt-3 font-sans text-foreground"
              style={{ fontSize: "24px", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 700 }}
            >
              Search. Review. Verify status.
            </h2>
            <p className="home-lead mt-4 text-muted-foreground max-w-[64ch]" style={{ fontSize: "15px", lineHeight: 1.7, fontWeight: 400 }}>
              Each listing provides a structured snapshot of sourcing transparency, facility relationships, and review status.
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
        style={{ paddingTop: "24px", paddingBottom: "24px" }}
      >
        <div className="page-shell">
          <div className="mx-auto w-standard">
            <p
              className="home-eyebrow font-mono uppercase text-muted-foreground"
              style={{ fontSize: "11px", letterSpacing: "0.12em", fontWeight: 500 }}
            >
              05 · Function
            </p>
            <h2
              id="why-matters"
              className="home-h2 mt-3 font-sans text-foreground"
              style={{ fontSize: "24px", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 700 }}
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
        style={{ paddingTop: "24px", paddingBottom: "24px" }}
      >
        <div className="page-shell">
          <div className="mx-auto w-standard">
            <p
              className="home-eyebrow font-mono uppercase text-muted-foreground"
              style={{ fontSize: "11px", letterSpacing: "0.12em", fontWeight: 500 }}
            >
              06 · Reference
            </p>
            <h2
              id="basics"
              className="home-h2 mt-3 font-sans text-foreground"
              style={{ fontSize: "24px", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 700 }}
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
        style={{ paddingTop: "24px", paddingBottom: "24px" }}
      >
        <div className="page-shell">
          <div className="mx-auto w-standard">
            <p
              className="home-eyebrow font-mono uppercase text-muted-foreground"
              style={{ fontSize: "11px", letterSpacing: "0.12em", fontWeight: 500 }}
            >
              07 · Governance
            </p>
            <h2
              id="governance"
              className="home-h2 mt-3 font-sans text-foreground"
              style={{ fontSize: "24px", lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 700 }}
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
