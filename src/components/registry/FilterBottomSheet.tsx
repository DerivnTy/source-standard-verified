import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";

export type SheetOption = { value: string; label: string };

/**
 * FilterBottomSheet, iOS-style bottom sheet.
 * 300ms slide-up from bottom-0, 24px top corners, blurred backdrop, grabber handle.
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
        className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        style={{
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          animationDuration: "300ms",
        }}
      />
      <Dialog.Content
        aria-describedby={undefined}
        onPointerDownOutside={() => onOpenChange(false)}
        className="fixed inset-x-0 bottom-0 z-50 max-h-[70vh] overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom"
        style={{
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
          boxShadow: "0 -12px 40px -12px rgba(0,0,0,0.18)",
          animationDuration: "300ms",
          animationTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)",
          background:
            "linear-gradient(180deg, hsl(var(--background) / 0.96) 0%, hsl(var(--background) / 0.88) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid hsl(var(--border) / 0.6)",
        }}
      >
        {/* Grabber */}
        <button
          type="button"
          aria-label="Close"
          onClick={() => onOpenChange(false)}
          className="block w-full pt-3 pb-2"
        >
          <span
            aria-hidden
            className="mx-auto block h-[5px] w-[40px] rounded-full"
            style={{ backgroundColor: "hsl(var(--border))" }}
          />
        </button>

        <div className="px-5 pb-1 pt-1">
          <Dialog.Title className="font-sans text-[13px] font-semibold tracking-tight text-foreground">
            {title}
          </Dialog.Title>
        </div>

        <ul className="mt-2 overflow-y-auto pb-6" style={{ maxHeight: "calc(70vh - 90px)" }}>
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
                  className="flex w-full items-center justify-between px-5 text-left transition-colors hover:bg-[hsl(var(--muted))]/40"
                  style={{ height: "56px" }}
                >
                  <span
                    className={`text-[12px] ${
                      active ? "font-semibold text-foreground" : "text-foreground/85"
                    }`}
                  >
                    {opt.label}
                  </span>
                  {active && <CustomCheck />}
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
