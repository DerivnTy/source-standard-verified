import { type ReactNode } from "react";
import type { MetadataItem } from "./MetadataBar";

export interface BriefingHeroProps {
  category: string;
  docId: string;
  title: string;
  statement: string;
  metadata?: MetadataItem[];
  verifiedOn?: string;
  rationale?: string;
  rightRail?: ReactNode;
  tone?: "default" | "navy";
  variant?: "cover" | "chapter";
  brandMark?: string;
  heroLogo?: ReactNode;
  actions?: ReactNode;
  heroMetrics?: ReactNode;
  heroMeta?: ReactNode;
  eyebrow?: string;
  heroPadding?: { top?: string; bottom?: string };
  titleClassName?: string;
  statementClassName?: string;
  children?: ReactNode;
}

export const BriefingHero = ({
  title,
  statement,
  rationale,
  rightRail,
  tone = "default",
  variant = "chapter",
  brandMark,
  heroLogo,
  actions,
  heroMetrics,
  heroMeta,
  eyebrow,
  heroPadding,
  titleClassName = "",
  statementClassName = "",
  children,
}: BriefingHeroProps) => {
  const isNavy = tone === "navy";
  const isCover = variant === "cover";
  const padTop = heroPadding?.top ?? (isCover ? "72px" : "56px");
  const padBottom = heroPadding?.bottom ?? (isCover ? "72px" : "56px");

  return (
    <section
      aria-labelledby="briefing-title"
      className={
        isNavy
          ? "relative bg-[hsl(var(--navy-surface))]"
          : "relative border-b border-border bg-background"
      }
    >
      <div
        className="relative page-shell"
        style={{ paddingTop: padTop, paddingBottom: padBottom }}
      >
        <div className="flex w-full flex-col items-start text-left">
          {brandMark && <span className="sr-only">{brandMark}</span>}
          {heroLogo && <div style={{ marginBottom: "16px" }}>{heroLogo}</div>}

          {eyebrow && (
            <p
              className="t-eyebrow-sm"
              style={{
                color: isNavy ? "rgba(255,255,255,0.55)" : undefined,
                marginBottom: "14px",
              }}
            >
              {eyebrow}
            </p>
          )}

          {!heroMetrics && (
            <h1
              id="briefing-title"
              className={`ss-hero-title !mt-0 ${isNavy ? "!text-white" : "text-foreground"} ${titleClassName}`}
              style={{ color: isNavy ? "#ffffff" : undefined }}
            >
              {title}
            </h1>
          )}

          {heroMetrics}

          {statement && (
            <p
              className={`ss-lead ${statementClassName}`}
              style={{
                marginTop: heroMetrics ? "0" : "14px",
                color: isNavy ? "rgba(255,255,255,0.74)" : undefined,
              }}
            >
              {statement}
            </p>
          )}

          {rationale && (
            <div className="mt-6 w-full max-w-[40rem] border border-border p-4 text-left">
              <p className="t-eyebrow-sm text-muted-foreground mb-2">Rationale</p>
              <p className="t-body-md text-foreground">{rationale}</p>
            </div>
          )}

          {actions && (
            <div className="mt-6 flex w-full flex-wrap items-center gap-2">
              {actions}
            </div>
          )}

          {heroMeta && <div className="mt-5 w-full">{heroMeta}</div>}
          {children && <div className="mt-5 w-full">{children}</div>}
          {rightRail && <div className="mt-6 w-full">{rightRail}</div>}
        </div>
      </div>
    </section>
  );
};

export default BriefingHero;
