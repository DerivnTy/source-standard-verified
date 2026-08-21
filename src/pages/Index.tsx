import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { SearchField } from "@/components/system";
import { Button } from "@/components/ui/button";
import {
  CTA_APPLY,
  CTA_HOW_IT_WORKS,
  CTA_SEARCH,
  HOME_AUDIENCE_CLINICS,
  HOME_AUDIENCE_FACILITIES,
  HOME_AUDIENCE_PATIENTS,
  HOME_SEARCH_LEAD,
  HOME_STATUS_RULE,
  HOME_TAGLINE,
} from "@/data/publicLanguage";
import {
  METHODOLOGY_TESTING,
  TESTING_DOES,
  WHAT_WE_DO_TODAY,
  WHAT_WE_DO_TODAY_DETAIL,
} from "@/data/institutionalCopy";

const AUDIENCE = [
  { label: "Clinics", body: HOME_AUDIENCE_CLINICS },
  { label: "Facilities", body: HOME_AUDIENCE_FACILITIES },
  { label: "Patients", body: HOME_AUDIENCE_PATIENTS },
] as const;

const HeroContent = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = query.trim();
    navigate(q ? `/verified-vendors?q=${encodeURIComponent(q)}` : "/verified-vendors");
  };

  return (
    <div className="w-full max-w-[40rem]">
      <h1
        id="briefing-title"
        className="font-serif text-white !mt-0"
        style={{
          fontSize: "clamp(30px, 4.4vw, 48px)",
          lineHeight: 1.15,
          fontWeight: 600,
          letterSpacing: "-0.028em",
          maxWidth: "16ch",
        }}
      >
        {HOME_TAGLINE}
      </h1>

      <p
        className="text-white/72"
        style={{
          marginTop: "16px",
          maxWidth: "42ch",
          fontSize: "17px",
          lineHeight: 1.55,
        }}
      >
        {HOME_SEARCH_LEAD}
      </p>

      <div className="w-full max-w-[34rem]" style={{ marginTop: "28px" }}>
        <SearchField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSubmit={onSubmit}
          placeholder="Clinic name, city, or state"
          ariaLabel="Search a clinic"
          submitLabel={CTA_SEARCH}
        />
      </div>
    </div>
  );
};

const SplitBlock = ({
  title,
  children,
  last = false,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) => (
  <>
    <div className="page-shell" style={{ paddingTop: 56, paddingBottom: last ? 64 : 56 }}>
      <div className="grid items-start gap-5 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
        <h2 className="t-section-title-sm text-foreground" style={{ margin: 0 }}>
          {title}
        </h2>
        <div className="flex min-w-0 max-w-[40rem] flex-col gap-4">{children}</div>
      </div>
    </div>
    {!last && (
      <div className="page-shell">
        <div className="border-t border-border" />
      </div>
    )}
  </>
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

      <BriefingHero
        variant="cover"
        category="Independent sourcing verification"
        docId=""
        title={HOME_TAGLINE}
        statement=""
        tone="navy"
        heroMetrics={<HeroContent />}
      />

      <section className="bg-background">
        <SplitBlock title="What Source Standard does">
          <p className="t-body-lg" style={{ margin: 0 }}>
            {WHAT_WE_DO_TODAY}
          </p>
          <p className="t-body-sm text-muted-foreground" style={{ margin: 0 }}>
            {WHAT_WE_DO_TODAY_DETAIL}
          </p>
        </SplitBlock>

        <SplitBlock title="How verification works">
          <p className="t-body-lg" style={{ margin: 0 }}>
            {HOME_STATUS_RULE}
          </p>
        </SplitBlock>

        <SplitBlock title="How testing works">
          <p className="t-body-lg" style={{ margin: 0 }}>
            {METHODOLOGY_TESTING}
          </p>
          <p className="t-body-sm text-muted-foreground" style={{ margin: 0 }}>
            {TESTING_DOES}
          </p>
        </SplitBlock>

        <div className="page-shell" style={{ paddingTop: 56, paddingBottom: 72 }}>
          <h2 className="t-section-title-sm text-foreground" style={{ margin: 0 }}>
            Who it is for
          </h2>
          <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-0 p-0 md:grid-cols-3 md:gap-10">
            {AUDIENCE.map((item) => (
              <li
                key={item.label}
                className="border-t border-border py-5 first:pt-5 md:py-0 md:pt-5"
              >
                <p
                  className="font-sans text-foreground"
                  style={{ margin: 0, fontSize: "13px", fontWeight: 600, letterSpacing: "-0.01em" }}
                >
                  {item.label}
                </p>
                <p className="t-body-sm text-muted-foreground" style={{ margin: "8px 0 0", maxWidth: "36ch" }}>
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap">
            <Button asChild>
              <Link to="/apply">{CTA_APPLY}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/how-it-works">{CTA_HOW_IT_WORKS}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
