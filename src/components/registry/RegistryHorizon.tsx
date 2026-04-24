// Compact "Trust Pill" used directly under RegistryHeader on registry pages.
// One single-line, sharp pill (2px radius) divided into 3 equal columns.
// No horizontal scroll on any viewport — metrics shrink to fit.

export type HorizonCell = {
  label: string;
  value: string | number;
  /** Reserved for future use; not rendered in the compact pill. */
  live?: boolean;
};

export const RegistryHorizon = ({
  cells,
  ariaLabel = "Registry summary",
  seam = false,
}: {
  cells: HorizonCell[];
  ariaLabel?: string;
  /** When true, sits on the navy↔white seam (top half navy, bottom half white). */
  seam?: boolean;
}) => {
  const Pill = (
    <div
      role="group"
      aria-label={ariaLabel}
      className="overflow-hidden bg-background"
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(0,16,33,0.08)",
      }}
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))`,
        }}
      >
        {cells.map((cell, idx) => (
          <div
            key={cell.label}
            className="flex flex-col items-center justify-center text-center min-w-0"
            style={{
              padding: "22px 12px",
              borderLeft: idx === 0 ? "none" : "1px solid rgba(0,16,33,0.06)",
            }}
          >
            <span
              className="font-sans tabular-nums"
              style={{
                fontSize: "36px",
                lineHeight: 1,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "#001021",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {typeof cell.value === "number"
                ? cell.value.toLocaleString("en-US")
                : cell.value}
            </span>
            <span
              style={{
                marginTop: "10px",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                lineHeight: 1.2,
                color: "rgba(0,16,33,0.55)",
              }}
            >
              {cell.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  if (seam) {
    return (
      <div className="relative">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--navy-surface)) 50%, hsl(var(--background)) 50%)",
          }}
        />
        <div className="relative page-shell">
          <div className="mx-auto w-wide">{Pill}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="page-shell">
        <div className="mx-auto w-wide -mt-5 md:-mt-6 relative z-10">
          {Pill}
        </div>
      </div>
    </div>
  );
};
