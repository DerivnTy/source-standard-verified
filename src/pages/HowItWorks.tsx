import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";

const steps = [
  {
    n: "01",
    t: "Application",
    happens:
      "The vendor submits an intake package identifying the business, operating locations, product categories, supplier relationships, and pharmacy sources used for the categories under review.",
    documents:
      "Business identity information, jurisdiction, applicable licenses, supplier disclosures, pharmacy relationships, product category disclosures, certificates, and supporting documentation.",
    outcomes:
      "Accepted for intake, returned for missing information, or declined if the submission falls outside framework scope.",
    status:
      "No public status is assigned at this stage unless the vendor already has an existing registry listing.",
  },
  {
    n: "02",
    t: "Intake review",
    happens:
      "Records are organized, indexed, and checked for completeness before substantive review begins. The reviewer confirms that each claimed category has enough documentation to evaluate.",
    documents:
      "Submission checklist, entity records, license files, product-category matrix, supplier list, invoices, CoAs where applicable, and pharmacy documentation.",
    outcomes:
      "Ready for documentation review, request for clarification, request for missing items, or administrative closure for non-response.",
    status:
      "A vendor may be marked Under Review once the submission meets the minimum threshold for substantive review.",
  },
  {
    n: "03",
    t: "Documentation review",
    happens:
      "The review team evaluates the submitted records against the framework: source traceability, pharmacy alignment, invoice consistency, public claim consistency, and category-level documentation.",
    documents:
      "Invoices, pharmacy licenses, supplier records, certificates of analysis, chain-of-custody logic, product category records, and Greenlist source references where applicable.",
    outcomes:
      "Category accepted, category excluded, unresolved documentation gap, sourcing mismatch, or escalation to board or standards review.",
    status:
      "Documentation findings determine whether a vendor can proceed toward Verified, remain Under Review, or be listed as Unverified.",
  },
  {
    n: "04",
    t: "Status determination",
    happens:
      "A reviewer records the evidence reviewed, the scope of verification, limitations, and the rationale for the assigned public status.",
    documents:
      "Review worksheet, evidence index, source mapping record, status rationale, reviewer notes, review identifier, and date-stamped determination.",
    outcomes:
      "Verified, Unverified, Under Review, Suspended, Removed, or category-limited verification depending on the evidence available.",
    status:
      "This stage creates or updates the public status shown in the registry.",
  },
  {
    n: "05",
    t: "Publication",
    happens:
      "The public registry profile is created or updated with only the information appropriate for public reference. Private documents are not published.",
    documents:
      "Public listing fields, review ID, review date, categories reviewed, status note, limitations of publication, and citation metadata.",
    outcomes:
      "New listing, updated listing, category note, status note, or no public publication if minimum criteria are not met.",
    status:
      "The registry displays the assigned status, review scope, date, and any short public limitations needed for interpretation.",
  },
  {
    n: "06",
    t: "Renewal and monitoring",
    happens:
      "Verification is time-bound. Vendors must keep records current and notify Source Standard of material changes that affect sourcing, location, claims, or reviewed categories.",
    documents:
      "Renewal submission, updated licenses, supplier changes, new invoices, updated CoAs where applicable, revised public claims, and category changes.",
    outcomes:
      "Renewed verification, re-review, status change, suspension, removal, or narrowed verification scope.",
    status:
      "Failure to renew or disclose material changes may pause, suspend, or remove a listing from the public registry.",
  },
];

const reviewItems = [
  "Business and entity identification",
  "Applicable licenses and registrations",
  "Pharmacy and supplier documentation",
  "Certificates of analysis where applicable",
  "Sourcing records and invoice history",
  "Product category disclosures",
  "Consistency between public claims and records",
  "Renewal-related updates",
];

const standards = [
  {
    t: "Documentation completeness",
    d: "The submission must include enough current documentation to evaluate each category the vendor asks to have reviewed.",
  },
  {
    t: "Supplier traceability",
    d: "Records must show a coherent connection between the vendor, upstream pharmacy or supplier, invoices, and product categories.",
  },
  {
    t: "Claims-to-records consistency",
    d: "Public claims about sourcing, pharmacy relationships, testing, or safety must be consistent with the documentation submitted.",
  },
  {
    t: "Licensing alignment",
    d: "Licenses and registrations must align with the vendor's jurisdiction, stated activities, and documented pharmacy relationships.",
  },
  {
    t: "Source category recognition",
    d: "Where applicable, pharmacy sources are checked against recognized 503A, 503B, accreditation, licensing, or Greenlist reference records.",
  },
  {
    t: "Renewal compliance",
    d: "Verified status depends on timely renewal and disclosure of material changes that affect the original review basis.",
  },
  {
    t: "Public representation accuracy",
    d: "Badges, registry status, category language, and vendor claims must not imply approval beyond the reviewed scope.",
  },
];

