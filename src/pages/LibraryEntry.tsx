import { Link, useParams } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import {
  findLibraryEntry,
  libraryGuides,
  librarySeries,
  type Lane,
  type LibraryEntry,
} from "@/data/library";

const LANE_EYEBROW: Record<Lane, string> = {
  series: "The Basics",
  guide: "Practical Guide",
  faq: "Common Question",
  supplementary: "Reference",
};

const backLinkFor = (entry: LibraryEntry): { to: string; label: string } => {
  if (entry.lane === "guide") return { to: "/education/guides", label: "← Back to Practical Guides" };
  if (entry.lane === "series") return { to: "/education/basics", label: "← Back to The Basics" };
  return { to: "/education", label: "← Back to Learn" };
};

const LibraryEntryPage = () => {
  const { slug = "" } = useParams();
  const entry = findLibraryEntry(slug);

  if (!entry) {
    return (
      <Section>
        <Link
          to="/education"
          className="text-[13px] text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border"
        >
          ← Back to Learn
        </Link>
        <div className="mt-8 max-w-2xl">
          <h1 className="text-[1.5rem] font-semibold text-foreground">
            We couldn't find that article.
          </h1>
          <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed">
            It may have moved or been renamed.{" "}
            <Link to="/education" className="text-foreground underline underline-offset-4 decoration-border">
              Head back to Learn
            </Link>{" "}
            to find what you're looking for.
          </p>
        </div>
      </Section>
    );
  }

  const back = backLinkFor(entry);
  const sameLanePool = entry.lane === "guide" ? libraryGuides : librarySeries;
  const related = sameLanePool.filter((e) => e.slug !== entry.slug).slice(0, 3);

  return (
    <>
      <div className="container-wide pt-8">
        <Link
          to={back.to}
          className="text-[13px] text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border"
        >
          {back.label}
        </Link>
      </div>

      <PageHeader
        eyebrow={LANE_EYEBROW[entry.lane]}
        title={entry.title}
        description={entry.summary}
      >
        {entry.reviewedBy && (
          <p className="text-[13px] text-muted-foreground">
            Reviewed by {entry.reviewedBy}
          </p>
        )}
      </PageHeader>

      <Section>
        <article className="max-w-2xl">
          <h2 className="text-[1.125rem] font-semibold text-foreground">
            This article is coming soon.
          </h2>
          <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed">
            We're still writing it. Here's what it will cover:
          </p>
          <p className="mt-3 text-[15px] text-foreground leading-relaxed">
            {entry.summary}
          </p>
          <p className="mt-5 text-[15px] text-muted-foreground leading-relaxed">
            In the meantime, you can browse other reads below or head back to Learn.
          </p>
        </article>

        {related.length > 0 && (
          <div className="mt-16 max-w-2xl">
            <h2 className="text-[1.125rem] font-semibold text-foreground">Keep reading</h2>
            <ul className="mt-5 border-t border-border/60 divide-y divide-border/60">
              {related.map((r) => (
                <li key={r.id} className="py-4">
                  <Link
                    to={`/education/${r.slug}`}
                    className="group block"
                  >
                    <p className="text-[15px] text-foreground group-hover:underline underline-offset-4 decoration-border">
                      {r.title} →
                    </p>
                    <p className="mt-1 text-[13.5px] text-muted-foreground leading-relaxed">
                      {r.summary}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-16">
          <Link
            to="/education"
            className="text-[13px] text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border"
          >
            Browse all of Learn →
          </Link>
        </div>
      </Section>
    </>
  );
};

export default LibraryEntryPage;
