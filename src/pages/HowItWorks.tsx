import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DocSignature } from "@/components/DocSignature";
import { BriefingHero } from "@/components/BriefingHero";
import { StatusBadge } from "@/components/StatusBadge";
import type { VendorPublicStatus } from "@/data/vendors";

const DOC_ID = "SS-PROTO-2026.01";
const VERIFIED_ON = "04/21/2026";

const whyItMatters: { t: string; d: string }[] = [
  {
    t: "Source over storefront",
    d: "Vendors carry no greater legitimacy than the pharmacies and upstream suppliers behind them. The review prioritizes the source over the storefront and examines the chain of custody as the primary evidentiary record.",
  },
  {
    t: "Evidence over claims",
    d: "Verified status is assigned against reviewed evidence, not marketing language. Claims that cannot be supported by records are not treated as verified.",
  },
  {
    t: "Time-bounded review",
    d: "Listings are reviewed against current records and renewed on a defined interval. A verified status reflects the most recent completed review, not a permanent endorsement.",
  },
];

const withinScope: string[] = [
  "Business identity",
  "Applicable licenses and registrations",
  "Pharmacy and supplier records",
  "Certificates and lot records within the reviewed category",
  "Consistency of public-facing claims within scope",
];

const outsideScope: string[] = [
  "Clinical outcomes",
  "Patient experiences",
  "Pricing",
  "Marketing channels",
  "Anything outside the documented verified category",
];

const statuses: {
  key: VendorPublicStatus;
  t: string;
  meaning: string;
  tells: string;
  notImply: string;
}[] = [
  {
    key: "verified",
    t: "Verified",
    meaning: "Records were reviewed and support the claims within the verified category.",
    tells: "Documentation has been examined and meets the standard at the time of review.",
    notImply: "A medical endorsement or a guarantee of any clinical result.",
  },
  {
    key: "unverified",
    t: "Unverified",
    meaning: "No completed verification on record.",
    tells: "The vendor has not been reviewed under this standard.",
    notImply: "That the vendor is illegitimate — only that no verification exists.",
  },
  {
    key: "under-review",
    t: "Under Review",
    meaning: "An active review is in progress or additional records are being evaluated.",
    tells: "The file is open and a status decision has not yet been published.",
    notImply: "Any specific outcome before review is complete.",
  },
  {
    key: "suspended",
    t: "Suspended",
    meaning: "A previously verified listing has been temporarily paused.",
    tells: "An issue has been identified that requires resolution before status continues.",
    notImply: "A final determination — the listing may be reinstated after review.",
  },
  {
    key: "removed",
    t: "Removed",
    meaning: "The listing has been withdrawn from the public registry.",
    tells: "Verification is no longer in effect for the listed scope.",
    notImply: "Any specific allegation beyond what is published in the public record.",
  },
];

const reviewGroups: { t: string; d: string }[] = [
  {
    t: "Business identity",
    d: "Legal entity name, registration, ownership where disclosed, and operating addresses are checked against public records and submitted documentation.",
  },
  {
    t: "Licenses and registrations",
    d: "State licenses, DEA registrations where applicable, and other regulatory credentials are verified against issuing authorities and current status.",
  },
  {
    t: "Pharmacy and supplier records",
    d: "503A and 503B compounding pharmacies and other upstream suppliers are identified and cross-referenced against FDA registration and applicable accreditations.",
  },
  {
    t: "Certificates and category records",
    d: "Certificates of analysis, lot documentation, and category-specific records are reviewed for the products or services within the verified scope.",
  },
  {
    t: "Sourcing and invoice history",
    d: "Invoices and shipping records are reviewed to confirm a documented sourcing chain that matches the vendor's public claims.",
  },
  {
    t: "Public claims consistency",
    d: "Statements made on the vendor's website and public materials are compared against the documentation on file for the verified category.",
  },
  {
    t: "Renewal-related updates",
    d: "At renewal, the same areas are re-reviewed against the most recent records, and material changes since the prior review are evaluated.",
  },
];