const statuses = [
  {
    t: "Verified",
    d: "Required documentation has been reviewed for the stated scope, and the evidence supports publication of a verified registry listing.",
  },
  {
    t: "Unverified",
    d: "The vendor is listed without a completed documentation review, or available information does not support verified status.",
  },
  {
    t: "Under Review",
    d: "A submission has met intake threshold and is being evaluated, but no final determination has been recorded.",
  },
  {
    t: "Suspended",
    d: "A prior status is paused because of a material documentation issue, missed renewal, unresolved change, or review concern.",
  },
  {
    t: "Removed",
    d: "The listing has been withdrawn from active registry display because the vendor no longer meets publication or participation requirements.",
  },
];

const changes = [
  "Supplier or pharmacy source changes",
  "Business name, ownership, or location changes",
  "New product categories or category removals",
  "Expired, suspended, or changed licenses",
  "Material changes to public claims or marketing language",
  "New documentation conflicts, recalls, warnings, or enforcement records",
];

const notProcess = [
  "Not a government license or regulatory approval",
  "Not a guarantee of clinical outcome or product performance",
  "Not a substitute for medical advice from a licensed clinician",
  "Not blanket approval of every current or future product claim",
  "Not a replacement for FDA, state board, pharmacy board, or medical board enforcement",
];

