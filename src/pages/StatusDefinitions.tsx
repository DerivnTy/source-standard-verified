import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { Section, SectionLabel } from "@/components/Section";

const statuses = [
  {
    key: "verified",
    label: "Verified",
    swatch: "text-verified",
    meaning:
      "The vendor has completed a documented review against the Source Standard framework and the listing reflects records reviewed at the time of publication.",
    tells:
      "Records, licensing, and sourcing documentation were reviewed and found consistent with public claims within the listed scope.",
    notImply:
      "It does not imply endorsement of clinical outcomes, individual prescriptions, or product safety guarantees.",
    assigned:
      "Assigned after intake, document review, sourcing alignment, and category scope confirmation are all completed.",
    changes:
      "Changes when renewal lapses, material vendor changes occur, or a re-review is triggered by a credible report.",
  },
  {
    key: "pending-review",
    label: "Pending Review",
    swatch: "text-pending",
    meaning: "An application has been received but the review has not yet begun.",
    tells: "The vendor has formally entered the verification pipeline.",
    notImply: "It does not imply any portion of the review has been completed.",
    assigned: "Assigned at intake when the application package is received and acknowledged.",
    changes: "Changes when the review opens (Under Review) or the application is withdrawn.",
  },
  {
    key: "under-review",
    label: "Under Review",
    swatch: "text-pending",
    meaning:
      "An active review is in progress. Records, licensing, and sourcing documentation are being examined.",
    tells: "The listing is currently being evaluated by the framework's review process.",
    notImply: "It does not imply any conclusion about the vendor's records or sourcing.",
    assigned:
      "Assigned when document review begins, or when an existing Verified listing is re-opened due to a triggering event.",
    changes:
      "Changes to Verified, Suspended, or Removed when the review concludes.",
  },
  {
    key: "suspended",
    label: "Suspended",
    swatch: "text-destructive",
    meaning:
      "A previously Verified listing has been temporarily withdrawn pending clarification or correction.",
    tells:
      "An open question or unresolved discrepancy exists that prevents the Verified status from being maintained.",
    notImply:
      "It does not imply confirmed wrongdoing, fraud, or regulatory action.",
    assigned:
      "Assigned when a vendor fails to renew on schedule, fails to respond to a clarification request, or when material discrepancies surface.",
    changes:
      "Changes back to Verified when issues are resolved, or to Removed if unresolved.",
  },
  {
    key: "removed",
    label: "Removed",
    swatch: "text-muted-foreground",
    meaning:
      "The listing has been withdrawn from the public registry and is no longer maintained.",
    tells:
      "The vendor is no longer represented in the registry under the Source Standard framework.",
    notImply:
      "It does not imply any specific finding of misconduct unless explicitly stated in an attached public note.",
    assigned:
      "Assigned after sustained non-response, voluntary withdrawal, sustained material misrepresentation, or supplier delisting that cannot be remediated.",
    changes:
      "Reinstatement requires a new application and a fresh review cycle.",
  },
  {
    key: "greenlisted",
    label: "Greenlisted",
    swatch: "text-verified",
    meaning:
      "An upstream source (503A pharmacy, 503B outsourcing facility, or qualified supplier) is recognized as a documented, FDA-registered or state-licensed entity that vendors may legitimately source from.",
    tells:
      "The upstream source is documented, traceable, and operates within recognized regulatory categories.",
    notImply:
      "It does not imply the source is contracted with, endorsed by, or affiliated with Source Standard, nor does it certify every product the source produces.",
    assigned:
      "Assigned after confirmation of registration, licensing category, and operating record.",
    changes:
      "Changes when registration lapses, licensing is withdrawn, or the source is removed by the relevant regulator.",
  },
  {
    key: "not-listed",
    label: "Not Listed",
    swatch: "text-muted-foreground",
    meaning:
      "The entity does not appear in the registry. This may mean the entity has not applied, has not been reviewed, or has been removed.",
    tells: "There is no public record under the Source Standard framework for this entity.",
    notImply:
      "It does not imply the entity is illegitimate, unsafe, or non-compliant. It only indicates the absence of a Source Standard record.",
    assigned: "Default state for any entity that has not entered the registry.",
    changes: "Changes only by entering the verification or greenlist process.",
  },
];

const lifecycle = [
  "Application received → Pending Review",
  "Examination commences → Under Review",
  "Examination concludes → Verified or Removed (De-listed)",
  "Renewal interval reached → Under Review (renewal cycle)",
  "Triggering event (public report, supply-chain change, claims divergence, MDE) → Under Review or Suspended",
  "Resolution → Verified, Suspended, or Removed (De-listed)",
];

