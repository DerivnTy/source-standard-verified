import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SectionAnchorNav } from "@/components/registry/SectionAnchorNav";
import { BriefingHero } from "@/components/BriefingHero";

const WAYPOINTS = [
  { id: "acceptance", number: "01", label: "Acceptance" },
  { id: "citation", number: "02", label: "Citation" },
  { id: "integrity", number: "03", label: "Integrity" },
  { id: "warranty", number: "04", label: "Warranty" },
  { id: "jurisdiction", number: "05", label: "Jurisdiction" },
  { id: "related", number: "06", label: "Related Policies" },
];

type Clause = { n: string; t: string; d: string };

const CITATION: Clause[] = [
  {
    n: "01",
    t: "Source Standard ID",
    d: "Include the unique registry identifier associated with the listing, where applicable.",
  },
  {
    n: "02",
    t: "Status date",
    d: "Include the date the referenced status was published or last updated.",
  },
  {
    n: "03",
    t: "Attribution",
    d: "Provide a direct link to the source registry page so the current public record can be reviewed.",
  },
  {
    n: "04",
    t: "Citation integrity",
    d: "Citations that omit identifying details may misstate the status, scope, or timing of the published record.",
  },
];

const INTEGRITY: Clause[] = [
  {
    n: "01",
    t: "Bulk extraction",
    d: "No automated scraping, crawling, or indexing of registry data for resale or creation of derivative datasets without authorization.",
  },
  {
    n: "02",
    t: "Status misrepresentation",
    d: "No display or implication of Verified status for any entity not currently published under that status in the registry.",
  },
  {
    n: "03",
    t: "Unauthorized use of marks",
    d: "No use of Source Standard names, marks, or badge artwork in a way that implies an uncontracted partnership, endorsement, verified status, or formal relationship.",
  },
  {
    n: "04",
    t: "Registry interference",
    d: "No activity intended to disrupt, falsify, manipulate, or degrade the integrity of public records or related framework materials.",
  },
  {
    n: "05",
    t: "Policy response",
    d: "Confirmed violations may be addressed under the applicable Source Standard operating policies, registry access controls, badge-use rules, or legal remedies.",
  },
];

const WARRANTY: Clause[] = [
  {
    n: "01",
    t: "Reference basis",
    d: "The registry reflects Source Standard's review of submitted documentation, public records, pharmacy relationship evidence, and related materials within a defined scope and at a defined point in time.",
  },
  {
    n: "02",
    t: "As-is publication",
    d: "Registry data is provided as a public reference only and is not warranted as fit for any specific medical, legal, commercial, regulatory, or investment purpose.",
  },
  {
    n: "03",
    t: "Reliance limits",
    d: "Use of registry data is at the user's discretion. Medical decisions should be made with licensed clinicians and not on the basis of registry information alone.",
  },
  {
    n: "04",
    t: "No guarantee",
    d: "Source Standard does not guarantee product safety, treatment effectiveness, clinical outcomes, vendor quality, regulatory compliance, or the completeness of third-party information.",
  },
];

const RELATED = [
  { to: "/privacy", label: "Data Governance & Privacy Policy" },
  { to: "/verification-disclaimer", label: "Verification Disclaimer" },
  { to: "/accountability", label: "Compliance & Operating Boundaries" },
  { to: "/status-definitions", label: "Status Definitions" },
];

// --- Local primitives ---

const cardChrome = {
  backgroundColor: "hsl(var(--card))",
  border: "0.5px solid hsl(var(--border))",
  borderRadius: "12px",
} as const;

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p
    className="font-mono uppercase text-muted-foreground"
    style={{ fontSize: "10px", letterSpacing: "0.14em" }}
  >
    {children}
  </p>
);

const SectionHeader = ({
  index,
  title,
  intro,
}: {
  index: string;
  title: string;
  intro: string;
}) => (
  <div className="mb-5">
    <p className="font-mono tabular-nums text-muted-foreground/60" style={{ fontSize: "11px" }}>
      {index}
    </p>
    <h2 className="t-section-title-sm text-foreground mt-1">{title}</h2>
    <p
      className="mt-2 text-muted-foreground"
      style={{ fontSize: "13.5px", lineHeight: 1.55, maxWidth: "62ch" }}
    >
      {intro}
    </p>
  </div>
);

