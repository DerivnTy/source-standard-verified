import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { PageSection } from "@/components/system";
import { Button } from "@/components/ui/button";
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

const HeroContent = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = query.trim();
    navigate(q ? `/verified-vendors?q=${encodeURIComponent(q)}` : "/verified-vendors");
  };

  return (
    <div className="flex w-full flex-col items-stretch sm:mx-auto sm:max-w-[540px]">
      <h1
        id="briefing-title"
        className="font-serif text-center text-white !mt-0"
        style={{
          fontSize: "clamp(28px, 6vw, 44px)",
          lineHeight: 1.2,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          maxWidth: "18ch",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {HOME_TAGLINE}
      </h1>

      <p
        className="mx-auto text-center text-white/72"
        style={{
          marginTop: "14px",
          maxWidth: "46ch",
          fontSize: "17px",
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
        className="mx-auto flex w-full flex-col items-stretch gap-2 min-[380px]:flex-row"
        style={{ marginTop: "22px", maxWidth: "480px" }}
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
          placeholder="Clinic name, city, or state"
          className="hero-search-input font-sans min-w-0 flex-1 bg-transparent text-white placeholder:text-white/50 focus:outline-none"
          style={{
            height: "42px",
            padding: "0 12px",
            fontSize: "16px",
            border: "1px solid rgba(255,255,255,0.28)",
            backgroundColor: "rgba(255,255,255,0.07)",
            borderRadius: "2px",
          }}
        />
        <button
          type="submit"
          className="inline-flex shrink-0 items-center justify-center bg-white font-sans font-medium text-[hsl(var(--navy-surface))] hover:bg-white/90"
          style={{
            height: "42px",
            padding: "0 14px",
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

      <BriefingHero
        variant="cover"
        category="Independent sourcing verification"
        docId=""
        title={HOME_TAGLINE}
        statement=""
        tone="navy"
        heroMetrics={<HeroContent />}
      />

      <PageSection first title="What Source Standard does">
        <div className="flex max-w-[68ch] flex-col gap-3">
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
        <div className="flex max-w-[68ch] flex-col gap-3">
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
        <div className="flex max-w-[68ch] flex-col gap-3">
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

      <PageSection last title="Who this is for">
        <ul className="m-0 max-w-[68ch] list-none divide-y divide-border p-0">
          {[HOME_AUDIENCE_CLINICS, HOME_AUDIENCE_FACILITIES, HOME_AUDIENCE_PATIENTS].map((line) => (
            <li key={line} className="py-3 first:pt-0 last:pb-0">
              <p className="t-body-sm" style={{ margin: 0 }}>
                {line}
              </p>
            </li>
          ))}
        </ul>
        <p className="t-body-sm text-muted-foreground" style={{ marginTop: "14px", maxWidth: "68ch" }}>
          {HOW_TO_PARTICIPATE}
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row sm:flex-wrap">
          <Button asChild>
            <Link to="/how-it-works">{CTA_HOW_IT_WORKS}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/apply">{CTA_APPLY}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/status-definitions">Status definitions</Link>
          </Button>
        </div>
      </PageSection>
    </>
  );
};

export default Index;
