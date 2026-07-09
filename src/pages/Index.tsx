import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";


import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { DocJumpBar } from "@/components/DocJumpBar";
import {
  PageSection,
  FeatureItem,
  NavCard,
  ProcessSteps,
} from "@/components/system";

import { registryStats } from "@/data/registryStats";
import lockup from "@/assets/source-standard-lockup-dark.png";

const homeWaypoints = [
  { id: "mission", number: "", label: "Mission" },
  { id: "how-it-works", number: "", label: "Protocol" },
  { id: "live-registry", number: "", label: "Registry" },
  { id: "registry-shows", number: "", label: "Record fields" },
  { id: "why-matters", number: "", label: "Audience" },
  { id: "governance", number: "", label: "Governance" },
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
          textWrap: "balance",
        }}
      >
        Search the Source Standard Registry to see whether your provider has been independently verified and to better understand their sourcing transparency.
      </p>

      {/* Search, primary action */}
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

    </div>
  );
};






/* ───────────────── Pill buttons (unified) ─────────────────
   Single pill style, 32px height, 20px radius, 1px hairline.
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
  const items: { label: string; value: string }[] = [
    { label: "Providers Indexed", value: registryStats.providersIndexed.toLocaleString("en-US") },
    { label: "States Represented", value: String(registryStats.statesRepresented) },
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

const trustPillars: { icon: "scale" | "handshake" | "graduation-cap"; title: string; desc: string }[] = [
  { icon: "scale", title: "Independent Governance", desc: "Verification standards are set independently of any vendor, manufacturer, or commercial interest." },
  { icon: "handshake", title: "Advisory Board", desc: "Medical, scientific, and procedural guidance from an independent advisory board." },
  { icon: "graduation-cap", title: "Public Standards", desc: "Verification criteria and status definitions are published in full and available for public review." },
];


/* DataStrip promoted to shared primitive; imported from @/components/system. */



/* ───────────────── Page ───────────────── */

const Index = () => {
  return (
    <>
      <PageMeta
        title="Source Standard · Verify the source."
        description="Search the Source Standard Registry to check whether your provider is verified and understand the sourcing behind compounded therapies."
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

      {/* Hero */}
      <style>{`
        @keyframes scrollCue {
          0%, 100% { transform: translate(-50%, 0); opacity: 0.35; }
          50% { transform: translate(-50%, 5px); opacity: 0.7; }
        }

        /* Desktop hero polish only. Consumer sections below the hero
           inherit their rhythm from PageSection, not from overrides here. */
        @media (min-width: 1024px) {
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
          [&_h1#briefing-title+p]:!mt-4
          [&_h1#briefing-title~div.flex.justify-center]:!mt-7
          [&_h1#briefing-title~div.flex.flex-col.sm\\:flex-row]:!mt-6
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

      {/* Mission — thesis of the site. Two paragraphs, one heading, one section. */}
      <PageSection
        id="mission"
        title="Why Does This Exist?"
      >
        <div className="flex flex-col gap-4" style={{ maxWidth: "64ch" }}>
          <p
            className="text-foreground"
            style={{ fontSize: "17px", lineHeight: 1.6, fontWeight: 400, margin: 0 }}
          >
            Consumers increasingly rely on sourcing claims they cannot independently verify. Source Standard exists to improve transparency by providing independent verification and factual public-reference records that help make those claims more transparent.
          </p>
          <p
            className="text-muted-foreground"
            style={{ fontSize: "15px", lineHeight: 1.65, fontWeight: 400, margin: 0 }}
          >
            Source Standard is an independent verification organization. It does not manufacture, prescribe, or sell therapies. Its role is to evaluate the sourcing claims vendors make every day and to publish factual verification records that distinguish supported claims from unsupported claims.
          </p>
        </div>
      </PageSection>

      {/* Protocol — process rail, no CTA */}
      <PageSection
        id="how-it-works"
        compact
        title="How Does Source Standard Verify?"
      >
        <ProcessSteps
          steps={howItWorks.map((s) => ({ title: s.h.replace(/\.$/, ""), desc: s.b }))}
        />
      </PageSection>

      {/* Registry — the product. Navigation pair. */}
      <PageSection
        id="live-registry"
        compact
        title="What Does the Registry Cover?"
        intro="Vendors and compounding facilities tracked within a unified public-reference system."
      >
        <div className="flex flex-col gap-2.5 sm:grid sm:grid-cols-2 sm:gap-3">
          <NavCard
            to="/verified-vendors"
            title="Vendor Registry"
            desc="Search vendors by name, state, or verification status."
          />
          <NavCard
            to="/greenlist"
            title="Facility Records"
            desc="Recognized upstream sources and current verification status."
          />
        </div>
      </PageSection>

      {/* Record fields — what a record shows. Reference material, tight rhythm. */}
      <PageSection
        id="registry-shows"
        compact
        title="What Will I See in a Record?"
      >
        <dl
          className="divide-y divide-border/60 border-t border-b border-border/60"
        >
          {registryFields.map((f) => (
            <div
              key={f.h}
              className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-x-8 gap-y-1 py-3.5"
            >
              <dt
                className="font-sans text-foreground"
                style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "-0.005em" }}
              >
                {f.h}
              </dt>
              <dd
                className="text-muted-foreground"
                style={{ fontSize: "14px", lineHeight: 1.6, margin: 0 }}
              >
                {f.b}
              </dd>
            </div>
          ))}
        </dl>
      </PageSection>

      {/* Audience — prose, not tiles. */}
      <PageSection id="why-matters" compact title="Who Is This For?">
        <p
          className="text-muted-foreground"
          style={{ fontSize: "15px", lineHeight: 1.7, maxWidth: "64ch", margin: 0 }}
        >
          <span className="text-foreground font-medium">Consumers</span> use the registry to understand sourcing transparency before choosing a provider.{" "}
          <span className="text-foreground font-medium">Providers</span> use verification to demonstrate that transparency independently.{" "}
          <span className="text-foreground font-medium">The industry</span> uses the public record as a reference point for accountability across the compounded therapy market.
        </p>
      </PageSection>

      {/* Governance — trust pillars, no CTA */}
      <PageSection
        id="governance"
        title="Who Stands Behind This?"
      >
        <div className="flex flex-col divide-y divide-border lg:grid lg:grid-cols-3 lg:gap-8 lg:divide-y-0">
          {trustPillars.map((p, i) => (
            <div
              key={p.title}
              className={i === 0 ? "pb-4 lg:pb-0" : i === trustPillars.length - 1 ? "pt-4 lg:pt-0" : "py-4 lg:py-0"}
            >
              <FeatureItem title={p.title} desc={p.desc} variant="block" />
            </div>
          ))}
          <div className="lg:col-span-3 pt-4 lg:pt-6">
            <Link
              to="/governance"
              className="font-sans text-foreground hover:text-primary transition-colors"
              style={{ fontSize: "14px", fontWeight: 500, textDecoration: "underline", textDecorationThickness: "0.5px", textUnderlineOffset: "4px" }}
            >
              Read the governance record ›
            </Link>
          </div>
        </div>
      </PageSection>




    </>
  );
};

export default Index;