const STATUS_LABEL_OVERRIDES: Record<string, string> = {
  removed: "Removed (De-listed)",
  greenlisted: "Greenlisted (Qualified Upstream Designation)",
  "not-listed": "Not Listed (Null Standing)",
};

const STATUS_COPY_OVERRIDES: Record<
  string,
  { meaning: string; tells: string; notImply: string; assigned: string; changes: string }
> = {
  verified: {
    meaning:
      "Positive determination of record consistency. The entity has completed a documented examination against the Source Standard evidentiary rubric, and the listing reflects records reviewed at the time of publication.",
    tells:
      "Records, regulatory credentials, and supply-chain documentation have been Reconciled with public claims within the declared examination scope.",
    notImply:
      "Does not constitute endorsement of clinical outcomes, individual prescriptions, or product safety guarantees.",
    assigned:
      "Issued upon successful completion of intake, evidentiary review, supply-chain reconciliation, and category-scope confirmation.",
    changes:
      "Revised upon lapse of renewal, occurrence of a Mandatory Disclosure Event (MDE), or initiation of a triggered re-examination.",
  },
  "pending-review": {
    meaning:
      "Application received; audit file opened but examination has not yet commenced.",
    tells: "The entity has formally entered the verification pipeline.",
    notImply:
      "Does not imply that any portion of the evidentiary review has been conducted.",
    assigned:
      "Issued at intake when the application package is received and acknowledged.",
    changes:
      "Revised when examination commences (Under Review) or upon withdrawal of the application.",
  },
  "under-review": {
    meaning:
      "Active examination in progress. Records, regulatory credentials, and supply-chain documentation are being examined against the rubric.",
    tells: "The audit file is currently open and undergoing examination.",
    notImply:
      "Does not imply any conclusion regarding the entity's records, sourcing, or compliance posture.",
    assigned:
      "Issued at the commencement of evidentiary review, or upon re-opening of a Verified file following a triggering event.",
    changes:
      "Revised to Verified, Suspended, or Removed upon conclusion of the examination.",
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
    tells:
      "The entity is no longer represented in the registry under the Source Standard framework.",
    notImply:
      "Does not constitute a specific finding of misconduct unless explicitly stated in an attached public note.",
    assigned:
      "Issued where the entity has Defaulted on compliance obligations through sustained non-response, voluntary withdrawal, sustained material misrepresentation, or upstream-supplier delisting that cannot be remediated.",
    changes:
      "Reinstatement requires submission of a new application and a fresh examination cycle.",
  },
  greenlisted: {
    meaning:
      "Qualified Upstream Designation. An upstream source — 503A pharmacy, 503B outsourcing facility, or qualified supplier — recognized as a documented, FDA-registered or state-licensed manufacturing anchor from which Verified vendors may legitimately source.",
    tells:
      "The upstream source is documented, traceable, and operates within recognized regulatory categories as a manufacturing anchor of the supply chain.",
    notImply:
      "Does not imply contract, endorsement, or affiliation with Source Standard, and does not certify every product manufactured by the source.",
    assigned:
      "Issued upon confirmation of registration, licensing category, and operating record.",
    changes:
      "Revised upon lapse of registration, withdrawal of licensing, or removal of the source by the relevant regulator.",
  },
  "not-listed": {
    meaning:
      "Null Standing. The entity is outside the surveillance scope of the Source Standard framework. It has not applied, has not been examined, or has been previously De-listed.",
    tells:
      "No public record exists under the Source Standard framework for this entity.",
    notImply:
      "Does not imply that the entity is illegitimate, unsafe, or non-compliant under any external regulatory regime. It indicates only the absence of a Source Standard record.",
    assigned: "Default standing for any entity that has not entered the registry.",
    changes:
      "Revised only upon entry into the verification or Greenlist examination process.",
  },
};

const FIELD_LABELS = {
  meaning: "Definition",
  tells: "Public-record signal",
  notImply: "Limits / does not imply",
  assigned: "Conditions of issuance",
  changes: "Conditions of revision",
};

