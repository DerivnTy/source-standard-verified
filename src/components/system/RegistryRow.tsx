import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { StatusPill, type StatusKey } from "./StatusPill";

/**
 * RegistryRow — the standard row for indexed records.
 *
 * Replaces per-item bordered card chrome with hairline dividers between
 * siblings. Dense on purpose: status, name, and meta must all remain
 * immediately visible.
 *
 * Layout:
 *   Row 1: [category chip?]  Name (truncate)  ······  StatusPill  ›
 *   Row 2: metaLeft (muted)  ······  metaRight (muted, optional)
 *
 * The parent list should render <ul className="divide-y divide-border/60">
 * so successive rows read as one continuous ledger.
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
  metaRight?: ReactNode;
  ariaLabel?: string;
}) => (
  <Link
    to={to}
    aria-label={ariaLabel ?? name}
    className="group block px-2 md:px-3 py-3 md:py-3.5 -mx-2 md:-mx-3 rounded-md transition-colors hover:bg-[hsl(var(--muted))]/40 active:scale-[0.998] focus-visible:outline-none focus-visible:bg-[hsl(var(--muted))]/40"
  >
    <div className="flex items-start gap-3">
      {chip && (
        <span
          className="shrink-0 inline-flex items-center font-sans uppercase whitespace-nowrap"
          style={{
            marginTop: "1px",
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
      )}

      <div className="min-w-0 flex-1">
        <h3
          className="font-sans text-foreground truncate"
          style={{
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
          }}
        >
          {name}
        </h3>
        {(metaLeft || metaRight) && (
          <div
            className="mt-1 flex items-center justify-between gap-3 text-muted-foreground"
            style={{ fontSize: "12px", lineHeight: 1.35 }}
          >
            <span className="min-w-0 truncate">{metaLeft}</span>
            {metaRight && (
              <span
                className="shrink-0 font-mono tabular-nums"
                style={{ fontSize: "11px" }}
              >
                {metaRight}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="shrink-0 flex items-center gap-2" style={{ marginTop: "1px" }}>
        <StatusPill status={status} />
        <ChevronRight
          aria-hidden
          className="text-muted-foreground/70 transition-transform duration-200 group-hover:translate-x-[3px] group-hover:text-foreground"
          style={{ width: 14, height: 14, strokeWidth: 1.5 }}
        />
      </div>
    </div>
  </Link>
);

export default RegistryRow;
