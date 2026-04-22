import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import {
  BoardSection,
  BoardCiteFooter,
} from "@/components/BoardSection";

const DOC_ID = "SS-STATUS-2026.01";

const statuses = [
  {
    key: "verified",
    label: "Verified",
    swatch: "text-verified",
  },
  {
    key: "pending-review",
    label: "Pending Review",
    swatch: "text-pending",
  },
  {
    key: "under-review",
    label: "Under Review",
    swatch: "text-pending",
  },
  {
    key: "suspended",
    label: "Suspended",
    swatch: "text-destructive",
  },
  {
    key: "removed",
    label: "Removed (De-listed)",
    swatch: "text-muted-foreground",
  },
  {
    key: "greenlisted",
    label: "Greenlisted (Qualified Upstream Designation)",
    swatch: "text-verified",
  },
  {
    key: "not-listed",
    label: "Not Listed (Null Standing)",
    swatch: "text-muted-foreground",
  },
];

const STATUS_COPY: Record<
  string,
  { meaning: string; tells: string; notImply: string; assigned: string; changes: string }
> = {
  verified: {
    meaning:
      "Positive determination of record consistency. The entity has completed a documented examination against the Source Standard evidentiary rubric, and the listing reflects records reviewed at the time of publication.",
    tells:
      "Records, regulatory credentials, and supply-chain documentation have been reconciled with public claims within the declared examination scope.",
    notImply:
      "Does not constitute endorsement of clinical outcomes, individual prescriptions, or product safety guarantees.",
    assigned:
      "Issued upon successful completion of intake, evidentiary review, supply-chain reconciliation, and category-scope confirmation.",
    changes:
      "Revised upon lapse of renewal, occurrence of a Mandatory Disclosure Event (MDE), or initiation of a triggered re-examination.",
  },
  "pending-review": {
    meaning: "Application received; audit file opened but examination has not yet commenced.",
    tells: "The entity has formally entered the verification pipeline.",
    notImply: "Does not imply that any portion of the evidentiary review has been conducted.",
    assigned: "Issued at intake when the application package is received and acknowledged.",
    changes: "Revised when examination commences (Under Review) or upon withdrawal of the application.",
  },
  "under-review": {
    meaning:
      "Active examination in progress. Records, regulatory credentials, and supply-chain documentation are being examined against the rubric.",
    tells: "The audit file is currently open and undergoing examination.",
    notImply: "Does not imply any conclusion regarding the entity's records, sourcing, or compliance posture.",
    assigned:
      "Issued at the commencement of evidentiary review, or upon re-opening of a Verified file following a triggering event.",
    changes: "Revised to Verified, Suspended, or Removed upon conclusion of the examination.",
  },
  suspended: {
    meaning:
      "Administrative hold pending evidentiary clarification. A previously Verified standing is temporarily withdrawn.",
    tells:
      "An open question, undisclosed Mandatory Disclosure Event (MDE), or unresolved discrepancy prevents the Verified standing from being maintained.",
    notImply:
      "Does not constitute a finding of misconduct, fraud, or regulatory enforcement action by any governmental body.",
    assigned:
      "Issued upon failure to renew on schedule, failure to respond to a clarification request, or surfacing of material discrepancies.",
    changes:
      "Revised back to Verified upon resolution; revised to Removed (De-listed) if the matter remains unresolved.",
  },
  removed: {
    meaning:
      "De-listing. The entity has been withdrawn from the public registry and the audit file is no longer maintained.",
    tells: "The entity is no longer represented in the registry under the Source Standard framework.",
    notImply:
      "Does not constitute a specific finding of misconduct unless explicitly stated in an attached public note.",
    assigned:
      "Issued where the entity has defaulted on compliance obligations through sustained non-response, voluntary withdrawal, sustained material misrepresentation, or upstream-supplier delisting that cannot be remediated.",
    changes: "Reinstatement requires submission of a new application and a fresh examination cycle.",
  },
  greenlisted: {
    meaning:
      "Qualified Upstream Designation. An upstream source — 503A pharmacy, 503B outsourcing facility, or qualified supplier — recognized as a documented, FDA-registered or state-licensed manufacturing anchor from which Verified vendors may legitimately source.",
    tells:
      "The upstream source is documented, traceable, and operates within recognized regulatory categories as a manufacturing anchor of the supply chain.",
    notImply:
      "Does not imply contract, endorsement, or affiliation with Source Standard, and does not certify every product manufactured by the source.",
    assigned: "Issued upon confirmation of registration, licensing category, and operating record.",
    changes: "Revised upon lapse of registration, withdrawal of licensing, or removal of the source by the relevant regulator.",
  },
  "not-listed": {
    meaning:
      "Null Standing. The entity is outside the surveillance scope of the Source Standard framework. It has not applied, has not been examined, or has been previously de-listed.",
    tells: "No public record exists under the Source Standard framework for this entity.",
    notImply:
      "Does not imply that the entity is illegitimate, unsafe, or non-compliant under any external regulatory regime. It indicates only the absence of a Source Standard record.",
    assigned: "Default standing for any entity that has not entered the registry.",
    changes: "Revised only upon entry into the verification or Greenlist examination process.",
  },
};

const FIELD_LABELS = {
  meaning: "Definition",
  tells: "Public-record signal",
  notImply: "Limits / does not imply",
  assigned: "Conditions of issuance",
  changes: "Conditions of revision",
} as const;

