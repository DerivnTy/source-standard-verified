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
  searchPlaceholder = "Search registry",
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
    <div
      className="bg-background rounded-[2px] overflow-hidden mx-5 md:mx-0"
      style={{ border: "1px solid hsl(var(--border))" }}
    >
      {/* Row 1: search + result count + sort */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 px-3 py-2 border-b border-border/60">
        <div className="relative flex-1 min-w-0 w-full">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-8 pr-14 h-8 bg-background rounded-[2px] text-[13px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-0"
            style={{ border: "1px solid hsl(var(--border))" }}
            aria-label="Search registry"
          />
          <kbd
            className="hidden md:inline-flex absolute right-2 top-1/2 -translate-y-1/2 items-center gap-0.5 px-1 py-0.5 font-mono text-[10px] text-muted-foreground border border-border/60 rounded bg-background pointer-events-none"
            aria-hidden
          >
            ⌘K
          </kbd>
        </div>
        <div className="hidden md:block w-px h-6 bg-border/60" aria-hidden />
        <div className="hidden md:block t-micro text-muted-foreground tabular-nums whitespace-nowrap">
          {resultLabel}
        </div>
        <div className="shrink-0 w-full md:w-auto">{sortControl}</div>
      </div>

      {/* Row 2: facets + reset */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-2 px-3.5 py-3">
        {facets}
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="ml-auto h-10 px-3 t-micro text-muted-foreground hover:text-foreground transition-colors underline-offset-2 hover:underline"
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
              className="group inline-flex items-center gap-1.5 h-7 pl-2.5 pr-2 border border-foreground/15 bg-background hover:border-foreground/40 hover:bg-surface-muted t-micro text-foreground rounded-[2px] transition-all duration-150"
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
    className="h-8 w-full md:w-auto px-2.5 pr-8 bg-background text-[12px] text-foreground rounded-[2px] focus:outline-none focus:ring-0 transition-colors cursor-pointer appearance-none bg-no-repeat bg-[length:9px_9px] bg-[right_10px_center]"
    style={{
      border: "1px solid hsl(var(--border))",
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
          className={`px-3.5 t-micro transition-colors duration-150 ${
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
    className={`h-8 px-3 rounded-[2px] text-[12px] transition-all duration-150 ${
      active
        ? tone === "verified"
          ? "bg-verified text-verified-foreground"
          : "bg-foreground text-background"
        : "bg-background text-muted-foreground hover:text-foreground"
    }`}
    style={{ border: "1px solid hsl(var(--border))" }}
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
