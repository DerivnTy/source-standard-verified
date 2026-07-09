import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { GreenlistEntry } from "@/data/greenlist";

/**
 * GreenlistRow, Surgical Database Strip.
 *   Row 1: Facility Name (left) · Status (right; semantic color)
 *   Row 2: [Category Pill] · [Facility Type] · [Location] (left) · VIEW › (right)
 */

const locationFor = (e: GreenlistEntry): string | null => {
  if (e.state) return e.state.toUpperCase();
  return null;
};

type StatusVisual = { label: string; color: string; withDot: boolean };

const statusVisualFor = (entry: GreenlistEntry): StatusVisual => {
  if (entry.regulatoryAlert) {
    return { label: "Status Alert", color: "#FF3B30", withDot: false };
  }
  // At launch no entry has satisfied Greenlisted criteria, so remaining entries
  // are surfaced as Monitoring. When Greenlisted is introduced, add a check here.
  return { label: "Monitoring", color: "#F59E0B", withDot: true };
};

export const GreenlistRow = ({ entry, index = 0 }: { entry: GreenlistEntry; index?: number }) => {
  const location = locationFor(entry);
  const category = entry.category;
  const cadenceClass = `live-dot--cadence-${(index % 4) + 1}`;
  const status = statusVisualFor(entry);

  return (
    <Link
      to={`/greenlist/${entry.slug}`}
      aria-label={`${entry.name}, ${category}`}
      data-pill
      className="group block bg-card transition-all hover:bg-[hsl(var(--muted))]/40 active:scale-[0.99]"
      style={{
        border: "1px solid rgba(0,16,33,0.08)",
        borderRadius: "22px",
        padding: "12px 14px",
        minHeight: "74px",
      }}
    >
      <div className="flex flex-col" style={{ gap: "8px" }}>
        {/* Row 1, Name (left) · Status (right) */}
        <div className="flex items-start justify-between" style={{ gap: "12px" }}>
          <h3
            className="font-sans text-foreground truncate"
            style={{
              flex: 1,
              minWidth: 0,
              fontSize: "13px",
              fontWeight: 650,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
            }}
          >
            {entry.name}
          </h3>

          <span
            className="inline-flex items-center gap-1 font-sans uppercase tabular-nums"
            style={{
              flexShrink: 0,
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.035em",
              lineHeight: 1,
              color: status.color,
              transform: "translateY(2px)",
            }}
          >
            {status.withDot && (
              <span
                aria-hidden
                className={`inline-block rounded-full live-dot ${cadenceClass}`}
                style={{ width: "5px", height: "5px", backgroundColor: status.color }}
              />
            )}
            {status.label}
          </span>
        </div>

        {/* Row 2, Pill · Facility Type · Location (left) · View (right) */}
        <div className="flex items-center justify-between" style={{ gap: "12px" }}>
          <div
            className="min-w-0 flex items-center"
            style={{ gap: "8px", flex: 1, minWidth: 0 }}
          >
            <span
              className="inline-flex items-center font-sans uppercase whitespace-nowrap"
              style={{
                flexShrink: 0,
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.03em",
                padding: "4px 7px",
                borderRadius: "4px",
                background: "rgba(0,16,33,0.07)",
                color: "rgba(0,16,33,0.68)",
              }}
            >
              {category}
            </span>
            {entry.type && (
              <span
                className="text-muted-foreground truncate"
                style={{ minWidth: 0, fontSize: "11px", lineHeight: 1.35 }}
              >
                {entry.type}
              </span>
            )}
            {location && (
              <>
                <span
                  aria-hidden
                  className="text-muted-foreground/50"
                  style={{ fontSize: "11px", lineHeight: 1.35, flexShrink: 0 }}
                >
                  ·
                </span>
                <span
                  className="text-muted-foreground"
                  style={{ fontSize: "11px", lineHeight: 1.35, flexShrink: 0 }}
                >
                  {location}
                </span>
              </>
            )}
          </div>

          <span
            className="font-sans uppercase text-[hsl(var(--primary))] group-hover:opacity-80 transition-opacity"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              marginLeft: "auto",
              marginRight: "-2px",
              flexShrink: 0,
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.035em",
              lineHeight: 1,
            }}
          >
            View
            <ChevronRight
              aria-hidden
              style={{ width: "12px", height: "12px", strokeWidth: 1.5, marginRight: "-2px" }}
            />
          </span>
        </div>
      </div>
    </Link>
  );
};
