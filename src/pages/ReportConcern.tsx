import { FormEvent, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";

/* ───────────────── Content ───────────────── */

const REPORTABLE = [
  { t: "Registry Information", d: "Report incorrect vendor information, business details, classifications, or public record references." },
  { t: "Sourcing Claims", d: "Report sourcing representations that appear inconsistent with available evidence." },
  { t: "Status Misrepresentation", d: "Report unauthorized use or inaccurate representation of Source Standard status language." },
  { t: "Public Record Changes", d: "Report licensing, registration, enforcement, or public record changes that may affect an existing registry listing." },
];

const OUT_OF_SCOPE = [
  { t: "Medical Advice", d: "Source Standard does not provide medical guidance or treatment recommendations." },
  { t: "Billing Disputes", d: "Payment disputes must be handled directly with the vendor." },
  { t: "Personal Complaints", d: "Private disputes unrelated to public registry information are outside review scope." },
  { t: "Emergency Matters", d: "Urgent safety concerns should be directed to the appropriate regulatory authority." },
];

const PROCESS = [
  { t: "Submission Received", d: "Concern is received through the public intake channel." },
  { t: "Initial Review", d: "Scope and supporting information are reviewed." },
  { t: "Evidence Review", d: "Available documentation and registry records are considered." },
  { t: "Resolution", d: "The registry may be updated or the concern may be closed based on the information reviewed." },
];

const EVIDENCE = [
  { t: "Documentation", d: "Invoices, records, licenses, registrations, and supporting documents." },
  { t: "Public Records", d: "Government databases, disciplinary records, or official filings." },
  { t: "Screenshots", d: "Website content, advertisements, or public statements." },
  { t: "Sourcing Documents", d: "Relevant sourcing and fulfillment information when available." },
];

const CONCERN_TYPES = [
  "Registry Information",
  "Sourcing Claims",
  "Status Misrepresentation",
  "Public Record Changes",
];

/* ───────────────── Local primitives ───────────────── */

const SectionHeader = ({
  n,
  title,
  intro,
  id,
}: {
  n: string;
  title: string;
  intro?: string;
  id?: string;
}) => (
  <div className="mb-4" id={id}>
    <div className="flex items-baseline" style={{ gap: "10px" }}>
      <span
        className="font-mono tabular-nums shrink-0"
        style={{
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.06em",
          color: "rgba(0,0,0,0.38)",
        }}
      >
        {n}
      </span>
      <h2
        className="font-sans text-foreground"
        style={{
          fontSize: "20px",
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
          color: "#0A0A0A",
          margin: 0,
        }}
      >
        {title}
      </h2>
    </div>
    {intro && (
      <p
        className="mt-2 text-muted-foreground"
        style={{ fontSize: "13px", lineHeight: 1.5, fontWeight: 400, maxWidth: "62ch" }}
      >
        {intro}
      </p>
    )}
  </div>
);

/* Compact card variant tuned to this page only */
const CompactCard = ({
  title,
  number,
  total,
  children,
  as: Tag = "div",
}: {
  title: ReactNode;
  number: number;
  total: number;
  children?: ReactNode;
  as?: "div" | "li";
}) => {
  const label = `${String(number).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  return (
    <Tag
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: "14px",
        padding: "14px 16px",
      }}
    >
      <div className="flex items-start justify-between" style={{ gap: "12px" }}>
        <h3
          className="font-sans text-foreground"
          style={{
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          {title}
        </h3>
        <span
          className="font-mono tabular-nums shrink-0"
          style={{
            fontSize: "10px",
            fontWeight: 500,
            lineHeight: 1,
            letterSpacing: "0.06em",
            color: "rgba(0,0,0,0.38)",
            whiteSpace: "nowrap",
            paddingTop: "3px",
          }}
        >
          {label}
        </span>
      </div>
      {children && (
        <p
          className="text-muted-foreground"
          style={{
            marginTop: "6px",
            marginBottom: 0,
            fontSize: "13px",
            fontWeight: 400,
            lineHeight: 1.5,
            color: "rgba(0,0,0,0.62)",
          }}
        >
          {children}
        </p>
      )}
    </Tag>
  );
};

const FieldLabel = ({ children, required }: { children: ReactNode; required?: boolean }) => (
  <label
    className="font-mono uppercase block"
    style={{
      fontSize: "10px",
      fontWeight: 500,
      letterSpacing: "0.08em",
      color: "rgba(0,0,0,0.62)",
      marginBottom: "6px",
    }}
  >
    {children}
    {!required && (
      <span style={{ marginLeft: "8px", color: "rgba(0,0,0,0.38)" }}>(optional)</span>
    )}
  </label>
);

const inputBase: React.CSSProperties = {
  width: "100%",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: "8px",
  padding: "9px 12px",
  fontSize: "13px",
  fontWeight: 400,
  lineHeight: 1.4,
  color: "#0A0A0A",
  backgroundColor: "#FFFFFF",
  outline: "none",
};

/* ───────────────── Page ───────────────── */

const ReportConcern = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: document.getElementById("submit")?.offsetTop ?? 0, behavior: "smooth" });
    }
  };

  const sectionStyle = { paddingTop: "24px", paddingBottom: "20px" } as const;
  const gridGap = { gap: "8px" } as const;

  return (
    <>
      <PageMeta
        title="Report a Concern · Source Standard"
        description="Public intake channel for registry accuracy, sourcing claims, and public-record discrepancies."
        path="/report-a-concern"
      />
      <Breadcrumb
        items={[
          { label: "Registry", to: "/verified-vendors" },
          { label: "Report a Concern" },
        ]}
      />

      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Public Intake Channel"
        title="Report a Concern"
        statement="Submit information related to registry accuracy, sourcing claims, or public-record discrepancies. Submissions are reviewed against available records."
        docId=""
        actions={
          <div className="flex flex-wrap items-center" style={{ gap: "10px" }}>
            <a
              href="#submit"
              className="inline-flex items-center font-sans"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#0A0A0A",
                borderRadius: "999px",
                padding: "10px 18px",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.02em",
              }}
            >
              Submit Concern
            </a>
            <Link
              to="/verified-vendors"
              className="inline-flex items-center font-sans"
              style={{
                border: "1px solid rgba(255,255,255,0.32)",
                color: "#FFFFFF",
                borderRadius: "999px",
                padding: "10px 18px",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              View Registry
            </Link>
          </div>
        }
      />

      <div className="bg-background">
        <div className="page-shell">
          <div className="mx-auto w-standard">
            {/* §01 */}
            <section className="border-t border-border/40" style={sectionStyle}>
              <SectionHeader
                n="01"
                title="What Can Be Reported"
                intro="Concerns within review scope of the Source Standard framework."
              />
              <div className="grid grid-cols-1 md:grid-cols-2" style={gridGap}>
                {REPORTABLE.map((c, i) => (
                  <CompactCard key={c.t} title={c.t} number={i + 1} total={REPORTABLE.length}>
                    {c.d}
                  </CompactCard>
                ))}
              </div>
            </section>

            {/* §02 */}
            <section className="border-t border-border/40" style={sectionStyle}>
              <SectionHeader
                n="02"
                title="What Cannot Be Reported"
                intro="Matters outside the registry review scope. Direct to the appropriate authority."
              />
              <div className="grid grid-cols-1 md:grid-cols-2" style={gridGap}>
                {OUT_OF_SCOPE.map((c, i) => (
                  <CompactCard key={c.t} title={c.t} number={i + 1} total={OUT_OF_SCOPE.length}>
                    {c.d}
                  </CompactCard>
                ))}
              </div>
            </section>

            {/* §03 */}
            <section className="border-t border-border/40" style={sectionStyle}>
              <SectionHeader
                n="03"
                title="How Concerns Are Reviewed"
                intro="Each submission moves through a four-step review."
              />
              <ol className="flex flex-col" style={{ gap: "6px" }}>
                {PROCESS.map((s, i) => (
                  <CompactCard key={s.t} as="li" title={s.t} number={i + 1} total={PROCESS.length}>
                    {s.d}
                  </CompactCard>
                ))}
              </ol>
            </section>

            {/* §04 */}
            <section className="border-t border-border/40" style={sectionStyle}>
              <SectionHeader
                n="04"
                title="Evidence Guidelines"
                intro="Help us review concerns efficiently. Attach any materials relevant to the report."
              />
              <div className="grid grid-cols-1 md:grid-cols-2" style={gridGap}>
                {EVIDENCE.map((c, i) => (
                  <CompactCard key={c.t} title={c.t} number={i + 1} total={EVIDENCE.length}>
                    {c.d}
                  </CompactCard>
                ))}
              </div>
            </section>

            {/* §05 Submit */}
            <section
              id="submit"
              className="scroll-mt-24 border-t border-border/40"
              style={{ paddingTop: "24px", paddingBottom: "48px" }}
            >
              <SectionHeader
                n="05"
                title="Submit Registry Information"
                intro="Provide available information and supporting documentation for review."
              />

              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "14px",
                  padding: "18px",
                }}
              >
                {submitted ? (
                  <div className="flex flex-col" style={{ gap: "6px" }}>
                    <p
                      className="font-mono uppercase"
                      style={{
                        fontSize: "10px",
                        fontWeight: 500,
                        letterSpacing: "0.08em",
                        color: "rgba(0,0,0,0.38)",
                      }}
                    >
                      Submission Received
                    </p>
                    <h3
                      className="font-sans text-foreground"
                      style={{ fontSize: "16px", fontWeight: 600, lineHeight: 1.3, margin: 0 }}
                    >
                      Concern logged for review.
                    </h3>
                    <p
                      className="text-muted-foreground"
                      style={{ fontSize: "13px", lineHeight: 1.5, marginTop: "2px" }}
                    >
                      The submission has been added to the intake register. No additional action is required.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: "12px" }}>
                    <div>
                      <FieldLabel required>Concern Type</FieldLabel>
                      <select required name="concernType" style={inputBase} defaultValue="">
                        <option value="" disabled>Select a category</option>
                        {CONCERN_TYPES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <FieldLabel required>Vendor Name</FieldLabel>
                      <input required name="vendor" type="text" maxLength={120} placeholder="Legal or trade name" style={inputBase} />
                    </div>

                    <div>
                      <FieldLabel>Registry Record</FieldLabel>
                      <input name="record" type="text" maxLength={120} placeholder="Listing URL or record ID" style={inputBase} />
                    </div>

                    <div>
                      <FieldLabel required>Description</FieldLabel>
                      <textarea
                        required
                        name="description"
                        maxLength={2000}
                        rows={5}
                        placeholder="Describe the concern, the relevant claim or record, and any inconsistency identified."
                        style={{ ...inputBase, resize: "vertical", fontFamily: "inherit" }}
                      />
                    </div>

                    <div>
                      <FieldLabel>Supporting Documentation</FieldLabel>
                      <input
                        name="documentation"
                        type="file"
                        multiple
                        style={{ ...inputBase, padding: "8px 12px", fontSize: "12px" }}
                      />
                    </div>

                    <div>
                      <FieldLabel>Email Address</FieldLabel>
                      <input name="email" type="email" maxLength={255} placeholder="For clarification correspondence" style={inputBase} />
                    </div>

                    <div className="flex flex-wrap items-center" style={{ gap: "10px", marginTop: "2px" }}>
                      <button
                        type="submit"
                        className="inline-flex items-center font-sans"
                        style={{
                          backgroundColor: "#0A0A0A",
                          color: "#FFFFFF",
                          borderRadius: "999px",
                          padding: "10px 18px",
                          fontSize: "12px",
                          fontWeight: 600,
                          letterSpacing: "0.02em",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Submit Concern
                      </button>
                      <p className="text-muted-foreground" style={{ fontSize: "11px", lineHeight: 1.5 }}>
                        Your identity is kept confidential.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportConcern;
