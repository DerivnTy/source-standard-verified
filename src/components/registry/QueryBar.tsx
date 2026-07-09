import { ReactNode, useEffect, useRef, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export type ActiveChip = {
  key: string;
  label: string;
  onRemove: () => void;
};

/**
 * QueryBar, razor-thin single-row registry control.
 * Row 1: search (1px hairline) + Sort + Filters trigger.
 * Filters open in a side sheet so the surface stays clean and uniform.
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
  const [open, setOpen] = useState(false);

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

  const activeCount = activeChips.length;

  return (
    <div className="mx-5 md:mx-0">
      {/* Single razor-thin row: search · sort · filters */}
      <div
        className="flex items-stretch rounded-[2px] overflow-hidden"
        style={{ border: "1px solid hsl(var(--border))" }}
      >
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-8 pr-3 h-9 bg-background text-[11px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-0"
            aria-label="Search registry"
          />
        </div>
        <div
          className="shrink-0 border-l flex items-center"
          style={{ borderColor: "hsl(var(--border))" }}
        >
          {sortControl}
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="shrink-0 h-9 px-3 border-l text-[12.5px] text-foreground hover:bg-surface-muted/40 inline-flex items-center gap-1.5 transition-colors"
              style={{ borderColor: "hsl(var(--border))" }}
              aria-label="Open filters"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Filters</span>
              {activeCount > 0 && (
                <span className="font-mono tabular-nums text-[11px] text-muted-foreground">
                  {activeCount}
                </span>
              )}
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-md p-0">
            <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
              <SheetTitle className="text-[13px] font-semibold tracking-tight">
                Filter Registry
              </SheetTitle>
            </SheetHeader>
            <div className="px-6 py-5 space-y-4 overflow-y-auto h-[calc(100vh-9rem)]">
              {facets}
            </div>
            <div className="border-t border-border px-6 py-3 flex items-center justify-between gap-3 bg-background">
              {hasActiveFilters ? (
                <button
                  onClick={() => {
                    onReset();
                  }}
                  className="text-[12.5px] text-muted-foreground hover:text-foreground underline underline-offset-2"
                >
                  Reset filters
                </button>
              ) : (
                <span />
              )}
              <button
                onClick={() => setOpen(false)}
                className="h-9 px-4 rounded-[2px] bg-foreground text-background text-[12.5px] hover:opacity-90"
              >
                Apply
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Result count + chips */}
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span className="t-micro text-muted-foreground tabular-nums whitespace-nowrap">
          {resultLabel}
        </span>
        {activeChips.map((chip) => (
          <button
            key={chip.key}
            onClick={chip.onRemove}
            className="group inline-flex items-center gap-1 h-5 pl-1.5 pr-1 border border-foreground/15 bg-background hover:border-foreground/40 text-[11px] text-foreground rounded-[2px] transition-all"
          >
            <span className="truncate max-w-[140px]">{chip.label}</span>
            <X className="h-2.5 w-2.5 text-muted-foreground group-hover:text-foreground" />
          </button>
        ))}
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="ml-auto t-micro text-muted-foreground hover:text-foreground underline underline-offset-2"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * FacetSelect, used inside the filter Sheet. Full-width labeled select.
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
  <label className="block">
    <span className="block text-[10.5px] font-medium uppercase tracking-[0.12em] text-muted-foreground mb-1.5">
      {ariaLabel.replace(/^Filter by /, "")}
    </span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={ariaLabel}
      className="w-full h-9 px-2.5 pr-8 bg-background text-[11px] text-foreground rounded-[2px] focus:outline-none focus:ring-0 cursor-pointer appearance-none bg-no-repeat bg-[length:9px_9px] bg-[right_10px_center]"
      style={{
        border: "1px solid hsl(var(--border))",
        backgroundImage:
          "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='none' stroke='%2364748b' stroke-width='1.5' d='M2 4l3 3 3-3'/%3E%3C/svg%3E\")",
      }}
    >
      {children}
    </select>
  </label>
);

/**
 * SortControl, compact text-style select used inline in the QueryBar row.
 */
export const SortControl = ({
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
    className="h-9 pl-3 pr-7 bg-background text-[12.5px] text-foreground hover:bg-surface-muted/40 focus:outline-none focus:ring-0 cursor-pointer appearance-none bg-no-repeat bg-[length:9px_9px] bg-[right_8px_center] border-0"
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='none' stroke='%2364748b' stroke-width='1.5' d='M2 4l3 3 3-3'/%3E%3C/svg%3E\")",
    }}
  >
    {children}
  </select>
);

/**
 * FacetGroup, legacy: groups related toggle buttons inside the filter sheet.
 */
export const FacetGroup = ({
  children,
  ariaLabel,
}: {
  children: ReactNode;
  ariaLabel: string;
}) => (
  <div role="group" aria-label={ariaLabel} className="flex flex-wrap gap-1.5">
    <span className="block w-full text-[10.5px] font-medium uppercase tracking-[0.12em] text-muted-foreground mb-1">
      {ariaLabel.replace(/^Filter by /, "")}
    </span>
    {children}
  </div>
);

/**
 * FacetToggle, legacy: single sharp toggle button.
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
    className={`h-8 px-3 rounded-[2px] text-[10px] transition-all ${
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
