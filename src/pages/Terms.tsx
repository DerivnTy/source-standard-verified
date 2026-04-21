import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { Section, SectionLabel } from "@/components/Section";

const permitted = [
  "Citation of public registry entries in clinical, journalistic, academic, and consumer contexts.",
  "Reference to vendor or upstream-source statuses with accurate attribution to Source Standard.",
  "Non-commercial reproduction of short excerpts with attribution and a link to the source page.",
];

const restrictions = [
  "No bulk scraping, crawling, or extraction of registry data for resale or redistribution.",
  "No misrepresentation of any status, including displaying a Verified or Greenlisted indication for an entity that does not currently hold that status.",
  "No derivative listings or directories that reproduce Source Standard content as if independently maintained.",
  "No use of Source Standard names, marks, or framework identifiers in a manner that implies affiliation, partnership, or endorsement that does not exist.",
];

const Terms = () => (
  <>
    <RecordHeader
      metadata={[
        { label: "Doc", value: "SS-TERMS-2026.01" },
        { label: "Status", value: "Active" },
        { label: "Updated", value: "04/21/26" },
        { label: "Jurisdiction", value: "FL/US" },
      ]}
      eyebrow="Terms of Use"
      title="Site usage, public content, and liability terms"
      lead="These terms govern the use of the Source Standard website and the public registry it publishes. By accessing the site, you accept these terms."
    />

    <Section>
      <SectionLabel number="§1" title="Acceptance of terms" description="Use of this site constitutes acceptance of these terms and the related Privacy Policy and Verification Disclaimer. If you do not accept these terms, do not use the site." />
    </Section>

    <Section muted>
      <SectionLabel number="§2" title="Permitted use of public content" />
      <ul className="space-y-3 max-w-3xl">
        {permitted.map((p, i) => (
          <li key={i} className="flex gap-4 text-[14.5px]">
            <span className="meta-mono text-muted-foreground w-6 shrink-0">·</span>
            <span className="text-foreground">{p}</span>
          </li>
        ))}
      </ul>
    </Section>

    <Section>
      <SectionLabel number="§3" title="Restrictions" />
      <ul className="space-y-3 max-w-3xl">
        {restrictions.map((r, i) => (
          <li key={i} className="flex gap-4 text-[14.5px]">
            <span className="meta-mono text-muted-foreground w-6 shrink-0">·</span>
            <span className="text-foreground">{r}</span>
          </li>
        ))}
      </ul>
    </Section>

    <Section muted>
      <SectionLabel number="§4" title="Intellectual property" description="The Source Standard name, framework documents (including those identified by SS- document IDs), site design, and original written content are the property of Source Standard. References to third-party authorities (FDA, state boards, PCAB, NSF, USP, etc.) remain the property of those bodies and are used here for reference only." />
    </Section>

    <Section>
      <SectionLabel number="§5" title="Disclaimer of warranties" description="The site and registry are provided on an as-is and as-available basis. Source Standard makes no warranties, express or implied, regarding the accuracy, completeness, or fitness for a particular purpose of any registry entry, including verification status, greenlist status, or any associated metadata." />
    </Section>

    <Section muted>
      <SectionLabel number="§6" title="Limitation of liability" description="To the fullest extent permitted by law, Source Standard is not liable for any direct, indirect, incidental, consequential, or special damages arising from use of the site or reliance on registry content. Reliance on registry information is at the user's discretion. Users should consult licensed clinicians and applicable regulatory authorities for matters within those domains." />
    </Section>

    <Section>
      <SectionLabel number="§7" title="Governing law" description="These terms are governed by the laws of the State of Florida, United States, without regard to conflict-of-law principles. Any dispute arising under these terms is subject to the exclusive jurisdiction of the state and federal courts located in Florida." />
    </Section>

    <Section muted>
      <SectionLabel number="§8" title="Changes to terms" description="These terms may be updated. Material changes will be reflected in a new document version (e.g., SS-TERMS-2026.02). Continued use of the site after a revision constitutes acceptance of the updated terms." />
      <p className="mt-6 text-[13px] text-muted-foreground leading-relaxed max-w-2xl">
        These terms are provided in plain, reasonable language and should be reviewed by counsel before public launch.
      </p>
    </Section>

    <Section>
      <SectionLabel number="§9" title="Read deeper" />
      <ul className="space-y-2 text-[14.5px]">
        <li><Link to="/privacy" className="text-foreground underline-offset-4 hover:underline">Privacy Policy →</Link></li>
        <li><Link to="/verification-disclaimer" className="text-foreground underline-offset-4 hover:underline">Verification Disclaimer →</Link></li>
        <li><Link to="/status-definitions" className="text-foreground underline-offset-4 hover:underline">Status Definitions →</Link></li>
      </ul>
      <p className="mt-10 meta-label">
        Cite as: Source Standard Terms of Use, SS-TERMS-2026.01.
      </p>
    </Section>
  </>
);

export default Terms;
