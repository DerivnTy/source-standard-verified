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
  const isDense = !isNavy && Boolean(rightRail);
  const padTop = heroPadding?.top ?? (isCover ? "28px" : "24px");
  const padBottom = heroPadding?.bottom ?? (isCover ? "32px" : "26px");

  if (isNavy) {
    return (
      <section
        aria-labelledby="briefing-title"
        className="relative bg-[hsl(var(--navy-surface))]"
      >
        <div
          className="relative page-shell"
          style={{ paddingTop: padTop, paddingBottom: padBottom }}
        >
          <div className={`mx-auto w-wide ${isCover ? "flex flex-col items-center text-center" : ""}`}>
            {brandMark && <span className="sr-only">{brandMark}</span>}
            {heroLogo && (
              <div className="flex justify-center" style={{ marginBottom: "12px" }}>
                {heroLogo}
              </div>
            )}

            {eyebrow && (
              <p
                className="t-eyebrow-sm"
                style={{ color: "rgba(255,255,255,0.5)", marginBottom: "8px" }}
              >
                {eyebrow}
              </p>
            )}

            {!heroMetrics && (
              <h1
                id="briefing-title"
                className={`ss-hero-title !text-white !mt-0 ${isCover ? "text-center" : ""} ${titleClassName}`}
                style={{ textWrap: "balance" }}
              >
                {title}
              </h1>
            )}

            {heroMetrics}

            {statement && (
              <p
                className={`ss-lead !text-white/70 ${isCover ? "mx-auto" : ""} ${statementClassName}`}
                style={{
                  marginTop: heroMetrics ? "0" : "10px",
                  textWrap: "balance",
                }}
              >
                {statement}
              </p>
            )}

            {actions && (
              <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                {actions}
              </div>
            )}

            {heroMeta && <div className="mt-4">{heroMeta}</div>}
            {children && <div className="mt-4 w-full">{children}</div>}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="briefing-title"
      className="relative border-b border-border bg-background"
    >
      {isDense ? (
        <div className="relative page-shell" style={{ paddingTop: padTop, paddingBottom: padBottom }}>
          <div className="grid grid-cols-12 gap-6 md:gap-10 w-full">
            <div className="col-span-12 md:col-span-7">
              <h1 id="briefing-title" className="ss-hero-title text-foreground !mt-0">
                {title}
              </h1>
              <p className="ss-lead" style={{ marginTop: "10px" }}>
                {statement}
              </p>
              {rationale && (
                <div className="mt-5 max-w-[68ch] border border-border p-4">
                  <p className="t-eyebrow-sm text-muted-foreground mb-2">Rationale</p>
                  <p className="t-body-md text-foreground">{rationale}</p>
                </div>
              )}
            </div>
            <div className="col-span-12 md:col-span-5">{rightRail}</div>
          </div>
        </div>
      ) : (
        <div className="relative page-shell" style={{ paddingTop: padTop, paddingBottom: padBottom }}>
          <div className="mx-auto w-wide">
            <h1 id="briefing-title" className="ss-hero-title text-foreground !mt-0">
              {title}
            </h1>
            <p className="ss-lead" style={{ marginTop: "10px" }}>
              {statement}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default BriefingHero;
