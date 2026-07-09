import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { StatusPill, type StatusKey } from "./StatusPill";

/**
 * RegistryRow — the standard row for indexed records.
 *
 * Name-first hierarchy. The record name is the visual anchor; status pill sits
 * on the top-right; supporting meta reads on the second line; the category chip
 * (if provided) is tertiary context on a third line. On desktop the row
 * collapses into a denser single-line ledger, but name still leads.
 *
 * Layout (mobile):
 *   Row 1: Name (truncate) ······················· StatusPill   ›
 *   Row 2: metaLeft (muted, "Type · Location")
 *   Row 3: chip (small muted pill), optional
 *
 * Layout (md+):
 *   [Name (flex, truncate)] [metaLeft (muted)] [chip] [StatusPill] [›]
 *
 * The parent list should render <ul className="divide-y divide-border/60"> so
 * successive rows read as one continuous ledger.
 */
export const RegistryRow = ({
  to,
  name,
  status,
  chip,
  metaLeft,
  metaRight,
  ariaLabel,
}: {
  to: string;
  name: string;
  status: StatusKey;
  chip?: string;
  metaLeft?: ReactNode;
  /** Optional trailing meta; rendered only on md+ to keep mobile uncluttered. */
  metaRight?: ReactNode;
  ariaLabel?: string;
}) => {
  const chipEl = chip ? (
    <span
      className="inline-flex items-center font-sans uppercase whitespace-nowrap shrink-0"
      style={{
        fontSize: "10px",
        fontWeight: 600,
        letterSpacing: "0.04em",
        padding: "3px 7px",
        borderRadius: "4px",
        background: "hsl(var(--foreground) / 0.06)",
        color: "hsl(var(--foreground) / 0.72)",
        lineHeight: 1,
      }}
    >
      {chip}
    </span>
  ) : null;

  return (
    <Link
      to={to}
      aria-label={ariaLabel ?? name}
      className="group block px-2 md:px-3 py-4 md:py-3.5 -mx-2 md:-mx-3 rounded-md transition-colors hover:bg-[hsl(var(--muted))]/40 active:scale-[0.998] focus-visible:outline-none focus-visible:bg-[hsl(var(--muted))]/40"
      style={{ minHeight: "44px" }}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          {/* MOBILE: stacked name / meta / chip */}
          <div className="md:hidden">
            <div className="flex items-baseline justify-between gap-3">
              <h3
                className="font-sans text-foreground truncate min-w-0"
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  lineHeight: 1.25,
                  letterSpacing: "-0.01em",
                }}
              >
                {name}
              </h3>
              <div className="shrink-0">
                <StatusPill status={status} />
              </div>
            </div>
            {metaLeft && (
              <div
                className="mt-1 text-muted-foreground truncate"
                style={{ fontSize: "12.5px", lineHeight: 1.4 }}
              >
                {metaLeft}
              </div>
            )}
            {chipEl && <div className="mt-2">{chipEl}</div>}
          </div>

          {/* DESKTOP: single-line ledger */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <h3
              className="font-sans text-foreground truncate min-w-0 flex-1"
              style={{
                fontSize: "14.5px",
                fontWeight: 600,
                lineHeight: 1.25,
                letterSpacing: "-0.01em",
              }}
            >
              {name}
            </h3>
            {metaLeft && (
              <span
                className="shrink-0 text-muted-foreground truncate max-w-[38%]"
                style={{ fontSize: "12.5px", lineHeight: 1.35 }}
              >
                {metaLeft}
              </span>
            )}
            {metaRight && (
              <span
                className="shrink-0 font-mono tabular-nums text-muted-foreground"
                style={{ fontSize: "11px" }}
              >
                {metaRight}
              </span>
            )}
            {chipEl}
            <div className="shrink-0">
              <StatusPill status={status} />
            </div>
          </div>
        </div>

        <ChevronRight
          aria-hidden
          className="shrink-0 self-center text-muted-foreground/60 transition-transform duration-200 group-hover:translate-x-[3px] group-hover:text-foreground"
          style={{ width: 14, height: 14, strokeWidth: 1.5 }}
        />
      </div>
    </Link>
  );
};

export default RegistryRow;
