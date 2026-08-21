import { Link } from "react-router-dom";
import { type ReactNode } from "react";

export const RegistryHeader = ({
  title,
  description,
  statusLine,
  scopeText,
  scopeHref,
  recordCount,
  updatedOn,
  hideRecordPill = false,
  children,
}: {
  eyebrow?: string;
  indexNumber?: string;
  title: string;
  description?: string;
  statusLine?: string;
  scopeText?: string;
  scopeHref?: string;
  recordCount: number;
  updatedOn?: string;
  hideRecordPill?: boolean;
  compact?: boolean;
  children?: ReactNode;
}) => {
  const updated =
    updatedOn ??
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

  return (
    <section className="relative bg-[hsl(var(--navy-surface))]">
      <div
        className="relative page-shell"
        style={{ paddingTop: "24px", paddingBottom: children ? "20px" : "22px" }}
      >
        <div className="mx-auto w-wide">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h1 className="ss-hero-title !text-white text-left !mt-0">
                {title}
              </h1>
              {statusLine ? (
                <p className="ss-eyebrow !text-white/70" style={{ marginTop: "8px" }}>
                  {statusLine}
                </p>
              ) : description ? (
                <p className="ss-lead !text-white/70" style={{ marginTop: "8px" }}>
                  {description}
                </p>
              ) : null}
              {scopeText && scopeHref && (
                <Link
                  to={scopeHref}
                  className="mt-2 inline-flex items-center gap-1 ss-body !text-white/70 hover:!text-white underline-offset-4 hover:underline"
                >
                  {scopeText} <span aria-hidden>→</span>
                </Link>
              )}
            </div>

            {!hideRecordPill && (
              <div className="shrink-0 text-left sm:text-right">
                <p className="t-utility-xs text-white/70">
                  <span className="text-white tabular-nums">{recordCount}</span>{" "}
                  indexed records
                </p>
                <p className="t-meta text-white/50" style={{ marginTop: "2px" }}>
                  Updated {updated}
                </p>
              </div>
            )}
          </div>
          {children && <div style={{ marginTop: "16px" }}>{children}</div>}
        </div>
      </div>
    </section>
  );
};
