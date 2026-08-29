import { FormEvent, ReactNode, useState } from "react";
import { EditorialBackLink } from "@/components/EditorialBackLink";
import { PageMeta } from "@/components/PageMeta";
import { ArticleHeader } from "@/components/ArticleHeader";
import { ArticleSection } from "@/components/ArticleSection";
import { DefList } from "@/components/DefList";

const REPORTABLE = [
  { term: "Registry information", description: "Report incorrect vendor information, business details, classifications, or public record references." },
  { term: "Sourcing claims", description: "Report sourcing representations that appear inconsistent with available evidence." },
  { term: "Status misrepresentation", description: "Report unauthorized use or inaccurate representation of Source Standard status language." },
  { term: "Public record changes", description: "Report licensing, registration, enforcement, or public record changes that may affect an existing registry record." },
];

const OUT_OF_SCOPE = [
  { term: "Medical advice", description: "Source Standard does not provide medical guidance or treatment recommendations." },
  { term: "Billing disputes", description: "Payment disputes must be handled directly with the vendor." },
  { term: "Personal complaints", description: "Private disputes unrelated to public registry information are outside review scope." },
  { term: "Emergency matters", description: "Urgent safety concerns should be directed to the appropriate regulatory authority." },
];

const PROCESS = [
  { term: "Submission received", description: "Concern is received through the public intake channel." },
  { term: "Initial review", description: "Scope and supporting information are reviewed." },
  { term: "Evidence review", description: "Available documentation and registry records are considered." },
  { term: "Resolution", description: "The registry may be updated or the concern may be closed based on the information reviewed." },
];

const EVIDENCE = [
  { term: "Documentation", description: "Invoices, records, licenses, registrations, and supporting documents." },
  { term: "Public records", description: "Government databases, disciplinary records, or official filings." },
  { term: "Screenshots", description: "Website content, advertisements, or public statements." },
  { term: "Sourcing documents", description: "Relevant sourcing and fulfillment information when available." },
];

const CONCERN_TYPES = [
  "Registry Information",
  "Sourcing Claims",
  "Status Misrepresentation",
  "Public Record Changes",
];

const FieldLabel = ({ children, required }: { children: ReactNode; required?: boolean }) => (
  <label
    className="font-mono uppercase block text-muted-foreground"
    style={{
      fontSize: "10px",
      fontWeight: 500,
      letterSpacing: "0.10em",
      marginBottom: "6px",
    }}
  >
    {children}
    {!required && (
      <span style={{ marginLeft: "8px", opacity: 0.7 }}>(optional)</span>
    )}
  </label>
);

const inputBase: React.CSSProperties = {
  width: "100%",
  border: "0.5px solid hsl(var(--border))",
  borderRadius: "8px",
  padding: "10px 12px",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: 1.4,
  color: "hsl(var(--foreground))",
  backgroundColor: "hsl(var(--background))",
  outline: "none",
};

const ReportConcern = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: document.getElementById("submit")?.offsetTop ?? 0, behavior: "smooth" });
    }
  };

  const lead =
    "Submit information related to registry accuracy, sourcing claims, or public-record discrepancies. Submissions are reviewed against available records.";

  return (
    <>
      <PageMeta
        title="Report a Concern · Source Standard"
        description={lead}
        path="/report-a-concern"
      />

      <ArticleHeader
        category="Public Intake Channel"
        title="Report a Concern"
        lead={lead}
        backHref="/clinics"
        backLabel="Back to Registry"
      />

      <ArticleSection variant="prose" title="What can be reported">
        <p>Concerns within review scope of the Source Standard framework.</p>
        <DefList items={REPORTABLE} />
      </ArticleSection>

      <ArticleSection variant="prose" title="What cannot be reported">
        <p>Matters outside the registry review scope. Direct to the appropriate authority.</p>
        <DefList items={OUT_OF_SCOPE} />
      </ArticleSection>

      <ArticleSection variant="prose" title="How concerns are reviewed">
        <p>Each submission moves through a four-step review.</p>
        <DefList items={PROCESS} />
      </ArticleSection>

      <ArticleSection variant="prose" title="Evidence guidelines">
        <p>Attach any materials relevant to the report so it can be reviewed efficiently.</p>
        <DefList items={EVIDENCE} />
      </ArticleSection>

      <section
        id="submit"
        className="scroll-mt-24 bg-background"
        style={{ paddingTop: "28px", paddingBottom: "0" }}
      >
        <div className="page-shell">
          <div className="mx-auto w-reading-wide" style={{ maxWidth: "68ch" }}>
            <h2 className="t-section-title-sm text-foreground" style={{ marginBottom: "8px" }}>
              Submit registry information
            </h2>
            <p className="text-foreground" style={{ fontSize: "16px", lineHeight: 1.65, marginBottom: "18px" }}>
              Provide available information and supporting documentation for review.
            </p>

            {submitted ? (
              <div
                style={{
                  border: "0.5px solid hsl(var(--border))",
                  background: "hsl(var(--muted) / 0.35)",
                  borderRadius: "8px",
                  padding: "16px 20px",
                }}
              >
                <p
                  className="font-mono uppercase text-muted-foreground"
                  style={{ fontSize: "10px", letterSpacing: "0.12em", marginBottom: "6px" }}
                >
                  Submission received
                </p>
                <h3
                  className="font-sans text-foreground"
                  style={{ fontSize: "16px", fontWeight: 600, lineHeight: 1.3, margin: 0 }}
                >
                  Concern logged for review.
                </h3>
                <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.6, marginTop: "6px" }}>
                  The submission has been added to the intake register. No additional action is required.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: "14px" }}>
                <div>
                  <FieldLabel required>Concern type</FieldLabel>
                  <select required name="concernType" style={inputBase} defaultValue="">
                    <option value="" disabled>Select a category</option>
                    {CONCERN_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <FieldLabel required>Vendor name</FieldLabel>
                  <input required name="vendor" type="text" maxLength={120} placeholder="Legal or trade name" style={inputBase} />
                </div>

                <div>
                  <FieldLabel>Registry record</FieldLabel>
                  <input name="record" type="text" maxLength={120} placeholder="Record URL or record ID" style={inputBase} />
                </div>

                <div>
                  <FieldLabel required>Description</FieldLabel>
                  <textarea
                    required
                    name="description"
                    maxLength={2000}
                    rows={6}
                    placeholder="Describe the concern, the relevant claim or record, and any inconsistency identified."
                    style={{ ...inputBase, resize: "vertical", fontFamily: "inherit" }}
                  />
                </div>

                <div>
                  <FieldLabel>Supporting documentation</FieldLabel>
                  <input
                    name="documentation"
                    type="file"
                    multiple
                    style={{ ...inputBase, padding: "8px 12px", fontSize: "13px" }}
                  />
                </div>

                <div>
                  <FieldLabel>Email address</FieldLabel>
                  <input name="email" type="email" maxLength={255} placeholder="For clarification correspondence" style={inputBase} />
                </div>

                <div className="flex flex-wrap items-center" style={{ gap: "12px", marginTop: "4px" }}>
                  <button
                    type="submit"
                    className="inline-flex items-center font-sans bg-foreground text-background hover:opacity-90 transition-opacity"
                    style={{
                      borderRadius: "999px",
                      padding: "10px 20px",
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.02em",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Submit concern
                  </button>
                  <p className="text-muted-foreground" style={{ fontSize: "12px", lineHeight: 1.5, margin: 0 }}>
                    Your identity is kept confidential.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    <EditorialBackLink to="/" label="Back to Home" />
    </>
  );
};

export default ReportConcern;
