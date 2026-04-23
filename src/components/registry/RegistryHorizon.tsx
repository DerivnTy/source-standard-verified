// Shared "Data Header" used directly under RegistryHeader on every database
// page (Verified Vendors, Greenlist, …). Width matches the registry table
// (page-shell > w-wide) so the row aligns perfectly with the search input
// and table columns below it.

export type HorizonCell = {
  label: string;
  value: string | number;
  /** When true, renders a small pulsing live dot before the value. */
  live?: boolean;
};

export const RegistryHorizon = ({
  cells,
  ariaLabel = "Registry data header",
}: {
  cells: HorizonCell[];
  ariaLabel?: string;
}) => {
  return (
    <div className="bg-background">
      <div className="page-shell">
        <div className="mx-auto w-wide">
          <div
            role="group"
            aria-label={ariaLabel}
            className="-mt-5 md:-mt-6 relative z-10 rounded-md border border-border bg-card shadow-sm overflow-hidden"
          >
            <div className="overflow-x-auto">
              <div
                className="grid min-w-[560px] sm:min-w-0 divide-x divide-border"
                style={{ gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))` }}
              >
                {cells.map((cell) => (
                  <div
                    key={cell.label}
                    className="flex flex-col items-start justify-center px-6 py-4 min-h-[76px]"
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground leading-none">
                      {cell.label}
                    </span>
                    <span className="mt-2.5 font-mono text-[18px] md:text-[19px] leading-none font-medium tabular-nums text-foreground inline-flex items-center gap-2 whitespace-nowrap">
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
        </div>
      </div>
    </div>
  );
};
