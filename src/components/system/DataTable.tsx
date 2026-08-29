import { ReactNode } from "react";

export type DataColumn<T> = {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  /** Hide this column from the mobile stacked view. */
  hideOnMobile?: boolean;
};

/**
 * DataTable, the institutional table primitive.
 *
 * Renders a real <table> on desktop and converts to labelled record
 * blocks on mobile, so tabular data never causes horizontal overflow
 * on an iPhone.
 */
export function DataTable<T>({
  columns,
  rows,
  rowKey,
  caption,
  emptyLabel = "No records available.",
  className = "",
}: {
  columns: DataColumn<T>[];
  rows: T[];
  rowKey: (row: T, index: number) => string;
  caption?: string;
  emptyLabel?: string;
  className?: string;
}) {
  if (!rows.length) {
    return (
      <p className={`text-muted-foreground ${className}`} style={{ fontSize: "14px", lineHeight: 1.6 }}>
        {emptyLabel}
      </p>
    );
  }

  return (
    <div className={className}>
      {/* Desktop */}
      <div className="hidden md:block border border-border rounded-[2px] overflow-hidden">
        <table className="w-full border-collapse">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead>
            <tr className="bg-surface-muted/60">
              {columns.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  className="t-utility-xs text-muted-foreground text-left px-4 py-2.5 border-b border-border"
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={rowKey(row, i)} className="border-b border-border last:border-b-0">
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className="px-4 py-3 align-top text-foreground"
                    style={{ fontSize: "15px", lineHeight: 1.5 }}
                  >
                    {c.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <ul className="md:hidden border border-border rounded-[2px] divide-y divide-border">
        {rows.map((row, i) => (
          <li key={rowKey(row, i)} className="px-4 py-3">
            {columns
              .filter((c) => !c.hideOnMobile)
              .map((c) => (
                <div key={c.key} className="flex items-baseline justify-between gap-4 py-1">
                  <span className="t-utility-xs text-muted-foreground shrink-0">{c.header}</span>
                  <span
                    className="text-foreground text-right min-w-0 break-words"
                    style={{ fontSize: "14px", lineHeight: 1.5 }}
                  >
                    {c.render(row)}
                  </span>
                </div>
              ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
