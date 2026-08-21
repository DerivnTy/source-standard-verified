import { ReactNode } from "react";

/**
 * Stat, registry/summary cell. Label uses utility-xs caps; value is the
 * locked 20/28 weight-500 numeric. Min-height 120px per the section
 * template spec; numbers stay disciplined (no oversized hero numerals).
 */
export const Stat = ({
  label,
  value,
  tickClassName,
}: {
  label: ReactNode;
  value: ReactNode;
  /** Optional left tick swatch (e.g., "bg-verified"). */
  tickClassName?: string;
}) => (
  <div className="px-0 md:px-5 py-4 first:md:pl-0 last:md:pr-0 min-h-[120px] flex flex-col">
    <div className="flex items-center gap-2 mb-2">
      {tickClassName && (
        <span aria-hidden className={`inline-block w-[2px] h-[10px] ${tickClassName}`} />
      )}
      <span className="t-utility-xs text-muted-foreground">{label}</span>
    </div>
    <div className="font-mono text-[18px] leading-[28px] font-medium tabular-nums text-foreground mt-auto">
      {value}
    </div>
  </div>
);

/**
 * StatRow, six-cell registry summary row per the section template.
 * Children are typically <Stat> elements.
 */
export const StatRow = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-2 md:grid-cols-6 border-t border-border/60 md:divide-x md:divide-border/60">
    {children}
  </div>
);
