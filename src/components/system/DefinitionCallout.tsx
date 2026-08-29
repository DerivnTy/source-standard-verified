import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { getTermExplainer } from "@/data/termExplainers";
import { getGlossaryEntry } from "@/data/glossary";

/**
 * DefinitionCallout, the block-level term explainer.
 *
 * Pulls from the single term source of truth (src/data/termExplainers.ts,
 * falling back to the glossary) so a concept is described identically
 * everywhere it appears on the site. Always shows the limits of the term
 * when the source defines them.
 */
export const DefinitionCallout = ({
  term,
  title,
  means,
  doesNotMean,
  to,
  className = "",
}: {
  /** Key in termExplainers or glossary, e.g. "503b", "coa", "endotoxin". */
  term?: string;
  title?: string;
  means?: ReactNode;
  doesNotMean?: ReactNode;
  to?: string;
  className?: string;
}) => {
  const explainer = term ? getTermExplainer(term) : undefined;
  const glossary = !explainer && term ? getGlossaryEntry(term) : undefined;

  const heading = title ?? explainer?.term ?? glossary?.term ?? term;
  const body = means ?? explainer?.means ?? glossary?.definition;
  const limits = doesNotMean ?? explainer?.doesNotMean;
  const href = to ?? explainer?.to;

  if (!heading || !body) return null;

  return (
    <aside
      className={`border border-border rounded-[2px] bg-surface-muted/40 px-4 py-3.5 ${className}`}
      aria-label={`Definition: ${heading}`}
    >
      <p className="t-utility-xs text-muted-foreground">Definition</p>
      <p
        className="text-foreground"
        style={{ fontSize: "15px", lineHeight: 1.45, fontWeight: 600, margin: "6px 0 0" }}
      >
        {heading}
      </p>
      <p className="text-foreground" style={{ fontSize: "15px", lineHeight: 1.6, margin: "6px 0 0" }}>
        {body}
      </p>
      {limits && (
        <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.6, margin: "8px 0 0" }}>
          <span className="text-foreground" style={{ fontWeight: 600 }}>
            What it does not mean:{" "}
          </span>
          {limits}
        </p>
      )}
      {href && (
        <Link
          to={href}
          className="inline-block mt-3 t-utility-xs text-foreground underline underline-offset-4 hover:text-primary"
        >
          Read more
        </Link>
      )}
    </aside>
  );
};
