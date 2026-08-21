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
        style={{ paddingTop: "48px", paddingBottom: children ? "36px" : "48px" }}
      >
        <div className="mx-auto flex w-reading flex-col items-center text-center">
          <h1 className="ss-hero-title !mt-0" style={{ color: "#ffffff", textWrap: "balance" }}>
            {title}
          </h1>
          {statusLine ? (
            <p className="ss-eyebrow" style={{ marginTop: "12px", color: "rgba(255,255,255,0.7)" }}>
              {statusLine}
            </p>
          ) : description ? (
            <p className="ss-lead" style={{ marginTop: "14px", color: "rgba(255,255,255,0.74)", textWrap: "balance" }}>
              {description}
            </p>
          ) : null}
          {scopeText && scopeHref && (
            <Link
              to={scopeHref}
              className="mt-3 inline-flex items-center gap-1 underline-offset-4 hover:underline"
              style={{ color: "rgba(255,255,255,0.74)" }}
            >
              {scopeText} <span aria-hidden>→</span>
            </Link>
          )}
          {!hideRecordPill && (
            <p className="t-utility-xs" style={{ marginTop: "14px", color: "rgba(255,255,255,0.62)" }}>
              <span className="tabular-nums" style={{ color: "#ffffff" }}>{recordCount}</span>
              {" "}indexed records
              <span style={{ color: "rgba(255,255,255,0.4)" }}> · </span>
              Updated {updated}
            </p>
          )}
          {children && <div className="w-full" style={{ marginTop: "20px" }}>{children}</div>}
        </div>
      </div>
    </section>
  );
};
