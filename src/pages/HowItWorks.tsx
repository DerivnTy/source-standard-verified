import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";
import { StatusBadge } from "@/components/StatusBadge";
import { DocJumpBar } from "@/components/DocJumpBar";
import type { VendorPublicStatus } from "@/data/vendors";

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
  tells: string;
  notImply: string;
}[] = [
  {
    key: "verified",
    t: "Verified",
    tells: "Documentation has been examined and meets the standard at the time of review.",
    notImply: "A medical endorsement or a guarantee of any clinical result.",
  },
  {
    key: "unverified",
    t: "Unverified",
    tells: "The vendor has not been reviewed under this standard.",
    notImply: "That the vendor is illegitimate, only that no verification exists.",
  },
  {
    key: "under-review",
    t: "Under Review",
    tells: "The file is open and a status decision has not yet been published.",
    notImply: "Any specific outcome before review is complete.",
  },
  {
    key: "suspended",
    t: "Suspended",
    tells: "An issue has been identified that requires resolution before status continues.",
    notImply: "A final determination, the listing may be reinstated after review.",
  },
  {
    key: "removed",
    t: "Removed",
    tells: "Verification is no longer in effect for the listed scope.",
    notImply: "Any specific allegation beyond what is published in the public record.",
  },
];

const reviewGroups: { t: string; d: string }[] = [
  { t: "Business identity", d: "Legal entity name, registration, ownership where disclosed, and operating addresses are checked against public records and submitted documentation." },
  { t: "Licenses and registrations", d: "State licenses, DEA registrations where applicable, and other regulatory credentials are verified against issuing authorities and current status." },
  { t: "Pharmacy and supplier records", d: "503A and 503B compounding pharmacies and other upstream suppliers are identified and cross-referenced against FDA registration and applicable accreditations." },
  { t: "Certificates and category records", d: "Certificates of analysis, lot documentation, and category-specific records are reviewed for the products or services within the verified scope." },
  { t: "Sourcing and invoice history", d: "Invoices and shipping records are reviewed to confirm a documented sourcing chain that matches the vendor's public claims." },
  { t: "Public claims consistency", d: "Statements made on the vendor's website and public materials are compared against the documentation on file for the verified category." },
  { t: "Renewal-related updates", d: "At renewal, the same areas are re-reviewed against the most recent records, and material changes since the prior review are evaluated." },
];

const steps: { n: string; t: string; summary: string; reviewed: string; result: string }[] = [
  { n: "01", t: "Application", summary: "The vendor submits an application identifying the entity, the verification category requested, and the records they intend to provide.", reviewed: "Entity identity, requested scope, and completeness of intake.", result: "Application accepted into review or returned for missing information." },
  { n: "02", t: "Document intake", summary: "Required records are collected, including licenses, pharmacy and supplier documentation, certificates, and recent sourcing history.", reviewed: "Presence, legibility, and date currency of submitted records.", result: "Intake complete, or additional documentation requested." },
  { n: "03", t: "Standards review", summary: "Submitted records are evaluated against the standard for the requested category, including upstream sourcing and applicable regulatory anchors.", reviewed: "Documents, registrations, and sourcing chain against category standard.", result: "Findings logged, with follow-up questions issued to the vendor as needed." },
  { n: "04", t: "Public claims check", summary: "Public-facing statements are compared against the documentation on file to confirm consistency within the verified scope.", reviewed: "Vendor website and public materials against reviewed records.", result: "Claims consistent, or vendor asked to correct or clarify before status is assigned." },
  { n: "05", t: "Status determination", summary: "A status is assigned based on the completed review. Scope is recorded explicitly so the public listing reflects only what was verified.", reviewed: "Cumulative review file and category scope.", result: "Verified, Unverified, Under Review, Suspended, or Removed status assigned." },
  { n: "06", t: "Publication and monitoring", summary: "The listing is published or updated in the public registry. The file remains active for renewal and for review of any material change.", reviewed: "Listing accuracy at publication and ongoing change reports.", result: "Listing live with a defined renewal interval and change-report obligations." },
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
  { t: "Public registry presence", d: "Verified vendors appear in a public registry where consumers and clinicians can confirm the review." },
  { t: "Category-specific review", d: "Verification is recorded against a defined scope, so the listing reflects what was actually reviewed." },
  { t: "Confidence signal for consumers", d: "A published status gives consumers a documented reference point rather than a marketing claim." },
  { t: "Claims supported by reviewed records", d: "Statements tied to the verified category are backed by documentation that has been examined under the standard." },
];

const notProcess: string[] = [
  "Source Standard does not provide medical advice or clinical recommendations.",
  "Source Standard does not certify safety, efficacy, or treatment outcomes.",
  "Source Standard does not verify pricing, marketing channels, or business performance.",
  "Source Standard does not act as a regulator or substitute for federal or state authorities.",
];