const steps: { n: string; t: string; summary: string; reviewed: string; result: string }[] = [
  {
    n: "01",
    t: "Application",
    summary:
      "The vendor submits an application identifying the entity, the verification category requested, and the records they intend to provide.",
    reviewed: "Entity identity, requested scope, and completeness of intake.",
    result: "Application accepted into review or returned for missing information.",
  },
  {
    n: "02",
    t: "Document intake",
    summary:
      "Required records are collected, including licenses, pharmacy and supplier documentation, certificates, and recent sourcing history.",
    reviewed: "Presence, legibility, and date currency of submitted records.",
    result: "Intake complete, or additional documentation requested.",
  },
  {
    n: "03",
    t: "Standards review",
    summary:
      "Submitted records are evaluated against the standard for the requested category, including upstream sourcing and applicable regulatory anchors.",
    reviewed: "Documents, registrations, and sourcing chain against category standard.",
    result: "Findings logged, with follow-up questions issued to the vendor as needed.",
  },
  {
    n: "04",
    t: "Public claims check",
    summary:
      "Public-facing statements are compared against the documentation on file to confirm consistency within the verified scope.",
    reviewed: "Vendor website and public materials against reviewed records.",
    result: "Claims consistent, or vendor asked to correct or clarify before status is assigned.",
  },
  {
    n: "05",
    t: "Status determination",
    summary:
      "A status is assigned based on the completed review. Scope is recorded explicitly so the public listing reflects only what was verified.",
    reviewed: "Cumulative review file and category scope.",
    result: "Verified, Unverified, Under Review, Suspended, or Removed status assigned.",
  },
  {
    n: "06",
    t: "Publication and monitoring",
    summary:
      "The listing is published or updated in the public registry. The file remains active for renewal and for review of any material change.",
    reviewed: "Listing accuracy at publication and ongoing change reports.",
    result: "Listing live with a defined renewal interval and change-report obligations.",
  },
];

const changes: string[] = [
  "Change of ownership or controlling entity",
  "Change in upstream pharmacy or primary supplier",
  "Loss, lapse, or material change of a license or registration",
  "Expansion into a category outside the current verified scope",
  "Material change to public claims tied to the verified category",
  "Recall, regulatory action, or accreditation change affecting the file",
];

const afterReview: string[] = [
  "A public listing is created or updated in the registry.",
  "The current status is shown publicly alongside the verified scope.",
  "Verification scope may be limited to specific categories rather than the full business.",
  "Renewal obligations continue on a defined interval.",
  "Material changes to records or claims can trigger re-review.",
];

const vendorReasons: { t: string; d: string }[] = [
  {
    t: "Public registry presence",
    d: "Verified vendors appear in a public registry where consumers and clinicians can confirm the review.",
  },
  {
    t: "Category-specific review",
    d: "Verification is recorded against a defined scope, so the listing reflects what was actually reviewed.",
  },
  {
    t: "Confidence signal for consumers",
    d: "A published status gives consumers a documented reference point rather than a marketing claim.",
  },
  {
    t: "Claims supported by reviewed records",
    d: "Statements tied to the verified category are backed by documentation that has been examined under the standard.",
  },
];

const notProcess: string[] = [
  "Source Standard does not provide medical advice or clinical recommendations.",
  "Source Standard does not certify safety, efficacy, or treatment outcomes.",
  "Source Standard does not verify pricing, marketing channels, or business performance.",
  "Source Standard does not act as a regulator or substitute for federal or state authorities.",
];

