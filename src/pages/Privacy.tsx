import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";
import { BoardSection } from "@/components/BoardSection";
import { DocJumpBar } from "@/components/DocJumpBar";

type Section = {
  id: string;
  n: string;
  category: string;
  title: string;
  points: string[];
};

const sections: Section[] = [
  {
    id: "partitioning",
    n: "01",
    category: "PARTITIONING",
    title: "Record Partitioning & Access Control",
    points: [
      "Source Standard maintains a strict operational divide between public disclosures and Protected Audit Material (PAM).",
      "Public Registry Data: Limited to business identity, verification categories, current status, and status dates. This data is available for public reference.",
      "Protected Audit Material (PAM): Includes licensing records, supplier invoices, Certificates of Analysis (CoA), and internal review notes.",
      "Access Restriction: PAM is retained within an encrypted internal environment. It is never published, sold, or shared with third parties, excluding lawful process or authorized infrastructure partners.",
    ],
  },
  {
    id: "collection",
    n: "02",
    category: "COLLECTION",
    title: "Scope of Collection",
    points: [
      "Vendor Intake: Collection of business credentials and sourcing history required for the Forensic Audit process.",
      "Surveillance Data: Results of unannounced randomized testing and independent laboratory analytics.",
      "Concern Reports: Supporting documentation and contact details provided through the public reporting channel.",
      "Zero-Tracking Analytics: Site usage is monitored via aggregate, non-identifying signals only. We do not utilize cross-site identifiers or advertising trackers.",
    ],
  },
  {
    id: "retention",
    n: "03",
    category: "RETENTION",
    title: "Data Retention",
    points: [
      "Active Records: Protected Audit Material is retained for the duration of the entity's active standing in the registry.",
      "Historical Determinations: Public status transitions are retained as a permanent record to maintain the integrity of the registry's timeline.",
      "Withdrawn Applications: Documentation associated with denied or withdrawn applications is held for a fixed administrative window before secure disposal.",
      "Secure Disposal: Deletion of sensitive records follows a documented forensic protocol with internal audit logging.",
    ],
  },
  {
    id: "infrastructure",
    n: "04",
    category: "PROCESSING",
    title: "Authorized Processing",
    points: [
      "Data processing is limited to essential infrastructure partners under strict non-disclosure protocols.",
      "Partners are restricted to the minimum data required for hosting, transactional email delivery, and privacy-respecting analytics.",
    ],
  },
  {
    id: "office",
    n: "05",
    category: "PRIVACY OFFICE",
    title: "Inquiries & Requests",
    points: [
      "Individuals may request access to, or correction of, personal data held by the auditing body.",
      "Deletion requests are processed in accordance with our historical record retention obligations.",
      "Data Privacy Officer: privacy@sourcestandard.org",
    ],
  },
];

const waypoints = sections.map((s) => ({
  id: s.id,
  number: s.n,
  label: s.category,
}));

const Privacy = () => (
  <>
    <PageMeta
      title="Data Governance Protocol"
      description="The administrative framework governing the collection, partitioning, and retention of audit records and registry data."
    />
    <Breadcrumb items={[{ label: "Legal" }, { label: "Privacy" }]} />

    <BriefingHero
      tone="navy"
      category="Policy · Data Governance Protocol"
      docId=""
      title="Data Governance Protocol"
      statement="The administrative framework governing the collection, partitioning, and retention of audit records and registry data."
    />

    {/* Metadata bar — small, professional, mono */}
    <section className="border-b border-border bg-surface-muted">
      <div className="page-shell py-3">
        <div className="mx-auto w-standard">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            <span className="text-foreground/80">VERSION:</span> 2026.01
            <span className="mx-3 text-border">|</span>
            <span className="text-foreground/80">CLASSIFICATION:</span> PUBLIC-FACING PROTOCOL
            <span className="mx-3 text-border">|</span>
            <span className="text-foreground/80">UPDATED:</span> 04/21/26
          </p>
        </div>
      </div>
    </section>

    <DocJumpBar waypoints={waypoints} />

    {sections.map((s, i) => (
      <BoardSection
        key={s.id}
        id={s.id}
        n={s.n}
        category={s.category}
        title={s.title}
        muted={i % 2 === 1}
      >
        <ul className="space-y-4">
          {s.points.map((p, idx) => (
            <li key={idx} className="flex gap-4">
              <span aria-hidden className="text-muted-foreground/60 select-none font-sans">|</span>
              <span className="flex-1">{p}</span>
            </li>
          ))}
        </ul>
      </BoardSection>
    ))}
  </>
);

export default Privacy;
