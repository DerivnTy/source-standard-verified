import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { GreenlistEntry } from "@/data/greenlist";

/**
 * GreenlistRow — Surgical Database Strip.
 *   Row 1: Facility Name (left) · AUTHORIZED status (right)
 *   Row 2: [Category Pill (Navy)] + Registration ID (Geist Mono) (left) · VIEW › (right)
 */

const locationFor = (e: GreenlistEntry): string | null => {
  if (e.state) return e.state.toUpperCase();
  return null;
};

export const GreenlistRow = ({ entry }: { entry: GreenlistEntry }) => {
  const isAlert = !!entry.regulatoryAlert;
  const location = locationFor(entry);
  const category = entry.category;

  return (
    <Link
      to={`/greenlist/${entry.slug}`}
      aria-label={`${entry.name} — ${category}`}
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
        {/* Row 1 — Name (left) · Status (right) */}
        <div className="flex items-start justify-between" style={{ gap: "12px" }}>
          <h3
            className="font-sans text-foreground truncate"
            style={{
              flex: 1,
              minWidth: 0,
              fontSize: "15px",
              fontWeight: 650,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
            }}
          >
            {entry.name}
          </h3>

          {isAlert ? (
            <span
              className="font-sans uppercase tabular-nums"
              style={{
                flexShrink: 0,
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.035em",
                lineHeight: 1,
                color: "#FF3B30",
                transform: "translateY(2px)",
              }}
            >
              Status Alert
            </span>
          ) : (
            <span
              className="inline-flex items-center gap-1 font-sans uppercase tabular-nums"
              style={{
                flexShrink: 0,
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.035em",
                lineHeight: 1,
                color: "#34C759",
              }}
            >
              <span
                aria-hidden
                className="inline-block rounded-full"
                style={{ width: "5px", height: "5px", backgroundColor: "#34C759" }}
              />
              Recognized
            </span>
          )}
        </div>

        {/* Row 2 — Pill + location (left) · View (right) */}
        <div className="flex items-center justify-between" style={{ gap: "12px" }}>
          <div
            className="min-w-0"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}
          >
            <span
              className="inline-flex items-center font-sans uppercase whitespace-nowrap"
              style={{
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
            {location && (
              <span
                className="text-muted-foreground truncate"
                style={{ minWidth: 0, fontSize: "11px", lineHeight: 1.35 }}
              >
                {location}
              </span>
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
