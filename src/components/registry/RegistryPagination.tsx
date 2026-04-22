import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * RegistryPagination — product-grade pager for registry surfaces.
 * Left: showing-range + page count. Right: prev / numbered / next + page-size.
 */
export const RegistryPagination = ({
  page,
  totalPages,
  pageSize,
  totalRecords,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [25, 50, 100],
}: {
  page: number;
  totalPages: number;
  pageSize: number;
  totalRecords: number;
  onPageChange: (p: number) => void;
  onPageSizeChange?: (n: number) => void;
  pageSizeOptions?: number[];
}) => {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalRecords);

  const buildPages = (): (number | "…")[] => {
    const out: (number | "…")[] = [];
    const win = 1;
    out.push(1);
    const s = Math.max(2, page - win);
    const e = Math.min(totalPages - 1, page + win);
    if (s > 2) out.push("…");
    for (let i = s; i <= e; i++) out.push(i);
    if (e < totalPages - 1) out.push("…");
    if (totalPages > 1) out.push(totalPages);
    return out;
  };

  return (
    <nav
      aria-label="Registry pagination"
      className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-5 border-t border-border/60"
    >
      <p className="text-[12.5px] text-muted-foreground tabular-nums">
        Showing <span className="text-foreground">{start.toLocaleString()}</span>
        –<span className="text-foreground">{end.toLocaleString()}</span> of{" "}
        <span className="text-foreground">{totalRecords.toLocaleString()}</span>
        <span className="mx-2 text-border">·</span>
        Page <span className="text-foreground">{page}</span> of{" "}
        <span className="text-foreground">{totalPages}</span>
      </p>

      <div className="flex items-center gap-3">
        {onPageSizeChange && (
          <div className="hidden md:flex items-center gap-2">
            <span className="t-utility-xs text-muted-foreground">Page size</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="h-9 px-2 pr-7 bg-background border border-border/70 text-[12.5px] text-foreground rounded-[2px] hover:border-foreground/40 focus:outline-none focus:border-foreground/60 transition-colors cursor-pointer appearance-none bg-no-repeat bg-[length:10px_10px] bg-[right_8px_center]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='none' stroke='%2364748b' stroke-width='1.5' d='M2 4l3 3 3-3'/%3E%3C/svg%3E\")",
              }}
              aria-label="Page size"
            >
              {pageSizeOptions.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="h-9 px-2.5 inline-flex items-center gap-1 border border-border/70 rounded-[2px] text-[12.5px] text-foreground hover:border-foreground/40 hover:bg-surface-muted/50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-border/70 disabled:hover:bg-transparent transition-colors duration-150"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Prev</span>
          </button>
          {buildPages().map((p, i) =>
            p === "…" ? (
              <span
                key={`e-${i}`}
                className="px-1.5 text-[12px] text-muted-foreground"
                aria-hidden
              >
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                aria-current={p === page ? "page" : undefined}
                className={`h-9 min-w-9 px-2.5 rounded-[2px] text-[12.5px] tabular-nums transition-colors duration-150 ${
                  p === page
                    ? "bg-foreground text-background border border-foreground"
                    : "border border-border/70 text-foreground hover:border-foreground/40 hover:bg-surface-muted/50"
                }`}
              >
                {p}
              </button>
            ),
          )}
          <button
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="h-9 px-2.5 inline-flex items-center gap-1 border border-border/70 rounded-[2px] text-[12.5px] text-foreground hover:border-foreground/40 hover:bg-surface-muted/50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-border/70 disabled:hover:bg-transparent transition-colors duration-150"
            aria-label="Next page"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </nav>
  );
};