const TermsCard = ({ children }: { children: React.ReactNode }) => (
  <div style={{ ...cardChrome, padding: "24px" }}>{children}</div>
);

const TermsRow = ({
  index,
  total,
  title,
  description,
}: {
  index: string;
  total: string;
  title: string;
  description: string;
}) => (
  <div style={{ ...cardChrome, padding: "14px 16px" }}>
    <div className="flex items-baseline justify-between gap-4">
      <h3
        className="font-sans font-semibold text-foreground min-w-0"
        style={{ fontSize: "14px", lineHeight: 1.4 }}
      >
        {title}
      </h3>
      <span
        className="font-mono tabular-nums text-muted-foreground/70 shrink-0 uppercase"
        style={{ fontSize: "11px", letterSpacing: "0.06em" }}
      >
        {index} / {total}
      </span>
    </div>
    <p
      className="text-muted-foreground"
      style={{ fontSize: "13px", lineHeight: 1.55, marginTop: "6px" }}
    >
      {description}
    </p>
  </div>
);

const RelatedLinkRow = ({ to, label }: { to: string; label: string }) => (
  <Link
    to={to}
    className="group block hover:bg-surface-muted/40 transition-colors"
    style={{ ...cardChrome, padding: "14px 16px" }}
  >
    <div className="flex items-center justify-between gap-4">
      <h3
        className="font-sans font-semibold text-foreground group-hover:text-primary transition-colors min-w-0"
        style={{ fontSize: "14px", lineHeight: 1.4 }}
      >
        {label}
      </h3>
      <span
        className="shrink-0 inline-flex items-center gap-0.5 font-sans font-semibold uppercase text-primary"
        style={{ fontSize: "11px", letterSpacing: "0.08em" }}
      >
        View
        <ChevronRight style={{ width: "12px", height: "12px" }} />
      </span>
    </div>
  </Link>
);

// --- Page ---

