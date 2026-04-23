import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { BoardSection, BoardCiteFooter } from "@/components/BoardSection";
import { BriefingHero } from "@/components/BriefingHero";
import { DocJumpBar } from "@/components/DocJumpBar";
import { Callout } from "@/components/Callout";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";

const DOC_ID = "SS-TERMS-2026.01";
const VERIFIED_ON = "04/21/2026";

const citationElements = [
  { t: "Audit ID", d: "The registry record identifier of the entity cited (e.g. SS-V-#### for vendors, SS-G-#### for greenlist sources)." },
  { t: "Status Date", d: "The issue date of the determination being cited (status as of MM/DD/YY)." },
  { t: "Document anchor", d: "The controlling framework document under which the determination was issued." },
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

const deeper = [
  { to: "/privacy", label: "Data Governance & Privacy Policy" },
  { to: "/verification-disclaimer", label: "Verification Disclaimer" },
  { to: "/accountability", label: "Accountability & Enforcement" },
  { to: "/status-definitions", label: "Status Definitions" },
  { to: "/governance", label: "Governance" },
];

const waypoints = [
  { id: "acceptance", number: "1", label: "Acceptance" },
  { id: "citation", number: "2", label: "Citation" },
  { id: "prohibited", number: "3", label: "Prohibited" },
  { id: "ip", number: "4", label: "IP" },
  { id: "warranty", number: "5", label: "Warranty" },
  { id: "jurisdiction", number: "6", label: "Jurisdiction" },
  { id: "changes", number: "7", label: "Changes" },
  { id: "deeper", number: "8", label: "Read deeper" },
];

const Terms = () => (
  <>
    <PageMeta
      title="Terms of Use"
      description="Permitted use, citation requirements, and restrictions governing access to the Source Standard registry."
    />
    <Breadcrumb items={[{ label: "Legal" }, { label: "Terms" }]} />

    <BriefingHero
      variant="chapter"
      category="Policy · Registry user agreement"
      docId={DOC_ID}
      title="User Agreement & Registry Terms"
      statement="The binding user agreement governing access to the public registry and any reproduction, citation, or downstream use of its contents."
    />

    <RecordHeader
      compact
      metadata={[
        { label: "Doc", value: DOC_ID },
        { label: "Status", value: "Active" },
        { label: "Updated", value: "04/21/26" },
        { label: "Jurisdiction", value: "United States" },
      ]}
      verifiedOn={VERIFIED_ON}
    />

    <DocJumpBar waypoints={waypoints} />

    <BoardSection
      id="acceptance"
      n="1"
      category="Acceptance"
      title="Acceptance of terms"
      rationale="Access to or use of this site, the public registry, or any associated framework document constitutes binding acceptance of this User Agreement together with the Data Governance & Privacy Policy (SS-PRIVACY-2026.01) and the Verification Disclaimer. If any term is not accepted, the user must discontinue use of the site and the registry."
    >
      <p className="t-body-sm text-muted-foreground leading-relaxed">
        Continued access constitutes binding acceptance of every section that follows.
      </p>
    </BoardSection>

    <BoardSection
      id="citation"
      n="2"
      category="Citation"
      title="Authorized citation & data utilization"
      rationale="Public registry entries may be cited in clinical, journalistic, academic, and consumer contexts. To preserve the integrity of every citation, the auditing body requires the following identifiers to accompany any reference."
      muted
    >
      <p className="meta-mono text-foreground/70">REQUIRED CITATION ELEMENTS</p>
      <dl className="border border-border bg-background divide-y divide-border">
        {citationElements.map((c, i) => (
          <div key={i} className="grid grid-cols-12 gap-4 px-5 py-4 items-baseline">
            <dt className="col-span-3 meta text-primary">{c.t}</dt>
            <dd className="col-span-9 t-body-sm text-muted-foreground leading-relaxed">{c.d}</dd>
          </div>
        ))}
      </dl>

      <p className="meta-mono text-foreground/70 mt-2">PERMITTED USE</p>
      <ol className="border border-border bg-background divide-y divide-border">
        {permitted.map((p, i) => (
          <li key={i} className="grid grid-cols-12 gap-4 px-5 py-4 items-baseline">
            <div className="col-span-2 meta text-primary">{String(i + 1).padStart(2, "0")}</div>
            <p className="col-span-10 t-body-sm text-muted-foreground leading-relaxed">{p}</p>
          </li>
        ))}
      </ol>

      <p className="t-body-sm text-muted-foreground leading-relaxed">
        Citations that omit the <strong className="text-foreground font-semibold">Audit ID</strong> or <strong className="text-foreground font-semibold">Status Date</strong> are considered non-conforming and may be treated under §3.
      </p>
    </BoardSection>

    <BoardSection id="prohibited" n="3" category="Prohibited" title="Prohibited activity & registry integrity">
      <Callout tone="warning" eyebrow="Warning · Prohibited activity">
        <p className="t-body-sm text-foreground leading-relaxed font-medium">
          The following activities are prohibited. They compromise the integrity of the registry, mislead the public, or misappropriate the auditing body's identifiers. Unauthorized use of any Source Standard mark, document anchor, or status indicator will result in administrative action under SS-ENFORCE-2026.01, including a public registry note and, where appropriate, referral to counsel and to applicable regulatory authorities.
        </p>
      </Callout>

      <ol className="border border-border bg-background divide-y divide-border">
        {restrictions.map((r, i) => (
          <li key={i} className="grid grid-cols-12 gap-4 px-5 py-5 items-baseline">
            <div className="col-span-2 meta text-primary">{String(i + 1).padStart(2, "0")}</div>
            <p className="col-span-10 t-body-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">{r.lead}</span> {r.body}
            </p>
          </li>
        ))}
      </ol>

      <p className="t-body-sm text-muted-foreground leading-relaxed">
        Confirmed violations are subject to administrative action under the Accountability & Enforcement protocol (SS-ENFORCE-2026.01).
      </p>
    </BoardSection>

    <BoardSection
      id="ip"
      n="4"
      category="Intellectual property"
      title="Intellectual property"
      rationale="The Source Standard name, framework document anchors (including all SS- identifiers), site design, badge artwork, status indicators, and original written content are the property of the auditing body. References to third-party regulatory authorities (FDA, state boards of pharmacy, PCAB, NSF, USP, and others) remain the property of those bodies and are reproduced here for reference only."
      muted
    >
      <p className="t-body-sm text-muted-foreground leading-relaxed">
        All trademarks, document anchors, and original written content remain the exclusive property of Source Standard.
      </p>
    </BoardSection>

    <BoardSection id="warranty" n="5" category="Warranty" title="Warranty disclaimer & limit of liability">
      <p className="t-body-sm text-muted-foreground leading-relaxed">
        <strong className="text-foreground font-semibold">Auditing mirror; no warranty.</strong> The site and the public registry operate as an auditing mirror of third-party records, licensing, supplier, certificate, and regulatory data produced or maintained by third parties. The site and registry are provided on an as-is and as-available basis. The auditing body makes no warranties, express or implied, regarding the accuracy, completeness, currency, or fitness for any particular purpose of any registry entry, status, or associated metadata.
      </p>
      <p className="t-body-sm text-muted-foreground leading-relaxed">
        <strong className="text-foreground font-semibold">Limit of liability.</strong> To the fullest extent permitted by law, the auditing body is not liable for any direct, indirect, incidental, consequential, special, or exemplary damages arising from access to the site or reliance on registry content. Reliance on registry information is at the user's discretion. Users should consult licensed clinicians and the applicable regulatory authorities for matters within those domains.
      </p>
    </BoardSection>

    <BoardSection
      id="jurisdiction"
      n="6"
      category="Jurisdiction"
      title="Jurisdictional governance"
      rationale="This User Agreement is governed by United States Federal Standards and the laws of the State of Florida, United States, without regard to conflict-of-law principles. Any dispute arising under or in connection with this Agreement is subject to the exclusive jurisdiction of the United States federal courts and the state courts located in Florida, which the user accepts as the sole and exclusive venue."
      muted
    >
      <p className="t-body-sm text-muted-foreground leading-relaxed">
        Florida, United States, exclusive venue for any matter arising under this Agreement.
      </p>
    </BoardSection>

    <BoardSection
      id="changes"
      n="7"
      category="Changes"
      title="Changes to terms"
      rationale="This User Agreement may be revised. Material changes are issued as a new version under the SS-TERMS series (e.g., SS-TERMS-2026.02). The current version is identified in the header of every section. Continued use of the site or registry after a revision constitutes binding acceptance of the updated Agreement."
    >
      <p className="t-body-sm text-muted-foreground leading-relaxed">
        This Agreement is provided in plain, controlled legal terms and is reviewed by counsel.
      </p>
    </BoardSection>

    <BoardSection id="deeper" n="8" category="Read deeper" title="Cross-references" muted>
      <ul className="grid sm:grid-cols-2 gap-px bg-border border border-border">
        {deeper.map((d, i) => (
          <li key={d.to} className="bg-background">
            <Link to={d.to} className="group flex items-start justify-between gap-3 p-5 hover:bg-surface-muted transition-colors">
              <div>
                <p className="meta text-primary mb-1">REF · {String(i + 1).padStart(2, "0")}</p>
                <p className="t-body-sm font-semibold text-foreground leading-snug">{d.label}</p>
              </div>
              <span className="text-primary t-body-sm shrink-0 group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </BoardSection>

    <BoardCiteFooter
      citation={`Source Standard. User Agreement & Registry Terms. Document ${DOC_ID}. Issued ${VERIFIED_ON}. Controlled copy on file with the issuing organization.`}
    />
  </>
);

export default Terms;
