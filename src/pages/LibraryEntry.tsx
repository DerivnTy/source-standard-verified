import { Link, useParams } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import {
  BoardSection,
  BoardFooterNav,
  BoardCiteFooter,
} from "@/components/BoardSection";
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
      <>
        <RecordHeader
          eyebrow="Library entry · Not found"
          title="Entry not found."
          lead="No library entry matches this reference."
          metadata={[
            { label: "Doc", value: "—" },
            { label: "Status", value: "Not on file" },
            { label: "Updated", value: "—" },
          ]}
        />
        <BoardSection n={1} category="Status" title="No matching reference.">
          <p>
            The reference you requested is not present in the Source Standard library index.{" "}
            <Link to="/education" className="text-primary underline-offset-4 hover:underline">
              Return to the Clinical Reference Library →
            </Link>
          </p>
        </BoardSection>
        <BoardCiteFooter citation="Source Standard, Library — entry not found." />
      </>
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

      <BoardSection
        n={1}
        category="Status"
        title="In editorial review."
        rationale="The full text will be published once it has completed editorial and, where applicable, Medical Advisory Board review."
      >
        <p>
          <span className="text-foreground font-medium">Here's what it will cover · </span>
          {entry.summary}
        </p>
        <p className="text-[12.5px] font-mono text-muted-foreground">
          Reference ID · <span className="text-foreground">{entry.id}</span>
        </p>
      </BoardSection>

      {related.length > 0 && (
        <section className="border-b border-border bg-surface-muted">
          <div className="container-wide py-12 md:py-16">
            <div className="mb-8 grid md:grid-cols-12 gap-10">
              <div className="md:col-span-4">
                <p className="meta mb-3">§2 · Related references</p>
                <h2 className="h-section">Adjacent entries.</h2>
                <p className="mt-3 text-[13.5px] text-muted-foreground leading-relaxed">
                  Other entries published in the same lane.
                </p>
              </div>
            </div>
            <ul className="grid md:grid-cols-2 gap-px bg-border border border-border">
              {related.map((r, i) => (
                <li key={r.id} className="bg-background p-6">
                  <p className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground mb-2">
                    Entry · {(i + 1).toString().padStart(2, "0")}
                  </p>
                  <p className="text-[14px] font-semibold text-foreground leading-snug mb-3">
                    {r.title}
                  </p>
                  <p className="text-[12px] font-mono text-muted-foreground mb-4">{r.id}</p>
                  <Link
                    to={`/education/${r.slug}`}
                    className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary"
                  >
                    Read →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <BoardFooterNav
        back={{ to: "/education", label: "Back to Clinical Reference Library" }}
      />

      <BoardCiteFooter citation={`Source Standard, Library — ${entry.title}, ${entry.id}.`} />
    </>
  );
};

export default LibraryEntry;