const Terms = () => {
  const heroDescription =
    "The governing terms for access to, citation of, and use of the Source Standard public registry and associated framework materials.";

  return (
    <>
      <Breadcrumb items={[{ label: "Legal" }, { label: "Terms" }]} />

      <PageMeta title="Terms of Use" description={heroDescription} />

      {/* Hero */}
      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Registry User Agreement"
        title="Terms of Use"
        statement={heroDescription}
        docId=""
      />

      {/* Contents nav */}
      <SectionAnchorNav waypoints={WAYPOINTS} />

      <div className="bg-background">
        <div className="page-shell">
          <div className="mx-auto w-standard">
            {/* §1 Purpose */}
            <section
              className="scroll-mt-24"
              style={{
                paddingTop: "40px",
                paddingBottom: "40px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <TermsCard>
                <Eyebrow>Terms Purpose</Eyebrow>
                <h2 className="t-section-title-sm text-foreground mt-2">
                  How this agreement applies
                </h2>
                <div
                  style={{
                    marginTop: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    These terms govern public access to the Source Standard registry and the related public-reference materials published under the framework.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    They define the conditions of access, rules for citation and use, prohibited conduct, and the legal boundaries that apply to reliance on registry information.
                  </p>
                </div>
              </TermsCard>
            </section>

            {/* §2 Registry Access & Acceptance */}
            <section
              id="acceptance"
              className="scroll-mt-24"
              style={{
                paddingTop: "40px",
                paddingBottom: "40px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <TermsCard>
                <Eyebrow>01 · Acceptance</Eyebrow>
                <h2 className="t-section-title-sm text-foreground mt-2">
                  Registry Access & Acceptance
                </h2>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "13px", lineHeight: 1.55, marginTop: "8px" }}
                >
                  What use of the registry means.
                </p>
                <div
                  style={{
                    marginTop: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    Access to the Source Standard public registry constitutes acceptance of these terms and the related policies referenced on this page.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    If a user does not accept these terms, use of the registry and associated framework materials should be discontinued.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    Continued access signifies acceptance of the jurisdictional, liability, and use limitations defined below.
                  </p>
                </div>
              </TermsCard>
            </section>

            {/* §3 Citation & Data Use */}
            <section
              id="citation"
              className="scroll-mt-24"
              style={{
                paddingTop: "40px",
                paddingBottom: "40px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <SectionHeader
                index="02"
                title="Citation & Data Use"
                intro="How registry records may be referenced publicly."
              />
              <p
                className="text-muted-foreground"
                style={{ fontSize: "13.5px", lineHeight: 1.55, marginBottom: "16px", maxWidth: "62ch" }}
              >
                Registry records may be cited in journalistic, academic, clinical, or commercial contexts provided the citation preserves enough detail for the reader to identify the referenced record accurately.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {CITATION.map((c) => (
                  <TermsRow
                    key={c.n}
                    index={c.n}
                    total="04"
                    title={c.t}
                    description={c.d}
                  />
                ))}
              </div>
            </section>

            {/* §4 Integrity & Prohibitions */}
            <section
              id="integrity"
              className="scroll-mt-24"
              style={{
                paddingTop: "40px",
                paddingBottom: "40px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <SectionHeader
                index="03"
                title="Integrity & Prohibitions"
                intro="Conduct that is not permitted in connection with the registry or its published materials."
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {INTEGRITY.map((c) => (
                  <TermsRow
                    key={c.n}
                    index={c.n}
                    total="05"
                    title={c.t}
                    description={c.d}
                  />
                ))}
              </div>
            </section>

            {/* §5 Warranty & Liability */}
            <section
              id="warranty"
              className="scroll-mt-24"
              style={{
                paddingTop: "40px",
                paddingBottom: "40px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <SectionHeader
                index="04"
                title="Warranty & Liability"
                intro="How registry information should be understood and relied upon."
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {WARRANTY.map((c) => (
                  <TermsRow
                    key={c.n}
                    index={c.n}
                    total="04"
                    title={c.t}
                    description={c.d}
                  />
                ))}
              </div>
            </section>

            {/* §6 Jurisdiction */}
            <section
              id="jurisdiction"
              className="scroll-mt-24"
              style={{
                paddingTop: "40px",
                paddingBottom: "40px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <TermsCard>
                <Eyebrow>05 · Jurisdiction</Eyebrow>
                <h2 className="t-section-title-sm text-foreground mt-2">Jurisdiction</h2>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "13px", lineHeight: 1.55, marginTop: "8px" }}
                >
                  The governing law applied to this agreement.
                </p>
                <div
                  style={{
                    marginTop: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    These terms are governed by the laws of the State of Florida and applicable laws of the United States.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    Any dispute arising under these terms is subject to the jurisdiction of the appropriate state and federal courts located in Florida.
                  </p>
                </div>
              </TermsCard>
            </section>

            {/* §7 Related Policies */}
            <section
              id="related"
              className="scroll-mt-24"
              style={{
                paddingTop: "40px",
                paddingBottom: "40px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <SectionHeader
                index="06"
                title="Related Policies"
                intro="Further reading on privacy, verification scope, operating boundaries, and public status meanings."
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {RELATED.map((r) => (
                  <RelatedLinkRow key={r.to} to={r.to} label={r.label} />
                ))}
              </div>
            </section>

            {/* §8 Closing */}
            <section style={{ paddingTop: "36px", paddingBottom: "64px" }}>
              <TermsCard>
                <Eyebrow>Public Access</Eyebrow>
                <h2 className="t-section-title-sm text-foreground mt-2">
                  Public access requires clear terms of use.
                </h2>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "13.5px", lineHeight: 1.6, marginTop: "16px" }}
                >
                  These terms exist to preserve the integrity of the registry, support accurate public citation, and clarify the limits under which Source Standard information is published and used.
                </p>
              </TermsCard>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
