// Shared full-bleed "Data Horizon" stats bar used directly below
// RegistryHeader on every database page (Verified Vendors, Greenlist, …).
// Single component → visual singularity across the registry surface.

export type HorizonCell = {
  label: string;
  value: string | number;
  /** When true, renders a small pulsing live dot before the value. */
  live?: boolean;
};

export const RegistryHorizon = ({
  cells,
  ariaLabel = "Live registry data horizon",
}: {
  cells: HorizonCell[];
  ariaLabel?: string;
}) => {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="w-full border-y border-border/70 bg-surface-muted/40 backdrop-blur-[2px]"
    >
      <div className="overflow-x-auto">
        <div
          className="grid min-w-[560px] sm:min-w-0 divide-x divide-border/60"
          style={{ gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))` }}
        >
          {cells.map((cell) => (
            <div
              key={cell.label}
              className="flex flex-col items-start justify-center px-5 md:px-7 py-6 min-h-[96px]"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground leading-none">
                {cell.label}
              </span>
              <span className="mt-3 font-mono text-[18px] md:text-[20px] leading-none font-medium tabular-nums text-foreground inline-flex items-center gap-2 whitespace-nowrap">
                {cell.live && (
                  <span
                    aria-hidden
                    className="inline-block w-1.5 h-1.5 rounded-full bg-verified animate-pulse"
                  />
                )}
                {typeof cell.value === "number" ? cell.value.toLocaleString() : cell.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