const lifecycle = [
  "Application received → Pending Review",
  "Examination commences → Under Review",
  "Examination concludes → Verified or Removed (De-listed)",
  "Renewal interval reached → Under Review (renewal cycle)",
  "Triggering event (public report, supply-chain change, claims divergence, MDE) → Under Review or Suspended",
  "Resolution → Verified, Suspended, or Removed (De-listed)",
];

const StatusDefinitions = () => (
  <>
    <RecordHeader
      metadata={[
        { label: "Doc", value: DOC_ID },
        { label: "Version", value: "2026.01" },
        { label: "Status", value: "Active" },
        { label: "Updated", value: "04 / 21 / 2026" },
        { label: "Jurisdiction", value: "United States" },
      ]}
      eyebrow="Administrative code"
      title="Glossary of Regulatory Standings."
      lead="Controlled glossary of public standings assigned to entities under the Source Standard framework. Each standing reflects the disposition of the audit file at the time of last update and is governed by continuous surveillance."
    />

    <BoardSection
      n={1}
      category="Purpose"
      title="Purpose of the controlled glossary."
      rationale="Standings are issued against reviewed evidence — never against marketing language or self-declaration."
    >
      <p>
        A regulatory standing is a short, controlled label affixed to every entity in the registry. It enables consumers, clinicians, and licensed entities to read the registry consistently without interpreting individual audit files.
      </p>
    </BoardSection>

    {/* §2 — Glossary roster (MAB roster pattern) */}
    <section className="border-b border-border bg-surface-muted">
      <div className="container-wide py-12 md:py-16">
        <div className="mb-8 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="meta mb-3">§2 · Glossary</p>
            <h2 className="h-section">Controlled standings.</h2>
            <p className="mt-3 text-[13.5px] text-muted-foreground leading-relaxed">
              Each standing carries a definition, a public-record signal, scope limits, and the conditions under which it is issued or revised.
            </p>
          </div>
          <div className="md:col-span-8 flex md:items-end md:justify-end">
            <div className="border border-border bg-background w-full md:w-auto">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
                <span className="text-[10.5px] font-mono uppercase tracking-[0.1em] text-muted-foreground">
                  Roster · {DOC_ID}
                </span>
                <span className="text-[10.5px] font-mono uppercase tracking-[0.1em] text-muted-foreground ml-6">
                  {statuses.length.toString().padStart(2, "0")} controlled standings · Continuously surveilled
                </span>
              </div>
            </div>
          </div>
        </div>

        <ul className="grid md:grid-cols-2 gap-px bg-border border border-border">
          {statuses.map((s, idx) => {
            const copy = STATUS_COPY[s.key];
            const standing = (idx + 1).toString().padStart(2, "0");
            const rows: { key: keyof typeof FIELD_LABELS; value: string; emphasis?: boolean }[] = [
              { key: "meaning", value: copy.meaning, emphasis: true },
              { key: "tells", value: copy.tells },
              { key: "notImply", value: copy.notImply },
              { key: "assigned", value: copy.assigned },
              { key: "changes", value: copy.changes },
            ];
            return (
              <li key={s.key} className="bg-background p-6 md:p-7 flex flex-col">
                <div className="flex items-start justify-between pb-4 mb-4 border-b border-border">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground mb-2">
                      Standing · {standing}
                    </p>
                    <div
                      className={`inline-flex items-center gap-2 font-mono font-semibold uppercase tracking-[0.14em] text-[11px] ${s.swatch}`}
                    >
                      <span aria-hidden>■</span>
                      {s.label}
                    </div>
                  </div>
                </div>
                <dl className="space-y-3 flex-1">
                  {rows.map((row) => (
                    <div key={row.key}>
                      <dt className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground mb-1">
                        {FIELD_LABELS[row.key]}
                      </dt>
                      <dd
                        className={`text-[14.5px] leading-relaxed m-0 ${
                          row.emphasis ? "text-foreground font-medium" : "text-muted-foreground"
                        }`}
                      >
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </li>
            );
          })}
        </ul>
      </div>
    </section>

    <BoardSection
      n={3}
      category="Lifecycle"
      title="Temporal nature of determinations."
      rationale="No standing is permanent. Every audit file moves through the same controlled flow under continuous surveillance, and every Verified determination is bounded by a renewal interval."
    >
      <ol className="border border-border bg-background divide-y divide-border">
        {lifecycle.map((step, i) => (
          <li key={i} className="grid grid-cols-12 gap-4 px-5 py-5 items-baseline">
            <div className="col-span-2 meta text-primary">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="col-span-10 text-[14.5px] text-foreground leading-relaxed">
              {step}
            </div>
          </li>
        ))}
      </ol>
    </BoardSection>

    <BoardSection
      n={4}
      category="Cross-references"
      title="Related framework documents."
      muted
    >
      <ul className="border border-border bg-background divide-y divide-border">
        {[
          { to: "/how-it-works", label: "Verification Protocol & Audit Methodology" },
          { to: "/accountability", label: "Accountability & Enforcement — triggering events" },
          { to: "/verification-disclaimer", label: "Verification Disclaimer — scope of attestation" },
        ].map((r) => (
          <li key={r.to} className="px-5 py-4">
            <Link
              to={r.to}
              className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary"
            >
              {r.label} →
            </Link>
          </li>
        ))}
      </ul>
    </BoardSection>

    <BoardCiteFooter citation={`Source Standard, Glossary of Regulatory Standings, ${DOC_ID}. Last updated 04 / 21 / 2026.`} />
  </>
);

export default StatusDefinitions;
