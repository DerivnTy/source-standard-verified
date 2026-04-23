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
      className="rounded-[2px] border border-border bg-card shadow-[0_8px_24px_-16px_hsl(0_0%_0%/0.18)] overflow-hidden"
    >
      <div
        className="grid divide-x divide-border"
        style={{ gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))` }}
      >
        {cells.map((cell) => (
          <div
            key={cell.label}
            className="flex flex-col items-center justify-center text-center px-1.5 sm:px-4 py-3 sm:py-3.5 min-w-0"
          >
            <span className="font-mono text-[18px] sm:text-[20px] leading-none font-medium tabular-nums text-foreground">
              {typeof cell.value === "number"
                ? cell.value.toLocaleString()
                : cell.value}
            </span>
            <span className="mt-1.5 text-[9px] sm:text-[10.5px] font-medium tracking-[0.01em] text-muted-foreground leading-[1.2] text-balance">
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
