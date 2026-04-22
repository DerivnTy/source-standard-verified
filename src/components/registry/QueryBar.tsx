import { ReactNode, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

export type ActiveChip = {
  key: string;
  label: string;
  onRemove: () => void;
};

/**
 * QueryBar — two-row controlled query interface for registry surfaces.
 * Row 1: search + result count + sort. Row 2: facets + reset.
 * Active filter chips render in a third row when any filter is active.
 *
 * All controls share one border treatment, one 40px height, one focus state
 * so the bar reads as a single instrument.
 */
export const QueryBar = ({
  query,
  onQueryChange,
  searchPlaceholder = "Search…",
  resultLabel,
  sortControl,
  facets,
  hasActiveFilters,
  onReset,
  activeChips = [],
}: {
  query: string;
  onQueryChange: (v: string) => void;
  searchPlaceholder?: string;
  resultLabel: ReactNode;
  sortControl: ReactNode;
  facets: ReactNode;
  hasActiveFilters: boolean;
  onReset: () => void;
  activeChips?: ActiveChip[];
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="border border-border bg-background rounded-[3px] shadow-[0_1px_0_0_hsl(var(--border)/0.4)] overflow-hidden">
      {/* Row 1: search + result count + sort */}
      <div className="flex items-center gap-3 px-3.5 py-2.5 border-b border-border/60 bg-surface-muted/20">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-10 pr-16 h-11 bg-transparent border-0 text-[14.5px] text-foreground placeholder:text-muted-foreground focus:outline-none"
            aria-label="Search registry"
          />
          <kbd
            className="hidden md:inline-flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-0.5 px-1.5 py-0.5 text-[10.5px] font-mono text-muted-foreground border border-border/60 rounded bg-background pointer-events-none"
            aria-hidden
          >
            ⌘K
          </kbd>
        </div>
        <div className="hidden md:block w-px h-6 bg-border/60" aria-hidden />
        <div className="hidden md:block text-[12.5px] text-muted-foreground tabular-nums whitespace-nowrap">
          {resultLabel}
        </div>
        <div className="shrink-0">{sortControl}</div>
      </div>

      {/* Row 2: facets + reset */}
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 px-3.5 py-3">
        {facets}
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="ml-auto h-10 px-3 text-[12.5px] text-muted-foreground hover:text-foreground transition-colors underline-offset-2 hover:underline"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Row 3: active chips (only when active) */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 px-3.5 py-3 border-t border-border/60 bg-surface-muted/30">
          <span className="t-utility-xs uppercase tracking-[0.1em] text-muted-foreground mr-1.5 font-medium">
            Active
          </span>
          {activeChips.map((chip) => (
            <button
              key={chip.key}
              onClick={chip.onRemove}
              className="group inline-flex items-center gap-1.5 h-7 pl-2.5 pr-2 border border-foreground/15 bg-background hover:border-foreground/40 hover:bg-surface-muted text-[12px] text-foreground rounded-[2px] transition-all duration-150 shadow-[0_1px_0_0_hsl(var(--border)/0.3)]"
            >
              <span className="truncate max-w-[200px]">{chip.label}</span>
              <X className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Shared facet select — matches the QueryBar's locked 40px / single border.
 */
export const FacetSelect = ({
  value,
  onChange,
  ariaLabel,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  ariaLabel: string;
  children: ReactNode;
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    aria-label={ariaLabel}
    className="h-10 px-3.5 pr-9 bg-background border border-border/70 text-[13px] text-foreground rounded-[2px] hover:border-foreground/40 focus:outline-none focus:border-foreground/60 focus:ring-1 focus:ring-foreground/10 transition-colors cursor-pointer appearance-none bg-no-repeat bg-[length:10px_10px] bg-[right_12px_center]"
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='none' stroke='%2364748b' stroke-width='1.5' d='M2 4l3 3 3-3'/%3E%3C/svg%3E\")",
    }}
  >
    {children}
  </select>
);

/**
 * Segmented control — for small enum facets.
 */
export const FacetSegmented = <T extends string>({
  value,
  onChange,
  options,
  ariaLabel,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  ariaLabel: string;
}) => (
  <div
    role="radiogroup"
    aria-label={ariaLabel}
    className="inline-flex h-10 border border-border/70 rounded-[2px] overflow-hidden"
  >
    {options.map((opt, i) => {
      const active = opt.value === value;
      return (
        <button
          key={opt.value}
          role="radio"
          aria-checked={active}
          onClick={() => onChange(opt.value)}
          className={`px-3.5 text-[12.5px] font-medium transition-colors duration-150 ${
            i > 0 ? "border-l border-border/70" : ""
          } ${
            active
              ? "bg-foreground text-background"
              : "bg-background text-muted-foreground hover:text-foreground hover:bg-surface-muted/40"
          }`}
        >
          {opt.label}
        </button>
      );
    })}
  </div>
);

/**
 * FacetGroup — visually groups a set of related toggle buttons inside the facet row.
 * Used to separate primary trust filters from geo/focus selects.
 */
export const FacetGroup = ({
  children,
  ariaLabel,
}: {
  children: ReactNode;
  ariaLabel: string;
}) => (
  <div
    role="group"
    aria-label={ariaLabel}
    className="inline-flex items-center gap-1"
  >
    {children}
  </div>
);

/**
 * FacetToggle — single toggle button matching the segmented look but standalone,
 * usable in a row of mutually-exclusive-within-group buttons.
 */
export const FacetToggle = ({
  active,
  onClick,
  children,
  tone = "default",
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  tone?: "default" | "verified";
}) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={`h-10 px-3.5 rounded-[2px] border text-[12px] font-semibold uppercase tracking-[0.08em] transition-all duration-150 ${
      active
        ? tone === "verified"
          ? "bg-verified text-verified-foreground border-verified shadow-[0_1px_0_0_hsl(var(--verified)/0.4)]"
          : "bg-foreground text-background border-foreground shadow-[0_1px_0_0_hsl(var(--foreground)/0.4)]"
        : "bg-background text-muted-foreground border-border/70 hover:text-foreground hover:border-foreground/40"
    }`}
  >
    {children}
  </button>
);

/**
 * FacetDivider — vertical hairline separator between facet groups inside the row.
 */
export const FacetDivider = () => (
  <span
    aria-hidden
    className="hidden md:inline-block w-px h-6 bg-border/60 mx-1"
  />
);