const SectionHeader = ({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) => (
  <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
    <p className="meta-mono text-primary uppercase tracking-[0.14em] mb-3">{eyebrow}</p>
    <h2 className="h-section">{title}</h2>
    {lede && (
      <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed">{lede}</p>
    )}
  </div>
);

const HowItWorks = () => {
  return (
    <div className="bg-background">
      <PageMeta
        title="How Verification Works"
        description="The review standard, what the process examines, how status is assigned, and what a determination means."
      />
      <Breadcrumb items={[{ label: "About", to: "/about" }, { label: "How Verification Works" }]} />
      <BriefingHero
        tone="navy"
        category="How Verification Works"
        docId=""
        title="How Verification Works"
        statement="The review standard, what the process examines, how status is assigned, and what a determination means."
      />

      {/* What verification means */}
      <section className="border-b border-border bg-background">
        <div className="container-wide py-12 md:py-16">
          <SectionHeader
            eyebrow="What verification means"
            title="Verified means records were reviewed and support the published scope at the time of review."
          />
          <div className="max-w-3xl mx-auto space-y-3 text-center">
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              It is not a medical endorsement, and not a guarantee of safety, efficacy, or outcome.
            </p>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              It reflects documented consistency within the reviewed scope — nothing more, nothing less.
            </p>
          </div>
        </div>
      </section>

      {/* Core principles */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-12 md:py-16">
          <SectionHeader
            eyebrow="Core principles"
            title="Core principles"
            lede="Three ideas the framework operates from."
          />
          <ol className="max-w-3xl mx-auto divide-y divide-border border-y border-border">
            {whyItMatters.map((w, i) => (
              <li key={i} className="grid grid-cols-12 gap-4 py-5 items-baseline">
                <div className="col-span-2 meta-mono text-primary">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="col-span-10">
                  <p className="text-[15px] font-semibold text-foreground">{w.t}</p>
                  <p className="mt-1 text-[14px] text-muted-foreground leading-relaxed">
                    {w.d}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Scope of the review */}
      <section className="border-b border-border bg-background">
        <div className="container-wide py-12 md:py-16">
          <SectionHeader
            eyebrow="Scope of the review"
            title="What falls inside and outside the review"
            lede="What falls within the review, and what falls outside it."
          />
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 md:divide-x divide-border">
            <div className="md:pr-8">
              <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-foreground mb-4">
                Within scope
              </p>
              <ul className="divide-y divide-border border-y border-border">
                {withinScope.map((s, i) => (
                  <li key={i} className="py-3 text-[14.5px] text-foreground">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:pl-8 mt-10 md:mt-0">
              <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-foreground mb-4">
                Outside scope
              </p>
              <ul className="divide-y divide-border border-y border-border">
                {outsideScope.map((s, i) => (
                  <li key={i} className="py-3 text-[14.5px] text-muted-foreground">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Status definitions */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-12 md:py-16">
          <SectionHeader
            eyebrow="Status definitions"
            title="Status definitions"
            lede="Each registry entry carries one of these standings."
          />
          <ul className="max-w-3xl mx-auto divide-y divide-border border-y border-border">
            {statuses.map((s) => (
              <li key={s.key} className="py-6">
                <div className="flex items-center gap-3 mb-2">
                  <StatusBadge status={s.key} size="md" />
                  <span className="text-[16px] font-semibold text-foreground">{s.t}</span>
                </div>
                <p className="text-[15px] text-foreground leading-relaxed">{s.meaning}</p>
                <p className="mt-2 text-[13.5px] text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">Tells</span> — {s.tells}
                </p>
                <p className="mt-1 text-[13.5px] text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">Does not imply</span> — {s.notImply}
                </p>
              </li>
            ))}
          </ul>
          <div className="max-w-3xl mx-auto mt-6 text-right">
            <Link
              to="/status-definitions"
              className="text-[14px] text-primary hover:underline underline-offset-4"
            >
              Full status definitions →
            </Link>
          </div>
        </div>
      </section>

      {/* What the review looks at */}
      <section className="border-b border-border bg-background">
        <div className="container-wide py-12 md:py-16">
          <SectionHeader
            eyebrow="What the review looks at"
            title="What the review looks at"
            lede="Seven areas examined against the standard for the requested category."
          />
          <ol className="max-w-3xl mx-auto divide-y divide-border border-y border-border">
            {reviewGroups.map((g, i) => (
              <li key={i} className="grid grid-cols-12 gap-4 py-5 items-baseline">
                <div className="col-span-2 meta-mono text-primary">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="col-span-10">
                  <p className="text-[15px] font-semibold text-foreground">{g.t}</p>
                  <p className="mt-1 text-[14px] text-muted-foreground leading-relaxed">{g.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Review lifecycle */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-12 md:py-16">
          <SectionHeader
            eyebrow="Review lifecycle"
            title="Review lifecycle"
            lede="Six stages from application to publication."
          />
          <ol className="max-w-3xl mx-auto divide-y divide-border border-y border-border">
            {steps.map((s) => (
              <li key={s.n} className="grid grid-cols-12 gap-5 py-7 items-start">
                <div className="col-span-2 text-[28px] font-semibold tabular-nums text-primary leading-none">
                  {s.n}
                </div>
                <div className="col-span-10">
                  <p className="text-[16px] font-semibold text-foreground">{s.t}</p>
                  <p className="mt-2 text-[14.5px] text-foreground leading-relaxed">
                    {s.summary}
                  </p>
                  <p className="mt-3 text-[12.5px] text-muted-foreground leading-relaxed">
                    Examined: {s.reviewed} · Result: {s.result}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Ongoing surveillance */}
      <section className="border-b border-border bg-background">
        <div className="container-wide py-12 md:py-16">
          <SectionHeader
            eyebrow="Ongoing surveillance"
            title="Ongoing surveillance and change disclosure"
            lede="Verification is a snapshot in time. Files are monitored, renewed, and re-reviewed when material changes occur."
          />
          <p className="max-w-3xl mx-auto text-center text-[15px] text-foreground leading-relaxed mb-8">
            Material changes must be disclosed within 72 hours and may trigger re-review or a Suspended status.
          </p>
          <ul className="max-w-4xl mx-auto grid md:grid-cols-2 md:gap-x-10 border-y border-border md:border-y-0">
            {changes.map((c, i) => (
              <li
                key={i}
                className="py-3 md:py-4 border-b border-border md:border-b md:[&:nth-last-child(-n+2)]:border-b-0 text-[14.5px] text-foreground"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* After a determination */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-12 md:py-16">
          <SectionHeader
            eyebrow="After a determination"
            title="After a determination"
          />
          <ol className="max-w-3xl mx-auto divide-y divide-border border-y border-border">
            {afterReview.map((a, i) => (
              <li key={i} className="grid grid-cols-12 gap-4 py-4 items-baseline">
                <div className="col-span-2 meta-mono text-primary">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="col-span-10 text-[14.5px] text-foreground">{a}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why entities apply */}
      <section className="border-b border-border bg-background">
        <div className="container-wide py-12 md:py-16">
          <SectionHeader eyebrow="Why entities apply" title="Why entities apply" />
          <ul className="max-w-4xl mx-auto grid md:grid-cols-2 md:gap-x-10 border-y border-border md:border-y-0">
            {vendorReasons.map((r, i) => (
              <li
                key={i}
                className="py-5 border-b border-border md:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <p className="text-[15px] font-semibold text-foreground">{r.t}</p>
                <p className="mt-1 text-[14px] text-muted-foreground leading-relaxed">{r.d}</p>
              </li>
            ))}
          </ul>
          <div className="max-w-4xl mx-auto mt-8 text-right">
            <Link
              to="/apply"
              className="text-[14px] text-primary hover:underline underline-offset-4"
            >
              Begin a verification application →
            </Link>
          </div>
        </div>
      </section>

      {/* Jurisdictional limitations */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-12 md:py-16">
          <SectionHeader
            eyebrow="Jurisdictional limitations"
            title="Jurisdictional limitations"
            lede="Boundaries of the verification framework."
          />
          <ul className="max-w-3xl mx-auto divide-y divide-border border-y border-border">
            {notProcess.map((n, i) => (
              <li key={i} className="py-4 text-[14.5px] text-foreground leading-relaxed">
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <DocSignature docId={DOC_ID} verifiedOn={VERIFIED_ON} />
    </div>
  );
};

export default HowItWorks;
