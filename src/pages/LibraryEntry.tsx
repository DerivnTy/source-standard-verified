import { Link, useParams } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { Section } from "@/components/Section";
import {
  ENTRY_STATUS_LABEL,
  findLibraryEntry,
  libraryGuides,
  librarySeries,
} from "@/data/library";

const LANE_LABEL: Record<string, string> = {
  series: "Source Standard Series",
  guide: "Clinical & Practical Guide",
  faq: "FAQ",
  supplementary: "Supplementary",
};

const LibraryEntry = () => {
  const { slug = "" } = useParams();
  const entry = findLibraryEntry(slug);

  if (!entry) {
    return (
      <Section>
        <p className="eyebrow mb-3">Not found</p>
        <h1 className="text-[1.5rem] font-semibold text-foreground">Entry not found</h1>
        <p className="mt-3 text-[14px] text-muted-foreground">
          No library entry matches this reference.{" "}
          <Link to="/education" className="underline underline-offset-4 decoration-border">
            Return to the Clinical Reference Library →
          </Link>
        </p>
      </Section>
    );
  }

  const related = (entry.lane === "series" ? librarySeries : libraryGuides)
    .filter((e) => e.slug !== entry.slug)
    .slice(0, 4);

  return (
    <>
      <RecordHeader
        metadata={[
          { label: "Reference", value: entry.id },
          { label: "Lane", value: LANE_LABEL[entry.lane] ?? entry.lane },
          { label: "Status", value: ENTRY_STATUS_LABEL[entry.status] },
          ...(entry.reviewedBy ? [{ label: "Reviewed by", value: entry.reviewedBy }] : []),
        ]}
        eyebrow={LANE_LABEL[entry.lane] ?? "Library entry"}
        title={entry.title}
        lead={entry.summary}
      />

      <Section>
        <div className="border border-border/70 bg-surface-muted/40 px-6 py-8 rounded-[2px] max-w-3xl">
          <p className="eyebrow mb-3">Outlined — full text forthcoming</p>
          <p className="text-[14px] text-muted-foreground leading-relaxed">
            This entry is part of the Clinical Reference Library and is currently outlined. The full
            reviewed text will be published here once it has completed the editorial and, where
            applicable, Medical Advisory Board review process.
          </p>
          <p className="mt-4 text-[13px] text-muted-foreground/90">
            Reference ID · <span className="font-mono text-foreground">{entry.id}</span>
          </p>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <p className="eyebrow mb-3">Related entries</p>
            <ul className="border-t border-border/60 divide-y divide-border/60 max-w-3xl">
              {related.map((r) => (
                <li key={r.id} className="py-3 flex items-baseline gap-4">
                  <span className="text-[11px] font-mono uppercase tracking-[0.08em] text-muted-foreground tabular-nums w-32 shrink-0">
                    {r.id}
                  </span>
                  <Link
                    to={`/education/${r.slug}`}
                    className="text-[14px] text-foreground hover:underline underline-offset-4 decoration-border"
                  >
                    {r.title} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12">
          <Link
            to="/education"
            className="text-[13px] text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border"
          >
            ← Back to Clinical Reference Library
          </Link>
        </div>
      </Section>
    </>
  );
};

export default LibraryEntry;
