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
  "Review opens → Under Review",
  "Review concludes → Verified or Removed",
  "Renewal interval reached → Under Review (renewal cycle)",
  "Triggering event (report, supplier change, claim divergence) → Under Review or Suspended",
  "Resolution → Verified, Suspended, or Removed",
];

const StatusDefinitions = () => (
  <>
    <RecordHeader
      metadata={[
        { label: "Doc", value: "SS-STATUS-2026.01" },
        { label: "Status", value: "Active" },
        { label: "Updated", value: "04/21/26" },
        { label: "Jurisdiction", value: "FL/US" },
      ]}
      eyebrow="Status Definitions"
      title="Public status terms used across the Source Standard registry"
      lead="Every public listing carries a status. This document defines what each status means, what it tells the public, what it does not imply, when it is assigned, and when it changes."
    />

    <Section>
      <SectionLabel
        number="§1"
        title="Why public statuses exist"
        description="A public status is a short, standardized label attached to every entity in the registry. It allows consumers, clinicians, and vendors to read the registry consistently without interpreting individual case files. Statuses are assigned against reviewed evidence, not marketing language."
      />
    </Section>

    <Section muted>
      <SectionLabel number="§2" title="Status definitions" />
      <div className="divide-y divide-border/70 border-y border-border/70 bg-background">
        {statuses.map((s) => (
          <div key={s.key} className="grid md:grid-cols-12 gap-6 px-6 py-8">
            <div className="md:col-span-3">
              <div
                className={`inline-flex items-center gap-2 font-mono font-semibold uppercase tracking-[0.16em] text-[11px] ${s.swatch}`}
              >
                <span aria-hidden>■</span>
                {s.label}
              </div>
            </div>
            <dl className="md:col-span-9 space-y-3 text-[14.5px] leading-relaxed">
              <div>
                <dt className="meta-label">Meaning</dt>
                <dd className="text-foreground mt-1">{s.meaning}</dd>
              </div>
              <div>
                <dt className="meta-label">Tells the public</dt>
                <dd className="text-muted-foreground mt-1">{s.tells}</dd>
              </div>
              <div>
                <dt className="meta-label">Does not imply</dt>
                <dd className="text-muted-foreground mt-1">{s.notImply}</dd>
              </div>
              <div>
                <dt className="meta-label">When assigned</dt>
                <dd className="text-muted-foreground mt-1">{s.assigned}</dd>
              </div>
              <div>
                <dt className="meta-label">When it changes</dt>
                <dd className="text-muted-foreground mt-1">{s.changes}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </Section>

    <Section>
      <SectionLabel
        number="§3"
        title="Status lifecycle"
        description="A status is never permanent. Every listing moves through the same general flow."
      />
      <ol className="space-y-3 max-w-2xl">
        {lifecycle.map((step, i) => (
          <li key={i} className="flex gap-4 text-[14.5px]">
            <span className="meta-mono text-muted-foreground w-6 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-foreground">{step}</span>
          </li>
        ))}
      </ol>
    </Section>

    <Section muted>
      <SectionLabel number="§4" title="Read deeper" />
      <ul className="space-y-2 text-[14.5px]">
        <li>
          <Link to="/how-it-works" className="text-foreground underline-offset-4 hover:underline">
            Verification — how reviews are conducted →
          </Link>
        </li>
        <li>
          <Link to="/accountability" className="text-foreground underline-offset-4 hover:underline">
            Accountability & Enforcement — what triggers status changes →
          </Link>
        </li>
        <li>
          <Link to="/verification-disclaimer" className="text-foreground underline-offset-4 hover:underline">
            Verification Disclaimer — scope and boundaries →
          </Link>
        </li>
      </ul>
      <p className="mt-10 meta-label">
        Cite as: Source Standard Status Definitions, SS-STATUS-2026.01.
      </p>
    </Section>
  </>
);

export default StatusDefinitions;
