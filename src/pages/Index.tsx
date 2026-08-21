import { useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

import { PageMeta } from "@/components/PageMeta";
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
import {
  DEVELOPING_WORK,
  HOW_TO_PARTICIPATE,
  INDEX_VS_VERIFIED,
  INDEPENDENCE_LINE,
  METHODOLOGY_TESTING,
  TESTING_DOES,
  TESTING_DOES_NOT,
  VERIFICATION_LIMITS,
  WHAT_WE_DO_TODAY,
  WHAT_WE_DO_TODAY_DETAIL,
} from "@/data/institutionalCopy";
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
        className="font-serif text-white text-center !mt-0"
        style={{
          fontSize: "clamp(26px, 5vw, 40px)",
          lineHeight: 1.15,
          fontWeight: 600,
          letterSpacing: "-0.02em",
        }}
      >
        {HOME_TAGLINE}
      </h1>

      <p
        className="text-white/75 text-center mx-auto"
        style={{
          marginTop: "12px",
          maxWidth: "520px",
          fontSize: "clamp(15px, 3.4vw, 17px)",
          lineHeight: 1.55,
          textWrap: "balance",
        }}
      >
        {HOME_SEARCH_LEAD}
      </p>

      <form
        onSubmit={onSubmit}
        role="search"
        aria-label="Search a clinic"
        className="flex items-stretch w-full mx-auto gap-2"
        style={{
          marginTop: "20px",
          maxWidth: "520px",
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
          className="hero-search-input font-sans flex-1 bg-transparent text-white placeholder:text-white/55 focus:outline-none"
          style={{
            minWidth: 0,
            height: "44px",
            padding: "0 12px",
            fontSize: "16px",
            border: "1px solid rgba(255,255,255,0.28)",
            backgroundColor: "rgba(255,255,255,0.06)",
            borderRadius: "2px",
          }}
        />

        <button
          type="submit"
          className="inline-flex items-center justify-center font-sans font-medium bg-white text-[hsl(var(--navy-surface))] hover:bg-white/90 shrink-0"
          style={{
            height: "44px",
            padding: "0 16px",
            borderRadius: "2px",
            fontSize: "13px",
          }}
        >
          {CTA_SEARCH}
        </button>
      </form>
    </div>
  );
};

const PillPrimary = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link
    to={to}
    className="inline-flex items-center justify-center font-sans font-medium bg-primary text-primary-foreground hover:bg-primary-hover"
    style={{
      minHeight: "40px",
      padding: "0 16px",
      borderRadius: "2px",
      fontSize: "13px",
    }}
  >
    {children}
  </Link>
);

const PillSecondary = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link
    to={to}
    className="inline-flex items-center justify-center font-sans font-medium bg-card text-foreground hover:bg-muted"
    style={{
      minHeight: "40px",
      padding: "0 16px",
      borderRadius: "2px",
      fontSize: "13px",
      border: "1px solid hsl(var(--border-strong))",
    }}
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
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Source Standard",
            url: "https://www.sourcestandard.org/",
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Source Standard",
            url: "https://www.sourcestandard.org/",
            logo: "https://www.sourcestandard.org/placeholder.svg",
          },
        ]}
      />

      <div
        className="
          home-hero
          relative
          bg-[hsl(var(--navy-surface))]
          flex items-center
          overflow-hidden
          [&>section]:w-full
          [&_.page-shell]:!px-5 [&_.page-shell]:!py-0
          md:[&_.page-shell]:!px-8
          [&_.page-shell]:!pt-12 [&_.page-shell]:!pb-14
          md:[&_.page-shell]:!pt-16 md:[&_.page-shell]:!pb-16
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
              style={{ height: "32px", filter: "brightness(0) invert(1)" }}
            />
          }
          heroMetrics={<HeroContent />}
        />
      </div>

      <PageSection first title="What Source Standard does">
        <div className="flex flex-col gap-4" style={{ maxWidth: "68ch" }}>
          <p className="t-body-lg" style={{ margin: 0 }}>
            {WHAT_WE_DO_TODAY}
          </p>
          <p className="t-body-sm text-muted-foreground" style={{ margin: 0 }}>
            {WHAT_WE_DO_TODAY_DETAIL}
          </p>
          <p className="t-body-sm text-muted-foreground" style={{ margin: 0 }}>
            {INDEX_VS_VERIFIED}
          </p>
        </div>
      </PageSection>

      <PageSection compact title="What verification means">
        <div className="flex flex-col gap-4" style={{ maxWidth: "68ch" }}>
          <p className="t-body-lg" style={{ margin: 0 }}>
            {HOME_STATUS_RULE}
          </p>
          <p className="t-body-sm text-muted-foreground" style={{ margin: 0 }}>
            {VERIFICATION_LIMITS}
          </p>
          <p className="t-body-sm text-muted-foreground" style={{ margin: 0 }}>
            {HOME_DISCLAIMER}
          </p>
        </div>
      </PageSection>

      <PageSection compact title="How testing works">
        <div className="flex flex-col gap-4" style={{ maxWidth: "68ch" }}>
          <p className="t-body-lg" style={{ margin: 0 }}>
            {METHODOLOGY_TESTING}
          </p>
          <p className="t-body-sm text-muted-foreground" style={{ margin: 0 }}>
            {TESTING_DOES} {TESTING_DOES_NOT}
          </p>
          <p className="t-body-sm text-muted-foreground" style={{ margin: 0 }}>
            {INDEPENDENCE_LINE}
          </p>
          <p className="t-body-sm text-muted-foreground" style={{ margin: 0 }}>
            {DEVELOPING_WORK}
          </p>
        </div>
      </PageSection>

      <PageSection compact title="Who this is for">
        <div
          className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-8"
        >
          {[HOME_AUDIENCE_CLINICS, HOME_AUDIENCE_FACILITIES, HOME_AUDIENCE_PATIENTS].map((line) => (
            <p key={line} className="t-body-sm" style={{ margin: 0 }}>
              {line}
            </p>
          ))}
        </div>
        <p className="t-body-sm text-muted-foreground" style={{ marginTop: "16px", maxWidth: "68ch" }}>
          {HOW_TO_PARTICIPATE}
        </p>
      </PageSection>

      <PageSection compact bordered={false}>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <PillSecondary to="/how-it-works">{CTA_HOW_IT_WORKS}</PillSecondary>
          <PillPrimary to="/apply">{CTA_APPLY}</PillPrimary>
          <PillSecondary to="/status-definitions">Status definitions</PillSecondary>
        </div>
      </PageSection>
    </>
  );
};

export default Index;
