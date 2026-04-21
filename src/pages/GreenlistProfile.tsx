import { Link, useParams } from "react-router-dom";
import { ReactNode } from "react";
import { MetadataBar } from "@/components/MetadataBar";
import { getGreenlistEntry, GreenlistProfile as GLProfile } from "@/data/greenlist";

const NOT_DISCLOSED = (
  <span className="text-muted-foreground/70">Not disclosed</span>
);

const Field = ({ label, value }: { label: string; value: ReactNode }) => (
  <div className="grid grid-cols-12 gap-4 py-3 border-b border-border/40 last:border-b-0">
    <dt className="col-span-12 md:col-span-4 text-[12px] uppercase tracking-[0.08em] text-muted-foreground/80 font-medium">
      {label}
    </dt>
    <dd className="col-span-12 md:col-span-8 text-[13.5px] text-foreground leading-relaxed">
      {value ?? NOT_DISCLOSED}
    </dd>
  </div>
);

const renderList = (arr?: string[]) =>
  arr && arr.length > 0 ? (
    <ul className="flex flex-wrap gap-1.5">
      {arr.map((item) => (
        <li
          key={item}
          className="inline-flex items-center px-2 py-0.5 rounded border border-border/60 bg-surface-muted/60 text-[12px] font-mono"
        >
          {item}
        </li>
      ))}
    </ul>
  ) : (
    NOT_DISCLOSED
  );

const renderText = (v?: string | number) =>
  v !== undefined && v !== null && v !== "" ? <>{v}</> : NOT_DISCLOSED;

