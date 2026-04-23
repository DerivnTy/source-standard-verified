import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { GreenlistEntry } from "@/data/greenlist";

/**
 * GreenlistRow — Surgical Database Strip.
 *   Row 1: Facility Name (left) · AUTHORIZED status (right)
 *   Row 2: [Category Pill (Navy)] + Registration ID (Geist Mono) (left) · VIEW › (right)
 */

const registrationFor = (e: GreenlistEntry): string | null => {
  if (e.profile?.fdaRegistration) return e.profile.fdaRegistration;
  if (e.profile?.feiNumber) return `FEI ${e.profile.feiNumber}`;
  if (e.state) return e.state.toUpperCase();
  return null;
};

export const GreenlistRow = ({ entry }: { entry: GreenlistEntry }) => {
  const isAlert = !!entry.regulatoryAlert;
  const registration = registrationFor(entry);
  const category = entry.category;

  return (
    <Link
      to={`/greenlist/${entry.slug}`}
      aria-label={`${entry.name} — ${category}`}
      data-pill
      className="group block bg-card transition-all hover:bg-[hsl(var(--muted))]/40 active:scale-[0.97]"
      style={{
        border: "0.5px solid hsl(var(--border))",
        borderRadius: "20px",
        padding: "10px 12px",
      }}
    >
      <div className="flex flex-col" style={{ rowGap: "2px" }}>
        {/* Row 1 — Name (left) · Status (right) */}
        <div className="flex items-start justify-between gap-x-3">
          <h3
            className="min-w-0 truncate font-sans font-semibold text-foreground"
            style={{
              fontSize: "14px",
              lineHeight: "1.3",
              letterSpacing: "-0.01em",
            }}
          >
            {entry.name}
          </h3>

          {isAlert ? (
            <span
              className="shrink-0 font-sans font-bold uppercase tabular-nums"
              style={{
                fontSize: "10px",
                letterSpacing: "0.08em",
                color: "#FF3B30",
              }}
            >
              Alert
            </span>
          ) : (
            <span
              className="shrink-0 inline-flex items-center gap-1 font-sans font-bold uppercase tabular-nums"
              style={{
                fontSize: "10px",
                letterSpacing: "0.08em",
                color: "hsl(142 70% 32%)",
              }}
            >
              <span
                aria-hidden
                className="inline-block rounded-full"
                style={{ width: "4px", height: "4px", backgroundColor: "#34C759" }}
              />
              Authorized
            </span>
          )}
        </div>

        {/* Row 2 — Category pill + Registration (left) · VIEW › (right) */}
        <div className="flex items-center justify-between gap-x-3">
          <div className="flex items-center gap-x-2 min-w-0">
            <span
              className="shrink-0 inline-flex items-center font-sans font-semibold uppercase bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] whitespace-nowrap"
              style={{
                fontSize: "9px",
                letterSpacing: "0.06em",
                padding: "2px 5px",
                borderRadius: "3px",
              }}
            >
              {category}
            </span>
            {registration && (
              <span
                className="min-w-0 truncate font-mono text-muted-foreground"
                style={{ fontSize: "11px", lineHeight: "1.35" }}
              >
                {registration}
              </span>
            )}
          </div>

          <span
            className="shrink-0 inline-flex items-center gap-0.5 font-sans font-bold uppercase text-[hsl(var(--primary))] group-hover:opacity-80 transition-opacity"
            style={{ fontSize: "10px", letterSpacing: "0.06em" }}
          >
            View
            <ChevronRight
              aria-hidden
              style={{ width: "11px", height: "11px", strokeWidth: 1.5 }}
            />
          </span>
        </div>
      </div>
    </Link>
  );
};
