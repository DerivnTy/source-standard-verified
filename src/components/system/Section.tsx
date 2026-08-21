import { ReactNode } from "react";
import { PageShell } from "./PageShell";

type Surface = "background" | "muted" | "sunken";
type Width = "standard" | "wide" | "reading" | "reading-wide" | "hero" | "two-col";

const SURFACE: Record<Surface, string> = {
  background: "bg-background",
  muted: "bg-surface-muted",
  sunken: "bg-surface-sunken",
};

const WIDTH: Record<Width, string> = {
  standard: "w-standard",
  wide: "w-wide",
  reading: "w-reading",
  "reading-wide": "w-reading-wide",
  hero: "w-hero",
  "two-col": "w-two-col",
};

/**
 * Section, canonical page section primitive.
 *
 * - Applies the sitewide vertical rhythm (.section-pad).
 * - Composes PageShell for horizontal gutters.
 * - Constrains content to a chosen width token (default: standard 1120px).
 * - Optional bordered top hairline for visual separation between sections.
 */
export const Section = ({
  children,
  surface = "background",
  width = "standard",
  bordered = true,
  id,
  className = "",
  contentClassName = "",
  ariaLabelledby,
}: {
  children: ReactNode;
  surface?: Surface;
  width?: Width;
  bordered?: boolean;
  id?: string;
  className?: string;
  contentClassName?: string;
  ariaLabelledby?: string;
}) => (
  <section
    id={id}
    aria-labelledby={ariaLabelledby}
    className={`${SURFACE[surface]} ${bordered ? "border-b border-border" : ""} ${className}`}
  >
    <PageShell className="section-pad">
      <div className={`mx-auto w-full ${WIDTH[width]} ${contentClassName}`}>{children}</div>
    </PageShell>
  </section>
);

/**
 * ReadingColumn, locked editorial measure (820px) used for long-form prose
 * inside Library articles, analyses, and education guides. Never widens past
 * the comfortable ~70-character measure.
 */
export const ReadingColumn = ({
  children,
  className = "",
  width = "reading-wide",
}: {
  children: ReactNode;
  className?: string;
  width?: "reading" | "reading-wide";
}) => (
  <div className={`mx-auto w-full ${width === "reading" ? "w-reading" : "w-reading-wide"} ${className}`}>
    {children}
  </div>
);