const ScorecardSection = ({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) => (
  <section className="rounded-lg border border-border/60 bg-background overflow-hidden">
    <header className="bg-surface-muted/60 border-b border-border/60 px-5 py-3">
      <p className="text-[10.5px] uppercase tracking-[0.14em] font-mono font-semibold text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="text-[15px] font-semibold text-foreground tracking-[-0.005em] mt-0.5">
        {title}
      </h2>
    </header>
    <dl className="px-5 py-1">{children}</dl>
  </section>
);

const GreenlistProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const entry = getGreenlistEntry(slug);

  if (!entry) {
    return (
      <section className="container-wide py-24 text-center">
        <p className="eyebrow mb-3">Public Registry · Greenlist Facility</p>
        <h1 className="text-2xl font-semibold text-foreground mb-3">
          No facility profile found
        </h1>
        <p className="text-muted-foreground mb-6">
          The requested facility is not present in the Greenlist registry.
        </p>
        <Link
          to="/greenlist"
          className="text-[13px] font-mono uppercase tracking-[0.14em] text-foreground hover:text-primary"
        >
          ← Back to Greenlist
        </Link>
      </section>
    );
  }

  const p: GLProfile = entry.profile ?? {};

  return (
    <>
      <MetadataBar
        items={[
          { label: "Doc", value: `SS-GL-${entry.slug.toUpperCase().slice(0, 18)}` },
          { label: "Listing", value: "Greenlist Facility" },
          { label: "Updated", value: "April 21, 2026" },
          { label: "Jurisdiction", value: "US" },
        ]}
      />

      <header className="bg-background border-b border-border/60">
        <div className="container-wide pt-6 pb-10">
          <Link
            to="/greenlist"
            className="inline-flex items-center text-[12px] font-mono uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground mb-6"
          >
            ← Back to Greenlist
          </Link>

          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-8">
              <p className="eyebrow mb-3">Public Registry · Greenlist Facility</p>
              <h1 className="text-[1.75rem] md:text-[2.125rem] font-semibold tracking-[-0.015em] text-foreground leading-[1.15]">
                {entry.name}
              </h1>
              <p className="mt-3 text-[14px] text-muted-foreground font-mono">
                {entry.type} · {entry.location}
              </p>
              <p className="mt-5 max-w-2xl text-[15px] text-muted-foreground leading-relaxed">
                {entry.focus}.
              </p>
              {entry.website && (
                <a
                  href={entry.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block text-[12px] font-mono uppercase tracking-[0.14em] text-foreground hover:text-primary"
                >
                  Visit facility website →
                </a>
              )}
            </div>

            {/* At-a-glance scorecard sidebar */}
            <aside className="md:col-span-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground/80 mb-3">
                At a glance
              </p>
              <div className="rounded-lg border border-border/60 bg-background overflow-hidden">
                <div className="px-4 py-3 border-b border-border/60 bg-surface-muted/40">
                  <span className="inline-flex items-center gap-2 font-mono font-semibold uppercase tracking-[0.14em] text-[11px] text-foreground">
                    <span
                      aria-hidden
                      className="inline-block w-2 h-2 rounded-full bg-[hsl(var(--verified))]"
                    />
                    Greenlisted
                  </span>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Inclusion status — recognized upstream source
                  </p>
                </div>
                <dl className="px-4 py-2">
                  <Field label="Source type" value={entry.type} />
                  <Field label="Designation" value={renderText(p.designation)} />
                  <Field label="SS review date" value={renderText(p.ssReviewDate)} />
                  <Field label="Vendor count" value={renderText(p.vendorCount)} />
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </header>

      <section className="bg-surface-muted/30">
        <div className="container-wide py-10 space-y-6">
          <ScorecardSection
            eyebrow="01 · Regulatory"
            title="Regulatory identity & status"
          >
            <Field label="Designation" value={renderText(p.designation)} />
            <Field label="FDA registration / FEI" value={renderText(p.fdaRegistration)} />
            <Field label="States served / licensure" value={renderList(p.statesServed)} />
            <Field label="Inspection history" value={renderText(p.inspectionHistory)} />
            <Field label="Last inspection date" value={renderText(p.lastInspectionDate)} />
          </ScorecardSection>

          <ScorecardSection
            eyebrow="02 · Quality systems"
            title="Quality systems & manufacturing standards"
          >
            <Field label="Standards met" value={renderList(p.standards)} />
            <Field label="Cleanroom classification" value={renderText(p.cleanroomClass)} />
            <Field label="Testing protocols" value={renderList(p.testingProtocols)} />
            <Field
              label="Environmental monitoring"
              value={renderText(p.environmentalMonitoring)}
            />
          </ScorecardSection>

          <ScorecardSection eyebrow="03 · Capabilities" title="Product capabilities">
            <Field label="Dosage forms" value={renderList(p.dosageForms)} />
            <Field label="Specializations" value={renderList(p.specializations)} />
            <Field label="Clinical focus areas" value={entry.focus} />
            <Field label="API sourcing policy" value={renderText(p.apiSourcingPolicy)} />
          </ScorecardSection>

          <ScorecardSection
            eyebrow="04 · Source Standard"
            title="Source Standard audit data"
          >
            <Field label="SS verification / review date" value={renderText(p.ssReviewDate)} />
            <Field label="SS audit date" value={renderText(p.ssAuditDate)} />
            <Field
              label="Third-party lab validation log"
              value={renderText(p.labValidationLog)}
            />
            <Field label="Vendor count" value={renderText(p.vendorCount)} />
            <Field label="Review notes" value={renderText(p.reviewNotes)} />
          </ScorecardSection>

          <ScorecardSection
            eyebrow="05 · Background"
            title="Neutral facility background"
          >
            <Field label="Years in operation" value={renderText(p.yearsInOperation)} />
            <Field
              label="Facility scale / square footage"
              value={renderText(p.facilityScale)}
            />
            <Field label="QA staffing" value={renderText(p.qaStaffing)} />
            <Field label="Operational background" value={renderText(p.background)} />
          </ScorecardSection>

          <footer className="rounded-lg border border-border/60 bg-background px-5 py-4">
            <p className="text-[12px] text-muted-foreground leading-relaxed">
              Source Standard does not accept payment from facilities for inclusion in
              the Greenlist. Information provided is for public reference and is
              derived from public regulatory filings, disclosed facility information,
              and Source Standard review data where applicable.
            </p>
          </footer>
        </div>
      </section>
    </>
  );
};

export default GreenlistProfile;
