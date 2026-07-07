import { Link } from "react-router-dom";
import { UtilityHeader } from "@/components/UtilityHeader";
import { Section } from "@/components/Section";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  ENTRY_STATUS_LABEL,
  EntryStatus,
  LibraryEntry,
  libraryGuides,
} from "@/data/library";

const isReadable = (s: EntryStatus) => s === "published";

const SoftStatus = ({ status }: { status: EntryStatus }) =>
  isReadable(status) ? null : (
    <span className="t-utility-xs text-muted-foreground/70 italic">
      {ENTRY_STATUS_LABEL[status]}
    </span>
  );

const SimpleRow = ({ entry }: { entry: LibraryEntry }) => (
  <Link
    to={`/education/${entry.slug}`}
    className="block px-5 py-4 border-b border-border/60 last:border-b-0 hover:bg-surface-muted/40 transition-colors group"
  >
    <div className="flex items-baseline justify-between gap-4">
      <h3 className="t-body-md font-medium text-foreground leading-snug group-hover:underline underline-offset-4 decoration-border">
        {entry.title}
      </h3>
      <SoftStatus status={entry.status} />
    </div>
    <p className="mt-1 t-body-sm text-muted-foreground leading-relaxed">
      {entry.summary}
    </p>
    {entry.reviewedBy && (
      <p className="mt-2 t-utility-xs text-muted-foreground/80">
        Reviewed by {entry.reviewedBy}
      </p>
    )}
  </Link>
);

const EducationGuides = () => {
  return (
    <>
      <PageMeta
        title="Clinical & Audit Guides"
        description="Clinical reference guides on interpreting CoAs, sterile preparation, aseptic technique, and reference dosing."
      />
      <Breadcrumb
        items={[
          { label: "Resource Library", to: "/education" },
          { label: "Guides" },
        ]}
      />

      <UtilityHeader
        backHref="/education"
        backLabel="Back to Resource Library"
        eyebrow="Clinical reference"
        title="Clinical guides"
        description="Handling, sterile preparation, storage, and clinical context. Reviewed by the Medical Advisory Board."
      />
      <Section density="doc">
        <div className="border border-border/70 rounded-[2px] bg-background">
          {libraryGuides.map((e) => (
            <SimpleRow key={e.id} entry={e} />
          ))}
        </div>
      </Section>
    </>
  );
};

export default EducationGuides;
