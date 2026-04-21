import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { Section, SectionLabel } from "@/components/Section";

const collected = [
  { t: "Vendor application materials", d: "Business identity, licensing, supplier disclosures, certificates, invoice samples, and category documentation submitted during the verification process." },
  { t: "Contact submissions", d: "Name, email, organization (if provided), and message content submitted through public contact forms." },
  { t: "Concern reports", d: "Submission content, supporting materials, and contact details voluntarily provided through the reporting channel." },
  { t: "Site analytics", d: "Aggregate, non-identifying technical data such as page views, referrer, device type, and approximate region. No advertising trackers." },
];

const uses = [
  "Conducting verification reviews and renewal cycles.",
  "Communicating with applicants, vendors, and reporters about active matters.",
  "Publishing public registry entries within the scope each entity has consented to.",
  "Improving the framework's documentation and the public website.",
];

const publishedVsInternal = [
  { p: "Published", v: "Public registry fields: business name, location, scope categories, status, status date, public references, and any attached public note." },
  { p: "Internal only", v: "Application materials, supporting documentation, internal review notes, reporter identity, and unredacted contact submissions." },
];

const processors = [
  "Hosting and content delivery infrastructure.",
  "Email delivery for application correspondence and notifications.",
  "Privacy-respecting site analytics.",
];

const rights = [
  "Request access to personal data Source Standard holds about you.",
  "Request correction of inaccurate personal data.",
  "Request deletion of personal data, subject to retention obligations for active or historical registry records.",
  "Withdraw a pending application at any time.",
];

const Privacy = () => (
  <>
    <RecordHeader
      metadata={[
        { label: "Doc", value: "SS-PRIVACY-2026.01" },
        { label: "Status", value: "Active" },
        { label: "Updated", value: "04/21/26" },
        { label: "Jurisdiction", value: "FL/US" },
      ]}
      eyebrow="Policy"
      title="Privacy policy."
      lead="What data Source Standard collects, how it is used, what is published, and the rights individuals have over their data."
    />

    <Section>
      <SectionLabel number="§1" title="Data collected" />
      <div className="divide-y divide-border/70 border-y border-border/70 bg-background">
        {collected.map((c) => (
          <div key={c.t} className="grid md:grid-cols-12 gap-6 px-6 py-6">
            <p className="md:col-span-3 text-[14px] font-semibold text-foreground">{c.t}</p>
            <p className="md:col-span-9 text-[14.5px] text-muted-foreground leading-relaxed">{c.d}</p>
          </div>
        ))}
      </div>
    </Section>

    <Section muted>
      <SectionLabel number="§2" title="How data is used" />
      <ul className="space-y-3 max-w-3xl">
        {uses.map((u, i) => (
          <li key={i} className="flex gap-4 text-[14.5px]">
            <span className="meta-mono text-muted-foreground w-6 shrink-0">·</span>
            <span className="text-foreground">{u}</span>
          </li>
        ))}
      </ul>
    </Section>

    <Section>
      <SectionLabel number="§3" title="Published vs. internal" description="A clear line separates information published in the public registry from information retained internally for review purposes only." />
      <div className="divide-y divide-border/70 border-y border-border/70 bg-background max-w-4xl">
        {publishedVsInternal.map((row) => (
          <div key={row.p} className="grid md:grid-cols-12 gap-6 px-6 py-5">
            <p className="md:col-span-3 text-[14px] font-semibold text-foreground">{row.p}</p>
            <p className="md:col-span-9 text-[14.5px] text-muted-foreground leading-relaxed">{row.v}</p>
          </div>
        ))}
      </div>
    </Section>

    <Section muted>
      <SectionLabel number="§4" title="Third-party processors" description="A small number of service providers process data on Source Standard's behalf under standard data-processing terms." />
      <ul className="space-y-3 max-w-3xl">
        {processors.map((p, i) => (
          <li key={i} className="flex gap-4 text-[14.5px]">
            <span className="meta-mono text-muted-foreground w-6 shrink-0">·</span>
            <span className="text-foreground">{p}</span>
          </li>
        ))}
      </ul>
    </Section>

    <Section>
      <SectionLabel number="§5" title="Your rights" />
      <ul className="space-y-3 max-w-3xl">
        {rights.map((r, i) => (
          <li key={i} className="flex gap-4 text-[14.5px]">
            <span className="meta-mono text-muted-foreground w-6 shrink-0">·</span>
            <span className="text-foreground">{r}</span>
          </li>
        ))}
      </ul>
    </Section>

    <Section muted>
      <SectionLabel number="§6" title="Contact for privacy inquiries" />
      <div className="border border-border/70 rounded-[2px] bg-background p-6 max-w-2xl">
        <p className="meta-label mb-2">Email</p>
        <a href="mailto:privacy@sourcestandard.org" className="text-[15px] font-medium text-foreground underline-offset-4 hover:underline">
          privacy@sourcestandard.org
        </a>
      </div>
      <p className="mt-6 text-[13px] text-muted-foreground leading-relaxed max-w-2xl">
        This policy is provided in plain, reasonable terms and should be reviewed by counsel before public launch. Material updates will be reflected in a new document version.
      </p>
    </Section>

    <Section>
      <SectionLabel number="§7" title="Read deeper" />
      <ul className="space-y-2 text-[14.5px]">
        <li><Link to="/terms" className="text-foreground underline-offset-4 hover:underline">Terms of Use →</Link></li>
        <li><Link to="/verification-disclaimer" className="text-foreground underline-offset-4 hover:underline">Verification Disclaimer →</Link></li>
        <li><Link to="/report-a-concern" className="text-foreground underline-offset-4 hover:underline">Report a Concern →</Link></li>
      </ul>
      <p className="mt-10 meta-label">
        Cite as: Source Standard Privacy Policy, SS-PRIVACY-2026.01.
      </p>
    </Section>
  </>
);

export default Privacy;