const HowItWorks = () => {
  return (
    <>
      <RecordHeader
        metadata={[
          { label: "Doc", value: "SS-VERIFICATION-2026.01" },
          { label: "Version", value: "2026.01" },
          { label: "Status", value: "Active" },
          { label: "Updated", value: "04 / 21 / 2026" },
        ]}
        eyebrow="Verification · Process & Standards"
        title="Verification"
        lead="This page defines the Source Standard review lifecycle: required submissions, review categories, verification criteria, public status assignment, renewal obligations, and the conditions that may trigger re-review, suspension, or removal."
        summary={[
          { label: "Lifecycle steps", value: "06" },
          { label: "Review basis", value: "Documentation" },
          { label: "Public statuses", value: statuses.length.toString().padStart(2, "0") },
          { label: "Renewal interval", value: "12 months" },
        ]}
      />

      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-4">
          <p className="text-[13px] text-muted-foreground leading-relaxed">
            Scope · Applies to vendor verification under SS-FRAMEWORK-2026.01. Private records are reviewed for status determination but are not published in full.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-wide py-10 md:py-14">
          <div className="mb-8 max-w-3xl">
            <p className="meta mb-3">§1 — Review Lifecycle</p>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight text-foreground">
              How a vendor moves through verification.
            </h2>
            <p className="mt-4 text-[14px] text-muted-foreground leading-relaxed">
              Each stage records what happened, which documents were involved, what outcome resulted, and how the stage affects public registry status.
            </p>
          </div>
          <ol className="border-t border-border">
            {steps.map((s) => (
              <li key={s.n} className="grid grid-cols-12 gap-4 md:gap-6 py-7 border-b border-border">
                <div className="col-span-2 md:col-span-1">
                  <span className="meta text-primary">{s.n}</span>
                </div>
                <div className="col-span-10 md:col-span-3">
                  <h3 className="text-[15px] font-semibold text-foreground tracking-tight">{s.t}</h3>
                </div>
                <div className="col-span-12 md:col-span-8 grid sm:grid-cols-2 gap-5">
                  <div>
                    <p className="meta-label text-foreground mb-1">What happens</p>
                    <p className="text-[13.5px] text-muted-foreground leading-relaxed">{s.happens}</p>
                  </div>
                  <div>
                    <p className="meta-label text-foreground mb-1">Documents / standards</p>
                    <p className="text-[13.5px] text-muted-foreground leading-relaxed">{s.documents}</p>
                  </div>
                  <div>
                    <p className="meta-label text-foreground mb-1">Possible outcomes</p>
                    <p className="text-[13.5px] text-muted-foreground leading-relaxed">{s.outcomes}</p>
                  </div>
                  <div>
                    <p className="meta-label text-foreground mb-1">Status impact</p>
                    <p className="text-[13.5px] text-muted-foreground leading-relaxed">{s.status}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§2 — What We Review</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight text-foreground">
                Materials used to evaluate a vendor record.
              </h2>
              <p className="mt-4 text-[14px] text-muted-foreground leading-relaxed">
                Verification is documentation-first. The review does not rely on marketing claims or self-attestation alone.
              </p>
            </div>
            <div className="md:col-span-8">
              <ul className="grid sm:grid-cols-2 gap-px bg-border border border-border">
                {reviewItems.map((item, i) => (
                  <li key={item} className="bg-background px-5 py-4 flex items-baseline gap-3">
                    <span className="meta text-primary">{(i + 1).toString().padStart(2, "0")}</span>
                    <span className="text-[13.5px] text-foreground leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§3 — What Verification Means</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight text-foreground">
                A published verification is scoped, not absolute.
              </h2>
            </div>
            <div className="md:col-span-8 grid gap-px bg-border border border-border">
              {[
                {
                  t: "What has been reviewed",
                  d: "The submitted records for the stated vendor, locations, categories, supplier relationships, and pharmacy sources within the review period.",
                },
                {
                  t: "What has not been reviewed",
                  d: "Unsubmitted products, future supplier changes, clinical outcomes, patient-specific treatment decisions, or claims outside the documented scope.",
                },
                {
                  t: "What a verified listing means",
                  d: "The reviewed documentation supports the public status and category scope shown on the registry at the time of review.",
                },
                {
                  t: "What it does not mean",
                  d: "It does not guarantee safety, endorse a treatment, approve every product, or replace physician judgment or regulatory oversight.",
                },
              ].map((item) => (
                <div key={item.t} className="bg-background p-5">
                  <h3 className="text-[14px] font-semibold text-foreground">{item.t}</h3>
                  <p className="mt-2 text-[13.5px] text-muted-foreground leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-10 md:py-14">
          <div className="mb-8 max-w-3xl">
            <p className="meta mb-3">§4 — Verification Standards</p>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight text-foreground">
              Formal criteria applied during review.
            </h2>
          </div>
          <ul className="grid md:grid-cols-2 gap-px bg-border border border-border">
            {standards.map((s, i) => (
              <li key={s.t} className="bg-background p-5 min-h-36">
                <p className="meta text-primary mb-4">S-{(i + 1).toString().padStart(2, "0")}</p>
                <h3 className="text-[14.5px] font-semibold text-foreground">{s.t}</h3>
                <p className="mt-2 text-[13.5px] text-muted-foreground leading-relaxed">{s.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§5 — Status Definitions</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight text-foreground">
                Operational meaning of each registry status.
              </h2>
            </div>
            <div className="md:col-span-8 border border-border bg-background">
              <ul className="divide-y divide-border">
                {statuses.map((s) => (
                  <li key={s.t} className="grid grid-cols-12 gap-4 px-5 py-4 items-baseline">
                    <div className="col-span-4 text-[13.5px] font-semibold text-foreground">{s.t}</div>
                    <div className="col-span-8 text-[13.5px] text-muted-foreground leading-relaxed">{s.d}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§6 — Renewals, Changes & Re-review</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight text-foreground">
                Verification must remain current after publication.
              </h2>
              <p className="mt-4 text-[14px] text-muted-foreground leading-relaxed">
                Vendors renew annually and must disclose material changes before relying on a prior verification status.
              </p>
            </div>
            <div className="md:col-span-8">
              <ul className="border border-border bg-background divide-y divide-border">
                {changes.map((change, i) => (
                  <li key={change} className="grid grid-cols-12 gap-3 px-5 py-3.5 items-baseline">
                    <div className="col-span-1 meta text-primary">{(i + 1).toString().padStart(2, "0")}</div>
                    <div className="col-span-11 text-[13.5px] text-foreground/90 leading-relaxed">{change}</div>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[13.5px] text-muted-foreground leading-relaxed">
                A listing may be paused, suspended, narrowed, or removed when records expire, sourcing changes are not disclosed, public claims exceed the verified scope, or a material concern requires re-review.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§7 — What This Process Is Not</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight text-foreground">
                Boundaries of the verification framework.
              </h2>
            </div>
            <div className="md:col-span-8">
              <ul className="grid gap-px bg-border border border-border">
                {notProcess.map((item) => (
                  <li key={item} className="bg-background px-5 py-4 text-[13.5px] text-foreground/90 leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-10 md:py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="meta mb-1">§ Vendor submission</p>
              <p className="text-[15px] text-foreground font-medium max-w-xl">
                Vendors should submit only current, category-specific documentation that supports the public claims they want reviewed.
              </p>
            </div>
            <Link
              to="/apply"
              className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary self-start md:self-auto"
            >
              Apply for verification →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-wide py-6">
          <div className="border border-border bg-background">
            <div className="px-4 py-2.5 border-b border-border bg-surface-muted">
              <p className="meta-label text-foreground">Read deeper</p>
            </div>
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
              <div className="px-4 py-3">
                <Link
                  to="/accountability"
                  className="text-[12px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover"
                >
                  Accountability & enforcement →
                </Link>
              </div>
              <div className="px-4 py-3">
                <Link
                  to="/status-definitions"
                  className="text-[12px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover"
                >
                  Status definitions →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