const StatusDefinitions = () => (
  <>
    <RecordHeader
      metadata={[
        { label: "Doc", value: "SS-STATUS-2026.01" },
        { label: "Status", value: "Active" },
        { label: "Updated", value: "04/21/26" },
        { label: "Jurisdiction", value: "United States" },
      ]}
      eyebrow="Administrative code"
      title="Glossary of Regulatory Standings."
      lead="Controlled glossary of public standings assigned to entities under the Source Standard framework. Each standing reflects the disposition of the audit file at the time of last update and is governed by continuous surveillance."
      summary={[
        { label: "Standings", value: statuses.length.toString().padStart(2, "0") },
        { label: "Surveillance cycle", value: "Renewal-based" },
        { label: "Issued by", value: "Review process" },
        { label: "Citable", value: "Yes" },
      ]}
    />

    <Section density="doc">
      <SectionLabel
        number="§1"
        title="Purpose of the controlled glossary."
        description="A regulatory standing is a short, controlled label affixed to every entity in the registry. It enables consumers, clinicians, and licensed entities to read the registry consistently without interpreting individual audit files. Standings are issued against reviewed evidence — never against marketing language or self-declaration."
      />
    </Section>

    <Section muted density="doc">
      <SectionLabel number="§2" title="Glossary of standings." />
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-2.5 border-y border-border/70 bg-background font-mono uppercase tracking-[0.1em] text-[10.5px] text-muted-foreground">
        <span>
          Code · <span className="text-foreground">SS-STATUS-2026.01</span> · §2
        </span>
        <span>
          <span className="text-foreground">07</span> controlled standings · Continuously surveilled
        </span>
      </div>
      <div className="divide-y divide-border/70 border-b border-border/70 bg-background">
        {statuses.map((s, idx) => {
          const label = STATUS_LABEL_OVERRIDES[s.key] ?? s.label;
          const copy = STATUS_COPY_OVERRIDES[s.key] ?? {
            meaning: s.meaning,
            tells: s.tells,
            notImply: s.notImply,
            assigned: s.assigned,
            changes: s.changes,
          };
          const rows: { key: keyof typeof FIELD_LABELS; value: string; emphasis?: boolean }[] = [
            { key: "meaning", value: copy.meaning, emphasis: true },
            { key: "tells", value: copy.tells },
            { key: "notImply", value: copy.notImply },
            { key: "assigned", value: copy.assigned },
            { key: "changes", value: copy.changes },
          ];
          return (
            <div key={s.key} className="grid md:grid-cols-12 gap-6 px-5 py-6">
              <div className="md:col-span-3">
                <div
                  className={`inline-flex items-center gap-2 font-mono font-semibold uppercase tracking-[0.14em] text-[11px] ${s.swatch}`}
                >
                  <span aria-hidden>■</span>
                  {label}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground mt-2">
                  Standing · {String(idx + 1).padStart(2, "0")}
                </div>
              </div>
              <dl className="md:col-span-9 space-y-2.5 text-[15px] leading-relaxed">
                {rows.map((row) => (
                  <div key={row.key} className="md:flex md:gap-6">
                    <dt className="meta-label md:w-44 md:shrink-0 md:pt-1">
                      {FIELD_LABELS[row.key]}
                    </dt>
                    <dd
                      className={`mt-1 md:mt-0 flex-1 ${
                        row.emphasis ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          );
        })}
      </div>
    </Section>

    <Section density="doc">
      <SectionLabel
        number="§3"
        title="Temporal Nature of Determinations."
        description="No standing is permanent. Every audit file moves through the same controlled flow under continuous surveillance, and every Verified determination is bounded by a renewal interval."
      />
      <p className="font-mono uppercase tracking-[0.1em] text-[10.5px] text-foreground mb-3">
        Continuous surveillance · Standard flow
      </p>
      <ol className="space-y-3 max-w-2xl">
        {lifecycle.map((step, i) => (
          <li key={i} className="flex gap-4 text-[15px]">
            <span className="meta-mono text-muted-foreground w-6 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-foreground">{step}</span>
          </li>
        ))}
      </ol>
    </Section>

    <Section muted density="tight">
      <SectionLabel number="§4" title="Cross-references." />
      <ul className="space-y-2 text-[15px]">
        <li>
          <Link to="/how-it-works" className="text-foreground underline-offset-4 hover:underline">
            Verification Protocol & Audit Methodology →
          </Link>
        </li>
        <li>
          <Link to="/accountability" className="text-foreground underline-offset-4 hover:underline">
            Accountability & Enforcement — triggering events →
          </Link>
        </li>
        <li>
          <Link to="/verification-disclaimer" className="text-foreground underline-offset-4 hover:underline">
            Verification Disclaimer — scope of attestation →
          </Link>
        </li>
      </ul>
      <p className="mt-8 meta-label">
        Cite as: Source Standard, Glossary of Regulatory Standings, SS-STATUS-2026.01.
      </p>
    </Section>
  </>
);

export default StatusDefinitions;
