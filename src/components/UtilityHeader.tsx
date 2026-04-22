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
    <section className="border-b border-border/50 bg-background">
      <div className="container-wide pt-5 pb-10 md:pb-12">
        {backHref && (
          <Link
            to={backHref}
            className="inline-flex items-center gap-1.5 t-utility-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" /> {backLabel ?? "Back"}
          </Link>
        )}
        <div className={backHref ? "mt-4" : ""}>
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="title-page text-foreground max-w-3xl">{title}</h1>
          {description && (
            <p className="mt-3 max-w-[58ch] t-body-sm text-muted-foreground leading-[1.65]">
              {description}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </section>
  );
};
