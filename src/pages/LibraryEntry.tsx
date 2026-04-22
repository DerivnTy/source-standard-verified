import { Link, useParams } from "react-router-dom";
import { ArticleHeader } from "@/components/ArticleHeader";
import { ArticleSection, ArticleFooter } from "@/components/ArticleSection";
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
        <ArticleHeader
          eyebrow="Library entry · Not found"
          title="Entry not found."
          lead="No library entry matches this reference."
          metadata={[
            { label: "Doc", value: "--" },
            { label: "Status", value: "Not on file" },
          ]}
        />
        <ArticleSection n={1} title="No matching reference.">
          <p>
            The reference you requested is not present in the Source Standard library index.{" "}
            <Link to="/education" className="text-primary underline-offset-4 hover:underline">
              Return to the Clinical Reference Library →
            </Link>
          </p>
        </ArticleSection>
        <ArticleFooter citation="Source Standard · Library · entry not found." />
      </>
    );
  }

  const related = (entry.lane === "series" ? librarySeries : libraryGuides)
    .filter((e) => e.slug !== entry.slug)
    .slice(0, 4);

  return (
    <>
      <ArticleHeader
        eyebrow={LANE_LABEL[entry.lane] ?? "Library entry"}
        title={entry.title}
        lead={entry.summary}
        metadata={[
          { label: "Updated", value: "04 / 21 / 2026" },
          { label: "Status", value: ENTRY_STATUS_LABEL[entry.status] },
          ...(entry.reviewedBy ? [{ label: "Reviewed by", value: entry.reviewedBy }] : []),
          { label: "Doc", value: entry.id },
        ]}
      />

      <ArticleSection n={1} title="In editorial review.">
        <p className="text-muted-foreground">
          The full text will be published once it has completed editorial and, where applicable, Medical Advisory Board review.
        </p>
        <p>
          <span className="text-foreground font-medium">Here's what it will cover · </span>
          {entry.summary}
        </p>
        <p className="text-[13px] font-mono text-muted-foreground">
          Reference ID · <span className="text-foreground">{entry.id}</span>
        </p>
      </ArticleSection>

      {related.length > 0 && (
        <ArticleSection n={2} title="Adjacent entries.">
          <p>Other entries published in the same lane.</p>
          <ul className="grid sm:grid-cols-2 gap-px bg-border border border-border my-2">
            {related.map((r, i) => (
              <li key={r.id} className="bg-background p-5">
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
        </ArticleSection>
      )}

      <ArticleFooter
        back={{ to: "/education", label: "Back to Clinical Reference Library" }}
        citation={`Source Standard · Library, ${entry.title}, ${entry.id}.`}
      />
    </>
  );
};

export default LibraryEntry;
