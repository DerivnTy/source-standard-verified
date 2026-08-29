import { ReactNode } from "react";
import { Link } from "react-router-dom";

/**
 * MethodologyNote, the "what this does and does not mean" module.
 *
 * Used anywhere a status, score, registration, or test result appears.
 * The negative statement is mandatory: readers must always be told the
 * limits of what Source Standard has established.
 */
export const MethodologyNote = ({
  means,
  doesNotMean,
  to,
  linkLabel = "Read the methodology",
  className = "",
}: {
  means: ReactNode;
  doesNotMean: ReactNode;
  to?: string;
  linkLabel?: string;
  className?: string;
}) => (
  <div className={`border-l-2 border-primary/50 bg-surface-muted/50 px-4 py-3.5 ${className}`}>
    <p className="t-utility-xs text-muted-foreground">What this means</p>
    <p className="mt-1.5 text-foreground" style={{ fontSize: "15px", lineHeight: 1.6, margin: "6px 0 0" }}>
      {means}
    </p>
    <p className="t-utility-xs text-muted-foreground" style={{ marginTop: "14px" }}>
      What this does not mean
    </p>
    <p className="mt-1.5 text-muted-foreground" style={{ fontSize: "15px", lineHeight: 1.6, margin: "6px 0 0" }}>
      {doesNotMean}
    </p>
    {to && (
      <Link
        to={to}
        className="inline-block mt-3 t-utility-xs text-foreground underline underline-offset-4 hover:text-primary"
      >
        {linkLabel}
      </Link>
    )}
  </div>
);
