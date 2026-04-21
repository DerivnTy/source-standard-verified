import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { Section, SectionLabel } from "@/components/Section";

const DOC_ID = "SS-TERMS-2026.01";

const citationElements = [
  { t: "Audit ID", d: "The registry record identifier of the entity cited (e.g. SS-V-#### for vendors, SS-G-#### for greenlist sources)." },
  { t: "Status Date", d: "The issue date of the determination being cited (status as of MM/DD/YY)." },
  { t: "Document anchor", d: "The controlling framework document (SS-FRAMEWORK-2026.01) and, where the citation depends on it, the relevant policy anchor (SS-PRIVACY-2026.01, SS-ENFORCE-2026.01, etc.)." },
  { t: "Attribution", d: "An attribution line naming Source Standard as the auditing body, with a link to the source registry page." },
];

const permitted = [
  "Citation of public registry entries in clinical, journalistic, academic, and consumer contexts, accompanied by the required citation elements above.",
  "Reference to vendor or upstream-source statuses with accurate attribution to Source Standard and the corresponding Status Date.",
  "Non-commercial reproduction of short excerpts with attribution and a link to the source page.",
];

const restrictions = [
  { lead: "No bulk extraction.", body: "No bulk scraping, crawling, indexing, or extraction of registry data for resale, redistribution, or assembly into any derivative dataset." },
  { lead: "No status misrepresentation.", body: "No display, implication, or transmission of a Verified, Pending Review, Greenlisted, or any other Source Standard status for an entity that does not currently hold that status, or as of a date other than the published Status Date." },
  { lead: "No derivative or mirror registries.", body: "No reproduction of Source Standard registry content as if independently maintained, audited, or determined." },
  { lead: "No unauthorized use of identifiers.", body: "No use of the Source Standard name, marks, framework document anchors, badge artwork, or status indicators in a manner that implies affiliation, partnership, accreditation, endorsement, or any contractual relationship that does not exist." },
  { lead: "No interference with the registry.", body: "No automated activity, attack, or circumvention intended to disrupt, falsify, or otherwise compromise the integrity of the public registry or its underlying records." },
];