const waypoints = [
  { id: "definition", number: "1", label: "DEF" },
  { id: "principles", number: "2", label: "PRIN" },
  { id: "scope", number: "3", label: "SCOPE" },
  { id: "standings", number: "4", label: "STANDINGS" },
  { id: "examination", number: "5", label: "EXAM" },
  { id: "lifecycle", number: "6", label: "LIFECYCLE" },
  { id: "surveillance", number: "7", label: "SURV" },
  { id: "outcome", number: "8", label: "OUTCOME" },
  { id: "rationale", number: "9", label: "RATIONALE" },
  { id: "limits", number: "10", label: "LIMITS" },
];

// ---------- Building blocks ----------

const SectionShell = ({
  id,
  n,
  category,
  title,
  description,
  muted = false,
  first = false,
  children,
}: {
  id: string;
  n: string;
  category: string;
  title: string;
  description?: string;
  muted?: boolean;
  first?: boolean;
  children: React.ReactNode;
}) => (
  <section
    id={id}
    className={`scroll-mt-36 border-b border-border ${muted ? "bg-surface-muted/40" : "bg-background"}`}
  >
    <div className={`page-shell ${first ? "pt-10 md:pt-12" : "pt-12 md:pt-14"} pb-12 md:pb-14`}>
      <div className="mx-auto w-wide">
        <div className="mb-7 flex items-baseline justify-between gap-4 border-b border-border pb-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              §{n} · {category}
            </p>
            <h2 className="mt-2 t-section-title-sm text-foreground">{title}</h2>
            {description && (
              <p className="mt-2 t-body-md text-muted-foreground max-w-[68ch]">{description}</p>
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  </section>
);

const NumberedCell = ({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) => (
  <li className="rounded-md border border-border bg-card shadow-sm p-5 flex gap-5">
    <div className="font-mono text-[20px] font-semibold tabular-nums text-foreground/80 leading-none pt-0.5 shrink-0">
      {n}
    </div>
    <div className="flex-1 min-w-0">
      <p className="t-body-md font-semibold text-foreground">{title}</p>
      <div className="mt-2 t-body-sm text-muted-foreground leading-[1.6] space-y-1">
        {children}
      </div>
    </div>
  </li>
);

// ---------- Page ----------

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
      <DocJumpBar waypoints={waypoints} />

      {/* §1 Definition — docks into hero (no top gap) */}
      <SectionShell
        id="definition"
        n="1"
        category="Definition"
        title="Verified means records were reviewed and support the published scope at the time of review"
        first
      >
        <div className="rounded-md border border-border bg-card shadow-sm p-6 t-body-md text-foreground/85 leading-[1.65] space-y-3">
          <p>It is not a medical endorsement, and not a guarantee of safety, efficacy, or outcome.</p>
          <p>It reflects documented consistency within the reviewed scope, nothing more, nothing less.</p>
        </div>
      </SectionShell>

      {/* §2 Principles */}
      <SectionShell
        id="principles"
        n="2"
        category="Principles"
        title="Three ideas the framework operates from"
        muted
      >
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {whyItMatters.map((w, i) => (
            <NumberedCell key={i} n={String(i + 1).padStart(2, "0")} title={w.t}>
              <p>{w.d}</p>
            </NumberedCell>
          ))}
        </ul>
      </SectionShell>

      {/* §3 Scope — Within / Outside grid */}
      <SectionShell
        id="scope"
        n="3"
        category="Scope"
        title="What falls inside and outside the review"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-md border border-border bg-card shadow-sm overflow-hidden">
            <header className="px-5 py-3 border-b border-border bg-surface-muted/50">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground">
                Within scope
              </p>
            </header>
            <ul className="divide-y divide-border">
              {withinScope.map((s, i) => (
                <li key={i} className="flex items-start gap-3 px-5 py-3.5 t-body-sm text-foreground">
                  <Check className="h-4 w-4 text-verified shrink-0 mt-0.5" strokeWidth={2.5} aria-hidden />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-border bg-card shadow-sm overflow-hidden">
            <header className="px-5 py-3 border-b border-border bg-surface-muted/50">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground">
                Outside scope
              </p>
            </header>
            <ul className="divide-y divide-border">
              {outsideScope.map((s, i) => (
                <li key={i} className="flex items-start gap-3 px-5 py-3.5 t-body-sm text-muted-foreground">
                  <X className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" strokeWidth={2.5} aria-hidden />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionShell>

      {/* §4 Standings — registry-style table */}
      <SectionShell
        id="standings"
        n="4"
        category="Standings"
        title="Each registry entry carries one of these standings"
        muted
      >
        <div className="rounded-md border border-border bg-card shadow-sm overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 border-b border-border bg-surface-muted/50 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <div className="col-span-3">Standing</div>
            <div className="col-span-4">What it tells</div>
            <div className="col-span-5">What it does not imply</div>
          </div>
          <ul className="divide-y divide-border">
            {statuses.map((s) => (
              <li
                key={s.key}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-5 py-4"
              >
                <div className="md:col-span-3 flex items-center">
                  <StatusBadge status={s.key} size="md" />
                </div>
                <div className="md:col-span-4 t-body-sm text-foreground/85 leading-[1.55]">
                  {s.tells}
                </div>
                <div className="md:col-span-5 t-body-sm text-muted-foreground leading-[1.55]">
                  {s.notImply}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-5">
          <Link to="/status-definitions" className="t-body-sm font-semibold text-primary hover:underline">
            Full status definitions →
          </Link>
        </p>
      </SectionShell>

      {/* §5 Examination — vertical numbered stepper */}
      <SectionShell
        id="examination"
        n="5"
        category="Examination"
        title="Seven areas examined against the standard for the requested category"
      >
        <ol className="flex flex-col gap-3">
          {reviewGroups.map((g, i) => (
            <NumberedCell key={i} n={String(i + 1).padStart(2, "0")} title={g.t}>
              <p>{g.d}</p>
            </NumberedCell>
          ))}
        </ol>
      </SectionShell>

      {/* §6 Lifecycle — vertical numbered stepper */}
      <SectionShell
        id="lifecycle"
        n="6"
        category="Lifecycle"
        title="Six stages from application to publication"
        muted
      >
        <ol className="flex flex-col gap-3">
          {steps.map((s) => (
            <NumberedCell key={s.n} n={s.n} title={s.t}>
              <p className="text-foreground/85">{s.summary}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground pt-1">
                Examined: <span className="text-foreground/75">{s.reviewed}</span>
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                Result: <span className="text-foreground/75">{s.result}</span>
              </p>
            </NumberedCell>
          ))}
        </ol>
      </SectionShell>

      {/* §7 Surveillance */}
      <SectionShell
        id="surveillance"
        n="7"
        category="Surveillance"
        title="Verification is a snapshot in time"
        description="Files are monitored, renewed, and re-reviewed when material changes occur. Material changes must be disclosed within 72 hours and may trigger re-review or a Suspended status."
      >
        <div className="rounded-md border border-border bg-card shadow-sm overflow-hidden">
          <header className="px-5 py-3 border-b border-border bg-surface-muted/50">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground">
              Reportable material changes
            </p>
          </header>
          <ul className="divide-y divide-border">
            {changes.map((c, i) => (
              <li key={i} className="px-5 py-3.5 t-body-sm text-foreground/85">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </SectionShell>

      {/* §8 Outcome */}
      <SectionShell
        id="outcome"
        n="8"
        category="Outcome"
        title="What follows a determination"
        muted
      >
        <ol className="flex flex-col gap-3">
          {afterReview.map((a, i) => (
            <NumberedCell key={i} n={String(i + 1).padStart(2, "0")} title={a.replace(/\.$/, "")}>
              <></>
            </NumberedCell>
          ))}
        </ol>
      </SectionShell>

      {/* §9 Rationale */}
      <SectionShell
        id="rationale"
        n="9"
        category="Rationale"
        title="Why entities apply"
      >
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vendorReasons.map((r, i) => (
            <NumberedCell key={i} n={String(i + 1).padStart(2, "0")} title={r.t}>
              <p>{r.d}</p>
            </NumberedCell>
          ))}
        </ul>
        <p className="mt-6">
          <Link to="/apply" className="t-body-sm font-semibold text-primary hover:underline">
            Begin a verification application →
          </Link>
        </p>
      </SectionShell>

      {/* §10 Limits — jurisdictional ledger table */}
      <SectionShell
        id="limits"
        n="10"
        category="Limits"
        title="Jurisdictional limitations"
        muted
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
          // Jurisdictional Boundaries &amp; Limitations
        </p>
        <div className="rounded-md border border-border bg-card shadow-sm overflow-hidden">
          <ul className="divide-y divide-border">
            {notProcess.map((n, i) => (
              <li
                key={i}
                className="grid grid-cols-12 gap-4 px-5 py-4 items-baseline"
              >
                <div className="col-span-2 md:col-span-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground tabular-nums">
                  L{i + 1}
                </div>
                <div className="col-span-10 md:col-span-11 t-body-sm text-foreground/85 leading-[1.6]">
                  {n}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </SectionShell>
    </div>
  );
};

export default HowItWorks;
