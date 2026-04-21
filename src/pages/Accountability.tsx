import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { Section, SectionLabel } from "@/components/Section";

const commitments = [
  {
    t: "Truthful representation",
    d: "All records, claims, and category descriptions submitted during application are accurate at the time of submission and remain accurate throughout the verification term.",
  },
  {
    t: "Supplier disclosure",
    d: "All upstream pharmacies, outsourcing facilities, and qualified suppliers used to fulfill listed product categories are disclosed and supported by documentation.",
  },
  {
    t: "Renewal cooperation",
    d: "The vendor will respond to renewal requests within published timelines and provide updated records when requested.",
  },
  {
    t: "Public claims alignment",
    d: "Public-facing claims (website, marketing, intake materials) remain consistent with the records reviewed during verification.",
  },
];

const reportable = [
  "Change in supplier or upstream source for any reviewed product category.",
  "Change in licensure status, including suspension, lapse, or jurisdictional change.",
  "Change in business ownership, controlling interest, or operating entity.",
  "Addition or removal of a reviewed product category.",
  "Material changes to public claims about sourcing, credentials, or scope.",
  "Notice of regulatory action by FDA, state board of pharmacy, or state medical board.",
];

const triggers = [
  "Consumer or clinician report submitted through the public reporting channel.",
  "Delisting, suspension, or removal of a disclosed upstream source.",
  "Public regulatory action against the vendor or a disclosed supplier.",
  "Divergence between public claims and records on file.",
  "Failure to respond to a renewal or clarification request.",
];

const actions = [
  {
    t: "Clarification request",
    d: "A formal written request for documentation or explanation. The listing remains in its current status during the response window.",
  },
  {
    t: "Scope reduction",
    d: "Verified scope is narrowed to only the categories that remain supported by current records. Other categories are removed from the listing.",
  },
  {
    t: "Suspension",
    d: "The Verified status is temporarily withdrawn. The listing displays Suspended publicly until the underlying issue is resolved or escalated.",
  },
  {
    t: "Removal",
    d: "The listing is withdrawn from the registry. Reinstatement requires a new application and a fresh review cycle.",
  },
  {
    t: "Public note",
    d: "A short, factual note attached to a listing when public clarification is warranted. Public notes are limited to verifiable, non-speculative statements.",
  },
];

const Accountability = () => (
  <>
    <RecordHeader
      metadata={[
        { label: "Doc", value: "SS-ENFORCE-2026.01" },
        { label: "Status", value: "Active" },
        { label: "Updated", value: "04/21/26" },
        { label: "Jurisdiction", value: "FL/US" },
      ]}
      eyebrow="Process"
      title="Accountability and enforcement."
      lead="Vendor commitments, reportable changes, re-review triggers, and the enforcement actions available under the framework."
    />

    <Section>
      <SectionLabel number="§1" title="Vendor commitments at verification" description="At the time a Verified status is assigned, the vendor accepts the following standing commitments. These commitments form the basis on which the public listing is published and maintained." />
      <div className="grid md:grid-cols-2 gap-x-10 gap-y-8 max-w-4xl">
        {commitments.map((c) => (
          <div key={c.t}>
            <p className="text-[14px] font-semibold text-foreground mb-2">{c.t}</p>
            <p className="text-[14.5px] text-muted-foreground leading-relaxed">{c.d}</p>
          </div>
        ))}
      </div>
    </Section>

    <Section muted>
      <SectionLabel number="§2" title="Reportable changes" description="The following changes require notification within a reasonable period after they occur. Failure to report does not invalidate the change but may itself become a triggering event." />
      <ul className="divide-y divide-border/70 border-y border-border/70 bg-background max-w-3xl">
        {reportable.map((r, i) => (
          <li key={i} className="flex gap-4 px-5 py-4 text-[14.5px]">
            <span className="meta-mono text-muted-foreground w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-foreground">{r}</span>
          </li>
        ))}
      </ul>
    </Section>

    <Section>
      <SectionLabel number="§3" title="Review triggers" description="Any of the following may open a re-review of an existing Verified listing, regardless of where the listing is in its renewal cycle." />
      <ul className="space-y-3 max-w-3xl">
        {triggers.map((t, i) => (
          <li key={i} className="flex gap-4 text-[14.5px]">
            <span className="meta-mono text-muted-foreground w-6 shrink-0">·</span>
            <span className="text-foreground">{t}</span>
          </li>
        ))}
      </ul>
    </Section>

    <Section muted>
      <SectionLabel number="§4" title="Enforcement actions" description="When a re-review identifies an issue, the framework uses a graduated set of responses scaled to the nature and severity of the issue." />
      <div className="divide-y divide-border/70 border-y border-border/70 bg-background">
        {actions.map((a) => (
          <div key={a.t} className="grid md:grid-cols-12 gap-6 px-6 py-6">
            <p className="md:col-span-3 text-[14px] font-semibold text-foreground">{a.t}</p>
            <p className="md:col-span-9 text-[14.5px] text-muted-foreground leading-relaxed">{a.d}</p>
          </div>
        ))}
      </div>
    </Section>

    <Section>
      <SectionLabel number="§5" title="Reinstatement" description="A Suspended listing may return to Verified once the underlying issue is resolved and documented. A Removed listing requires a new application and a fresh review cycle; prior history is retained for reference but does not shorten the renewed review process." />
    </Section>

    <Section muted>
      <SectionLabel number="§6" title="Read deeper" />
      <ul className="space-y-2 text-[14.5px]">
        <li><Link to="/how-it-works" className="text-foreground underline-offset-4 hover:underline">Verification — what is reviewed and how →</Link></li>
        <li><Link to="/status-definitions" className="text-foreground underline-offset-4 hover:underline">Status Definitions — what each status means →</Link></li>
        <li><Link to="/report-a-concern" className="text-foreground underline-offset-4 hover:underline">Report a Concern — how to submit a triggering report →</Link></li>
      </ul>
      <p className="mt-10 meta-label">
        Cite as: Source Standard Accountability & Enforcement, SS-ENFORCE-2026.01.
      </p>
    </Section>
  </>
);

export default Accountability;