const Terms = () => (
  <>
    <RecordHeader
      metadata={[
        { label: "Doc", value: DOC_ID },
        { label: "Status", value: "Active" },
        { label: "Updated", value: "04/21/26" },
        { label: "Jurisdiction", value: "United States" },
      ]}
      eyebrow="Policy · Registry user agreement"
      title="User Agreement & Registry Terms."
      lead="The binding user agreement governing access to the Source Standard public registry and any reproduction, citation, or downstream use of its contents. Issued by the auditing body as a version-controlled legal instrument under document SS-TERMS-2026.01."
    />

    <Section density="doc">
      <DocId section="§1" />
      <SectionLabel
        number="§1"
        title="Acceptance of terms"
        description="Access to or use of this site, the public registry, or any associated framework document constitutes binding acceptance of this User Agreement together with the Data Governance & Privacy Policy (SS-PRIVACY-2026.01) and the Verification Disclaimer. If any term is not accepted, the user must discontinue use of the site and the registry."
      />
    </Section>

    <Section muted density="doc">
      <DocId section="§2" />
      <SectionLabel
        number="§2"
        title="Authorized Citation & Data Utilization"
        description="Public registry entries may be cited in clinical, journalistic, academic, and consumer contexts. To preserve the integrity of every citation, the auditing body requires the following identifiers to accompany any reference."
      />

      <p className="eyebrow mt-2 mb-4">Required citation elements</p>
      <dl className="border-y border-border/70 divide-y divide-border/70 max-w-3xl">
        {citationElements.map((c, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 py-4">
            <dt className="md:col-span-3 text-[13.5px] font-semibold text-foreground">{c.t}</dt>
            <dd className="md:col-span-9 text-[14.5px] text-muted-foreground leading-relaxed">{c.d}</dd>
          </div>
        ))}
      </dl>

      <p className="eyebrow mt-8 mb-4">Permitted use</p>
      <ul className="space-y-3 max-w-3xl">
        {permitted.map((p, i) => (
          <li key={i} className="flex gap-4 text-[15px]">
            <span className="meta-mono text-muted-foreground w-6 shrink-0">·</span>
            <span className="text-foreground">{p}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-[13.5px] text-muted-foreground leading-relaxed max-w-3xl">
        Citations that omit the <span className="font-semibold text-foreground">Audit ID</span> or <span className="font-semibold text-foreground">Status Date</span> are considered non-conforming and may be treated under §3.
      </p>
    </Section>

    <Section density="doc">
      <DocId section="§3" />
      <SectionLabel number="§3" title="Prohibited Activity & Registry Integrity" />
      <p className="text-[15px] text-foreground leading-[1.7] max-w-3xl font-medium">
        The following activities are prohibited. They compromise the integrity of the registry, mislead the public, or misappropriate the auditing body's identifiers. Unauthorized use of any Source Standard mark, document anchor, or status indicator will result in <span className="font-semibold">administrative action</span> under SS-ENFORCE-2026.01, including a public registry note and, where appropriate, referral to counsel and to applicable regulatory authorities.
      </p>

      <ul className="mt-6 space-y-4 max-w-3xl">
        {restrictions.map((r, i) => (
          <li key={i} className="flex gap-4 text-[15px]">
            <span className="meta-mono text-muted-foreground w-8 shrink-0 pt-0.5">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">{r.lead}</span> {r.body}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-[13.5px] text-muted-foreground leading-relaxed max-w-3xl">
        Confirmed violations are subject to administrative action under the Accountability & Enforcement protocol (SS-ENFORCE-2026.01).
      </p>
    </Section>

    <Section muted density="doc">
      <DocId section="§4" />
      <SectionLabel
        number="§4"
        title="Intellectual property"
        description="The Source Standard name, framework document anchors (including all SS- identifiers), site design, badge artwork, status indicators, and original written content are the property of the auditing body. References to third-party regulatory authorities (FDA, state boards of pharmacy, PCAB, NSF, USP, and others) remain the property of those bodies and are reproduced here for reference only."
      />
    </Section>

    <Section density="doc">
      <DocId section="§5" />
      <SectionLabel number="§5" title="Warranty Disclaimer & Limit of Liability" />
      <div className="space-y-5 max-w-3xl">
        <p className="text-[15px] text-muted-foreground leading-[1.7]">
          <span className="font-semibold text-foreground">Auditing mirror; no warranty.</span> The site and the public registry operate as an auditing mirror of third-party records — licensing, supplier, certificate, and regulatory data produced or maintained by third parties. The site and registry are provided on an as-is and as-available basis. The auditing body makes no warranties, express or implied, regarding the accuracy, completeness, currency, or fitness for any particular purpose of any registry entry, status, or associated metadata.
        </p>
        <p className="text-[15px] text-muted-foreground leading-[1.7]">
          <span className="font-semibold text-foreground">Limit of liability.</span> To the fullest extent permitted by law, the auditing body is not liable for any direct, indirect, incidental, consequential, special, or exemplary damages arising from access to the site or reliance on registry content. Reliance on registry information is at the user's discretion. Users should consult licensed clinicians and the applicable regulatory authorities for matters within those domains.
        </p>
      </div>
    </Section>

    <Section muted density="doc">
      <DocId section="§6" />
      <SectionLabel
        number="§6"
        title="Jurisdictional Governance"
        description="This User Agreement is governed by United States Federal Standards and the laws of the State of Florida, United States, without regard to conflict-of-law principles. Any dispute arising under or in connection with this Agreement is subject to the exclusive jurisdiction of the United States federal courts and the state courts located in Florida, which the user accepts as the sole and exclusive venue."
      />
    </Section>

    <Section density="doc">
      <DocId section="§7" />
      <SectionLabel
        number="§7"
        title="Changes to terms"
        description="This User Agreement may be revised. Material changes are issued as a new version under the SS-TERMS series (e.g., SS-TERMS-2026.02). The current version is identified in the header of every section. Continued use of the site or registry after a revision constitutes binding acceptance of the updated Agreement."
      />
      <p className="mt-5 text-[13.5px] text-muted-foreground leading-relaxed max-w-2xl">
        This Agreement is provided in plain, controlled legal terms and is reviewed by counsel.
      </p>
    </Section>

    <Section density="tight">
      <DocId section="§8" />
      <SectionLabel number="§8" title="Read deeper" />
      <ul className="space-y-2 text-[15px]">
        <li><Link to="/privacy" className="text-foreground underline-offset-4 hover:underline">Data Governance & Privacy Policy →</Link></li>
        <li><Link to="/verification-disclaimer" className="text-foreground underline-offset-4 hover:underline">Verification Disclaimer →</Link></li>
        <li><Link to="/accountability" className="text-foreground underline-offset-4 hover:underline">Accountability & Enforcement →</Link></li>
        <li><Link to="/status-definitions" className="text-foreground underline-offset-4 hover:underline">Status Definitions →</Link></li>
        <li><Link to="/governance" className="text-foreground underline-offset-4 hover:underline">Governance →</Link></li>
      </ul>
      <p className="mt-8 meta-label">
        Cite as: Source Standard User Agreement & Registry Terms, SS-TERMS-2026.01.
      </p>
    </Section>
  </>
);

export default Terms;
