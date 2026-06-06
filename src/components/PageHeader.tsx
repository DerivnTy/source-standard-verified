import { ReactNode } from "react";

/**
 * PageHeader — Source Standard institutional page intro band.
 * Uses the Home-page typography system (ss-section-title + ss-lead)
 * so every page reads with the same hierarchy.
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
  <section className="border-b border-border bg-background ss-section">
    <div className="page-shell">
      <div className="mx-auto w-standard">
        {eyebrow && <p className="ss-eyebrow">{eyebrow}</p>}
        <h1 className="ss-section-title text-foreground max-w-[36ch]">{title}</h1>
        {description && (
          <p className="ss-lead max-w-[68ch]">{description}</p>
        )}
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  </section>
);
