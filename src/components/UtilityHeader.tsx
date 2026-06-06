import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/**
 * UtilityHeader — Tier 4, used on forms, sub-indexes, and short utility pages
 * (Apply, Contact, Report a Concern form, NotFound, Education sub-indexes).
 *
 * Lightweight: small eyebrow, body-large title (no oversized H1),
 * one-line supporting copy. No MetadataBar, no summary rail.
 */
export const UtilityHeader = ({
  backHref,
  backLabel,
  eyebrow,
  title,
  description,
  children,
}: {
  backHref?: string;
  backLabel?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) => {
  return (
    <section className="border-b border-border bg-background ss-section">
      <div className="container-wide">
        {backHref && (
          <Link
            to={backHref}
            className="inline-flex items-center gap-1.5 ss-eyebrow hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" /> {backLabel ?? "Back"}
          </Link>
        )}
        <div className={backHref ? "mt-3" : ""}>
          {eyebrow && <p className="ss-eyebrow">{eyebrow}</p>}
          <h1 className="ss-section-title text-foreground max-w-3xl">{title}</h1>
          {description && (
            <p className="ss-lead max-w-[58ch]">{description}</p>
          )}
          {children && <div className="mt-4">{children}</div>}
        </div>
      </div>
    </section>
  );
};
