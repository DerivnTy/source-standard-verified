import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import { X, Check } from "lucide-react";

export type SheetOption = { value: string; label: string };

/**
 * FilterBottomSheet — Uber-style bottom sheet for filter selection.
 * Slides up from bottom-0, covers ~50vh, blurred backdrop, 2px top border.
 */
export const FilterBottomSheet = ({
  open,
  onOpenChange,
  title,
  options,
  value,
  onChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  options: SheetOption[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay
        className="fixed inset-0 z-50 bg-black/30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
      />
      <Dialog.Content
        className="fixed inset-x-0 bottom-0 z-50 max-h-[50vh] overflow-hidden bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom"
        style={{ borderTop: "2px solid hsl(var(--foreground))" }}
      >
        <div className="flex items-center justify-between px-5 pt-4 pb-3">
          <Dialog.Title className="font-serif text-[16px] font-semibold tracking-tight text-foreground">
            {title}
          </Dialog.Title>
          <Dialog.Close
            aria-label="Close"
            className="-mr-1.5 rounded p-1.5 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Dialog.Close>
        </div>
        <ul className="overflow-y-auto" style={{ maxHeight: "calc(50vh - 56px)" }}>
          {options.map((opt) => {
            const active = opt.value === value;
            return (
              <li key={opt.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    onOpenChange(false);
                  }}
                  className="flex w-full items-center justify-between border-t border-border px-5 text-left transition-colors hover:bg-[hsl(var(--muted))]/40"
                  style={{ height: "60px" }}
                >
                  <span
                    className={`text-[15px] ${
                      active ? "font-semibold text-foreground" : "text-foreground/85"
                    }`}
                  >
                    {opt.label}
                  </span>
                  {active && (
                    <CustomCheck />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

const CustomCheck = (): ReactNode => (
  <svg
    aria-hidden
    viewBox="0 0 20 20"
    className="h-5 w-5"
    style={{ color: "hsl(var(--navy-surface))" }}
  >
    <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeWidth="1.25" />
    <path
      d="M6 10.5l2.5 2.5L14 7.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
