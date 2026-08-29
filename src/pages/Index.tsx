import { useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

import { PageMeta } from "@/components/PageMeta";
import { websiteLd } from "@/seo/entitySeo";
import { BriefingHero } from "@/components/BriefingHero";
import { PageSection } from "@/components/system";
import {
  CTA_APPLY,
  CTA_HOW_IT_WORKS,
  CTA_SEARCH,
  HOME_AUDIENCE_CLINICS,
  HOME_AUDIENCE_FACILITIES,
  HOME_AUDIENCE_PATIENTS,
  HOME_DISCLAIMER,
  HOME_SEARCH_LEAD,
  HOME_STATUS_RULE,
  HOME_TAGLINE,
} from "@/data/publicLanguage";
import lockup from "@/assets/source-standard-lockup-dark.png";

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
      <h1
        id="briefing-title"
        className="font-sans text-white text-center !mt-0"
        style={{
          fontSize: "clamp(28px, 5.6vw, 44px)",
          lineHeight: 1.1,
          fontWeight: 600,
          letterSpacing: "-0.03em",
        }}
      >
        {HOME_TAGLINE}
      </h1>

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
        {HOME_SEARCH_LEAD}
      </p>

      <form
        onSubmit={onSubmit}
        role="search"
        aria-label="Search a clinic"
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
          overflow: "hidden",
        }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          inputMode="search"
          enterKeyHint="search"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          aria-label="Search a clinic"
          placeholder="Search a clinic"
          className="hero-search-input font-sans flex-1 bg-transparent text-white placeholder:text-white/60 focus:outline-none focus:ring-0 truncate"
          style={{
            minWidth: 0,
            paddingRight: "12px",
            fontSize: "16px",
            caretColor: "rgba(255,255,255,0.75)",
            backgroundColor: "transparent",
            appearance: "none",
            WebkitAppearance: "none",
            border: "none",
            boxShadow: "none",
            WebkitTapHighlightColor: "transparent",
          }}
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
          {CTA_SEARCH}
        </button>
      </form>
    </div>
  );
};

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

const PillPrimary = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link
    to={to}
    className={`${pillBase} bg-primary text-primary-foreground hover:opacity-90`}
    style={{ ...pillStyle, borderColor: "hsl(var(--primary))" }}
  >
    {children}
  </Link>
);

const PillSecondary = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link
    to={to}
    className={`${pillBase} bg-card text-foreground hover:bg-muted`}
    style={{ ...pillStyle, borderColor: "hsl(var(--border))" }}
  >
    {children}
  </Link>
);

const Index = () => {
  return (
    <>
      <PageMeta
        title="Source Standard"
        description={HOME_SEARCH_LEAD}
        path="/"
        jsonLd={[
          websiteLd(),
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Source Standard",
            url: "https://sourcestandard.org/",
            logo: "https://sourcestandard.org/placeholder.svg",
          },
        ]}
      />

      <style>{`
        @keyframes scrollCue {
          0%, 100% { transform: translate(-50%, 0); opacity: 0.35; }
          50% { transform: translate(-50%, 5px); opacity: 0.7; }
        }

        @media (min-width: 1024px) {
          .home-hero h1#briefing-title {
            text-align: center !important;
            margin-left: auto;
            margin-right: auto;
            max-width: 18ch !important;
            font-size: clamp(40px, 4.6vw, 56px) !important;
            line-height: 1.08 !important;
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
          md:[&_h1#briefing-title+p]:!max-w-[520px]
        "
      >
        <BriefingHero
          variant="cover"
          category="Independent sourcing verification"
          docId=""
          title={HOME_TAGLINE}
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
          heroMetrics={<HeroContent />}
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

      <PageSection first>
        <div className="flex flex-col gap-4" style={{ maxWidth: "64ch" }}>
          <p
            className="text-foreground"
            style={{ fontSize: "17px", lineHeight: 1.6, fontWeight: 400, margin: 0 }}
          >
            {HOME_STATUS_RULE}
          </p>
          <p
            className="text-muted-foreground"
            style={{ fontSize: "15px", lineHeight: 1.65, fontWeight: 400, margin: 0 }}
          >
            {HOME_DISCLAIMER}
          </p>
        </div>
      </PageSection>

      <PageSection compact>
        <div
          className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-8"
          style={{ maxWidth: "100%" }}
        >
          {[HOME_AUDIENCE_CLINICS, HOME_AUDIENCE_FACILITIES, HOME_AUDIENCE_PATIENTS].map((line) => (
            <p
              key={line}
              className="text-foreground"
              style={{ fontSize: "15px", lineHeight: 1.65, fontWeight: 400, margin: 0 }}
            >
              {line}
            </p>
          ))}
        </div>
      </PageSection>

      <PageSection compact bordered={false}>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <PillSecondary to="/how-it-works">{CTA_HOW_IT_WORKS}</PillSecondary>
          <PillPrimary to="/apply">{CTA_APPLY}</PillPrimary>
        </div>
      </PageSection>
    </>
  );
};

export default Index;
