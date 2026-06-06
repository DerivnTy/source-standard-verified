import { ReactNode } from "react";

export type SummaryCell = {
  label: string;
  value: number;
  /** Tailwind class for the 2px tick swatch, e.g. "bg-[hsl(var(--src-503b))]". */
  tickClassName: string;
  /** Optional denominator for the share bar. If omitted, no bar renders. */
  shareOf?: number;
  /** Optional emphasis: destructive cell tint for "not recognized". */
  tone?: "default" | "destructive";
};

/**
 * RegistrySummaryStrip — six-cell live summary row for registry surfaces.
 * Mono numerals at the locked 20/28 weight-500. Each cell shows a 2px tick,
 * a utility-xs label, the value, and a thin share bar showing % of total.
 *
 * Sits flush under the RegistryHeader (no section gap).
 */
export const RegistrySummaryStrip = ({
  cells,
  caption,
}: {
  cells: SummaryCell[];
  caption?: ReactNode;
}) => {
  return (
    <section className="bg-background border-b border-border">
      <div className="page-shell pt-10 md:pt-14 pb-10 md:pb-12">
        <div className="mx-auto w-wide">
          <div className="grid grid-cols-2 md:grid-cols-6 md:divide-x md:divide-border/60">
            {cells.map((cell) => {
              const pct =
                cell.shareOf && cell.shareOf > 0
                  ? Math.max(2, Math.round((cell.value / cell.shareOf) * 100))
                  : null;
              const isDestructive = cell.tone === "destructive";
              return (
                <div
                  key={cell.label}
                  className="px-4 md:px-6 py-5 md:py-6 first:md:pl-0 last:md:pr-0 min-h-[124px] flex flex-col"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <span
                      aria-hidden
                      className={`inline-block w-[2px] h-[12px] ${cell.tickClassName}`}
                    />
                    <span className="t-label-sm text-muted-foreground">
                      {cell.label}
                    </span>
                  </div>
                  <div
                    className={`font-mono text-[20px] leading-[28px] font-medium tabular-nums mt-auto ${
                      isDestructive ? "text-destructive" : "text-foreground"
                    }`}
                  >
                    {cell.value.toLocaleString()}
                  </div>
                  {pct !== null && (
                    <div
                      className="mt-3 h-[2px] w-full bg-border/50 overflow-hidden"
                      aria-hidden
                    >
                      <div
                        className={`h-full ${cell.tickClassName} transition-all duration-300 ease-out`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {caption && (
            <p className="mt-7 t-body-sm text-muted-foreground max-w-[78ch] leading-[1.6]">
              {caption}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
