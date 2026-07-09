import { ReactNode } from "react";

/**
 * PageShell, the canonical outer container for every page in the
 * sitewide design system.
 *
 * Locks horizontal gutters to the spec:
 *   desktop 48px · tablet 32px · mobile 20px
 * Locks max page width to 1440px.
 *
 * Inside a PageShell, content widths come from the `width-*` token
 * classes (.w-standard.w-wide.w-reading-wide, etc.) applied to a
 * child wrapper. PageShell itself never sets content max-width.
 */
export const PageShell = ({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "main" | "article";
}) => (
  <Tag className={`mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-12 ${className}`}>
    {children}
  </Tag>
);
