import { ReactNode } from "react";
import { Eyebrow, PageTitle, Lead } from "@/components/system";

/**
 * PageHeader — token-aligned page intro band.
 *
 * Uses the canonical PageTitle (48/56) + Lead (18/30) + Eyebrow tokens.
 * Sits inside `container-wide` for backwards compatibility with any
 * remaining caller; new pages should compose `system/Section` directly.
 */
export const PageHeader = ({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) => (
  <section className="border-b border-border bg-background">
    <div className="page-shell section-pad">
      <div className="mx-auto w-standard">
        {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
        <PageTitle className="max-w-[26ch]">{title}</PageTitle>
        {description && <Lead className="mt-5 max-w-[68ch]">{description}</Lead>}
        {children && <div className="mt-7">{children}</div>}
      </div>
    </div>
  </section>
);
