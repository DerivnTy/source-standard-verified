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
      <div className="container-wide pt-6 pb-10 md:pb-12">
        {backHref && (
          <Link
            to={backHref}
            className="inline-flex items-center gap-1.5 text-[12.5px] text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" /> {backLabel ?? "Back"}
          </Link>
        )}
        <div className={backHref ? "mt-5" : ""}>
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="text-[1.25rem] md:text-[1.375rem] font-medium tracking-[-0.012em] text-foreground leading-[1.3] max-w-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-3 max-w-[56ch] text-[14.5px] text-muted-foreground leading-[1.6]">
              {description}
            </p>
          )}
          {children && <div className="mt-5">{children}</div>}
        </div>
      </div>
    </section>
  );
};
