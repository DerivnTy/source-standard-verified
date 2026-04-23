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
    <div className="mx-5 md:mx-0">
      {/* Single-line slim search bar — 1px hairline */}
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full pl-8 pr-14 h-9 bg-background rounded-[2px] text-[13px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-0"
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

      {/* Inline dropdown row directly below — text dropdowns, no boxy borders */}
      <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5">
        <div className="shrink-0">{sortControl}</div>
        <span aria-hidden className="hidden md:inline-block w-px h-3.5 bg-border/60" />
        {facets}
        <span className="ml-auto t-micro text-muted-foreground tabular-nums whitespace-nowrap">
          {resultLabel}
        </span>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="t-micro text-muted-foreground hover:text-foreground underline underline-offset-2"
          >
            Reset
          </button>
        )}
      </div>

      {/* Active chips — only when active */}
      {activeChips.length > 0 && (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {activeChips.map((chip) => (
            <button
              key={chip.key}
              onClick={chip.onRemove}
              className="group inline-flex items-center gap-1.5 h-6 pl-2 pr-1.5 border border-foreground/15 bg-background hover:border-foreground/40 t-micro text-foreground rounded-[2px] transition-all"
            >
              <span className="truncate max-w-[180px]">{chip.label}</span>
              <X className="h-3 w-3 text-muted-foreground group-hover:text-foreground" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * FacetSelect — minimal text-style dropdown. No border, no box; reads as a link.
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
    className="h-7 bg-transparent border-0 pl-0 pr-5 text-[12.5px] text-foreground hover:text-foreground/80 focus:outline-none focus:ring-0 cursor-pointer appearance-none bg-no-repeat bg-[length:9px_9px] bg-[right_2px_center]"
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
