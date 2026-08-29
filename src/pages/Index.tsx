import { useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

import { PageMeta } from "@/components/PageMeta";
import { websiteLd } from "@/seo/entitySeo";
import { BriefingHero } from "@/components/BriefingHero";
import {
  PageSection,
  ContentsNav,
  MethodologyNote,
  NavCard,
  ProcessSteps,
  RelatedRail,
  type ContentsEntry,
} from "@/components/system";
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

const CONTENTS: ContentsEntry[] = [
  { id: "mission", label: "Mission", desc: "Why Source Standard exists." },
  { id: "protocol", label: "Protocol", desc: "How verification is carried out." },
  { id: "registry", label: "Registry", desc: "What the public record covers." },
  { id: "record-fields", label: "Record fields", desc: "What each record contains." },
  { id: "audience", label: "Audience", desc: "Who uses the record, and how." },
  { id: "governance", label: "Governance", desc: "Independence and oversight." },
];

const RECORD_FIELDS = [
  {
    term: "Verification status",
    desc: "Whether a provider is Source Standard Verified or Not Source Standard Verified, alongside any applicable participation status such as Under Review, Active, Suspended, or Expired.",
  },
  {
    term: "Vendor type",
    desc: "Whether the organization operates as a telehealth provider, in-person clinic, hybrid practice, online platform, or another applicable provider type.",
  },
  {
    term: "Therapy category",
    desc: "The compounded therapy categories associated with the provider record.",
  },
  {
    term: "Facility relationships",
    desc: "Recognized upstream sources associated with the record and their relevant Source Standard standing.",
  },
  {
    term: "Regulatory context",
    desc: "Publicly available registration, licensure, and enforcement context relevant to the record, cited to its issuing authority.",
  },
  {
    term: "Record provenance",
    desc: "The scope of what was reviewed, the evidence relied on, and the date the record was last reviewed.",
  },
];

const AUDIENCES = [
  {
    title: "Consumers",
    body: HOME_AUDIENCE_PATIENTS,
    note: "Use the registry to understand sourcing transparency before choosing a provider, and read the scope stated on each record.",
  },
  {
    title: "Providers",
    body: HOME_AUDIENCE_CLINICS,
    note: "Verification lets a provider demonstrate sourcing transparency through independent review rather than self-assertion.",
  },
  {
    title: "Industry",
    body: HOME_AUDIENCE_FACILITIES,
    note: "The public record functions as a reference point for accountability across the compounded therapy market.",
  },
];

const GOVERNANCE_POINTS = [
  {
    term: "Independent governance",
    desc: "Verification standards are maintained independently of any vendor, manufacturer, or commercial interest being evaluated.",
  },
  {
    term: "Advisory board",
    desc: "Medical, scientific, and procedural guidance is provided by the Medical Advisory Board. Advisors do not diagnose, treat, prescribe, or evaluate individual patients through Source Standard.",
  },
  {
    term: "Public standards",
    desc: "Verification criteria, methodology, and status definitions are published for review rather than held privately.",
  },
];

const HeroContent = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = query.trim();
    navigate(q ? `/clinics?q=${encodeURIComponent(q)}` : "/clinics");
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
        title="Source Standard · The Clinical Transparency Framework"
        rawTitle
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
        <div style={{ marginTop: "28px" }}>
          <ContentsNav entries={CONTENTS} />
        </div>
      </PageSection>

      <PageSection id="mission" title="Why do we exist?" intro="Consumers increasingly rely on sourcing claims they cannot independently verify. Source Standard exists to make those claims more transparent through independent review and factual public-reference records.">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-start">
          <div className="flex flex-col gap-4" style={{ maxWidth: "68ch" }}>
            <p className="text-foreground" style={{ fontSize: "15.5px", lineHeight: 1.7, margin: 0 }}>
              Source Standard is an independent verification organization. It does not manufacture,
              prescribe, or sell therapies. Its role is to review the sourcing documentation a clinic
              provides and to publish a factual record of what that documentation establishes.
            </p>
            <p className="text-muted-foreground" style={{ fontSize: "15px", lineHeight: 1.7, margin: 0 }}>
              A record states what was reviewed, within what scope, and as of when. It does not state
              a conclusion Source Standard has not reached. Where an organization has never
              participated, the record says so plainly and says nothing further.
            </p>
          </div>
          <MethodologyNote
            means="Source Standard reviews documented sourcing claims against a published standard and publishes the result as a public-reference record."
            doesNotMean="A record is not FDA approval, product approval, medical advice, a treatment recommendation, or a guarantee of safety, efficacy, or outcome."
            to="/verification-disclaimer"
            linkLabel="Read the scope disclaimer"
          />
        </div>
      </PageSection>

      <PageSection
        id="protocol"
        title="How does Source Standard verify?"
        intro="Verification follows a defined sequence. Each step is documented, scoped, and reviewable."
        cta={
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <PillSecondary to="/how-it-works">{CTA_HOW_IT_WORKS}</PillSecondary>
            <PillSecondary to="/status-definitions">Status definitions</PillSecondary>
          </div>
        }
      >
        <ProcessSteps
          steps={[
            {
              title: "Map the market",
              desc: "Identify and maintain records for compounded therapy vendors and compounding facilities operating throughout the supply chain.",
            },
            {
              title: "Verify sourcing claims",
              desc: "Review documentation and available evidence supporting a vendor's sourcing claims, within a defined scope and against a published standard.",
            },
            {
              title: "Maintain the public record",
              desc: "Publish verification standing and keep records current as new information becomes available. Standing can lapse, be suspended, or be withdrawn.",
            },
          ]}
        />
      </PageSection>

      <PageSection
        id="registry"
        title="What does the registry cover?"
        intro="Vendors and compounding facilities tracked within a single public-reference system."
      >
        <div className="grid gap-2.5 sm:grid-cols-2">
          <NavCard
            to="/clinics"
            title="Search clinics"
            desc="Search vendors and providers by name, state, or verification status."
          />
          <NavCard
            to="/facilities"
            title="Facility records"
            desc="Recognized upstream sources, facility information, regulatory context, and current Source Standard standing."
          />
        </div>
      </PageSection>

      <PageSection
        id="record-fields"
        title="What will I see in a record?"
        intro="Every record uses the same fields, so two records can be read against each other."
      >
        <dl className="divide-y divide-border border-t border-b border-border">
          {RECORD_FIELDS.map((f) => (
            <div
              key={f.term}
              className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-x-8 gap-y-1 py-3.5"
            >
              <dt
                className="font-sans uppercase text-foreground"
                style={{ fontSize: "12px", letterSpacing: "0.09em", fontWeight: 700, margin: 0 }}
              >
                {f.term}
              </dt>
              <dd className="text-muted-foreground" style={{ fontSize: "14.5px", lineHeight: 1.65, margin: 0 }}>
                {f.desc}
              </dd>
            </div>
          ))}
        </dl>
        <MethodologyNote
          className="mt-5"
          means="Verification status answers one question: has this organization completed Source Standard verification? Participation status (Under Review, Active, Suspended, Expired) describes where a participating organization sits in the workflow."
          doesNotMean="Participation status is never a substitute for verification status, and an absent participation status does not indicate a negative finding."
          to="/status-definitions"
          linkLabel="Read the status definitions"
        />
      </PageSection>

      <PageSection id="audience" title="Who is this for?">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border border border-border rounded-[2px] overflow-hidden">
          {AUDIENCES.map((a) => (
            <div key={a.title} className="bg-background px-4 py-4">
              <p className="t-utility-xs text-muted-foreground">{a.title}</p>
              <p className="text-foreground" style={{ fontSize: "14.5px", lineHeight: 1.65, marginTop: "8px" }}>
                {a.body}
              </p>
              <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.6, marginTop: "8px" }}>
                {a.note}
              </p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        id="governance"
        title="Who stands behind this?"
        intro="Independence is a structural requirement of the framework, not a claim made about it."
        cta={
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <PillSecondary to="/governance">Read the governance record</PillSecondary>
            <PillPrimary to="/apply">{CTA_APPLY}</PillPrimary>
          </div>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-start">
          <dl className="divide-y divide-border border-t border-b border-border">
            {GOVERNANCE_POINTS.map((g) => (
              <div key={g.term} className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-x-8 gap-y-1 py-3.5">
                <dt
                  className="font-sans uppercase text-foreground"
                  style={{ fontSize: "12px", letterSpacing: "0.09em", fontWeight: 700, margin: 0 }}
                >
                  {g.term}
                </dt>
                <dd className="text-muted-foreground" style={{ fontSize: "14.5px", lineHeight: 1.65, margin: 0 }}>
                  {g.desc}
                </dd>
              </div>
            ))}
          </dl>
          <RelatedRail
            title="Continue"
            links={[
              { to: "/how-it-works", label: "Verification protocol", description: "The process behind each verification decision." },
              { to: "/medical-advisory", label: "Medical Advisory Board", description: "Clinical and scientific guidance on the framework." },
              { to: "/learn/news", label: "News & Insights", description: "Regulatory updates, recalls, testing and sourcing analysis." },
              { to: "/learn", label: "Learn", description: "Plain-language explanations of compounding, testing, and sourcing." },
              { to: "/report-concern", label: "Report a concern", description: "Submit information relevant to a published record." },
            ]}
          />
        </div>
      </PageSection>
    </>
  );
};

export default Index;
