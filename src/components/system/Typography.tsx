import { ElementType, ReactNode } from "react";

/**
 * Eyebrow — utility-xs / eyebrow-sm caps label that sits above titles
 * and section headings. Two sizes only:
 *   size="xs"  → 12px (utility bars, metadata strips, tiny captions)
 *   size="sm"  → 13px (default; section eyebrows above headings)
 */
export const Eyebrow = ({
  children,
  size = "sm",
  as: Tag = "p",
  className = "",
}: {
  children: ReactNode;
  size?: "xs" | "sm";
  as?: ElementType;
  className?: string;
}) => (
  <Tag className={`${size === "xs" ? "t-utility-xs" : "t-eyebrow-sm"} text-muted-foreground ${className}`}>
    {children}
  </Tag>
);

/**
 * SectionHeading — H2 inside a page. Two sizes:
 *   size="sm" → 28/36
 *   size="md" → 32/40 (default)
 *
 * Honors the sitewide eyebrow→title spacing of 16px.
 */
export const SectionHeading = ({
  children,
  size = "md",
  as: Tag = "h2",
  id,
  className = "",
}: {
  children: ReactNode;
  size?: "sm" | "md";
  as?: "h2" | "h3";
  id?: string;
  className?: string;
}) => (
  <Tag
    id={id}
    className={`${size === "sm" ? "t-section-title-sm" : "t-section-title-md"} text-foreground ${className}`}
  >
    {children}
  </Tag>
);

/**
 * PageTitle — the locked H1 for every internal page (48/56 desktop).
 * The homepage uses `t-home-title` directly; article pages use ArticleHeader.
 */
export const PageTitle = ({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) => (
  <h1 id={id} className={`t-page-title text-foreground ${className}`}>
    {children}
  </h1>
);

/**
 * Lead — dek/subhead paragraph that follows a title. 18/30, muted.
 * Honors the sitewide title→dek spacing of 20px.
 */
export const Lead = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <p className={`t-body-md text-muted-foreground ${className}`}>{children}</p>
);
