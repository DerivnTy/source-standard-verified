import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export type FocusOption = { value: string; label: string };

/**
 * FocusFilter — custom popover dropdown (no native <select>).
 * Anchored, absolutely-positioned menu with blurred backdrop, sharp 2px corners.
 */
export const FocusFilter = ({
  value,
  onChange,
  options,
  placeholder = "Category",
  selectedPrefix = "Focus",
}: {
  value: string;
  onChange: (v: string) => void;
  options: FocusOption[];
  placeholder?: string;
  selectedPrefix?: string;
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const activeOption = options.find((o) => o.value === value);
  const triggerLabel =
    !activeOption || activeOption.value === "all"
      ? placeholder
      : `${selectedPrefix}: ${activeOption.label}`;
  const isActive = !!activeOption && activeOption.value !== "all";

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-2 font-sans text-[13.5px] font-medium transition-all"
        style={{
          height: "34px",
          padding: "0 14px",
          borderRadius: "2px",
          border: isActive
            ? "1px solid hsl(var(--navy-surface))"
            : "1px solid hsl(var(--border))",
          backgroundColor: isActive
            ? "hsl(var(--navy-surface))"
            : "transparent",
          color: isActive
            ? "hsl(var(--background))"
            : "hsl(var(--foreground))",
        }}
      >
        <span className="truncate max-w-[180px]">{triggerLabel}</span>
        <ChevronDown
          className="h-3.5 w-3.5 transition-transform"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            opacity: 0.7,
          }}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 z-40 mt-1.5 min-w-[220px] overflow-hidden bg-background/90"
          style={{
            top: "100%",
            border: "1px solid hsl(var(--border))",
            borderRadius: "2px",
            boxShadow: "0 12px 32px -12px rgba(15, 23, 42, 0.18)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <ul className="py-1">
            {options.map((opt) => {
              const active = opt.value === value;
              return (
                <li key={opt.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className="flex w-full items-center justify-between px-4 text-left font-sans text-[14px] transition-colors hover:bg-[hsl(var(--muted))]/60"
                    style={{
                      height: "40px",
                      color: active
                        ? "hsl(var(--navy-surface))"
                        : "hsl(var(--foreground))",
                      fontWeight: active ? 600 : 400,
                    }}
                  >
                    <span>{opt.label}</span>
                    {active && (
                      <svg
                        aria-hidden
                        viewBox="0 0 16 16"
                        className="h-3.5 w-3.5"
                        style={{ color: "hsl(var(--navy-surface))" }}
                      >
                        <path
                          d="M3.5 8.5L6.5 11.5L12.5 5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
